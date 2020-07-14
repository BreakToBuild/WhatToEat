from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from backend.api import APIView
from backend.core import queries as core_queries, services as core_services
from backend.core.models import Category, Recipe, RecipeFollower
from backend.core.serializers import RecipeSerializer
from rest_framework import status

# Create your views here.
from rest_framework.response import Response


class RecipeView(APIView):
    def get(self, request):
        data = {
            "created": RecipeSerializer(
                core_queries.get_created_recipes(request.user), many=True
            ).data,
            "following": RecipeSerializer(
                core_queries.get_following_recipes(request.user), many=True
            ).data,
            "other_users": RecipeSerializer(
                core_queries.get_other_users_recipes(request.user), many=True
            ).data,
        }

        return Response(data)

    def post(self, request):
        serializer = RecipeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        recipe = core_services.create_recipe(
            request.user,
            validated_data.get("name"),
            validated_data.get("description"),
            validated_data.get("ingredients"),
            validated_data.get("preparation"),
            validated_data.get("categories", []),
        )

        return Response(RecipeSerializer(recipe).data)


class RecipeDetailView(APIView):
    def get(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        return Response(RecipeSerializer(recipe).data)

    def put(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        if recipe.created_by != request.user:
            raise PermissionDenied()

        serializer = RecipeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        recipe = core_services.update_recipe(
            recipe,
            validated_data.get("name"),
            validated_data.get("description"),
            validated_data.get("ingredients"),
            validated_data.get("preparation"),
            validated_data.get("categories"),
        )

        return Response(RecipeSerializer(recipe).data)

    def delete(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        if recipe.created_by != request.user:
            raise PermissionDenied()

        recipe.delete()

        return Response({})


class RecipeFollowView(APIView):
    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        core_services.follow_recipe(recipe, request.user)
        return Response({})


class RecipeUnfollowView(APIView):
    def post(self, request, recipe_id):
        recipe = get_object_or_404(Recipe, id=recipe_id)
        try:
            core_services.unfollow_recipe(recipe, request.user)
        except RecipeFollower.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({})


class CategoryRecipeView(APIView):
    def get(self, request):
        categories = [{"name": c.name, "uid": c.uid} for c in Category.objects.all()]

        return Response(categories)
