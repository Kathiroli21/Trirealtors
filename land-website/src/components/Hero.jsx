import { useEffect, useRef } from 'react';
import { property } from '../data/lands';

export default function Hero() {
  const heroRef = useRef(null);

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
      { threshold: 0.1 }
    );

    const elements = heroRef.current?.querySelectorAll('.animate-on-load');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToProperty = () => {
    document.getElementById('property')?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatPrice = (price) => {
    if (!price) return "Contact for Price";
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <section id="hero" className="hero" ref={heroRef}>
      <div className="hero-bg">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
        <div className="shape shape-6"></div>
        <div className="floating-shape floating-shape-1"></div>
        <div className="floating-shape floating-shape-2"></div>
        <div className="floating-shape floating-shape-3"></div>
        <div className="floating-shape floating-shape-4"></div>
        <div className="floating-shape floating-shape-5"></div>
        <div className="floating-shape floating-shape-6"></div>
        <div className="geometric-pattern"></div>
        <div className="dots-pattern"></div>
        <div className="grid-pattern"></div>
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
        <div className="particles">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="particle" style={{ '--delay': `${i * 0.4}s`, '--x': `${Math.random() * 100}%`, '--duration': `${4 + Math.random() * 4}s` }}></div>
          ))}
        </div>
      </div>

      <div className="container hero-content">
        <div className="hero-badge animate-on-load">Exclusive Listing</div>
        <h1 className="animate-on-load">
          {property.name}
        </h1>
        <p className="hero-tagline animate-on-load delay-1">
          {property.tagline} • {property.location}
        </p>
        <p className="hero-description animate-on-load delay-1">
          {property.description.substring(0, 150)}...
        </p>
        <div className="hero-price animate-on-load delay-2">
          <span className="price-label">Asking Price</span>
          <span className="price-amount">{property.price ? formatPrice(property.price) : "Contact for Price"}</span>
        </div>
        <div className="hero-btns animate-on-load delay-2">
          <button className="btn-primary" onClick={scrollToProperty}>
            View Property
          </button>
          <button className="btn-secondary" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Contact
          </button>
        </div>
      </div>

      <div className="scroll-indicator animate-on-load delay-3" onClick={scrollToProperty}>
        <div className="scroll-line">
          <div className="scroll-dot"></div>
        </div>
        <span>Explore</span>
      </div>
    </section>
  );
}
