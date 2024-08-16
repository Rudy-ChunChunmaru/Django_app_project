from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class web_menu(models.Model):
    intWebMenu_id = models.AutoField(primary_key=True)
    strWebMenu_name = models.CharField(max_length=50)
    strWebMenu_link = models.CharField(max_length=50)

class auth_user_web_menu_permission(models.Model):
    intAuthUserWebPermision_id = models.AutoField(primary_key=True)
    intWebMenu_id = models.ForeignKey(to=web_menu,on_delete=models.RESTRICT)
    intUser_id = models.ForeignKey(to=User,on_delete=models.RESTRICT)


