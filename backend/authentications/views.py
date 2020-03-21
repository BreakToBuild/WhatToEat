from django.contrib.auth import authenticate, login, logout

from backend.api import APIView, AuthenticationView
from backend.users import services as user_services
from rest_framework import status
from rest_framework.response import Response

from .serializers import LoginSerializer, SignUpSerializer


class LoginView(AuthenticationView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = authenticate(
            request,
            username=serializer.validated_data["email"],
            password=serializer.validated_data["password"],
        )
        if user is None:
            return Response(status=status.HTTP_401_UNAUTHORIZED)

        login(request, user)
        return Response(status.HTTP_200_OK)


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


class LogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class CheckAuthView(APIView):
    def get(self, request):
        return Response(
            {"message": f"Hello dear bastard {request.user}"},
            status=status.HTTP_201_CREATED,
        )
