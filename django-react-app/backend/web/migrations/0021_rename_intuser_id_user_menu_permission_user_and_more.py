# Generated by Django 5.1.2 on 2024-10-25 08:16

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0020_alter_user_menu_permission_intuser_id'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='intUser_id',
            new_name='User',
        ),
        migrations.RenameField(
            model_name='user_menu_permission',
            old_name='intMenu_id',
            new_name='menu',
        ),
    ]
