# Generated by Django 2.2.16 on 2020-09-10 10:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='skill',
            name='image',
            field=models.FileField(upload_to='skill/'),
        ),
    ]
