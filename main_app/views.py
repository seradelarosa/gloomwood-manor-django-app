from django.shortcuts import render, get_object_or_404, redirect
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


# define unregistered guests (booking requests)
def unregistered_guests(request):
    guests = Guest.objects.filter(registered=False)
    return render(request, 'unregistered_guests.html', {'guests': guests})

# define registered guests
def guest_list(request):
    guests = Guest.objects.filter(registered=True)
    return render(request, 'guest_list.html', {'guests': guests})

# register guest    
def register_guest(request, guest_id):
    guest = get_object_or_404(Guest, id=guest_id)
    
    if not guest.registered:
        guest.registered = True
        guest.save()

    # redirect to the guest list view 
    return redirect('guest_list')  

# assign guest to room
@api_view(['POST'])
def assign_room_api(request):
    guest_id = request.data.get('guest_id')
    room_number = request.data.get('room_number')

    try:
        guest = Guest.objects.get(id=guest_id)
    except Guest.DoesNotExist:
        return Response({'error': 'Guest not found'}, status=status.HTTP_404_NOT_FOUND)

    if not guest.registered:
        return Response({'error': 'Guest must be registered before assignment'}, status=status.HTTP_400_BAD_REQUEST)

    try:
        room = Room.objects.get(room_number=room_number)
    except Room.DoesNotExist:
        return Response({'error': 'Room not found'}, status=status.HTTP_404_NOT_FOUND)

    if room.guest:
        return Response({'error': 'Room is already occupied'}, status=status.HTTP_400_BAD_REQUEST)

    # assign the guest and room
    guest.assigned = room
    guest.save()

    room.guest = guest
    room.save()

    return Response({'message': 'Guest assigned successfully'}, status=status.HTTP_200_OK)
    