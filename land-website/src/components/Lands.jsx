import { useState, useEffect, useRef } from 'react';
import { lands } from '../data/lands';

export default function Lands() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedLand, setSelectedLand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const filteredLands = lands.filter((land) => {
    const matchesFilter = activeFilter === 'All' || land.type === activeFilter;
    const matchesSearch = land.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          land.location.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price);
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'Available': return 'status-available';
      case 'Reserved': return 'status-reserved';
      case 'Sold': return 'status-sold';
      default: return '';
    }
  };

  return (
    <section id="lands" className="lands" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2>Featured Properties</h2>
          <p>Explore our handpicked selection of premium lands</p>
        </div>

        <div className="filter-section animate-on-scroll">
          <div className="filter-buttons">
            {['All', 'Residential', 'Commercial', 'Agricultural', 'Industrial'].map((filter) => (
              <button
                key={filter}
                className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
          <div className="search-box">
            <input
              type="text"
              placeholder="Search by name or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <span className="search-icon">🔍</span>
          </div>
        </div>

        <div className="lands-grid">
          {filteredLands.length > 0 ? (
            filteredLands.map((land, index) => (
              <div
                key={land.id}
                className="land-card animate-on-scroll"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => setSelectedLand(land)}
              >
                <div className="land-image">
                  <img src={land.image} alt={land.name} />
                  <div className="land-overlay"></div>
                  <span className={`land-status ${getStatusClass(land.status)}`}>
                    {land.status}
                  </span>
                  <span className="land-price">{formatPrice(land.price)}</span>
                </div>
                <div className="land-info">
                  <span className="land-type">{land.type}</span>
                  <h3>{land.name}</h3>
                  <p className="land-location">📍 {land.location}</p>
                  <div className="land-details">
                    <span>📐 {land.size} acres</span>
                    <span>🗺️ {land.coordinates}</span>
                  </div>
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-results animate-on-scroll">
              <span className="no-results-icon">🏞️</span>
              <h3>No lands found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>

      {selectedLand && (
        <div className="modal-overlay" onClick={() => setSelectedLand(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedLand(null)}>×</button>
            <div className="modal-content">
              <div className="modal-image">
                <img src={selectedLand.image} alt={selectedLand.name} />
                <span className={`land-status ${getStatusClass(selectedLand.status)}`}>
                  {selectedLand.status}
                </span>
              </div>
              <div className="modal-details">
                <span className="land-type">{selectedLand.type}</span>
                <h2>{selectedLand.name}</h2>
                <p className="modal-location">📍 {selectedLand.location}</p>
                <p className="modal-price">{formatPrice(selectedLand.price)}</p>
                <p className="modal-description">{selectedLand.description}</p>
                
                <div className="specs-grid">
                  <div className="spec-item">
                    <span className="spec-label">Size</span>
                    <span className="spec-value">{selectedLand.size} acres</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Type</span>
                    <span className="spec-value">{selectedLand.type}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Coordinates</span>
                    <span className="spec-value">{selectedLand.coordinates}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label">Status</span>
                    <span className="spec-value">{selectedLand.status}</span>
                  </div>
                </div>

                <div className="features-list">
                  <h4>Features</h4>
                  <ul>
                    {selectedLand.features.map((feature, index) => (
                      <li key={index}>✓ {feature}</li>
                    ))}
                  </ul>
                </div>

                <button className="btn-primary modal-cta">
                  Schedule a Visit
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
