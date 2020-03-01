import datetime as dt
import uuid
from typing import List

from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.contrib.auth.models import PermissionsMixin
from django.db import models
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _

from backend.utils import BaseModel
from model_utils import Choices
from phonenumber_field.modelfields import PhoneNumberField


class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, phone, password, **extra_fields):
        """Create and save a user with the given username, email, and password."""
        if not email and not phone:
            raise ValueError("The given email or phone must be set")

        email = email or None
        private_data = {}
        if "private_data" in extra_fields:
            private_data = extra_fields.pop("private_data")
        user = self.model(email=email, **extra_fields)
        if phone:
            user.set_phone(phone)

        if not password:
            raise ValueError("Empty password not allowed")

        user.set_password(password)
        user.save(using=self._db)
        PrivateData.objects.create(user=user, **private_data)
        return user

    def create_user(self, email=None, phone=None, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(email, phone, password, **extra_fields)

    def create_superuser(self, email, password, phone=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(email, phone, password, **extra_fields)


class User(BaseModel, AbstractBaseUser, PermissionsMixin):
    """An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    Email or Phone and password are required. Other fields are optional.
    """

    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    email = models.EmailField(
        _("email address"),
        unique=True,
        null=True,
        blank=True,
        error_messages={"unique": _("A user with that email already exists")},
    )
    phone = PhoneNumberField(
        _("Phone Number"),
        unique=True,
        null=True,
        blank=True,
        error_messages={"unique": _("A user with that phone already exists")},
    )
    phone_country = models.CharField(max_length=2, blank=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = "email"
    EMAIL_FIELD = "email"
    REQUIRED_FIELDS: List[str] = []

    def clean(self):
        super().clean()
        if self.email:
            self.email = self.__class__.objects.normalize_email(self.email)
        if self.phone and not self.phone.is_valid():
            raise ValueError("Phone is not valid")

    def __str__(self):
        return "{}/{}/{}".format(self.uuid, self.email, str(self.phone))

    @property
    def age(self):
        if self.privatedata.birthdate:
            today = dt.date.today()
            born = self.privatedata.birthdate
            return (
                today.year
                - born.year
                - ((today.month, today.day) < (born.month, born.day))
            )
        return None

    class Meta:
        db_table = "user"


class PrivateData(BaseModel):
    GENDER = Choices(("M", "male", "male"), ("F", "female", "female"))

    user = models.OneToOneField(
        User, to_field="uuid", primary_key=True, on_delete=models.PROTECT
    )
    name = models.CharField(max_length=300, default="", blank=True)
    gender = models.CharField(choices=GENDER, max_length=1, default="", blank=True)
    birthdate = models.DateField(blank=True, null=True)
    country = models.CharField(max_length=2, blank=True, default="")
    state = models.CharField(max_length=255, blank=True, default="")
    city = models.CharField(max_length=255, blank=True, default="")
    updated_at = models.DateTimeField(auto_now=True)

    avatar_uid = "pk"

    def set_male(self):
        self.gender = self.GENDER.male

    def set_female(self):
        self.gender = self.GENDER.female

    @property
    def first_name(self):
        try:
            return self.name.split(" ")[0]
        except IndexError:
            return ""

    class Meta:
        db_table = "private_data"
