import React from "react";
import Navbar from "./Navbar";
import Footer from "../Footer";
import LeadForm from "./LeadForm";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const Services = () => {
  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>
          Our Services | Buy, Sell, Consult Real Estate - SKD Propworld
        </title>
        <meta
          name="title"
          content="Our Services | Buy, Sell, Consult Real Estate - SKD Propworld"
        />
        <meta
          name="description"
          content="Explore SKD Propworld’s real estate services including property buying, selling, and professional consulting. Trusted solutions across YEIDA, Noida, Greater Noida & Delhi NCR."
        />
        <meta
          name="keywords"
          content="SKD Propworld, real estate services, buy property, sell property, property consultants, Noida, Greater Noida, YEIDA, Delhi NCR"
        />
        <meta name="robots" content="index, follow" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="language" content="English" />
        <meta name="author" content="SKD Propworld" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Our Services | SKD Propworld" />
        <meta
          property="og:description"
          content="Buy, sell, or consult with SKD Propworld for expert real estate guidance in Noida, YEIDA, Greater Noida, and Delhi NCR."
        />
        <meta
          property="og:url"
          content="https://www.skdpropworld.com/services"
        />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Our Services | SKD Propworld" />
        <meta
          name="twitter:description"
          content="Explore real estate services by SKD Propworld - trusted for property buying, selling, and consulting in Noida, YEIDA & Delhi NCR."
        />
      </Helmet>

      <Navbar />
      <div className="container-fluid text-white py-5">
        <div className="container text-center">
          <h1 className="mb-3">Our Real Estate Services in Greater Noida</h1>
          <p className="lead mb-5 text-white" style={{ maxWidth: '800px', margin: '0 auto 3rem' }}>
            Comprehensive real estate solutions from the best real estate agents in Greater Noida & YEIDA
          </p>

          <div className="row justify-content-center g-4">
            {/* Residential Plots */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="p-4 border border-light rounded shadow-sm h-100 bg-white">
                <div className="mb-3">
                  <i className="bi bi-house-door fs-1 text-success"></i>
                </div>
                <h3 className="text-dark h4">Residential Plots in Greater Noida</h3>
                <p className="text-dark">
                  Verified residential plots in prime locations for home buyers and investors. We offer YEIDA-approved plots with clear documentation and excellent connectivity.
                </p>
                <Link to="/projects?nature=Residential" className="btn btn-outline-dark">
                  View Residential Plots
                </Link>
              </div>
            </div>

            {/* Commercial Properties */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="p-4 border border-light rounded shadow-sm h-100 bg-white">
                <div className="mb-3">
                  <i className="bi bi-building fs-1 text-primary"></i>
                </div>
                <h3 className="text-dark h4">Commercial Properties in YEIDA</h3>
                <p className="text-dark">
                  High-return commercial spaces suitable for long-term growth. Ideal for businesses looking to establish presence in the rapidly developing YEIDA region.
                </p>
                <Link to="/projects?nature=Commercial" className="btn btn-outline-dark">
                  View Commercial Properties
                </Link>
              </div>
            </div>

            {/* YEIDA Approved Plots */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="p-4 border border-light rounded shadow-sm h-100 bg-white">
                <div className="mb-3">
                  <i className="bi bi-patch-check fs-1 text-success"></i>
                </div>
                <h3 className="text-dark h4">YEIDA Approved Plots</h3>
                <p className="text-dark">
                  Government-approved plots with clear documentation. All our YEIDA plots come with verified titles and are ready for immediate investment or construction.
                </p>
                <Link to="/projects" className="btn btn-outline-dark">
                  View YEIDA Plots
                </Link>
              </div>
            </div>

            {/* Property Investment Consultation */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="p-4 border border-light rounded shadow-sm h-100 bg-white">
                <div className="mb-3">
                  <i className="bi bi-bar-chart-line fs-1 text-warning"></i>
                </div>
                <h3 className="text-dark h4">Property Investment Consultation</h3>
                <p className="text-dark">
                  Personalized guidance for smart real estate investments. Our experts analyze market trends and help you make informed decisions for maximum returns.
                </p>
                <Link to="/contact-us" className="btn btn-outline-dark">
                  Get Consultation
                </Link>
              </div>
            </div>

            {/* Real Estate Advisory */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="p-4 border border-light rounded shadow-sm h-100 bg-white">
                <div className="mb-3">
                  <i className="bi bi-people fs-1 text-info"></i>
                </div>
                <h3 className="text-dark h4">Real Estate Advisory Services</h3>
                <p className="text-dark">
                  End-to-end support from site visit to final possession. We handle documentation, legal verification, registration, and post-sale support.
                </p>
                <Link to="/contact-us" className="btn btn-outline-dark">
                  Contact Us
                </Link>
              </div>
            </div>

            {/* Sell Property */}
            <div className="col-md-6 col-lg-4 mb-4">
              <div className="p-4 border border-light rounded shadow-sm h-100 bg-white">
                <div className="mb-3">
                  <i className="bi bi-cash-coin fs-1 text-danger"></i>
                </div>
                <h3 className="text-dark h4">Sell Your Property</h3>
                <p className="text-dark">
                  List your property with us and reach thousands of potential buyers. We handle marketing, negotiations, and paperwork to get you the best deal.
                </p>
                <Link to="/contact-us" className="btn btn-outline-dark">
                  Sell Property
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LeadForm />
      <Footer />
    </>
  );
};

export default Services;
