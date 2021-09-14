# Generated by Django 2.2.16 on 2020-09-14 21:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('info', '0008_auto_20200914_1120'),
    ]

    operations = [
        migrations.CreateModel(
            name='Information',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name_complete', models.CharField(max_length=50)),
                ('about', models.TextField()),
                ('born_date', models.DateField()),
                ('address', models.CharField(max_length=100)),
                ('phone', models.CharField(max_length=20)),
                ('email', models.EmailField(max_length=255)),
                ('github', models.URLField()),
                ('linkedin', models.URLField()),
                ('facebook', models.URLField()),
                ('twitter', models.URLField()),
                ('instagram', models.URLField()),
            ],
        ),
    ]
