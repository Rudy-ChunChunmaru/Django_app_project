from django.urls import path
from web.views.common import auth

urlpatterns = [
    # auth
    path("auth/",auth.AuthUserLogin.as_view(), name="web_auth"),
]