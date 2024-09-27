const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple login route
app.post('/api/v1/login', (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);  
  if (!username || !password) {
    return res.status(400).json({ message: "Username and password are required without this u cant proceed"});
  }

  if (username === 'admin' && password === 'admin') {
    res.status(200).json({ message: "Login successful" });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`http://localhost:${port}`);
});
