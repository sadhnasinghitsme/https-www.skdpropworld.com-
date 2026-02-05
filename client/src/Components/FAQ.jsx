import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: 'Who are the top real estate agents in Greater Noida?',
      answer: 'The top real estate agents in Greater Noida are those who provide verified properties, transparent pricing, and complete documentation support. SKD Propworld is recognized as one of the top real estate agents in Greater Noida for residential plots, YEIDA projects, commercial properties, and investment-focused real estate solutions. <a href="/" style="color: #ffc107; text-decoration: underline;">Visit our homepage</a> to explore our featured properties or <a href="/about-us" style="color: #ffc107; text-decoration: underline;">learn more about our company</a> and our commitment to excellence in real estate services.'
    },
    {
      question: 'Why is SKD Propworld considered one of the best real estate agents in Greater Noida?',
      answer: 'SKD Propworld is considered one of the best real estate agents in Greater Noida due to its strong local market knowledge, RERA-compliant listings, and end-to-end services including site visits, negotiation, and registration assistance. Our experienced team and proven track record make us a trusted choice for property investments. <a href="/all-blogs" style="color: #ffc107; text-decoration: underline;">Read our latest blogs</a> for market insights or <a href="/about-us" style="color: #ffc107; text-decoration: underline;">discover our story</a> and see why clients choose us for their real estate needs.'
    },
    {
      question: 'Who are the best real estate agents in YEIDA?',
      answer: 'The best real estate agents in YEIDA are those with expertise in Yamuna Expressway Authority rules, sector-wise pricing, and future development plans. SKD Propworld is among the best real estate agents in YEIDA, offering verified residential and commercial plots. Our deep understanding of YEIDA regulations and market trends sets us apart. <a href="/projects" style="color: #ffc107; text-decoration: underline;">Browse our YEIDA projects</a> or <a href="/all-blogs" style="color: #ffc107; text-decoration: underline;">read our expert analysis</a> on YEIDA property market trends.'
    },
    {
      question: 'Who are the best real estate consultants in YEIDA?',
      answer: 'The best real estate consultants in YEIDA provide legal clarity, verified documentation, and long-term investment guidance. SKD Propworld is known as one of the best real estate consultants in YEIDA for transparent and secure property transactions. Our professional approach and client-first philosophy have earned us recognition in the industry. <a href="/contact-us" style="color: #ffc107; text-decoration: underline;">Contact our consultants</a> for personalized advice or <a href="/about-us" style="color: #ffc107; text-decoration: underline;">learn about our values</a> and commitment to client satisfaction.'
    },
    {
      question: 'What services do top real estate agents in Greater Noida provide?',
      answer: 'Top real estate agents in Greater Noida offer property consultation, verified listings, site visits, price negotiation, agreement drafting, registration support, and post-sale services to ensure a smooth buying experience. At SKD Propworld, we provide comprehensive real estate solutions tailored to each client\'s needs. <a href="/services" style="color: #ffc107; text-decoration: underline;">Explore our complete services</a> or <a href="/" style="color: #ffc107; text-decoration: underline;">start your property search</a> on our homepage today.'
    },
    {
      question: 'How do I choose the best real estate agent in Greater Noida or YEIDA?',
      answer: 'To choose the best real estate agent in Greater Noida or YEIDA, look for experience, local expertise, verified properties, transparent pricing, and strong client support. Trusted consultants like SKD Propworld provide complete assistance from start to finish. Our proven methodology and client testimonials speak to our reliability. <a href="/all-blogs" style="color: #ffc107; text-decoration: underline;">Read our property guides</a> for expert tips or <a href="/about-us" style="color: #ffc107; text-decoration: underline;">meet our team</a> and understand why we\'re the right choice for your property investment.'
    }
  ];

  return (
    <div className="faq-container">
      <Helmet>
        <title>Top Real Estate Agents in Greater Noida & YEIDA | FAQ – SKD Propworld</title>
        <meta name="description" content="Find answers about top real estate agents in Greater Noida & YEIDA. Learn why SKD Propworld is among the best real estate consultants for safe property investments." />
        <link rel="canonical" href="/faq" />
        <script type="application/ld+json">
          {`{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Who are the top real estate agents in Greater Noida?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Top real estate agents in Greater Noida provide verified properties, transparent pricing, and complete documentation support. SKD Propworld is among the top real estate agents in Greater Noida for residential, commercial, and investment properties."
                }
              },
              {
                "@type": "Question",
                "name": "Why is SKD Propworld considered one of the best real estate agents in Greater Noida?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "SKD Propworld is considered one of the best real estate agents in Greater Noida due to its local expertise, RERA-compliant listings, transparent processes, and complete support from site visit to registration."
                }
              },
              {
                "@type": "Question",
                "name": "Who are the best real estate agents in YEIDA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The best real estate agents in YEIDA specialize in Yamuna Expressway Authority plots, understand sector-wise pricing, and offer verified properties. SKD Propworld is among the best real estate agents in YEIDA."
                }
              },
              {
                "@type": "Question",
                "name": "Who are the best real estate consultants in YEIDA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "The best real estate consultants in YEIDA provide legal verification, investment guidance, and transparent transactions. SKD Propworld is known as one of the best real estate consultants in YEIDA."
                }
              }
            ]
          }`}
        </script>
      </Helmet>
      
      <div className="faq-header">
        <h1>Frequently Asked Questions – Top Real Estate Agents in Greater Noida & YEIDA</h1>
        <p>Find answers to common questions about our properties and services</p>
      </div>
      
      <div className="faq-list">
        {faqItems.map((item, index) => (
          <div 
            key={index} 
            className={`faq-item ${activeIndex === index ? 'active' : ''}`}
          >
            <button 
              className="faq-question" 
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
              id={`faq-question-${index}`}
            >
              {item.question}
              <span className="faq-icon">+</span>
            </button>
            <div 
              className="faq-answer" 
              id={`faq-answer-${index}`}
              role="region"
              aria-labelledby={`faq-question-${index}`}
              style={{ display: activeIndex === index ? 'block' : 'none' }}
              dangerouslySetInnerHTML={{ __html: item.answer }}
            />
          </div>
        ))}
      </div>
      
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <h3>Still have questions?</h3>
        <p>Contact our support team for more information</p>
        <a href="/contact" className="contact-button">Contact Us</a>
      </div>
    </div>
  );
};

export default FAQ;
