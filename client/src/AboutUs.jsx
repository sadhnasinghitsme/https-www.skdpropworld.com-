import React from "react";
import "./AboutUs.css";
import Navbar from "./Components/Navbar";
import founderImg from "/md_sir.jpg";
import Footer from "./Footer";
import LeadForm from "./Components/LeadForm";
import Testimonials from "./Testimonials";
import SupportWidget from "./Components/SupportWidget";
import { Helmet } from "react-helmet-async";

const AboutUs = () => {
  return (
    <>
      <Helmet>
        <title>About SKD Propworld - Top Real Estate Agents in Greater Noida & YEIDA</title>
        <meta
          name="description"
          content="Learn about SKD Propworld — a trusted global real estate leader offering investment advisory, sales, and relocation services across India (Noida, Greater Noida, YEIDA, Delhi, Ghaziabad, New Delhi, Delhi NCR), USA, UK, UAE, Singapore, and Canada."
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:title"
          content="About SKD Propworld | Real Estate Agents "
        />
        <meta
          property="og:description"
          content="Explore SKD Propworld's mission, vision, and leadership in global real estate markets. Building value, trust, and relationships worldwide."
        />
        <meta property="og:url" content="https://skdpropworld.com/about" />

        {/* Twitter Meta */}
        {/* <meta name="twitter:card" content="summary_large_image" /> */}
        <meta name="twitter:title" content="About Us | SKD Propworld" />
        <meta
          name="twitter:description"
          content="Discover how SKD Propworld is transforming real estate through innovation, trust, and global expertise."
        />
      </Helmet>

      <Navbar />

      <div className="aboutus-page">
        <section className="aboutus-hero-section text-center d-flex align-items-center justify-content-center">
          <div className="container">
            <h1 className="display-4 fw-bold">Top Real Estate Agents in Greater Noida & YEIDA</h1>
            <p className="lead">SKD Propworld is one of the top real estate consultants in Greater Noida and YEIDA, offering trusted property solutions for residential and commercial investments.</p>
          </div>
        </section>

        {/* Who We Are */}
        <section className="py-5 who-we-are-section">
          <div className="who-we-are-slideshow">
            <div className="slide slide1"></div>
            <div className="slide slide2"></div>
            <div className="slide slide3"></div>
          </div>
          <div className="who-we-are-overlay"></div>
          <div className="container position-relative">
            <h2 className="mb-4 text-center fw-bold text-white">Who We Are</h2>
            
            <div className="lead text-justify text-white">
              <p>
                <strong>SKD Propworld</strong> is one of the trusted real estate consultants in Greater Noida and YEIDA, 
                providing professional property consultancy services for residential and commercial projects. We specialize 
                in helping clients buy, sell, and invest in the best properties across Greater Noida and Yamuna 
                Expressway Industrial Development Authority (YEIDA) areas.
              </p>

              <h3 className="fw-bold text-warning mt-4 mb-3">Our Mission</h3>
              <p>
                As a trusted name among the <strong>property dealers in YEIDA</strong>, we focus on customer 
                satisfaction, market knowledge, and long-term relationships. Our mission is to make property buying 
                simple, safe, and profitable for every client.
              </p>

              <h3 className="fw-bold text-warning mt-4 mb-3">Our Expertise in Greater Noida & YEIDA</h3>
              <p>
                With years of experience in the real estate market, SKD Propworld has earned a reputation as one of 
                the <strong>best property consultants in Greater Noida</strong> for offering transparent deals, expert 
                guidance, and personalized customer service.
              </p>
              <p>
                Our team of professional property advisors works closely with leading builders and developers to 
                bring you verified projects, legal assistance, and end-to-end support. Whether you are looking for 
                luxury apartments, plots, villas, or commercial spaces, we ensure you get the best options at the best price.
              </p>

              <h3 className="fw-bold text-warning mt-4 mb-3">Why Choose SKD Propworld</h3>
              <p className="mb-2">Best Property Consultants in Greater Noida & YEIDA:</p>
              <ul className="list-unstyled ps-3">
                <li className="mb-2">✓ Expert knowledge of Greater Noida and YEIDA property market</li>
                <li className="mb-2">✓ Verified and approved projects</li>
                <li className="mb-2">✓ Honest pricing and transparent documentation</li>
                <li className="mb-2">✓ Dedicated customer support</li>
                <li className="mb-2">✓ Proven track record of satisfied clients</li>
              </ul>

              <h3 className="fw-bold text-warning mt-4 mb-3">Our Service Areas</h3>
              <p className="mb-3">
                <strong>Serving Greater Noida, YEIDA & Yamuna Expressway, Uttar Pradesh</strong>
              </p>
              <p>
                We provide comprehensive real estate services across the entire Yamuna Expressway corridor, 
                including all YEIDA sectors and Greater Noida regions. Our local expertise covers residential 
                and commercial properties from Noida Extension to the upcoming Jewar Airport area.
              </p>
              
              <p className="fw-semibold mt-4">
                At SKD Propworld, we believe in delivering value, trust, and excellence in every real estate transaction.
              </p>
            </div>
          </div>
        </section>

        {/* Founder Section */}
        <section
          className="aboutus-founder-section position-relative text-white"
          style={{ backgroundImage: `url(${founderImg})` }}
        >
          <div className="aboutus-overlay"></div>
          <div className="container py-5 position-relative z-2">
            <div className="row align-items-center">
              <div className="col-lg-3 text-start">
                <h3 className="fw-bold mb-3 mt-5">
                  From the Desk of Our Founder
                </h3>
                <p className="lead mb-3">
                  “Welcome to SKD Propworld, where your property aspirations
                  meet our passion for excellence. Real estate is not just about
                  transactions — it's about building long-term relationships and
                  adding real value to your investments.”
                </p>
                <p>
                  “We are committed to transparency, trust, and innovation. I
                  invite you to explore a new dimension of real estate with us —
                  one that focuses on personalized service, strategic advice,
                  and cutting-edge technology.”
                </p>
                <p className="fw-semibold mt-4">- Er. Pawan Mishra</p>
              </div>
              <div className="col-lg-6 d-none d-lg-block"></div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="aboutus-stats-section py-5">
          <div className="container">
            <div className="row g-4 text-center">
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-users"></i>
                  </div>
                  <h3 className="stat-number">500+</h3>
                  <p className="stat-label">Happy Clients</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-building"></i>
                  </div>
                  <h3 className="stat-number">100+</h3>
                  <p className="stat-label">YEIDA Projects</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-award"></i>
                  </div>
                  <h3 className="stat-number">15+</h3>
                  <p className="stat-label">Years Experience</p>
                </div>
              </div>
              <div className="col-md-3 col-6">
                <div className="stat-card">
                  <div className="stat-icon">
                    <i className="fas fa-handshake"></i>
                  </div>
                  <h3 className="stat-number">100%</h3>
                  <p className="stat-label">Client Satisfaction</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="pb-5 aboutus-mission-section">
          <div className="container">
            <h2 className="mb-5 text-center fw-bold">Mission & Vision</h2>
            <div className="row gx-4 gy-4">
              <div className="col-md-6">
                <div className="aboutus-mission-box h-100">
                  <div className="mission-icon">
                    <i className="fas fa-bullseye"></i>
                  </div>
                  <h4 className="fw-semibold mb-3">Our Mission</h4>
                  <p>
                    To empower clients with transparent advice, expert knowledge of YEIDA sectors, 
                    and hassle-free assistance in finding the perfect residential plot or investment 
                    opportunity in the Yamuna Expressway region.
                  </p>
                </div>
              </div>
              <div className="col-md-6">
                <div className="aboutus-vision-box h-100">
                  <div className="vision-icon">
                    <i className="fas fa-eye"></i>
                  </div>
                  <h4 className="fw-semibold mb-3">Our Vision</h4>
                  <p>
                    To be the most trusted and reliable name in YEIDA real estate, known for 
                    integrity, professionalism, and delivering exceptional value to every client 
                    in the Yamuna Expressway market.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="aboutus-values-section py-5">
          <div className="container">
            <h2 className="mb-5 text-center fw-bold">Our Core Values</h2>
            <div className="row g-4">
              <div className="col-md-4">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Transparency</h5>
                  <p>Clear, honest communication and complete disclosure in every transaction.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-certificate"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Trust</h5>
                  <p>Building long-term relationships based on reliability and integrity.</p>
                </div>
              </div>
              <div className="col-md-4">
                <div className="value-card">
                  <div className="value-icon">
                    <i className="fas fa-lightbulb"></i>
                  </div>
                  <h5 className="fw-bold mb-3">Expertise</h5>
                  <p>Deep knowledge of YEIDA sectors and market trends to guide your decisions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        {/* <section className="py-5 bg-white">
          <div className="container">
            <h2 className="mb-5 text-center fw-bold">Client Testimonials</h2>
            <div className="row g-4">
              {[
                {
                  quote:
                    "SKD Propworld exceeded our expectations with their professionalism and attention to detail. Highly recommend!",
                  author: "Client A",
                },
                {
                  quote:
                    "Thanks to SKD Propworld, we found our dream property in record time!",
                  author: "Client B",
                },
                {
                  quote:
                    "Their advisory services were a game-changer for our real estate investments.",
                  author: "Client C",
                },
              ].map((testimonial, index) => (
                <div className="col-md-4" key={index}>
                  <div className="aboutus-testimonial animate-fade-in">
                    <p className="fst-italic">“{testimonial.quote}”</p>
                    <p className="fw-semibold text-end">
                      - {testimonial.author}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section> */}

        <Testimonials />
      </div>
      <LeadForm />
      <SupportWidget />
      <Footer />
    </>
  );
};

export default AboutUs;
