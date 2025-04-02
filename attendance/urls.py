
from .models import AttendanceLog,Letter
from attendance import views
from django.urls import path, include
from rest_framework.routers import DefaultRouter


urlpatterns = [

    path('logs/', views.AttendanceLogCreateAPIView.as_view(), name='attendance-create'),
    path('logs/create/', views.AttendanceLogListAPIView.as_view(), name='attendance-list'),
    path('logs/<int:pk>/update/', views.AttendanceLogUpdateAPIView.as_view(), name='attendance-update'),
    path('letter/', views.LetterListCreateView.as_view(), name='letter_list_create' ),
    path('letter/<int:pk>/', views.LetterDetailView.as_view(),name='letter_detail'),
    path('attendance/',views.attendance_log,name='attendance'),
    path('create/',views.create_attendance,name='create'),
    path('edit/<int:pk>',views.edit_attendance,name='edit'),
    path('delete/<int:pk>',views.delete_attendance, name='delete'),
]
