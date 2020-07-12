from django.urls import path

from backend.core import views

app_name = "core"

urlpatterns = [
    path("recepi", view=views.RecepiView.as_view(), name="recepi"),
    path(
        "recepi/<int:id>", view=views.RecepiDetailView.as_view(), name="recepi-detail"
    ),
    path(
        "recepi/<int:id>/follow",
        view=views.RecepiFollowView.as_view(),
        name="recepi-follow",
    ),
    path(
        "recepi/<int:id>/unfollow",
        view=views.RecepiUnfollowView.as_view(),
        name="recepi-unfollow",
    ),
    path(
        "recepi-categories",
        view=views.CategoryRecepiView.as_view(),
        name="recepi-categories",
    ),
]
