# Generated by Django 2.2.17 on 2020-12-03 21:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0018_auto_20201203_1713'),
    ]

    operations = [
        migrations.AlterField(
            model_name='message',
            name='send_time',
            field=models.DateTimeField(auto_now=True),
        ),
    ]
