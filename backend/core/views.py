from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404

from backend.api import APIView
from backend.core import queries as core_queries, services as core_services
from backend.core.models import Category, Recepi, RecepiFollower
from backend.core.serializers import ListRecepiSerializer, RecepiSerializer
from rest_framework import status

# Create your views here.
from rest_framework.response import Response


class RecepiView(APIView):
    def get(self, request):
        return Response(
            ListRecepiSerializer(context={"user": request.user}, many=True).data
        )

    def post(self, request):
        serializer = RecepiSerializer(request)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        recepi = core_services.create_recepi(
            request.user,
            validated_data.get("name"),
            validated_data.get("description"),
            validated_data.get("ingredients"),
            validated_data.get("preparation"),
            validated_data.get("categories"),
        )

        return Response(RecepiSerializer(recepi).data)


class RecepiDetailView(APIView):
    def get(self, recepi_id, request):
        recepi = get_object_or_404(Recepi, id=recepi_id)
        return Response(RecepiSerializer(recepi).data)

    def put(self, recepi_id, request):
        recepi = get_object_or_404(Recepi, id=recepi_id)
        if recepi.created_by != request.user:
            raise PermissionDenied()

        serializer = RecepiSerializer(request)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data

        recepi = core_services.update_recepi(
            recepi,
            validated_data.get("name"),
            validated_data.get("description"),
            validated_data.get("ingredients"),
            validated_data.get("preparation"),
            validated_data.get("categories"),
        )

        return Response(RecepiSerializer(recepi).data)

    def delete(self, recepi_id, request):
        recepi = get_object_or_404(Recepi, id=recepi_id)
        if recepi.created_by != request.user:
            raise PermissionDenied()

        recepi.delete()

        return Response({})


class RecepiFollowView(APIView):
    def post(self, recepi_id, request):
        recepi = get_object_or_404(Recepi, id=recepi_id)
        core_services.follow_recepi(recepi, request.user)
        return Response({})


class RecepiUnfollowView(APIView):
    def post(self, recepi_id, request):
        recepi = get_object_or_404(Recepi, id=recepi_id)
        try:
            core_services.unfollow_recepi(recepi, request.user)
        except RecepiFollower.DoesNotExist:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        return Response({})


class CategoryRecepiView(APIView):
    def get(self, request):
        categories = [{"name": c.name, "uid": c.uid} for c in Category.objects.all()]

        return Response(categories)
