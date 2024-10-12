import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import mongoose from 'mongoose';
import UserRoute from './Routes/User.route.js';
import ProductRoute from './Routes/Product.route.js';

const dbUrl = process.env.DB_URL;
const port = process.env.PORT || 3000;


// Middleware
const app = express();
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ extended: true }));

//error handling middleware
app.use((err,req,res,next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong";
  return res.status(errorStatus).json({
    success: false, message: errorMessage
  });
});



app.get('/', (req, res) => {
  res.status(200).json({
    message: "Welcome to UrbanVibe API"
  });
});
app.use("/api/user", UserRoute);  
app.use("/api/product", ProductRoute);
//Connect to Database
const connectToDatabase = async () => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Connected to Database");
  } catch (error) { 
    console.error("Error connecting to Database:", error);
  }
};

// Start the server
const startServer = async () => {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

try {
  startServer();
} catch (error) {
  console.error('Failed to start the server:', error);
}
