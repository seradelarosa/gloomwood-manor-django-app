# Gloomwood Manor
## With Django, Python, React & Vite

# Technologies
- Django
- Python
- React
- Vite
- Figma
- Phaser.js 

 
# Setup
COMPLETE Serializers
COMPLETE Add API ViewSets
COMPLETE Wire up the urls
COMPLETE pip install djangorestframework
COMPLETE Make migrations
COMPLETE Test full CRUD capability
---------------------
COMPLETE Backend is set up with models
COMPLETE Their RESTful API endpoints are live


# Custom API logic
COMPLETE Assign guests to rooms
COMPLETE Pre-populate database with unregistered guest information (requests)
COMPLETE Add function to register a guest
COMPLETE Make check: Guests must be registered as a guest before they can be assigned to a room
COMPLETE Ghost randomization
COMPLETE Create logic to randomly assign ghosts to rooms on a timer

## APIs
GET /api/requests/ – unregistered guests
POST /api/guests/ – register a new guest
PUT /api/guests/{id}/assign/ – assign to a room
GET /api/guests/ – all registered guests
GET /api/ghosts/ – current ghost assignments
GET /api/rooms/ – room states (guest/ghost info)
GET /api/profit/ – current hotel profit


---------------------
# Integrate with React Frontend
COMPLETE Use Phase.js for rendering the hotel floor plan
- Make API calls to Django backend to create, update or fetch room/guest/ghost data
- Make forms for guest registration and room assignment
- Make buttons for "Accept Request" and "Assign to Room", etc.
- Phaser map tiles update in real time


---------------------
# Timers and Automation
Guest timer:
- use background task system?
Ghost randomizer:
- Ghosts randomly shuffle between rooms every X minutes
- Automated background process that periodically updates ghost positions












---------------------
# User Experience
Visual updates
- Reflect room changes dynamically
- Profit calculation










---------------------------------------------------------------------------------------------------

# TODO: implement ghost randomization logic
Celery? Django-Q?
Run a task every X seconds
Reassign each ghost to a random room
Update the assigned field in the Ghost model
Update room.ghost relationships accordingly..

# TODO: Track hotel profits
Create hotel model with total_profit
When a guest is assigned to a room, transfer that room's value to the hotel profit
hotel.total_profit += room.value
hotel.save()

# Tile System
Use Phaser for rendering the hotel layout

# React Components
RequestList: fetches and displays unregistered guests
GuestList: Shows active guests and lets you assign them to rooms
GhostList: Shows current ghost positions/types
ProfitDisplay: a corner div showing current hotel profit
(use React context to track state?)

# Gameplay
Load hotel map (Phaser)
Display dropdown with requests, guests, and ghosts
Requests shows unregistered guests
Clicking create guest fills the form, and user confirms to register
guest moves to guests list
guest gets assigned to a room tile
timer starts for stay_duration (react hooks)
when timer ends, guest leaves and room empties
ghosts change rooms on a timer

