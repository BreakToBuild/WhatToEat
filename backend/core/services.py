from typing import List

from backend.core.models import Category, Recepi, RecepiFollower
from backend.users.models import User


def create_recepi(
    user: User,
    name: str,
    description: str,
    ingredients: dict,
    preparation: str,
    categories: List[Category],
):
    return Recepi.objects.create(
        user=user,
        name=name,
        description=description,
        ingredients=ingredients,
        preparation=preparation,
        categories=categories,
    )


def update_recepi(
    recepi: Recepi,
    name: str,
    description: str,
    ingredients: dict,
    preparation: str,
    categories: List[Category],
):
    return recepi.objects.update(
        name=name,
        description=description,
        ingredients=ingredients,
        preparation=preparation,
        categories=categories,
    )


def follow_recepi(recepi: Recepi, user: User):
    return RecepiFollower.objects.get_or_create(recepi=recepi, user=user)


def unfollow_recepi(recepi: Recepi, user: User):
    RecepiFollower.objects.get(recepi=recepi, user=user).delete()
