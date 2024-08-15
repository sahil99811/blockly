Here's a sample `README.md` file that explains how the application works:

```markdown
Real-Time Vehicle Tracking Application

This project is a React-based web application that allows users to view their current location, search for a destination, and track a vehicle's movement in real-time on a map. The app leverages the Leaflet library for map rendering and the browser's Geolocation API to track the current position.

Features

- Current Location Tracking: The application uses the `navigator.geolocation` API to track the user's current location and update it in real-time.
- Destination Search: Users can search for a destination using the search bar. The app fetches suggestions from the OpenStreetMap Nominatim API.
-Route Display:** Once a destination is selected, the app displays the route from the current location to the destination on the map.
-Real-Time Vehicle Movement: The vehicle icon on the map updates its position and heading based on the user's current location and movement.

 Components

1. `useCurrentLocation`

A custom React hook that tracks the user's current location and heading.

- State:
  - `currentLoc`: Array of latitude and longitude representing the current location.
  - `heading`: The direction the device is facing.

- Effect:
  - The hook uses `navigator.geolocation.watchPosition` to continuously update the user's location and heading.

 2. `Icon`

A utility function that generates a Leaflet icon based on the provided heading and icon type (e.g., location, destination, car).

-Parameters:
  - `heading`: The direction to rotate the icon.
  - `iconType`: Determines which icon to display (location, destination, or car).

3. `LocationSearch`

A component that provides a search bar for users to enter a destination. It fetches suggestions from the OpenStreetMap Nominatim API and displays them.

- State:
  - `query`: The user's input in the search bar.
  - `suggestions`: An array of location suggestions fetched from the API.

- Props:
  - `onSelect(lat, lon)`: A function called when a suggestion is selected, passing the latitude and longitude of the selected location.

4. `MapView`

A component that renders the map, displays the current location, and shows the route to the selected destination.

- Props:
  - `currentLoc`: The current location of the user.
  - `destination`: The selected destination.
  - `heading`: The direction the vehicle icon should face.

5. `RoutingControl`

A component that handles routing between the current location and the destination using Leaflet Routing Machine.

- Props:
  - `start`: The starting point of the route (current location).
  - `destination`: The endpoint of the route.

6. `HomePage`

The main page of the application that combines all components to provide the user interface.

- State:
  - `destination`: The selected destination.
  
- Functions:
  - `handleDestinationSelect(lat, lon)`: Updates the `destination` state when a user selects a location from the search results.

Getting Started

Prerequisites

- Node.js: Ensure you have Node.js installed on your machine.

 Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/sahil99811/blockly.git
   ```

2. Navigate to the project directory:

   ```bash
   cd vehicle-tracking-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

Running the Application

1. Start the development server:

   ```bash
   npm start
   ```

2. Open your browser:Navigate to `http://localhost:3000` to view the application.

How It Works

1. Track Current Location: The app automatically detects and displays your current location on the map using the Geolocation API.
2. Search for a Destination: Use the search bar at the top to find a destination. Select a suggestion from the dropdown list.
3. Display Route: Once a destination is selected, the map will show the route from your current location to the destination, along with a moving vehicle icon representing your current location and direction.

Technologies Used

- React.js: For building the user interface.
- Leaflet: For map rendering and routing.
- Nominatim API: For searching and retrieving location data.

Notes

- The application uses `navigator.geolocation` which requires the user to grant location access. Ensure your browser permissions are set accordingly.
- The app assumes high-accuracy mode for geolocation, which may consume more battery on mobile devices.



This `README.md` file provides an overview of how the application works, describes the components, and guides users on how to set up and run the project.