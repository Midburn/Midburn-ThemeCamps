# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0004_camp_users'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camp',
            name='is_published',
            field=models.BooleanField(default=False),
        ),
    ]
