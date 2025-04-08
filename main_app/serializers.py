from rest_framework import serializers
from .models import Room, Guest, Ghost

# gives full CRUD access via Django REST framework for all models
class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'

class GuestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Guest
        fields = '__all__'

class GhostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ghost
        fields = '__all__'
