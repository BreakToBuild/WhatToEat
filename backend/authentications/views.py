from django.contrib.auth.views import LoginView as DjangoLoginView

from backend.api import AuthenticationView
from backend.users import services as user_services
from rest_framework import status
from rest_framework.response import Response

from .serializers import SignUpSerializer


class LoginView(DjangoLoginView):
    pass


class SignUpView(AuthenticationView):
    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user_services.create_user(
            email=serializer.validated_data["email"],
            first_name=serializer.validated_data["first_name"],
            last_name=serializer.validated_data["last_name"],
            password=serializer.validated_data["password"],
        )
        return Response(status=status.HTTP_201_CREATED)
