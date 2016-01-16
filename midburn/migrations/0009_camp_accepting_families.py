# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0008_auto_20160116_1113'),
    ]

    operations = [
        migrations.AddField(
            model_name='camp',
            name='accepting_families',
            field=models.BooleanField(default=True),
        ),
    ]
