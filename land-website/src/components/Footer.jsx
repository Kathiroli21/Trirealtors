import { useEffect, useRef } from 'react';
import logoImg from '../assets/images/logo/file_00000000694c720bb7bf164f039147b9.png';

export default function Footer() {
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = footerRef.current?.querySelectorAll('.animate-on-scroll, .animate-fade-in-up');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer" ref={footerRef}>
      <div className="footer-pattern"></div>
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand animate-on-scroll animate-fade-in-left">
            <div className="logo">
              <img src={logoImg} alt="Trirealtors Logo" className="logo-img" />
              <span className="logo-text">Trirealtors</span>
            </div>
            <p style={{ color: 'rgba(255, 255, 255, 0.7)', marginTop: '16px', lineHeight: 1.7 }}>
              Premium beachside land investment opportunities in Pondicherry.
            </p>
          </div>

          <div className="footer-links centered animate-on-scroll animate-fade-in-right">
            <h4>Quick Links</h4>
            <ul>
              <li><a onClick={() => scrollToSection('hero')}>Home</a></li>
              <li><a onClick={() => scrollToSection('property')}>Property</a></li>
              <li><a onClick={() => scrollToSection('contact')}>Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom animate-on-scroll animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <p>&copy; 2026 Trirealtors. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
