from django.urls import include, path, re_path

urlpatterns = [
    # path("", include("promptly.core.urls", namespace="core")),
    path("api/", include("backend.authentications.urls")),
]
