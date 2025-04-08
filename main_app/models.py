from django.db import models

#Django has a built in User

class Room(models.Model):
    room_number = models.IntegerField(unique=True)
    # separate x and y later
    tile_position = models.JSONField()
    # what the room costs in whole numbers 
    value = models.IntegerField()
    guest = models.ForeignKey('Guest', null=True, blank=True, on_delete=models.SET_NULL)
    ghost = models.ForeignKey('Ghost', null=True, blank=True, on_delete=models.SET_NULL)

class Guest(models.Model):
    full_name = models.CharField(max_length=100)
    # in minutes
    stay_duration = models.IntegerField()  
    preferences = models.TextField(blank=True)
    registered = models.BooleanField(default=False)
    assigned = models.ForeignKey(Room, null=True, blank=True, on_delete=models.SET_NULL)
    # useful for our timers later
    check_in_time = models.DateTimeField(null=True, blank=True)

class Ghost(models.Model):
    name = models.CharField(max_length=100)
    ghost_type = models.CharField(max_length=50)
    assigned = models.ForeignKey(Room, null=True, blank=True, on_delete=models.SET_NULL)
    # useful for our timers later
    check_in_time = models.DateTimeField(null=True, blank=True)


