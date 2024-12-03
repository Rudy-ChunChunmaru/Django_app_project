from django.urls import path
from .views.common import auth
from .views.setting import user

urlpatterns = [
    # auth
    path("auth/",auth.AuthUserLogin.as_view(), name="web_auth"),
    # user {page,rage,filter}
    path("user/",user.UserView.as_view(), name="user"),
    path("user/<str:username>/",user.UserDetailView.as_view(), name="user_detail"),
    path("user/<str:username>/cp",user.UserChangePasswordView.as_view(), name="user_change_password"),
    # user {page,rage,filter}
]