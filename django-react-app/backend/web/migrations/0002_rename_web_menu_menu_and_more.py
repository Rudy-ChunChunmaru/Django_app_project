# Generated by Django 5.0.7 on 2024-08-16 02:06

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.RenameModel(
            old_name='web_menu',
            new_name='menu',
        ),
        migrations.RenameModel(
            old_name='auth_user_web_menu_permission',
            new_name='user_web_menu_permission',
        ),
    ]