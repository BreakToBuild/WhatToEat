from django.db.models import Q

from backend.core.models import Recepi, RecepiFollower
from backend.users.models import User


def get_all_recepies(user: User):
    return Recepi.objects.filter(
        Q(created_by=user)
        | Q(
            id__in=RecepiFollower.objects.filter(user=user).values_list("id", flat=True)
        )
    )


def get_created_recepies(user: User):
    return Recepi.objects.filter(created_by=user)


def get_following_recepies(user: User):
    return [r.recepi for r in RecepiFollower.objects.filter(user=user)]
