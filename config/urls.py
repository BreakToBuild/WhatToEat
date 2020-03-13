from django.urls import include, path, re_path

urlpatterns = [
    # path("", include("promptly.core.urls", namespace="core")),
    path("", include("allauth.urls")),
]
