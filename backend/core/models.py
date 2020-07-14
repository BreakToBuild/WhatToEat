from django.contrib.postgres.fields import JSONField
from django.db import models

from backend.utils import (
    AutoSlugMixin,
    BaseModel,
    SoftDeleteModel,
    UserEventTrackModel,
)


# FIXME: it must inherit from UserEventTrackModel
class Recipe(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ingredients = models.TextField(blank=True, null=True)
    preparation = models.TextField(blank=True, null=True)
    categories = JSONField(blank=True, default=dict)
    created_by = models.ForeignKey("users.User", on_delete=models.PROTECT)

    class Meta:
        db_table = "recipe"


class RecipeFollower(BaseModel):
    recipe = models.ForeignKey("core.Recipe", on_delete=models.PROTECT)
    user = models.ForeignKey("users.User", on_delete=models.PROTECT)

    class Meta:
        db_table = "recipe_follower"
        unique_together = ("recipe", "user")


class Category(AutoSlugMixin, BaseModel):
    populate_slug_from = "name"
    slug_field_name = "uid"

    name = models.CharField(max_length=200)
    uid = models.SlugField(unique=True)

    class Meta:
        db_table = "category"
