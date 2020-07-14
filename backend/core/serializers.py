from backend.core import queries as core_queries
from backend.core.models import Category
from rest_framework import serializers


class RecipeSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=200)
    description = serializers.CharField()
    ingredients = serializers.CharField()
    preparation = serializers.CharField()
    categories = serializers.ListField(required=False)

    def validate_categories(self, categories):
        qs_categories = Category.objects.filter(uid__in=categories)
        if qs_categories.count() != len(categories):
            raise serializers.ValidationError(
                detail="invalid categories", code="invalid_categories"
            )

        return categories
