from django.contrib.postgres.fields import JSONField
from django.db import models

from backend.utils import BaseModel, SoftDeleteModel, UserEventTrackModel


# FIXME: it must inherit from UserEventTrackModel
class Recepi(SoftDeleteModel):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    ingredients = JSONField(blank=True)
    preparation = models.TextField(blank=True)

    class Meta:
        db_table = "recepi"


class RecepiFollower(BaseModel):
    recepi = models.ForeignKey("core.Recepi", on_delete=models.PROTECT)
    user = models.ForeignKey("users.User", on_delete=models.PROTECT)

    class Meta:
        db_table = "recepi_follower"


class RecepiCategories(BaseModel):
    recepi = models.ForeignKey("core.Recepi", on_delete=models.CASCADE)
    category = models.ForeignKey("core.Category", on_delete=models.PROTECT)

    class Meta:
        db_table = "recepi_categories"


class Category(BaseModel):
    name = models.CharField(max_length=200)

    class Meta:
        db_table = "category"
