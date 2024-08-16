from django.urls import path
from .view import auth,user

urlpatterns = [
    # auth
    path("auth/",auth.AuthUserLogin.as_view(), name="user_auth"),
    # user
    path("user/",user.ListCreateUserView.as_view(), name="user_RegisterList"),
    path("user/<int:id>/",user.GetUserView.as_view(), name="user_Get"),
]