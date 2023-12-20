const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const videoRoutes = require('./routes/VideoRoutes'); // Import your video routes
const db = require('./db'); // Import your database connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Serve static files (e.g., build files for the React front end)
app.use(express.static(path.join(__dirname, 'client/build')));

// API routes
app.use('/api/videos', videoRoutes); // Mount your video routes

// Database connection
db.connect()
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Catch-all route for handling client-side routing in a single-page app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
