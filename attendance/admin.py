from django.contrib import admin
from .models import AttendanceLog, Letter
from rest_framework import serializers


admin.site.register(AttendanceLog)
admin.site.register(Letter)

# Register your models here.
