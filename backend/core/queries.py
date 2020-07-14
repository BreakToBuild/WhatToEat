from django.db.models import Q

from backend.core.models import Recipe, RecipeFollower
from backend.users.models import User


def get_all_recipes(user: User):
    return Recipe.objects.filter(
        Q(created_by=user)
        | Q(
            id__in=RecipeFollower.objects.filter(user=user).values_list("id", flat=True)
        )
    )


def get_created_recipes(user: User):
    return Recipe.objects.filter(created_by=user)


def get_following_recipes(user: User):
    return [r.recipe for r in RecipeFollower.objects.filter(user=user)]


def get_other_users_recipes(user: User):
    return Recipe.objects.all().exclude(created_by=user)
