from django.core.management import call_command
from django.core.management.base import BaseCommand

from backend.core.models import Category, Recipe
from backend.users.services import create_user


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

        user = create_user("user@email.com", "Manuel", "Silva", "123456")

        # ---------- EXAMPLES ---------- #

        portuguesa = Category.objects.create(name="Portuguesa")
        chinesa = Category.objects.create(name="Chinesa")
        indiana = Category.objects.create(name="Indiana")

        Recipe.objects.create(
            name="Sardinhas na cataplana",
            description="Tudo num só tacho, deixe que os alimentos libertem os sabores, que se vão misturando.",
            ingredients="700 g sardinhas limpas (sem cabeça, vísceras e escamas) c. de chá sal 300 g (3 unid.) cebolas 5 dentes de alho600 g (4 unid.) batata 600 g (7 unid.) tomate maduro",
            preparation="1. Lave cuidadosamente as sardinhas em água fria corrente e certifique-se de que elimina todas as escamas. Enxugue-as em papel de cozinha, tempere-as com uma colher de chá de sal e reserve.  2. Descasque as cebolas, o alho e as batatas e corte-os em rodelas. Lave o tomate e os pimentos e limpe-os de sementes. Corte o tomate e os pimentos em rodelas.",
            created_by=user,
            categories=[portuguesa.uid, chinesa.uid],
        )
        Recipe.objects.create(
            name="Pizza com peras e gorgonzola",
            description="Prepare esta pizza em 15 minutos. Tenha pronta a base de massa fina grelhe as peras, adicione o queijo gorgonzola e a rúcula. Fácil e deliciosa.",
            ingredients="1 base de pizza fina 330 g peras 2 c. de sopa azeite 150 g queijo gorgonzola 70 g rúculaqb pimenta-preta",
            preparation="1. Lave cuidadosamente as sardinhas em água fria corrente e certifique-se de que elimina todas as escamas. Enxugue-as em papel de cozinha, tempere-as com uma colher de chá de sal e reserve.  2. Descasque as cebolas, o alho e as batatas e corte-os em rodelas. Lave o tomate e os pimentos e limpe-os de sementes. Corte o tomate e os pimentos em rodelas.",
            created_by=user,
        )
        Recipe.objects.create(
            name="pica-pau à portuguesa",
            description="A receita de pica-pau tem origem na charneca do ribatejo, consiste em carne salteada temperada com ingredientes como o alho, o louro e vinho branco.",
            ingredients="400 g carne de vitela aos cubos 1 c. de chá sal qb pimenta 3 dentes alho 2 c. de sopa pimento vermelho em cubos 2 c. de sopa pimento verde em cubos",
            preparation="1 Tempere a carne com sal, pimenta e um dente de alho picado 2. Em seguida aqueça uma frigideira antiaderente e salteie os pimentos durante 2 minutos até ficarem dourados. Retire e reserve.",
            created_by=user,
        )
