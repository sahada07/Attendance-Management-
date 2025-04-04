# Generated by Django 5.1.7 on 2025-04-03 15:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='AttendanceLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('full_name', models.CharField(max_length=255)),
                ('email', models.EmailField(max_length=254)),
                ('purpose', models.CharField(choices=[('lectures', 'Lectures'), ('work', 'Work'), ('interning', 'Interning'), ('service', 'Service'), ('other', 'Other')], max_length=220)),
                ('phone_number', models.CharField(max_length=220)),
                ('clock_in', models.DateTimeField(auto_now_add=True)),
                ('clock_out', models.DateTimeField(blank=True, null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
        ),
        migrations.CreateModel(
            name='Letter',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('sender_name', models.CharField(max_length=225)),
                ('purpose', models.CharField(choices=[('Proposal/Offer Letters', 'Proposal/Offer Letters'), ('Complaint and Response Letters', 'Complaint and Response Letters'), ('Order Letters', 'Order Letters'), ('Confirmation Letters', 'Confirmation Letters'), ('Invitation Letters', 'Invitation Letters'), ('Memos Letters', 'Memos Letters'), ('Recommendation Letters', 'Recommendation Letters')], max_length=225)),
            ],
        ),
    ]
