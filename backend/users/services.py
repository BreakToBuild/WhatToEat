from backend.users.models import User


def create_user(email: str, first_name: str, last_name: str, password: str) -> User:
    return User.objects.create_user(
        email=email, first_name=first_name, last_name=last_name, password=password
    )
