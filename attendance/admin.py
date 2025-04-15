from django.contrib import admin
from .models import AttendanceLog, Letter,Parcel
from rest_framework import serializers


admin.site.register(AttendanceLog)
admin.site.register(Letter)
admin.site.register(Parcel)

# Register your models here.

