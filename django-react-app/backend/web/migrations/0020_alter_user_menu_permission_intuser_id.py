# Generated by Django 5.1.2 on 2024-10-25 08:09

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0019_alter_user_menu_permission_intmenu_id'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AlterField(
            model_name='user_menu_permission',
            name='intUser_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.RESTRICT, related_name='FK_user_user_menu_permission', to=settings.AUTH_USER_MODEL),
        ),
    ]
