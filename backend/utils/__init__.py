from typing import TYPE_CHECKING

from django.db import models
from django.db.models.query import QuerySet
from django.utils import timezone
from django.utils.text import slugify


class BaseModel(models.Model):
    class Meta:
        abstract = True

    def save(
        self, force_insert=None, force_update=None, using=None, update_fields=None
    ) -> None:
        self.full_clean()
        super().save(force_insert, force_update, using, update_fields)


if TYPE_CHECKING:
    _SlugBase = models.Model
else:
    _SlugBase = object


class AutoSlugMixin(_SlugBase):

    populate_slug_from = "name"
    slug_field_name = "slug"

    def _get_unique_slug(self):
        slug = slugify(getattr(self, self.populate_slug_from))
        unique_slug = slug
        num = 1
        while type(self).objects.filter(**{self.slug_field_name: unique_slug}).exists():
            unique_slug = "{}-{}".format(slug, num)
            num += 1
        return unique_slug

    def save(self, *args, **kwargs):
        if not getattr(self, self.slug_field_name):
            setattr(self, self.slug_field_name, self._get_unique_slug())
        super().save(*args, **kwargs)


class TimeStampedModel(BaseModel):
    """An abstract base class model that provides self-updating
    ``created_at`` and ``updated_at`` fields.
    """

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class SoftDeletableQuerySet(QuerySet):
    def delete(self):
        return super().update(deleted_at=timezone.now())

    def hard_delete(self):
        return super().delete()

    def active(self):
        return self.filter(deleted_at=None)

    def deleted(self):
        return self.exclude(deleted_at=None)


class SoftDeletableManager(models.Manager):
    """
    Manager that limits the queryset by default to show only not removed
    instances of model.
    """

    _queryset_class = SoftDeletableQuerySet

    def __init__(self, *args, **kwargs):
        self.all_objects = kwargs.pop("all_objects", False)
        super().__init__(*args, **kwargs)

    def get_queryset(self):
        if self.all_objects:
            return super().get_queryset()
        return super().get_queryset().filter(deleted_at=None)


class SoftDeleteModel(TimeStampedModel):

    deleted_at = models.DateTimeField(null=True, blank=True)

    objects = SoftDeletableManager()
    all_objects = SoftDeletableManager(all_objects=True)

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.deleted_at = timezone.now()
        self.save()

    def undelete(self):
        self.deleted_at = None
        self.save()

    def hard_delete(self):
        super().delete()


class UserEventTrackModel(SoftDeleteModel):
    """An abstract base model that provides self-updating
    traking for creation, update and deletion events that modity
    the class
    """

    created_by = models.ForeignKey("users.User", on_delete=models.PROTECT)
    updated_by = models.ForeignKey("users.User", on_delete=models.PROTECT)
    deleted_by = models.ForeignKey("users.User", on_delete=models.PROTECT)

    class Meta:
        abstract = True
