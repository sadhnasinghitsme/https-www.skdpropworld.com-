// src/pages/AllProjectsPage.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import axios from "axios";
import { Card, Button, Form } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./AllProjects.css";
import Navbar from "./Navbar";
import Footer from "../Footer";
import formatIndianPrice from "../utils/formatIndianPrice.js";
import SupportWidget from "./SupportWidget";
import { Helmet } from "react-helmet-async";
import "./AllProjectsPage.css";

/* ──────────── config / constants (top‑level) ──────────── */
const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Debounce utility for better INP
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(handler);
  }, [value, delay]);
  
  return debouncedValue;
};

// 🎨 ribbonTag → gradient class & icon
export const TAG_META = {
  "Hot Deal": { cls: "tag-red", icon: "fa-fire" },
  Trending: { cls: "tag-purple", icon: "fa-chart-line" },
  "New Launch": { cls: "tag-blue", icon: "fa-rocket" },
  "Limited Time": { cls: "tag-orange", icon: "fa-clock" },
  "Best Seller": { cls: "tag-yellow", icon: "fa-star" },
  "Ready to Move": { cls: "tag-green", icon: "fa-check-circle" },
  "Under Construction": { cls: "tag-yellow", icon: "fa-hard-hat" },
  "Sold Out": { cls: "tag-gray", icon: "fa-ban" },
  "Exclusive Offer": { cls: "tag-purple", icon: "fa-gift" },
  "Investor’s Choice": { cls: "tag-cyan", icon: "fa-coins" },
  "Prime Location": { cls: "tag-blue", icon: "fa-map-marker-alt" },
  "Budget Friendly": { cls: "tag-green", icon: "fa-wallet" },
  "Premium Property": { cls: "tag-purple", icon: "fa-gem" },
};

// recognised property types (capitalisation matters)
const PROPERTY_TYPES = ["Plot", "Flat", "Villa", "House", "Commercial Space"];

// stop‑words that shouldn’t influence free‑text search
const STOP_WORDS = new Set([
  "property",
  "properties",
  "in",
  "at",
  "near",
  "for",
  "buy",
  "sale",
  "project",
  "projects",
]);

/* tiny helper */
const getTokens = (str = "") =>
  str
    .toLowerCase()
    .split(/\s+/)
    .filter((w) => w && !STOP_WORDS.has(w));

