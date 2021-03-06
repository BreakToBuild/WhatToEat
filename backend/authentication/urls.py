from django.urls import path

from backend.authentication import views

app_name = "authentication"

urlpatterns = [
    path("login", view=views.LoginView.as_view(), name="login"),
    path("signup", view=views.SignUpView.as_view(), name="signup"),
    path("logout", view=views.LogoutView.as_view(), name="logout"),
    path("checkauth", view=views.CheckAuthView.as_view(), name="checkauth"),
]
