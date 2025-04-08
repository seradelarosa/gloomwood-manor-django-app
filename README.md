# Gloomwood Manor
## With Django, Python, React & Vite

# Technologies
- Django
- Python
- React
- Vite
- Figma
- React 
- Phaser.js 

# TODO: Serializers

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

# APIs
GET /api/requests/ – unregistered guests
POST /api/guests/ – register a new guest
PUT /api/guests/{id}/assign/ – assign to a room
GET /api/guests/ – all registered guests
GET /api/ghosts/ – current ghost assignments
GET /api/rooms/ – room states (guest/ghost info)
GET /api/profit/ – current hotel profit
