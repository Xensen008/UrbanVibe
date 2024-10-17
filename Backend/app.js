import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
import mongoose from 'mongoose';
import UserRoute from './Routes/User.route.js';
import ProductRoute from './Routes/Product.route.js';
import nodemailer from 'nodemailer';

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

// Email route
app.post('/api/send-email', async (req, res) => {
  const { firstName, lastName, email, subject, message } = req.body;

  // Create a transporter using SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_APP_PASSWORD
    }
  });

  // Email content
  let mailOptions = {
    from: `"UrbanVibe Contact Form" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: `New Contact Form Submission: ${subject}`,
    text: `
      You've received a new message from the UrbanVibe contact form:

      Name: ${firstName} ${lastName}
      Email: ${email}
      Subject: ${subject}

      Message:
      ${message}

      To reply, simply respond to this email or send a new email to ${email}.
    `,
    replyTo: email
  };

  try {
    // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Error sending email' });
  }
});

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
