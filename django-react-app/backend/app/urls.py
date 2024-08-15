from django.urls import path
from . import views

urlpatterns = [
    # auth
    path("auth/",views.AuthUser.as_view(), name="user_auth"),
    # user
    path("user/",views.ListCreateUserView.as_view(), name="user_RegisterList"),
    path("user/<int:id>/",views.GetUserView.as_view(), name="user_Get"),
]