from django.contrib import admin
from django.urls import path,include

from .views import getTokenMidtrans

urlpatterns = [
    path('midtrans/',getTokenMidtrans.as_view())
]
