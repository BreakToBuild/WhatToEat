from django.urls import path

from backend.core import views

app_name = "core"

urlpatterns = [
    path("recipe", view=views.RecipeView.as_view(), name="recipe"),
    path(
        "recipe/<int:recipe_id>",
        view=views.RecipeDetailView.as_view(),
        name="recipe-detail",
    ),
    path(
        "recipe/<int:recipe_id>/follow",
        view=views.RecipeFollowView.as_view(),
        name="recipe-follow",
    ),
    path(
        "recipe/<int:recipe_id>/unfollow",
        view=views.RecipeUnfollowView.as_view(),
        name="recipe-unfollow",
    ),
    path(
        "recipe-categories",
        view=views.CategoryRecipeView.as_view(),
        name="recipe-categories",
    ),
]
