from django.urls import include, path, re_path

from backend.authentications import views

urlpatterns = [
    path("login", view=views.LoginView.as_view(), name="login"),
    path("signup", view=views.SignUpView.as_view(), name="signup"),
]
