

from urllib import request
from rest_framework import generics
from .models import AttendanceLog,Letter
from .serializers import AttendanceLogSerializer,LetterSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import get_list_or_404, get_object_or_404
# For creating a log (clock in)
class AttendanceLogCreateAPIView(generics.CreateAPIView):
    queryset = AttendanceLog.objects.all()
    serializer_class = AttendanceLogSerializer

# For updating a log (clock out) by providing an ID
class AttendanceLogUpdateAPIView(generics.UpdateAPIView):
    queryset = AttendanceLog.objects.all()
    serializer_class = AttendanceLogSerializer

# For listing logs (with filtering by purpose if needed)
class AttendanceLogListAPIView(generics.ListAPIView):
    queryset = AttendanceLog.objects.all()
    serializer_class = AttendanceLogSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        purpose = self.request.query_params.get('purpose')
        if purpose:
            queryset = queryset.filter(purpose=purpose)
        return queryset
    

class LetterListCreateView(APIView):

#  POST
 def post(self, request):
  serializer = LetterSerializer(data=request.data)
  if serializer.is_valid():
   serializer.save()
   return Response(serializer.data, status=status.HTTP_201_CREATED)

 def get(self, request):
    list_of_letter = Letter.objects.all()
    print(list_of_letter)

    serialized_letters = LetterSerializer(list_of_letter, many=True)  # Serialize the queryset
    print(serialized_letters)
    
    return Response(status=status.HTTP_200_OK, data=serialized_letters.data)
 

#  return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LetterDetailView(APIView):
    
    # PUT: Update a specific letter by ID
    def put(self, request, pk):
        letter = get_object_or_404(Letter, pk=pk)
        serializer = LetterSerializer(letter, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
             return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE: Remove a specific letter by ID
    def delete(self, request, pk):
        letter = get_object_or_404(Letter, pk=pk)
        letter.delete()
        return Response({"message": "Letter deleted successfully"}, status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def attendance_log(request):
    attend = AttendanceLog.objects.all()
    print (attend)
    serialaized_attendance =AttendanceLogSerializer(attend, many=True)
    print (serialaized_attendance)

    return Response(status=status.HTTP_200_OK, data=serialaized_attendance.data)

@api_view(['POST'])
def create_attendance(request):
  serializer = AttendanceLogSerializer(data=request.data)
  if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
  else:
   return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT'])
def edit_attendance(request,pk):
 put_attendance = get_object_or_404(AttendanceLog, pk=pk)  
 put_attendance = AttendanceLogSerializer(data= request.data)
 if put_attendance.is_valid():
    put_attendance.save()
    return Response (put_attendance.data, status=status.HTTP_201_CREATED) 
 else:
     return Response(put_attendance.data, status=status.HTTP_400_BAD_REQUEST)
    
@api_view (['DELETE'])
def delete_attendance(request,pk):
 remove_attendance = get_object_or_404(AttendanceLog, pk=pk)  
 remove_attendance.delete()
 return Response({'message':'Attendance  record deleted successfully'} , status=status.HTTP_204_NO_CONTENT)

class AttendanceLogViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceLogSerializer

    def get_queryset(self):
        return AttendanceLog.objects.all()

    def perform_create(self, serializer):
        serializer.save(id=self.request.id)

class LetterViewSet(viewsets.ModelViewSet):
    serializer_class = LetterSerializer

    def get_queryset(self):
        return Letter.objects.all()

    def perform_create(self, serializer):
        serializer.save(id=self.request.id)     
