# UrbanVibe  
**Elevate Your Street Game**

## Overview  
UrbanVibe is a scalable, full-stack e-commerce practice project built to explore modern web technologies and enhance development skills. It’s designed for future expansion, featuring a clean and minimal UI, while leveraging robust backend and frontend integration.

## Screenshots
![UrbanVibe Screenshot](./src/assets/urban%20ss.jpg)


## Tech Stack  
- **Backend**: Node.js, Express, MongoDB  
- **Frontend**: React, Redux, Vite  
- **UI**: MUI, Styled Components, Framer Motion  

## Key Features  
- **Authentication**: JWT-based secure login with bcrypt password hashing.  
- **State Management**: Redux + Redux-Persist for seamless state handling.  
- **Scalability**: Backend structured for easy expansion with MongoDB and Express.  
- **Smooth Animations**: Implemented with Framer Motion for sleek transitions.

Here’s a more polished and structured `README.md` for your **UrbanVibe** project:


## Technologies Used

### Backend:
- **Node.js**: JavaScript runtime
- **Express**: Web framework for building APIs
- **MongoDB**: NoSQL database for storing data

### Frontend:
- **React**: Frontend library for building user interfaces
- **Redux**: State management
- **Vite**: Next-generation front-end tooling for faster builds

### Styling & UI:
- **MUI (Material UI)**: Modern, responsive UI components
- **Styled Components** & **Emotion**: For custom component styling
- **Framer Motion**: For adding smooth animations

---

## Project Structure

The project is divided into two main parts:
1. **Frontend**: The React-based UI, incorporating Redux for state management and styled using Material UI and Styled Components.
2. **Backend**: The Express server, which handles API routes, authentication (using JWT), and connects to MongoDB for persistent data storage.

---

## Setup Instructions

### Prerequisites

- **Node.js** (v14 or higher)
- **npm** or **yarn** (for managing dependencies)

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd Backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongo_db_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

---

## Scripts

### Backend

- `start`: Runs the Express server

### Frontend

- `dev`: Starts the Vite development server
---


## Dependencies

### Backend

- `bcrypt`: Password hashing
- `cors`: Cross-Origin Resource Sharing middleware
- `dotenv`: Environment variable management
- `express`: Backend framework
- `jsonwebtoken`: For generating and verifying JWTs
- `mongoose`: MongoDB object modeling
- `nodemailer`: Email sending service for notifications

### Frontend

- `@emotion/react` & `@emotion/styled`: For custom component styling
- `@mui/material`, `@mui/icons-material`, `@mui/lab`: UI components from Material UI
- `@reduxjs/toolkit`: State management with Redux
- `axios`: For making HTTP requests
- `framer-motion`: For animations
- `react`, `react-dom`: React library and DOM bindings
- `react-icons`: Icon library for React
- `react-redux`: React bindings for Redux
- `react-router-dom`: For client-side routing
- `redux-persist`: For persisting Redux state
- `styled-components`: For styling components

---

## Future Improvements

- **UI Design**: The design is currently basic, and I'd like to improve it further with more advanced design principles.
- **Testing**: Integration and unit tests will be added to improve reliability.
- **Features Expansion**: Future versions could include user profiles, product reviews, and order management.

---

## Contributing

Contributions are welcome! If you'd like to contribute, please fork the repository and submit a pull request.

---

## License

This project is licensed under the ISC License.
