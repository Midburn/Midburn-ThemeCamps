# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='camp',
            name='moop_contact',
        ),
        migrations.RemoveField(
            model_name='camp',
            name='safety_contact',
        ),
        migrations.AlterField(
            model_name='camp',
            name='is_published',
            field=models.BooleanField(default=True),
        ),
    ]
