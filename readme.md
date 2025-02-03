# Task 24 - React Native Recipe App

## Overview
This React Native Recipe App is built to interact with a Recipe API that handles CRUD (Create, Read, Update, Delete) operations. The app allows users to view a list of recipes, create new recipes, edit existing ones, and delete them from the system. The app fetches data from a backend server and manages the CRUD operations through API endpoints.

---

## Objective

The goal of this task is to implement an app that integrates with an external Recipe API to perform CRUD operations. This task will familiarize you with how to handle API interactions in React Native applications. The app should allow users to manage a list of recipes with basic functionality, and it should handle errors gracefully.

---

## Features

- **CRUD Operations**: 
  - **Create**: Add new recipes to the system.
  - **Read**: Fetch and display recipes from the API.
  - **Update**: Edit existing recipes with the option to update details.
  - **Delete**: Remove recipes from the list.

- **User Interface**:
  - Displays a list of recipes with details like title, category, ingredients, and instructions.
  - Forms for creating and updating recipes.
  - Error handling and notifications for failed operations.

- **Backend**: 
  - Uses a custom-built Recipe API hosted on a server.
  - CRUD operations are performed through the API, which communicates with a MongoDB database.
  
- **Authentication**: 
  - The app communicates with a backend API that does not require user authentication for CRUD operations.

- **Error Handling**:
  - Displays appropriate error messages in case of issues with fetching, adding, updating, or deleting recipes.

---

## Technical Details

### Frontend (React Native)

- **Main Screens**:
  - **Home Screen**: Displays a list of all recipes, along with options to delete or edit each recipe.
  - **Form Screen**: Allows users to create or edit a recipe. When editing, the current recipe data is pre-filled in the form.

- **Components**:
  - **CustomButton**: A reusable button component for various actions (e.g., Create, Edit).
  - **FlatList**: Displays the list of recipes with details.
  - **TouchableOpacity**: Used for buttons like 'Add Recipe' and 'Delete Recipe'.

- **State Management**:
  - **useState**: To manage local states like `recipes`, `loading`, and `error`.
  - **useEffect**: Used to fetch recipes when the component mounts.
  - **useFocusEffect**: Ensures the recipe list is updated when navigating back to the Home screen.

### Backend (Node.js / Express.js API)

The backend of the app is based on a custom-built Recipe API hosted on a server (e.g., Render). This API interacts with a MongoDB database to store and manage recipe data.

- **API Endpoints**:
  - **GET /recipes**: Fetch all recipes.
  - **POST /recipes**: Add a new recipe.
  - **PUT /recipes/{id}**: Update an existing recipe by its ID.
  - **DELETE /recipes/{id}**: Delete a recipe by its ID.

- **Authentication**:
  - The API does not require authentication for the operations in this task.

### Data Handling

The app retrieves data from the Recipe API using the `fetch` method. CRUD operations are performed by sending HTTP requests (GET, POST, PUT, DELETE) to the backend API.

- **GET**: Fetches the list of all recipes from the backend and updates the app state.
- **POST**: Sends the new recipe data to the backend to create a new recipe.
- **PUT**: Sends the updated recipe data to the backend to modify an existing recipe.
- **DELETE**: Sends a request to the backend to delete a recipe from the database.

---

## Setup Instructions

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/MabohlaleNkuna/react-native-recipe-app/tree/dev

**Start the server**
npx expo start

## url to download android apk:




