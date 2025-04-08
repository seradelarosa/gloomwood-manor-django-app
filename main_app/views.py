from django.shortcuts import render
# Import HttpResponse to send text-based responses
from django.http import HttpResponse
from rest_framework import viewsets
from .models import Room, Guest, Ghost
from .serializers import RoomSerializer, GuestSerializer, GhostSerializer

# Define the home view function
def home(request):
    # Send a simple HTML response
    return HttpResponse('<h1>Hello</h1>')

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class GhostViewSet(viewsets.ModelViewSet):
    queryset = Ghost.objects.all()
    serializer_class = GhostSerializer

