from django.contrib import admin
from django.urls import path, include, re_path
from . import views
from django.views.generic import TemplateView
import os

from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from .views import RoomViewSet, GuestViewSet, GhostViewSet, assign_room_api, GuestListView, UnregisteredGuestListView

router = DefaultRouter()
router.register(r'rooms', RoomViewSet)
router.register(r'guests', GuestViewSet)
router.register(r'ghosts', GhostViewSet)

BASE_DIR = settings.BASE_DIR

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('', TemplateView.as_view(template_name='index.html')),
    # endpoints for guests
    path('api/guests/', GuestListView.as_view(), name='guest-list'),
    path('api/unregistered-guests/', UnregisteredGuestListView.as_view(), name='unregistered-guest-list'),
    # assign registered guest to room
    path('api/assign-guest-to-room/', views.assign_room_api, name='assign_guest_to_room'),
    path('accounts/', include('django.contrib.auth.urls')),
    path('api/login/', views.LoginAPI.as_view(), name='login_api'),
    path('api/get-csrf-token/', views.get_csrf_token, name='get_csrf_token'),
    path('api/csrf/', views.get_csrf_token, name='csrf_token'),
    # Catch-all route for React frontend
    re_path(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(BASE_DIR, 'client/dist/assets'))

urlpatterns += static(settings.STATIC_URL, document_root=os.path.join(settings.BASE_DIR, 'client/dist/assets'))

