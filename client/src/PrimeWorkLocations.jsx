import "./PrimeWorkLocations.css";
import { MapPin } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const locations = [
  { 
    title: "YEIDA Plots",
    subtitle: "Authorized plots and investment opportunities in Yamuna Expressway Authority."
  },
  { 
    title: "Greater Noida Properties",
    subtitle: "Residential and commercial properties with top real estate agents in Greater Noida."
  },
];

const PrimeWorkLocations = () => {
  const navigate = useNavigate();

  return (
    <>
      <Helmet>
        {/* <title>
          Prime Property Locations in YEIDA, Noida, Greater Noida, Delhi NCR |
          SKD Propworld
        </title> */}
        <meta
          name="description"
          content="Explore SKD Propworld's prime real estate locations in YEIDA and Greater Noida. Top real estate agents specializing in verified plots and properties."
        />
        <meta
          name="keywords"
          content="YEIDA property, Greater Noida real estate, best real estate agents Greater Noida, YEIDA plots, SKD Propworld locations"
        />
        <meta name="author" content="SKD Propworld" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://www.skdpropworld.com/prime-locations"
        />
        <meta
          property="og:title"
          content="Prime Property Locations in YEIDA, Noida, Greater Noida, Delhi NCR | SKD Propworld"
        />
        <meta
          property="og:description"
          content="Browse top real estate locations YEIDA and Greater Noida with SKD Propworld. View available projects by area."
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:url"
          content="https://www.skdpropworld.com/prime-locations"
        />
        <meta
          name="twitter:title"
          content="Prime Property Locations | YEIDA, Noida, Delhi NCR – SKD Propworld"
        />
        <meta
          name="twitter:description"
          content="Discover the best property investment locations in YEIDA and Greater Noida with SKD Propworld."
        />
      </Helmet>

      <section className="prime-section">
        <h2 className="prime-heading">Prime Real Estate Locations We Serve</h2>
        <p style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '15px auto 30px',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#555'
        }}>
          SKD Propworld is among the top real estate agents in Greater Noida and YEIDA, specializing in verified plots, residential and commercial properties with complete support.
        </p>
        <div className="prime-grid">
          {locations.map((loc, idx) => (
            <div
              key={idx}
              className="prime-card"
              onClick={() =>
                navigate(`/projects?search=${encodeURIComponent(loc.title)}`)
              }
              style={{ cursor: "pointer" }}
            >
              <div className="prime-icon-title">
                {/* <MapPin size={10} className="map-icon" /> */}
                <h3 className="prime-title">{loc.title}</h3>
              </div>
              {loc.subtitle && <p className="prime-subtitle">{loc.subtitle}</p>}
            </div>
          ))}
        </div>
        <p style={{
          textAlign: 'center',
          maxWidth: '900px',
          margin: '30px auto 0',
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#555'
        }}>
          Looking for the best real estate agents in Greater Noida or YEIDA? Connect with SKD Propworld for site visits, pricing, and documentation support.
        </p>
      </section>
    </>
  );
};

export default PrimeWorkLocations;
