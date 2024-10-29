from django.urls import path
from .view import auth,user

urlpatterns = [
    # auth
    path("auth/",auth.AuthUserLogin.as_view(), name="web_auth"),
    # user
    path("user/",user.UserView.as_view(), name="user"),
    path("user/<str:username>/",user.UserView.as_view(), name="user_username"),
]