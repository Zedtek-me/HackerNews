# Generated by Django 4.0.4 on 2022-05-13 15:22

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False, unique=True)),
                ('type', models.CharField(default='unknown type', max_length=100, verbose_name='news type')),
                ('text', models.TextField(max_length=30000000000000000000000000000000000000000000000000, verbose_name='comments on news')),
                ('title', models.CharField(blank=True, max_length=30000)),
                ('time', models.DateTimeField(auto_now_add=True)),
                ('by', models.CharField(max_length=200)),
                ('deleted', models.BooleanField(blank=True, default=False)),
                ('kids', django.contrib.postgres.fields.ArrayField(base_field=models.IntegerField(blank=True, null=True), blank=True, null=True, size=None)),
                ('parent', models.IntegerField(null=True)),
                ('dead', models.BooleanField(default=False)),
                ('score', models.IntegerField(null=True)),
                ('parts', models.IntegerField(null=True)),
                ('descendants', models.IntegerField(null=True)),
                ('url', models.TextField(blank=True, max_length=3000000000000000, null=True)),
            ],
        ),
    ]
