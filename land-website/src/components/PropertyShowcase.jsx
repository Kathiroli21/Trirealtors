import { useState, useEffect, useRef } from 'react';
import { property } from '../data/lands';

const cloudinaryVideos = [
  { 
    title: "Property Overview", 
    url: "https://res.cloudinary.com/dvcgsltuq/video/upload/v1773522489/land-property/DJI_0653.mp4", 
    thumbnail: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80" 
  },
  { 
    title: "Drone View", 
    url: "https://res.cloudinary.com/dvcgsltuq/video/upload/v1773522501/land-property/DJI_0663.mp4", 
    thumbnail: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80" 
  },
  { 
    title: "Land Tour", 
    url: "https://res.cloudinary.com/dvcgsltuq/video/upload/v1773522518/land-property/DJI_0673.mp4", 
    thumbnail: "https://images.unsplash.com/photo-1519046904884-53103b34b206?w=600&q=80" 
  },
  { 
    title: "Beach Access", 
    url: "https://res.cloudinary.com/dvcgsltuq/video/upload/v1773522440/land-property/VID-20260309-WA0000.mp4", 
    thumbnail: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80" 
  }
];

export default function PropertyShowcase() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedVideo, setSelectedVideo] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const sectionRef = useRef(null);

  const navigateVideo = (direction) => {
    const newIndex = direction === 'next' 
      ? (activeVideoIndex + 1) % cloudinaryVideos.length
      : (activeVideoIndex - 1 + cloudinaryVideos.length) % cloudinaryVideos.length;
    setActiveVideoIndex(newIndex);
    setActiveVideo(cloudinaryVideos[newIndex]);
  };

  const openVideo = (video, index) => {
    setActiveVideo(video);
    setActiveVideoIndex(index);
    setShowVideo(true);
  };

  useEffect(() => {
    if (showVideo && activeVideoIndex >= 0) {
      setActiveVideo(cloudinaryVideos[activeVideoIndex]);
    }
  }, [activeVideoIndex, showVideo]);

  useEffect(() => {
    if (showVideo && activeVideoIndex >= 0) {
      setActiveVideo(cloudinaryVideos[activeVideoIndex]);
    }
  }, [activeVideoIndex, showVideo]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          } else {
            entry.target.classList.remove('animate');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -30px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll, .animate-fade-in-up, .animate-scale-in, .animate-fade-in-left, .animate-fade-in-right, .animate-pop-in, .reveal-image, .scroll-feature-item');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatPricePerAcre = (pricePerAcre) => {
    if (!pricePerAcre) return null;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(pricePerAcre) + " per acre";
  };

  return (
    <section id="property" className="property-showcase" ref={sectionRef}>
      <div className="floating-orb orb-1"></div>
      <div className="floating-orb orb-2"></div>
      
      <div className="property-hero">
        <div className="hero-gallery animate-on-scroll animate-fade-in-left">
          <div className="main-image reveal-image">
            <img src={property.images[selectedImage]} alt={property.name} />
            <div className="hero-overlay">
              <span className="property-status animate-pop-in">For Sale</span>
            </div>
          </div>
          <div className="thumbnail-strip">
            {property.images.map((img, index) => (
              <button
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''} animate-scale-in`}
                style={{ animationDelay: `${0.1 + index * 0.1}s` }}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} />
              </button>
            ))}
          </div>
        </div>

        <div className="property-hero-info animate-on-scroll animate-fade-in-right">
          <div className="property-badge animate-pop-in">{property.type}</div>
          <h1 className="animate-fade-in-up delay-1">{property.name}</h1>
          <p className="property-tagline animate-fade-in-up delay-2">{property.tagline}</p>
          <p className="property-location animate-fade-in-up delay-3">📍 {property.location}</p>
          
          <div className="property-price-box animate-scale-in delay-4">
            <div className="price-main">
              <span className="price-label">Asking Price</span>
              <span className="price-value gradient-text-animate">{property.price ? formatPrice(property.price) : "Contact for Price"}</span>
            </div>
            {property.pricePerAcre && (
              <div className="price-secondary">
                <span>{formatPricePerAcre(property.pricePerAcre)}</span>
              </div>
            )}
          </div>

          <div className="property-quick-specs">
            <div className="quick-spec animate-pop-in delay-1 border-draw">
              <span className="spec-icon">📐</span>
              <div>
                <span className="spec-value">{property.size}</span>
                <span className="spec-label">Acres</span>
              </div>
            </div>
            <div className="quick-spec animate-pop-in delay-2 border-draw">
              <span className="spec-icon">👁️</span>
              <div>
                <span className="spec-value">270°</span>
                <span className="spec-label">Ocean Views</span>
              </div>
            </div>
            <div className="quick-spec animate-pop-in delay-3 border-draw">
              <span className="spec-icon">🏗️</span>
              <div>
                <span className="spec-value">12K</span>
                <span className="spec-label">Sq Ft Plans</span>
              </div>
            </div>
          </div>

          <button 
            className="btn-primary cta-button"
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Schedule a Private Tour
          </button>
        </div>
      </div>
      <div className="media-section animate-on-scroll animate-fade-in-up">
        <h2 className="animate-fade-in-up">Property Media</h2>
        <div className="media-grid full-width">
          <div className="video-gallery">
            <div className="main-video">
              <video
                src={cloudinaryVideos[selectedVideo].url}
                muted
                playsInline
                preload="metadata"
                className="video-preview-media"
                onLoadedMetadata={(e) => {
                  if (e.currentTarget.duration) {
                    e.currentTarget.currentTime = 0.1;
                  }
                }}
              />
              <button
                type="button"
                className="video-preview"
                onClick={() => openVideo(cloudinaryVideos[selectedVideo], selectedVideo)}
                aria-label={`Play ${cloudinaryVideos[selectedVideo].title}`}
              >
                <div className="play-button">
                  <span>&#9654;</span>
                </div>
              </button>
            </div>
            <div className="video-thumbnail-strip">
              {cloudinaryVideos.map((video, index) => (
                <button
                  key={index}
                  type="button"
                  className={`video-thumbnail ${selectedVideo === index ? 'active' : ''}`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                  onClick={() => setSelectedVideo(index)}
                  aria-label={`Preview ${video.title}`}
                >
                  <video
                    src={video.url}
                    muted
                    playsInline
                    preload="metadata"
                    onLoadedMetadata={(e) => {
                      if (e.currentTarget.duration) {
                        e.currentTarget.currentTime = 0.1;
                      }
                    }}
                  />
                  <span className="video-thumbnail-play">&#9654;</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="tabs-section animate-on-scroll">
        <div className="tabs-nav">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button 
            className={`tab-btn ${activeTab === 'location' ? 'active' : ''}`}
            onClick={() => setActiveTab('location')}
          >
            Location
          </button>

        </div>

        <div className="tab-content">
          <div className={`tab-pane ${activeTab === 'overview' ? 'active' : ''}`}>
            {activeTab === 'overview' && (
              <div className="overview-tab animate-in">
                <div className="description-section">
                  <h3>About This Property</h3>
                  <p className="lead-description">{property.description}</p>
                  <div className="detailed-description">
                    {property.detailedDescription.split('\n\n').map((para, index) => (
                      <p key={index}>{para}</p>
                    ))}
                  </div>
                </div>
                
                <div className="features-section">
                  <h3>Property Features</h3>
                  <div className="features-grid">
                    {property.features.map((feature, index) => (
                      <div 
                        key={index} 
                        className="feature-item scroll-feature-item"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <span className="check-icon">✓</span>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`tab-pane ${activeTab === 'specs' ? 'active' : ''}`}>
            {activeTab === 'specs' && (
              <div className="specs-tab animate-in">
                <div className="specs-container">
                  <h3>Property Specifications</h3>
                  <div className="specs-table">
                    {Object.entries(property.specifications).map(([key, value]) => (
                      <div key={key} className="spec-row">
                        <span className="spec-name">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </span>
                        <span className="spec-detail">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className={`tab-pane ${activeTab === 'location' ? 'active' : ''}`}>
            {activeTab === 'location' && (
              <div className="location-tab animate-in">
                <h3>Location Details</h3>
                <div className="location-grid">
                  <div className="location-info">
                    <div className="location-card">
                      <h4>📍 Address</h4>
                      <p>{property.address}</p>
                    </div>
                    <div className="location-card">
                      <h4>🗺️ Coordinates</h4>
                      <p>{property.locationDetails.coordinates}</p>
                    </div>
                    <div className="location-card">
                      <h4>🏙️ Distance Info</h4>
                      <p>{property.locationDetails.nearestCity}</p>
                      <p className="distance-info">
                        • {property.locationDetails.distanceToAirport}<br/>
                        • {property.locationDetails.distanceToRailway}<br/>
                        • {property.locationDetails.nearbyPlaces}
                      </p>
                    </div>
                  </div>
                  <div className="map-box">
                    <iframe 
                      src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50.00000000000001!2d79.8035350!3d11.8218510!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s11.8218510%2C79.8035350!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin`} 
                      width="100%" 
                      height="350" 
                      style={{border: 0, borderRadius: '16px'}} 
                      allowFullScreen="" 
                      loading="lazy" 
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Property Location"
                    ></iframe>
                  </div>
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {showVideo && (
        <div className="video-modal" onClick={() => setShowVideo(false)}>
          <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="video-close" onClick={() => setShowVideo(false)}>×</button>
            <button className="video-nav video-prev" onClick={(e) => { e.stopPropagation(); navigateVideo('prev'); }}>❮</button>
            <button className="video-nav video-next" onClick={(e) => { e.stopPropagation(); navigateVideo('next'); }}>❯</button>
            <video controls autoPlay key={activeVideo?.url}>
              <source src={activeVideo?.url || property.droneVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            {activeVideo && <div className="video-modal-title">{activeVideo.title}</div>}
          </div>
        </div>
      )}
    </section>
  );
}
