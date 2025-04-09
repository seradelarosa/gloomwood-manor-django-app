from django.contrib import admin
from django.urls import path, include
from . import views

from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, GuestViewSet, GhostViewSet, assign_room_api, GuestListView, UnregisteredGuestListView

router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'guests', GuestViewSet)
router.register(r'ghosts', GhostViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('admin/', admin.site.urls),
    path('', views.home, name='home'),
    # endpoints for guests
    path('api/guests/', GuestListView.as_view(), name='guest-list'),
    path('api/unregistered-guests/', UnregisteredGuestListView.as_view(), name='unregistered-guest-list'),
    # assign registered guest to room
    path('api/assign-guest-to-room/', views.assign_room_api, name='assign_guest_to_room'),
]

