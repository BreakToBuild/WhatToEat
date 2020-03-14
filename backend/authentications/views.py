from django.shortcuts import render

from allauth.account.views import (
    LoginView as AllAuthLoginView,
    SignupView as AllAuthSignUpView,
)


class LoginView(AllAuthLoginView):
    def post(self, request, *args, **kwargs):
        __import__("sys").breakpointhook()


class SignUpView(AllAuthSignUpView):
    pass
    # def post(self, request, *args, **kwargs):
    #     __import__("sys").breakpointhook()
