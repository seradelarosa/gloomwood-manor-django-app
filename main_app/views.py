from django.shortcuts import render
# Import HttpResponse to send text-based responses
from django.http import HttpResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
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

@api_view(['POST'])
def assign_guest_to_room(request):
    try:
        guest_id = request.data.get('guest_id')
        room_number = request.data.get('room_number')

        # Debugging line
        print(f"Guest ID: {guest_id}, Room Number: {room_number}")


        # get the guest and room from the database
        guest = Guest.objects.get(id=guest_id)
        room = Room.objects.get(room_number=room_number)

        # check if room is already assigned
        if room.guest:
            return Response({'detail': 'Room is already occupied.'}, status=status.HTTP_400_BAD_REQUEST)

        # assign guest to the room and mark as registered
        guest.assigned = room
        guest.registered = True
        guest.save()

        # assign room to the guest (update the room model as well)
        room.guest = guest
        room.save()

        return Response({'detail': f'Guest {guest.full_name} assigned to room {room.room_number}.'}, status=status.HTTP_200_OK)

    except Guest.DoesNotExist:
        return Response({'detail': 'Guest not found.'}, status=status.HTTP_404_NOT_FOUND)
    except Room.DoesNotExist:
        return Response({'detail': 'Room not found.'}, status=status.HTTP_404_NOT_FOUND)