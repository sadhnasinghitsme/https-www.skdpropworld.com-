import React from "react";
import "./SocialMediaSidebar.css";

const SocialMediaSidebar = () => {
  return (
    <div className="social-media-sidebar">
      {/* Facebook */}
      <a
        href="https://www.facebook.com/skdprp/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon facebook"
        aria-label="Facebook"
      >
        <i className="bi bi-facebook"></i>
      </a>

      {/* LinkedIn */}
      <a
        href="https://in.linkedin.com/company/skd-propworld"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon linkedin"
        aria-label="LinkedIn"
      >
        <i className="bi bi-linkedin"></i>
      </a>

      {/* YouTube */}
      <a
        href="https://www.youtube.com/@skdpropworld2011"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon youtube"
        aria-label="YouTube"
      >
        <i className="bi bi-youtube"></i>
      </a>

      {/* Instagram */}
      <a
        href="https://www.instagram.com/official.skdpropworld/"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon instagram"
        aria-label="Instagram"
      >
        <i className="bi bi-instagram"></i>
      </a>

      {/* WhatsApp */}
      <a
        href="https://wa.me/919091010909"
        target="_blank"
        rel="noopener noreferrer"
        className="social-icon whatsapp"
        aria-label="WhatsApp"
      >
        <i className="bi bi-whatsapp"></i>
      </a>
    </div>
  );
};

export default SocialMediaSidebar;
