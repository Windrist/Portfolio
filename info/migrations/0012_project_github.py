# Generated by Django 2.2.16 on 2020-10-08 14:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0011_information_cv'),
    ]

    operations = [
        migrations.AddField(
            model_name='project',
            name='github',
            field=models.URLField(default=''),
            preserve_default=False,
        ),
    ]
