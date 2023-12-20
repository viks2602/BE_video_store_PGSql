const express = require('express');
const router = express.Router();
const multer = require('multer');
const db = require('../db'); // Import your database connection

// Configure multer to store video uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Route for uploading a video
router.post('/upload', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded.' });
    }

    // Convert the video file buffer to base64
    const base64Data = req.file.buffer.toString('base64');
    console.log(req.file);
    // Store the base64 data in your PostgreSQL database
    await db.none('INSERT INTO videosdata (data) VALUES ($1)', [base64Data]);

    return res.status(201).json({ message: 'Video uploaded successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

// Route for retrieving a video by ID
router.get('/video/:videoId', async (req, res) => {
  try {
    const videoId = req.params.videoId;

    // Retrieve the base64 video data from the database
    const result = await db.oneOrNone('SELECT data FROM videosdata WHERE id = $1', [videoId]);

    if (!result) {
      return res.status(404).json({ message: 'Video not found' });
    }

    // Send the base64 video data to the client
    const base64Data = result.data;
    res.send(base64Data);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
