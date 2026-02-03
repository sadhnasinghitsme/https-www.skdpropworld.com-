import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Modal, Button, Form } from "react-bootstrap";
import "./YouTubeManager.css";
import { Helmet } from "react-helmet-async";

const YouTubeManager = () => {
  const [videos, setVideos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newVideo, setNewVideo] = useState({
    title: "",
    url: "",
    description: "",
    thumbnail: "",
  });

  const API = import.meta.env.VITE_API_BASE_URL || '';

  // Function to extract video ID from YouTube URL
  const getYoutubeId = (url) => {
    if (!url) return null;
    
    // Handle different YouTube URL formats
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^#&?]*)/,
      /youtube\.com\/v\/([^#&?]*)/,
      /youtube\.com\/user\/[^\/]*#[^\/]*\/[^\/]*\/[^\/]*\/([^#&?]*)/
    ];
    
    for (let pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1] && match[1].length === 11) {
        return match[1];
      }
    }
    
    return null;
  };

  // Function to get YouTube thumbnail URL
  const getYoutubeThumbnail = (url) => {
    const videoId = getYoutubeId(url);
    return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : '';
  };

  const fetchVideos = async () => {
    try {
      const res = await axios.get(API ? `${API}/api/admin/youtube` : '/api/admin/youtube');
      // Add thumbnail URL to each video
      const videosWithThumbnails = res.data.map(video => ({
        ...video,
        thumbnail: video.thumbnail || getYoutubeThumbnail(video.url)
      }));
      setVideos(videosWithThumbnails);
    } catch (error) {
      console.error('Error fetching videos:', error);
      toast.error('Failed to load videos');
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  const handleAddVideo = async () => {
    try {
      const { title, url, description } = newVideo;
      console.log('🔍 Adding video:', { title, url, description });
      
      // Validate required fields
      if (!title || !title.trim()) {
        console.error('❌ Missing title');
        return toast.error("Title is required");
      }
      
      if (!url || !url.trim()) {
        console.error('❌ Missing URL');
        return toast.error("YouTube URL is required");
      }

      // Extract video ID and create proper embed URL
      let videoId = getYoutubeId(url);
      if (!videoId) {
        console.error('❌ Invalid YouTube URL');
        return toast.error("Please enter a valid YouTube URL");
      }

      // Create video data object
      const videoData = {
        title: title.trim(),
        url: `https://www.youtube.com/embed/${videoId}`,
        description: description?.trim() || '',
        thumbnail: getYoutubeThumbnail(url)
      };

      console.log('🚀 Sending video data:', videoData);
      
      // Determine API URL
      const apiUrl = API ? `${API}/api/admin/youtube` : '/api/admin/youtube';
      console.log('📡 API URL:', apiUrl);

      // Make API request
      const res = await axios.post(apiUrl, videoData);
      console.log('✅ Video added successfully:', res.data);
      
      // Update state and close modal
      setVideos((prev) => [res.data, ...prev]);
      setShowModal(false);
      setNewVideo({ title: "", url: "", description: "", thumbnail: "" });
      toast.success("Video added successfully!");
      
    } catch (error) {
      console.error('❌ Error adding video:', error);
      console.error('Error response:', error.response?.data);
      
      let errorMessage = "Failed to add video";
      if (error.response?.data?.message) {
        errorMessage = error.response.data.message;
      } else if (error.message) {
        errorMessage = error.message;
      }
      
      toast.error(errorMessage);
    }
  };

  const handleDelete = async (id) => {
    await axios.delete(API ? `${API}/api/admin/youtube/${id}` : `/api/admin/youtube/${id}`);
    setVideos((prev) => prev.filter((v) => v._id !== id));
    toast.success("Deleted");
  };

  return (
    <>
      <Helmet>
        <title>Admin | Youtube Manager</title>
      </Helmet>
      <div className="container">
        <h2 className="text-white golden-heading p-4 mb-0">
          Unlocking Real Estate – Videos
        </h2>
        <Button
          variant="primary"
          className="mb-2 mt-0  m-4"
          onClick={() => setShowModal(true)}
        >
          + Add Video
        </Button>

        <div className="video-grid mt-4 ps-4">
          {videos.map((video) => (
            <div key={video._id} className="video-card">
              <div className="video-thumbnail" style={{
                backgroundImage: `url(${video.thumbnail || 'https://via.placeholder.com/300x200?text=No+Thumbnail'})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                width: '100%',
                height: '200px',
                position: 'relative',
                cursor: 'pointer'
              }} onClick={() => window.open(video.url, '_blank')}>
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  color: 'white',
                  fontSize: '48px',
                  textShadow: '0 0 10px rgba(0,0,0,0.5)'
                }}>
                  ▶
                </div>
              </div>
              <h5 className="text-white">{video.title}</h5>
              <p className="text-white">{video.description}</p>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(video._id)}
              >
                Delete
              </Button>
            </div>
          ))}
        </div>

        {/* Add Video Modal */}
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Add YouTube Video</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control
                  value={newVideo.title}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, title: e.target.value })
                  }
                  placeholder="Enter video title"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>YouTube Embed URL</Form.Label>
                <Form.Control
                  value={newVideo.url}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, url: e.target.value })
                  }
                  placeholder="e.g. https://www.youtube.com/watch?v=abc123 or https://www.youtube.com/embed/abc123"
                />
              </Form.Group>
              <Form.Group className="mt-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={2}
                  value={newVideo.description}
                  onChange={(e) =>
                    setNewVideo({ ...newVideo, description: e.target.value })
                  }
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button 
              variant="primary" 
              onClick={(e) => {
                console.log('🔘 Add button clicked!');
                console.log('Form data:', newVideo);
                console.log('Button disabled?', !newVideo.title || !newVideo.url);
                handleAddVideo();
              }}
              disabled={!newVideo.title || !newVideo.url}
            >
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default YouTubeManager;
