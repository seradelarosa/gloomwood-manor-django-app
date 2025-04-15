# Gloomwood Manor 🕯️🏚️

**Gloomwood Manor** is a haunted hotel management game where players must juggle guests, ghosts, and eerie events in a spooky Victorian mansion. Manage rooms, appease spirits, and keep your guests alive (and mostly sane) in this darkly whimsical strategy experience.

![Gloomwood Manor Screenshot](https://i.imgur.com/kxFGWZr.png)

## 🔗 Links

- **GitHub Repository:** [seradelarosa/gloomwood-manor-django-app](https://github.com/seradelarosa/gloomwood-manor-django-app)
- **Deployed App:** https://gloomwood-manor-6a698e38105d.herokuapp.com


# Technologies
- Django
- Python
- React
- Vite
- Figma
- Phaser.js 
- PixSquare


# Technical Requirements

## MVP

| Requirement | Status |
|-------------|--------|
| Uses Django templates for rendering views | ✅ Complete |
| Uses PostgreSQL as the database | ✅ Complete |
| Implements Django’s session-based authentication | ✅ Complete |
| Authorization restricts guest users from modifying data | ✅ Complete |
| Has at least one data entity related to the User model | ✅ Complete |
| Full CRUD functionality implemented | ✅ Complete |
| App is deployed and publicly accessible | ✅ Complete |


## Code Convention

| Requirement | Status |
|-------------|--------|
| Files are organized using best practices from lectures | ✅ Complete |
| Code uses naming conventions (e.g. plural for lists) | ✅ Complete |
| No dead code, print/debug statements, or comments | ✅ Complete |
| App runs without errors in terminal and browser | ✅ Complete |
| Proper indentation and formatting throughout | ✅ Complete |


## 🎨 UI / UX

| Requirement | Status |
|-------------|--------|
| Visual theme with consistent color palette and layout | ✅ Complete |
| Easy navigation via links (no manual URL typing) | ✅ Complete |
| Uses CSS Flexbox and/or Grid for layout | ✅ Complete |
| Color contrast meets WCAG 2.0 AA standards | ✅ Complete |
| Edit forms are pre-filled with item data | ✅ Complete |
| Only creators can see edit/delete options for their data | ✅ Complete |
| All images include descriptive `alt` text | ✅ Complete |
| No inaccessible text-over-image conflicts | ✅ Complete |
| All buttons are visually styled | ✅ Complete |


## 🔧 Git & GitHub

| Requirement | Status |
|-------------|--------|
| You are the only contributor shown on GitHub | ✅ Complete |
| Repo is appropriately named and public | ✅ Complete |
| Repo shows full commit history from project start | ✅ Complete |
| Commits are descriptive of work done | ✅ Complete |


## 📄 README (Max 2 Incomplete Allowed)

| Requirement | Status |
|-------------|--------|
| Screenshot or logo included | ✅ Complete |
| App name and description provided | ✅ Complete |
| Getting Started: Links to deployed app and planning | ✅ Complete |
| Attributions section included (if applicable) | ✅ Complete |
| Technologies used are listed | ✅ Complete |
| Next steps and stretch goals mentioned | ✅ Complete |


## Presentation

| Requirement | Status |
|-------------|--------|
| Presented project on scheduled presentation day | ✅ Complete |
| Project matches the approved proposal | ✅ Complete |



# 🛠️ The Development Process

## Setup

| Task | Status |
|------|--------|
| Serializers | ✅ Complete |
| Add API ViewSets | ✅ Complete |
| Wire up the URLs | ✅ Complete |
| `pip install djangorestframework` | ✅ Complete |
| Make migrations | ✅ Complete |
| Test full CRUD capability | ✅ Complete |
| Backend is set up with models | ✅ Complete |
| RESTful API endpoints are live | ✅ Complete |


## Create custom API logic

| Task | Status |
|------|--------|
| Assign guests to rooms | ✅ Complete |
| Pre-populate database with unregistered guest information (requests) | ✅ Complete |
| Add function to register a guest | ✅ Complete |
| Guests must be registered before being assigned a room | ✅ Complete |
| Ghost randomization | ✅ Complete |
| Randomly assign ghosts to rooms on a timer | ✅ Complete |
| Implement ghost randomization logic | ✅ Complete |
| Run a task every X seconds to reshuffle ghosts  | ✅ Complete |
| Update ghost assignments in database  | ✅ Complete |
| Track hotel profits with `hotel.total_profit`  

### API endpoints
* GET /api/requests/ # Unregistered guests
* POST /api/guests/ # Register a new guest
* PUT /api/guests/{id}/assign/ # Assign guest to a room
* GET /api/guests/ # All registered guests
* GET /api/ghosts/ # Current ghost assignments
* GET /api/rooms/ # Room states (guest/ghost info)


## Integrate with React Frontend

| Task | Status |
|------|--------|
| Use Phaser.js for rendering the hotel floor plan | ✅ Complete |
| Make API calls to Django backend for data operations | ✅ Complete |
| Create forms for guest registration and room assignment | ✅ Complete |
| Add buttons for "Accept Request", "Assign to Room", etc. | ✅ Complete |
| Render tile system using Phaser  | ✅ Complete |
| Create UI components to reflect gameplay states  | ✅ Complete |
| Pass room assignments to `HotelMap` component | ✅ Complete |
| Update tiles to show ghost symbols | ✅ Complete |
| Add ghost/guest images to tiles | ✅ Complete |

## React Components Overview

- **RequestList** – Fetch and display unregistered guests  
- **GuestList** – Show active guests and allow room assignment  
- **GhostList** – Show current ghost positions/types  
- **ProfitDisplay** – Show current hotel profit (use React context?)


## Timers and Automation

| Task | Status |
|------|--------|
| Guest timer using background task system | ✅ Complete|
| Ghosts shuffle between rooms every X minutes | ✅ Complete |
| Background task updates ghost positions periodically | ✅ Complete |

---

## 🎨 User Experience

| Task | Status |
|------|--------|
| Reflect room changes dynamically in UI | ✅ Complete |
| Show and update hotel profit | 🕒 To Do |


## 🔧 React Components Overview

- **RequestList** – Fetch and display unregistered guests  
- **GuestList** – Show active guests and allow room assignment  
- **GhostList** – Show current ghost positions/types  
- **ProfitDisplay** – Show current hotel profit (use React context?)

---

## 🎮 Gameplay Flow

1. Load hotel map using Phaser  
2. Display dropdown with requests, guests, and ghosts  
3. Accept a guest request  
4. Guest appears in the guest list  
5. Assign guest to a room  
6. Timer starts for their stay  
7. When timer ends, guest leaves, room is freed  
8. Ghosts automatically shuffle between rooms over time  
