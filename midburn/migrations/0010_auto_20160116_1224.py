# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('midburn', '0009_camp_accepting_families'),
    ]

    operations = [
        migrations.AlterField(
            model_name='camp',
            name='camp_status',
            field=models.IntegerField(choices=[(0, 'Deleted'), (1, 'Accepting new members'), (2, 'Closed to new members'), (3, 'Camp will not come to Midburn 2016')], default=1),
        ),
    ]
