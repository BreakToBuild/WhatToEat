from django.urls import include, path, re_path

urlpatterns = [
    path("api/", include("backend.core.urls", namespace="core")),
    path("api/", include("backend.authentication.urls", namespace="authentication")),
]
