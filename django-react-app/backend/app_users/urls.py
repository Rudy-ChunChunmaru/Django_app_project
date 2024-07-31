from django.urls import path
from . import views

urlpatterns = [
    path("",views.ListCreateUserView.as_view(), name="register_load"),
    path("<int:id>/",views.GetUserView.as_view(), name="user_detail"),
]