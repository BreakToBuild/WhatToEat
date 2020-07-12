from backend.core import queries as core_queries
from backend.core.models import Category
from rest_framework import serializers


class IngredientSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    portion = serializers.CharField(max_length=20)
    unit = serializers.CharField(max_length=20)
    comment = serializers.CharField(max_length=200)


class RecepiSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=200)
    description = serializers.CharField()
    ingredients = IngredientSerializer(many=True)
    preparation = serializers.CharField()
    categories = serializers.ListField()

    def validate_categories(self, categories):
        categories = Category.objects.filter(uid__in=categories)
        if categories.count != len(categories):
            raise serializers.ValidationError(
                detail="invalid categories", code="invalid_categories"
            )

        return categories


class ListRecepiSerializer(serializers.Serializer):
    created = serializers.SerializerMethodField()
    following = serializers.SerializerMethodField()

    def get_created(self, obj):
        recepies = core_queries.get_created_recepies(self.context["user"])
        return RecepiSerializer(recepies, many=True).data

    def get_following(self, obj):
        recepies = core_queries.get_following_recepies(self.context["user"])
        return RecepiSerializer(recepies, many=True).data
