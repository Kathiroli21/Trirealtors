import { useState, useEffect } from 'react';
import logoImg from '../assets/images/logo/file_00000000694c720bb7bf164f039147b9.png';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <div className="logo" onClick={() => scrollToSection('hero')}>
          <img src={logoImg} alt="Trirealtors Logo" className="logo-img" />
          <span className="logo-text">Trirealtors</span>
        </div>

        <div className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          <a onClick={() => scrollToSection('hero')} className="nav-link">Home</a>
          <a onClick={() => scrollToSection('property')} className="nav-link">Property</a>
          <a onClick={() => scrollToSection('contact')} className="nav-link">Contact</a>
        </div>

        <button className="cta-btn animate-fade-in" onClick={() => scrollToSection('property')}>
          View Property
        </button>

        <button 
          className={`hamburger ${mobileMenuOpen ? 'open' : ''}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="mobile-menu">
          <a onClick={() => scrollToSection('hero')}>Home</a>
          <a onClick={() => scrollToSection('property')}>Property</a>
          <a onClick={() => scrollToSection('contact')}>Contact</a>
        </div>
      )}
    </nav>
  );
}
