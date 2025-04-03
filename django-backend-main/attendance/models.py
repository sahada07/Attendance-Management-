from django.db import models

class AttendanceLog(models.Model):
    PURPOSE_CHOICES = [
        ('lectures', 'Lectures'),
        ('work', 'Work'),
        ('interning', 'Interning'),
        ('service', 'Service'),
        ('other', 'Other'),
    ]
    
    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    purpose = models.CharField(max_length=220, choices=PURPOSE_CHOICES)
    phone_number = models.CharField(max_length=220)
    clock_in = models.DateTimeField(auto_now_add=True)
    clock_out = models.DateTimeField(null=True, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.full_name} ({self.purpose})"

class Letter(models.Model):
    sender_name=models.CharField(max_length=225)
    purpose_choices =[
        ('Proposal/Offer Letters','Proposal/Offer Letters'),
        ('Complaint and Response Letters','Complaint and Response Letters'),
        ('Order Letters','Order Letters'),
        ('Confirmation Letters','Confirmation Letters'),
        ('Invitation Letters','Invitation Letters'),
    ('Memos Letters','Memos Letters'),
    ('Recommendation Letters','Recommendation Letters'),
  ]
    purpose = models.CharField(max_length=225, choices=purpose_choices)
    def __str__(self):
        return f" ({self.purpose})"
    
    