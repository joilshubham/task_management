# Generated by Django 3.1.2 on 2021-04-18 04:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0002_timeentry_user'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeentry',
            name='task_end',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
