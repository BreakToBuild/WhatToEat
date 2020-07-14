from typing import List

from backend.core.models import Category, Recipe, RecipeFollower
from backend.users.models import User


def create_recipe(
    user: User,
    name: str,
    description: str,
    ingredients: dict,
    preparation: str,
    categories: List[Category],
):
    recipe = Recipe.objects.create(
        created_by=user,
        name=name,
        description=description,
        ingredients=ingredients,
        preparation=preparation,
        categories=categories,
    )

    return recipe


def update_recipe(
    recipe: Recipe,
    name: str,
    description: str,
    ingredients: dict,
    preparation: str,
    categories: List[Category],
):
    recipe.name = name
    recipe.description = description
    recipe.ingredients = ingredients
    recipe.preparation = preparation
    recipe.categories = categories or []
    recipe.save()

    return recipe


def follow_recipe(recipe: Recipe, user: User):
    return RecipeFollower.objects.get_or_create(recipe=recipe, user=user)


def unfollow_recipe(recipe: Recipe, user: User):
    RecipeFollower.objects.get(recipe=recipe, user=user).delete()
