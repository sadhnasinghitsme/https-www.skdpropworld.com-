import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ViewBlogGrid.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "../Footer";
import SupportWidget from "./SupportWidget";
import ErrorBoundary from "./ErrorBoundary";
import { Helmet } from "react-helmet-async";

const ViewBlogGrid = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API = `${import.meta.env.VITE_API_BASE_URL}/api/blogs`;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log("🔍 Fetching blogs from:", API);
        setLoading(true);
        setError(null);
        const res = await axios.get(API);
        console.log("📊 API Response:", res.data);
        console.log("📝 Number of blogs:", res.data?.length || 0);
        
        // Validate response data
        if (Array.isArray(res.data)) {
          setBlogs(res.data);
        } else {
          console.warn("⚠️ API returned non-array data:", res.data);
          setBlogs([]);
        }
      } catch (err) {
        console.error("❌ Failed to fetch blogs:", err);
        const errorMessage = err.response?.data?.error || err.message || "Failed to load blogs";
        setError(errorMessage);
        setBlogs([]); // Clear blogs on error
      } finally {
        setLoading(false);
      }
    };

    if (API) {
      fetchBlogs();
    } else {
      setError("API URL is not configured");
      setLoading(false);
    }
  }, [API]);

  return (
    <ErrorBoundary>
      <>
        <Helmet>
        {/* Primary Meta Tags */}
        <title>Real Estate Blogs | Best Real Estate Agents in Greater Noida & YEIDA</title>
        <meta
          name="title"
          content="Real Estate Blogs | Best Real Estate Agents in Greater Noida & YEIDA"
        />
        <meta
          name="description"
          content="Expert real estate blogs by the best real estate agents in Greater Noida and YEIDA. Get property tips, investment insights, and market updates."
        />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.skdpropworld.com/blogs" />
        <meta
          property="og:title"
          content="Real Estate Blogs | Best Real Estate Agents in Greater Noida & YEIDA"
        />
        <meta
          property="og:description"
          content="Expert real estate blogs by the best real estate agents in Greater Noida and YEIDA. Get property tips, investment insights, and market updates."
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:url" content="https://www.skdpropworld.com/blogs" />
        <meta
          name="twitter:title"
          content="Real Estate Blogs | Best Real Estate Agents in Greater Noida & YEIDA"
        />
        <meta
          name="twitter:description"
          content="Expert real estate blogs by the best real estate agents in Greater Noida and YEIDA. Get property tips, investment insights, and market updates."
        />
      </Helmet>
      <Navbar />
      <div className="userblog-container">
        <h1 className="userblog-heading">Real Estate Blogs by the Best Real Estate Agents in Greater Noida & YEIDA</h1>
        
        {/* Intro paragraph for SEO */}
        <div style={{ 
          maxWidth: '900px', 
          margin: '0 auto 40px', 
          padding: '0 20px',
          textAlign: 'center',
          fontSize: '1.1rem',
          lineHeight: '1.8',
          color: '#555'
        }}>
          <p>
            Welcome to the SKD Propworld blog, where we share expert insights, market updates, and investment guides from the best real estate agents in Greater Noida and YEIDA. Our blogs cover residential plots, commercial properties, and long-term investment opportunities to help buyers make informed decisions. Explore our complete portfolio of <a href="/projects" style={{ color: '#0066cc', textDecoration: 'underline' }}>plots in YEIDA & Greater Noida</a>.
          </p>
          
          {/* Internal linking with keyword-rich anchor text */}
          <div style={{ 
            marginTop: '25px', 
            fontSize: '1rem',
            textAlign: 'left',
            maxWidth: '800px',
            margin: '25px auto 0'
          }}>
            <p style={{ marginBottom: '10px' }}>
              📖 <strong>Featured Reads:</strong>
            </p>
            <ul style={{ 
              listStyle: 'none', 
              padding: 0,
              lineHeight: '2'
            }}>
              <li>
                → Read our detailed guide by the <a href="/about-us" style={{ color: '#0066cc', textDecoration: 'underline' }}>best real estate agents in YEIDA</a> on plot investment opportunities.
              </li>
              <li>
                → Insights from the <a href="/about-us" style={{ color: '#0066cc', textDecoration: 'underline' }}>best real estate agents in Greater Noida</a> on upcoming projects.
              </li>
            </ul>
          </div>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading blogs...</span>
            </div>
            <p>Loading blogs...</p>
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'red' }}>
            <h3>❌ Error Loading Blogs</h3>
            <p>{error}</p>
            <p>Please check your internet connection and try again.</p>
          </div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <h3>📝 No Blogs Found</h3>
            <p>No blog posts are available at the moment.</p>
            <p>Please check back later or contact the administrator.</p>
          </div>
        )}

        <div className="userblog-grid">
          {blogs.map((blog) => {
            // Safety checks to prevent rendering errors
            if (!blog || !blog._id) return null;
            
            try {
              return (
                <Link
                  key={blog._id}
                  to={`/read-blog/${blog._id}`}
                  className="userblog-card-link"
                >
                  <div className="userblog-card">
                    {blog.imageUrl && (
                      <img
                        src={blog.imageUrl}
                        alt={blog.title || "Blog image"}
                        className="userblog-image"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                    )}
                    <div className="userblog-content">
                      <h3 className="userblog-title">{blog.title || "Untitled Blog"}</h3>
                      <p className="userblog-meta">
                        By <span>{blog.author || "Unknown"}</span>
                        {blog.timestamp && (
                          <> | {new Date(blog.timestamp).toLocaleDateString()}</>
                        )}
                      </p>
                      {blog.tags && (
                        <p className="userblog-tags">Tags: {blog.tags}</p>
                      )}
                      <p className="userblog-preview">
                        {blog.content
                          ? `${stripHTML(blog.content).slice(0, 200)}...`
                          : "No content available"}
                      </p>
                      <span className="userblog-readmore">Read more →</span>
                    </div>
                  </div>
                </Link>
              );
            } catch (err) {
              console.error("Error rendering blog:", blog._id, err);
              return null;
            }
          })}
        </div>
        </div>
        <SupportWidget />
        <Footer />
      </>
    </ErrorBoundary>
  );
};

// Utility to remove HTML tags for preview
const stripHTML = (html) => {
  if (!html || typeof html !== "string") return "";
  
  try {
    // Check if we're in a browser environment
    if (typeof document === "undefined") {
      // Server-side or non-browser: use regex fallback
      return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
    }
    
    const div = document.createElement("div");
    // Sanitize before inserting to prevent script execution
    const sanitized = html
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/\s*on\w+\s*=\s*["'][^"']*["']/gi, "");
    
    div.innerHTML = sanitized;
    const text = div.textContent || div.innerText || "";
    return text.replace(/\s+/g, " ").trim();
  } catch (err) {
    console.error("Error stripping HTML:", err);
    // Fallback: simple regex to remove tags
    return html.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  }
};

export default ViewBlogGrid;
