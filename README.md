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
COMPLETE Make API calls to Django backend to create, update or fetch room/guest/ghost data
COMPLETE Make forms for guest registration and room assignment
COMPLETE Make buttons for "Accept Request" and "Assign to Room", etc.

# Phaser 
Pass room assignments to the HotelMap component and update the tiles to show ghost symbols (Make images later)
Modify hotel map to accept room assignments as props

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

Technical requirements
MVP
✅ Any items marked incomplete in this section will require you to use your one redo to re-submit them. Your app must fulfill the below requirements.

The app utilizes Django templates for rendering templates to users.
PostgreSQL is used as the database management system.
The app uses Django’s built-in session-based authentication.
Authorization is implemented in the app. Guest users (those not signed in) should not be able to create, update, or delete data in the application or access functionality allowing those actions.
The app has at least one data entity in addition to the User model. At least one entity must have a relationship with the User model.
The app has full CRUD functionality.
The app is deployed online so that the rest of the world can use it.
Code convention
✅ More than two items marked incomplete in this section will require you to use your one redo to re-submit them. If two or fewer items are marked incomplete, the project is considered passing. Your app must fulfill the below requirements.

The files in the application are organized following the conventions demonstrated in lectures.
The code in the application adheres to coding conventions covered in lessons, like using plural names for lists.
The application does not contain dead code, commented-out sections, or prints.
The app runs without errors in both the terminal and the browser console.
The application is coded using proper indentation.
UI/UX
✅ More than two items marked incomplete in this section will require you to use your one redo to re-submit them. If two or fewer items are marked incomplete, the project is considered passing. Your app must fulfill the below requirements.

The app exhibits a visual theme, like a consistent color palette and cohesive layout across pages.
The app is easily navigable by a first-time user. For example, navigation should be done through links instead of having to type in a URL to navigate around the app.
The app utilizes CSS Flexbox and/or Grid for page layout design.
Colors used in the app have appropriate contrast that meet the WCAG 2.0 level AA standard.
When editing an item, the form is pre-filled with that item’s details.
Only the user who created a piece of data can see and interact with the UI for editing or deleting that data.
All images have alt text.
No text is placed on top of an image in a way that makes the text inaccessible.
All buttons are styled.
Git and GitHub
✅ Any items marked incomplete in this section will require you to use your one redo to re-submit them. Your interactions with Git and GitHub must fulfill the below requirements.

You are shown as the only contributor to the project on GitHub.
The GitHub repository used for the project must be named appropriately. For example, names like book-binder or wellness-tracker are appropriate, whereas ga-project or django-project are not. The repo must be publicly accessible. Be sure to create the repo on your personal GitHub account and ensure it is public.
Your repo should have commits that date back to the very beginning of the project. If you start over with a new repo, do not delete the old one.
Commit messages should be descriptive of the work done in that commit.
README requirements
✅ More than two items marked incomplete in this section will require you to use your one redo to re-submit them. If two or fewer items are marked incomplete, the project is considered passing. Your README must contain the items or sections below.

Screenshot/Logo: A screenshot of your app or a logo.
Your app’s name: Include a description of your app and its functionality. Background info about the app and why you built it is a nice touch.
Getting started: Include a link to your deployed app and a link to your planning materials.
Attributions: This section should include links to any external resources (such as libraries or assets) you used to develop your application that require attribution. You can exclude this section if it does not apply to your application.
Technologies used: List the principal technologies used by your application, for example: Python and any major frameworks or libraries.
Next steps: Planned future enhancements (stretch goals).
Presentation requirements
✅ Any items marked incomplete in this section will require you to use your one redo to re-submit them.

Present your project in front of the class on the scheduled presentation day.
The project you present is the project you were approved by your instructor to build.
Evaluation
Upon completion of your presentation, your instructional team will evaluate your project.

Your instructors will use the above guidelines to determine whether or not the project passes all of the minimum requirements.
If your instructors determine that the project does not meet the minimum requirements, you may be provided the opportunity to address the deficiencies identified and re-submit the project. However, be aware that there is only a single opportunity to re-submit a project during the course. Please reach out to your student success specialist if you have questions.
Immediately after your presentation, your instructors may provide you with feedback that will benefit your project and perhaps other student’s projects. The feedback given at this time is not formal feedback and does not indicate whether you passed or failed the project.
If there is a specific section of code that you would like an instructor to provide additional feedback on, please ask!
