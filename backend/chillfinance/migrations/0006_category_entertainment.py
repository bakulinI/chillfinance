# Generated by Django 5.1.2 on 2024-11-10 14:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('chillfinance', '0005_bank_alter_customuser_username_bankaccount_balance'),
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100, unique=True, verbose_name='Название категории')),
            ],
            options={
                'verbose_name': 'Категория',
                'verbose_name_plural': 'Категории',
            },
        ),
        migrations.CreateModel(
            name='Entertainment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150, verbose_name='Название развлечения')),
                ('description', models.TextField(blank=True, null=True, verbose_name='Описание')),
                ('categories', models.ManyToManyField(related_name='entertainments', to='chillfinance.category', verbose_name='Категории')),
            ],
            options={
                'verbose_name': 'Развлечение',
                'verbose_name_plural': 'Развлечения',
            },
        ),
    ]