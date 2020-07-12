from django.contrib.postgres.fields import JSONField
from django.db import models

from backend.utils import (
    AutoSlugMixin,
    BaseModel,
    SoftDeleteModel,
    UserEventTrackModel,
)


# FIXME: it must inherit from UserEventTrackModel
class Recepi(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ingredients = JSONField(blank=True)
    preparation = models.TextField(blank=True)
    categories = models.ManyToManyField(
        "core.Category", through="core.RecepiCategories"
    )
    created_by = models.ForeignKey("users.User", on_delete=models.PROTECT)

    class Meta:
        db_table = "recepi"


class RecepiFollower(BaseModel):
    recepi = models.ForeignKey("core.Recepi", on_delete=models.PROTECT)
    user = models.ForeignKey("users.User", on_delete=models.PROTECT)

    class Meta:
        db_table = "recepi_follower"
        unique_together = ("recepi", "user")


class RecepiCategories(BaseModel):
    recepi = models.ForeignKey("core.Recepi", on_delete=models.CASCADE)
    category = models.ForeignKey("core.Category", on_delete=models.PROTECT)

    class Meta:
        db_table = "recepi_categories"
        unique_together = ("recepi", "category")


class Category(AutoSlugMixin, BaseModel):
    populate_slug_from = "name"
    slug_field_name = "uid"

    name = models.CharField(max_length=200)
    uid = models.SlugField(unique=True)

    class Meta:
        db_table = "category"
