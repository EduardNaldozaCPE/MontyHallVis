# Generated by Django 4.1 on 2022-09-05 07:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('montyback', '0002_stats_mode'),
    ]

    operations = [
        migrations.RenameField(
            model_name='stats',
            old_name='count',
            new_name='icount',
        ),
    ]
