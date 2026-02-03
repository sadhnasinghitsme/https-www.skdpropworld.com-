const express = require("express");
const router = express.Router();
const YouTubeVideo = require("../models/YouTubeVideo");

// Get all videos
router.get("/", async (req, res) => {
  try {
    const videos = await YouTubeVideo.find().sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ 
      message: "Server error while fetching videos",
      error: error.message
    });
  }
});

// Add new video
router.post("/", async (req, res) => {
  try {
    const { title, url, description, thumbnail } = req.body;
    
    if (!title || !url) {
      return res.status(400).json({ 
        message: "Title and URL are required" 
      });
    }

    const newVideo = new YouTubeVideo({
      title,
      url,
      description,
      thumbnail
    });

    const savedVideo = await newVideo.save();
    res.status(201).json(savedVideo);
  } catch (error) {
    console.error('Error adding video:', error);
    res.status(500).json({ 
      message: "Server error while adding video",
      error: error.message
    });
  }
});

// Delete video
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedVideo = await YouTubeVideo.findByIdAndDelete(id);
    
    if (!deletedVideo) {
      return res.status(404).json({ 
        message: "Video not found" 
      });
    }

    res.json({ 
      message: "Video deleted successfully",
      deletedVideo 
    });
  } catch (error) {
    console.error('Error deleting video:', error);
    res.status(500).json({ 
      message: "Server error while deleting video",
      error: error.message
    });
  }
});

module.exports = router;