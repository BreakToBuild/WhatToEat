from django.contrib.auth.models import Group
from django.core.management import call_command
from django.core.management.base import BaseCommand

from backend.core.models import Category, Recepi, RecepiCategories


class Command(BaseCommand):
    help = "Create initial data in database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--reset",
            action="store_true",
            dest="reset",
            help="Reset db and run migrations",
        )
        parser.add_argument(
            "--noinput", action="store_true", dest="noinput",
        )

    def handle(self, *args, **options):
        if options["reset"]:
            if options["noinput"]:
                call_command("reset_db", "--noinput")
            else:
                call_command("reset_db")
            call_command("migrate", interactive=False)

        # ---------- EXAMPLES ---------- #

        category = Category.objects.create(name="")

        # recepi creation
        recepi = Recepi.objects.create(
            name="",
            description="",
            ingredients=[
                {"name": "", "portion": "", "unit": "", "comment": ""}
            ],  # object list
            preparation="",
        )

        # adding a category to a recepi
        RecepiCategories.objects.create(recepi=recepi, categor=category)
