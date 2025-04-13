# Generated by Django 5.2 on 2025-04-13 00:15

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Ghost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('ghost_type', models.CharField(max_length=50)),
                ('check_in_time', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Guest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=100)),
                ('stay_duration', models.IntegerField()),
                ('preferences', models.TextField(blank=True)),
                ('registered', models.BooleanField(default=False)),
                ('check_in_time', models.DateTimeField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Room',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('room_number', models.IntegerField(unique=True)),
                ('tile_position', models.JSONField()),
                ('value', models.IntegerField()),
                ('ghost', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='room_ghost', to='main_app.ghost')),
                ('guest', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='room_guest', to='main_app.guest')),
            ],
        ),
        migrations.AddField(
            model_name='guest',
            name='assigned',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned_guests', to='main_app.room'),
        ),
        migrations.AddField(
            model_name='ghost',
            name='assigned',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='assigned_ghosts', to='main_app.room'),
        ),
    ]
