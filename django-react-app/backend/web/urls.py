from django.urls import path
from .views.common import auth
from .views.setting import user

urlpatterns = [
    # auth
    path("auth/",auth.AuthUserLogin.as_view(), name="web_auth"),
    # user {page,filter,sortby}
    path("user/",user.UserView.as_view(), name="user"),
    path("user/<str:username>/",user.UserView.as_view(), name="user"),
    # group {page,filter,sortby}
]