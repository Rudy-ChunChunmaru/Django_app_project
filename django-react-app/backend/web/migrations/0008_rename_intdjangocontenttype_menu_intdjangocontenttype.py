# Generated by Django 5.0.7 on 2024-08-22 07:01

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0007_rename_intgroup_id_group_web_menu_permission_intgroup_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='menu',
            old_name='intdjangoContentType',
            new_name='intDjangoContentType',
        ),
    ]