/* ──────────── component ──────────── */
const AllProjectsPage = () => {
  /* state */
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300ms debounce for better INP
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedRibbon, setSelectedRibbon] = useState("");
  const [sortBy, setSortBy] = useState("date");

  const [selectedSKD, setSelectedSKD] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedRegistration, setSelectedRegistration] = useState("");

  const [allLocations, setAllLocations] = useState([]);
  const [allTypes, setAllTypes] = useState([]);
  const [allRibbons, setAllRibbons] = useState([]);
  const [selectedNature, setSelectedNature] = useState("");
  const [allNatures, setAllNatures] = useState([]);

  const location = useLocation();

  /* fetch once */
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/admin/projects`);
        const visible = res.data.filter((p) => p.visible);

        setProjects(visible);
        setAllLocations([
          ...new Set(visible.map((p) => p.location?.trim()).filter(Boolean)),
        ]);
        setAllTypes([
          ...new Set(
            visible.map((p) => p.propertyType?.trim()).filter(Boolean)
          ),
        ]);
        setAllNatures([
          ...new Set(
            visible.map((p) => p.propertyNature?.trim()).filter(Boolean)
          ),
        ]);

        setAllRibbons([
          ...new Set(visible.map((p) => p.ribbonTag?.trim()).filter(Boolean)),
        ]);
      } catch (err) {
        console.error("Error fetching projects", err);
      }
    })();
  }, []);

  /* read ?location= & ?search= from URL */
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const locParam = params.get("location")?.trim();
    const searchParam = params.get("search")?.trim() || "";
    const typeParam = params.get("type")?.trim();
    const natureParam = params.get("nature")?.trim();
    if (natureParam) setSelectedNature(natureParam);

    if (locParam) setSelectedLocation(locParam);
    if (typeParam) setSelectedType(typeParam);

    const matchedType = PROPERTY_TYPES.find(
      (t) => t.toLowerCase() === searchParam.toLowerCase()
    );

    if (!typeParam && matchedType) {
      setSelectedType(matchedType);
      setSearchTerm("");
    } else {
      setSearchTerm(searchParam); // ✅ ← always set searchTerm when present
    }
  }, [location.search]);

  /* derived list */
  const tokens = getTokens(debouncedSearchTerm); // Use debounced value for better INP
  const filtered = projects
    // 🔍 Search by heading or location only
    .filter((p) => {
      if (!tokens.length) return true;

      const searchableFields = [
        p.heading?.toLowerCase(),
        p.location?.toLowerCase(),
      ];

      return tokens.every((t) =>
        searchableFields.some((f) => f && f.includes(t))
      );
    })

    // 📍 Location filter
    .filter((p) =>
      selectedLocation
        ? p.location?.toLowerCase() === selectedLocation.toLowerCase()
        : true
    )

    // 🏠 Property type filter
    .filter((p) =>
      selectedType
        ? p.propertyType?.toLowerCase() === selectedType.toLowerCase()
        : true
    )

    // 🏢 Property Nature filter
    .filter((p) =>
      selectedNature
        ? p.propertyNature?.toLowerCase() === selectedNature.toLowerCase()
        : true
    )

    // 📋 Registration Status filter
    .filter((p) =>
      selectedRegistration
        ? p.type?.toLowerCase() === selectedRegistration.toLowerCase()
        : true
    )

    // 🏷️ Ribbon tag filter
    .filter((p) =>
      selectedRibbon
        ? p.ribbonTag?.toLowerCase() === selectedRibbon.toLowerCase()
        : true
    )

    // 💎 SKD Top Pick filter
    .filter((p) =>
      selectedSKD
        ? p.isSKDPick?.toUpperCase() === selectedSKD.toUpperCase()
        : true
    )

    // 🚧 Project Status filter
    .filter((p) =>
      selectedStatus
        ? p.projectStatus?.toUpperCase() === selectedStatus.toUpperCase()
        : true
    )

    // 🧮 Sort logic
    .sort((a, b) => {
      if (sortBy === "price-asc") {
        return (
          (a.pricingPlans?.[0]?.price || 0) - (b.pricingPlans?.[0]?.price || 0)
        );
      }
      if (sortBy === "price-desc") {
        return (
          (b.pricingPlans?.[0]?.price || 0) - (a.pricingPlans?.[0]?.price || 0)
        );
      }
      return new Date(b.createdAt) - new Date(a.createdAt); // newest first
    });

  const resetFilters = () => {
    setSearchTerm("");
    setSelectedLocation("");
    setSelectedType("");
    setSelectedRibbon("");
    setSelectedSKD("");
    setSelectedStatus("");
    setSortBy("date");
    setSelectedNature("");
    setSelectedRegistration("");
  };

  /* ──────────── render ──────────── */
  return (
    <>
      <Helmet>
        <title>
          Plots in YEIDA & Greater Noida | SKD Propworld
        </title>
        <meta
          name="description"
          content="Explore a wide range of residential, semi-commercial, and industrial property projects in YEIDA, Noida, Greater Noida, Delhi, and Ghaziabad."
        />
        <meta
          property="og:title"
          content="All Property Projects in Delhi NCR"
        />
        <meta
          property="og:description"
          content="Discover plots, flats, villas..."
        />
        <meta
          property="og:url"
          content="https://www.skdpropworld.com/projects"
        />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navbar />

      {/* Background Video - Lazy loaded */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, overflow: 'hidden' }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: 0.3
          }}
        >
          <source src="/videos/hero-video-compressed.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.6)'
        }} />
      </div>

      <div className="container-fluid py-5" style={{ position: 'relative', zIndex: 1 }}>
        {/* H1 Heading */}
        <div className="row mb-4">
          <div className="col-12 text-center">
            <h1 style={{ 
              color: '#ffffff', 
              fontSize: '2.5rem', 
              fontWeight: '600',
              textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
              marginBottom: '1rem'
            }}>
              Plots in YEIDA & Greater Noida
            </h1>
            <div style={{
              maxWidth: '900px',
              margin: '0 auto',
              padding: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.95)',
              borderRadius: '8px',
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
            }}>
              <p style={{ 
                color: '#333', 
                fontSize: '1rem', 
                lineHeight: '1.7',
                marginBottom: '0',
                textAlign: 'left'
              }}>
                SKD Propworld Pvt. Ltd. is a trusted real estate consultancy based in Greater Noida, specializing in authority-approved YEIDA residential, semi-commercial, and industrial plots. We offer verified plot options with complete transparency and legal support. Our YEIDA plots are located near key developments such as the Noida International Airport (Jewar), International Film City, major industrial corridors, and the Yamuna Expressway, making them ideal for investment and end-use. As one of the best plot dealers and real estate consultants in Greater Noida for YEIDA plots, SKD Propworld provides end-to-end support, including site visits, pricing guidance, and documentation assistance.
              </p>
            </div>
          </div>
        </div>

        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 mb-4">
            <div className="card p-3 app-filter-sidebar shadow-sm">
              <h5 className="mb-3 text-warning">Filters</h5>

              {/* Search */}
              <Form.Control
                placeholder="Search by City or Project Name…"
                className="mb-3"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              {/* Location Filter */}
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                >
                  <option value="">All Locations</option>
                  {allLocations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Property Type */}
              <Form.Group className="mb-3">
                <Form.Label>Property Type</Form.Label>
                <Form.Select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="">All Types</option>
                  {allTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Property Nature */}
              <Form.Group className="mb-3">
                <Form.Label>Property Category</Form.Label>
                <Form.Select
                  value={selectedNature}
                  onChange={(e) => setSelectedNature(e.target.value)}
                >
                  <option value="">Choose Category</option>
                  {allNatures.map((nature) => (
                    <option key={nature} value={nature}>
                      {nature}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* Registration Status */}
              <Form.Group className="mb-3">
                <Form.Label>Registration Status</Form.Label>
                <Form.Select
                  value={selectedRegistration}
                  onChange={(e) => setSelectedRegistration(e.target.value)}
                >
                  <option value="">All Properties</option>
                  <option value="Registered">Registered</option>
                  <option value="Unregistered">Unregistered</option>
                </Form.Select>
              </Form.Group>

              {/* Ribbon */}
              <Form.Group className="mb-3">
                <Form.Label>Speciality</Form.Label>
                <Form.Select
                  value={selectedRibbon}
                  onChange={(e) => setSelectedRibbon(e.target.value)}
                >
                  <option value="">All Tags</option>
                  {allRibbons.map((tag) => (
                    <option key={tag} value={tag}>
                      {tag}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* SKD Pick */}
              <Form.Group className="mb-3">
                <Form.Label>SKD Top Pick</Form.Label>
                <Form.Select
                  value={selectedSKD}
                  onChange={(e) => setSelectedSKD(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="YES">Show Only SKD Picks</option>
                  <option value="NO">Exclude SKD Picks</option>
                </Form.Select>
              </Form.Group>

              {/* Project Status */}
              <Form.Group className="mb-3">
                <Form.Label>Project Status</Form.Label>
                <Form.Select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="READY_TO_MOVE">Ready to Move</option>
                  <option value="UPCOMING">Upcoming</option>
                  <option value="LAUNCHED">Launched</option>
                  <option value="PRE_LAUNCH">Pre Launch</option>
                </Form.Select>
              </Form.Group>

              {/* Sorting */}
              <Form.Group className="mb-3">
                <Form.Label>Sort By</Form.Label>
                <Form.Select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="date">Newest First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </Form.Select>
              </Form.Group>

              <Button variant="outline-secondary" onClick={resetFilters}>
                Reset Filters
              </Button>
            </div>
          </div>

          {/* Grid */}
          <div className="col-md-9">
            {/* Registered Properties Section */}
            {filtered.filter(p => p.type?.toLowerCase() === 'registered').length > 0 && (
              <>
                <h1 className="text-center mb-4 text-white">
                  <i className="fas fa-check-circle text-success me-2"></i>
                  All Properties in YEIDA, Noida & Delhi NCR
                </h1>
                <div className="row mb-5">
                  {filtered
                    .filter(p => p.type?.toLowerCase() === 'registered')
                    .map((p) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={p._id}>
                    <Card className="h-100 app-project-card position-relative">
                      {/* Badge */}
                      {p.ribbonTag &&
                        (() => {
                          const { cls, icon } = TAG_META[p.ribbonTag] || {
                            cls: "app-tag-default",
                            icon: "fa-tag",
                          };
                          return (
                            <span className={`app-tag-badge ${cls}`}>
                              <i className={`fas ${icon}`} /> {p.ribbonTag}
                            </span>
                          );
                        })()}

                      {/* SKD Top Pick */}
                      {p.isSKDPick === "YES" && (
                        <div className="app-skd-badge">
                          <i className="fas fa-crown"></i> SKD Top Pick
                        </div>
                      )}

                      <Card.Img
                        variant="top"
                        src={p.bannerImage?.url}
                        className="app-project-img"
                        loading="lazy"
                        alt="project-photos"
                      />

                      <Card.Body className="d-flex flex-column">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{p.heading}</h2>

                        <Card.Text className="mb-1">
                          📍 <strong>Location:</strong> {p.location}
                        </Card.Text>
                        <Card.Text className="mb-1">
                          <strong>Property Type:</strong> {p.propertyType}
                        </Card.Text>
                        {p.type && (
                          <Card.Text className="mb-1">
                            <strong>Type:</strong> {p.type}
                          </Card.Text>
                        )}
                        {p.reraNumber && (
                          <Card.Text className="mb-1">
                            <strong>RERA No.:</strong> {p.reraNumber}
                          </Card.Text>
                        )}

                        {/* Status */}
                        {p.projectStatus && (
                          <div className="mb-2">
                            <strong>Status:</strong>&nbsp;&nbsp;
                            <Button
                              variant={
                                p.projectStatus === "READY_TO_MOVE"
                                  ? "success"
                                  : p.projectStatus === "UNDER_CONSTRUCTION"
                                  ? "warning"
                                  : "secondary"
                              }
                              size="sm"
                              className="rounded-pill text-uppercase fw-bold"
                              disabled
                            >
                              {p.projectStatus.replace(/_/g, " ")}
                            </Button>
                          </div>
                        )}

                        {/* USP */}
                        {p.usp && (
                          <Card.Text className="small text-muted mb-1 project-usp">
                            <strong>USP:</strong>{" "}
                            {Array.isArray(p.usp) ? p.usp.join(", ") : p.usp}
                          </Card.Text>
                        )}

                        {/* About */}
                        {p.aboutContent && (
                          <div className="small text-secondary mb-2">
                            <h6 className="mb-1 mt-2">
                              <strong>About:</strong>
                            </h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  p.aboutContent.length > 160
                                    ? p.aboutContent.slice(0, 160) + "..."
                                    : p.aboutContent,
                              }}
                            />
                          </div>
                        )}

                        {/* Price */}
                        <Card.Text className="text-success fw-semibold">
                          💰 <strong>Starting from:</strong>
                          {formatIndianPrice(
                            p.pricingPlans?.[0]?.price ?? 0
                          )}*{" "}
                          {p.pricingPlans?.[0]?.priceType === "PER_UNIT" && (
                            <span className="text-muted small">
                              (per {p.pricingPlans?.[0]?.unit || "unit"})
                            </span>
                          )}
                        </Card.Text>

                        <Link to={`/projects/${p.slug}`}>
                          <Button
                            variant="warning"
                            className="w-100 fw-bold mt-2"
                          >
                            View in Detail
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                    ))}
                </div>
              </>
            )}

            {/* Unregistered Properties Section */}
            {filtered.filter(p => p.type?.toLowerCase() === 'unregistered').length > 0 && (
              <>
                <div className="row mb-5">
                  {filtered
                    .filter(p => p.type?.toLowerCase() === 'unregistered')
                    .map((p) => (
                      <div className="col-lg-4 col-md-6 mb-4" key={p._id}>
                    <Card className="h-100 app-project-card position-relative">
                      {/* Badge */}
                      {p.ribbonTag &&
                        (() => {
                          const { cls, icon } = TAG_META[p.ribbonTag] || {
                            cls: "app-tag-default",
                            icon: "fa-tag",
                          };
                          return (
                            <span className={`app-tag-badge ${cls}`}>
                              <i className={`fas ${icon}`} /> {p.ribbonTag}
                            </span>
                          );
                        })()}

                      {/* SKD Top Pick */}
                      {p.isSKDPick === "YES" && (
                        <div className="app-skd-badge">
                          <i className="fas fa-crown"></i> SKD Top Pick
                        </div>
                      )}

                      <Card.Img
                        variant="top"
                        src={p.bannerImage?.url}
                        className="app-project-img"
                        loading="lazy"
                        alt="project-photos"
                      />

                      <Card.Body className="d-flex flex-column">
                        <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>{p.heading}</h2>

                        <Card.Text className="mb-1">
                          📍 <strong>Location:</strong> {p.location}
                        </Card.Text>
                        <Card.Text className="mb-1">
                          <strong>Property Type:</strong> {p.propertyType}
                        </Card.Text>
                        {p.type && (
                          <Card.Text className="mb-1">
                            <strong>Type:</strong> {p.type}
                          </Card.Text>
                        )}
                        {p.reraNumber && (
                          <Card.Text className="mb-1">
                            <strong>RERA No.:</strong> {p.reraNumber}
                          </Card.Text>
                        )}

                        {/* Status */}
                        {p.projectStatus && (
                          <div className="mb-2">
                            <strong>Status:</strong>&nbsp;&nbsp;
                            <Button
                              variant={
                                p.projectStatus === "READY_TO_MOVE"
                                  ? "success"
                                  : p.projectStatus === "UNDER_CONSTRUCTION"
                                  ? "warning"
                                  : "secondary"
                              }
                              size="sm"
                              className="rounded-pill text-uppercase fw-bold"
                              disabled
                            >
                              {p.projectStatus.replace(/_/g, " ")}
                            </Button>
                          </div>
                        )}

                        {/* USP */}
                        {p.usp && (
                          <Card.Text className="small text-muted mb-1 project-usp">
                            <strong>USP:</strong>{" "}
                            {Array.isArray(p.usp) ? p.usp.join(", ") : p.usp}
                          </Card.Text>
                        )}

                        {/* About */}
                        {p.aboutContent && (
                          <div className="small text-secondary mb-2">
                            <h6 className="mb-1 mt-2">
                              <strong>About:</strong>
                            </h6>
                            <div
                              dangerouslySetInnerHTML={{
                                __html:
                                  p.aboutContent.length > 160
                                    ? p.aboutContent.slice(0, 160) + "..."
                                    : p.aboutContent,
                              }}
                            />
                          </div>
                        )}

                        {/* Price */}
                        <Card.Text className="text-success fw-semibold">
                          💰 <strong>Starting from:</strong>
                          {formatIndianPrice(
                            p.pricingPlans?.[0]?.price ?? 0
                          )}*{" "}
                          {p.pricingPlans?.[0]?.priceType === "PER_UNIT" && (
                            <span className="text-muted small">
                              (per {p.pricingPlans?.[0]?.unit || "unit"})
                            </span>
                          )}
                        </Card.Text>

                        <Link to={`/projects/${p.slug}`}>
                          <Button
                            variant="warning"
                            className="w-100 fw-bold mt-2"
                          >
                            View in Detail
                          </Button>
                        </Link>
                      </Card.Body>
                    </Card>
                  </div>
                    ))}
                </div>
              </>
            )}

            {/* No Results Message */}
            {filtered.length === 0 && (
              <p className="text-light text-center w-100">
                No matching projects found.
              </p>
            )}
          </div>
        </div>
      </div>

      <SupportWidget />
      <Footer />
    </>
  );
};

export default AllProjectsPage;

