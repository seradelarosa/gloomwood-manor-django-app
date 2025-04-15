from django.shortcuts import render, get_object_or_404, redirect
from django.http import HttpResponse, JsonResponse
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view  # Add this back
from rest_framework import status
from django.contrib.auth import authenticate, login
from django.middleware.csrf import get_token
from .models import Room, Guest, Ghost
from .serializers import RoomSerializer, GuestSerializer, GhostSerializer
from django.contrib.auth.views import LoginView
from django.urls import reverse_lazy
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from django.middleware.csrf import get_token

def get_csrf_token(request):
    return JsonResponse({'csrfToken': get_token(request)})

@method_decorator(ensure_csrf_cookie, name='dispatch')
class LoginAPI(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        
        if not username or not password:
            return Response({
                'success': False,
                'error': 'Please provide both username and password'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request, user)
            return Response({
                'success': True,
                'user': {
                    'username': user.username,
                    'id': user.id,
                }
            })
        else:
            return Response({
                'success': False,
                'error': 'Invalid credentials'
            }, status=status.HTTP_401_UNAUTHORIZED)

# Define the home view function
# class Home(LoginView):
#     template_name = 'client/src/components/Login/Login.jsx'
#     success_url = reverse_lazy('guest-list') 

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GuestViewSet(viewsets.ModelViewSet):
    queryset = Guest.objects.all()
    serializer_class = GuestSerializer

class GhostViewSet(viewsets.ModelViewSet):
    queryset = Ghost.objects.all()
    serializer_class = GhostSerializer


# create an API view for registered guests
class GuestListView(APIView):
    def get(self, request):
        guests = Guest.objects.filter(registered=True)
        serializer = GuestSerializer(guests, many=True)
        return Response(serializer.data)

# create API view for unregistered guests (booking requests)
class UnregisteredGuestListView(APIView):
    def get(self, request):
        guests = Guest.objects.filter(registered=False)
        serializer = GuestSerializer(guests, many=True)
        return Response(serializer.data)

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
    