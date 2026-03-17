import { useState, useEffect, useRef } from 'react';
import { property } from '../data/lands';
import { getApiUrl } from '../lib/api';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    preferredLand: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
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
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll, .animate-fade-in-up, .animate-fade-in-left, .animate-fade-in-right, .animate-scale-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSending(true);

    try {
      const response = await fetch(getApiUrl('/api/send-email'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      console.log(response);

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '', preferredLand: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert('Failed to send email. Please try again.');
      }
    } catch (error) {
      alert('Error sending email. Please try again.');
    } finally {
      setSending(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="contact-shapes">
        <div className="contact-shape contact-shape-1"></div>
        <div className="contact-shape contact-shape-2"></div>
        <div className="contact-shape contact-shape-3"></div>
      </div>
      <div className="container">
        <div className="section-header">
          <h2>Get In Touch</h2>
          <p>Interested in this property? Contact us today!</p>
        </div>

        <div className="contact-wrapper">
          <div className="contact-info">
            <div className="info-item">
              <span className="info-icon">📍</span>
              <div>
                <h4>Property Location</h4>
                <p>Kirumampakkam, Reddichavady, Pondicherry, Tamil Nadu</p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon email-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2">
                  <rect x="2" y="4" width="20" height="16" rx="2"/>
                  <path d="M22 6l-10 7L2 6"/>
                </svg>
              </span>
              <div>
                <h4>Email Us</h4>
                <p><a href="mailto:Trirealtors@gmail.com">Trirealtors@gmail.com</a></p>
              </div>
            </div>
            <div className="info-item">
              <span className="info-icon">📞</span>
              <div>
                <h4>Call Us</h4>
                <p><a href="tel:+919999999999">+91 99999 99999</a></p>
              </div>
            </div>
            <div className="map-container">
              <iframe 
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50.00000000000001!2d79.8035350!3d11.8218510!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s11.8218510%2C79.8035350!5e0!3m2!1sen!2sin!4v1709999999999!5m2!1sen!2sin`} 
                width="100%" 
                height="250" 
                style={{border: 0, borderRadius: '16px'}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location"
              ></iframe>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitted && (
              <div className="success-message animate-scale-in">
                ✓ Thank you! We'll be in touch soon.
              </div>
            )}
            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label>Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Your full name"
              />
              {errors.name && <span className="error-text">{errors.name}</span>}
            </div>
            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
              <label>Email *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="your@email.com"
              />
              {errors.email && <span className="error-text">{errors.email}</span>}
            </div>
            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label>Phone</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 00000 00000"
              />
            </div>
            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.25s' }}>
              <label>Interested In</label>
              <select name="preferredLand" value={formData.preferredLand} onChange={handleChange}>
                <option value="">Select a property (optional)</option>
                <option value={property.name}>{property.name}</option>
              </select>
            </div>
            <div className="form-group animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label>Message *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Tell us about your requirements..."
                rows="5"
              />
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>
            <button type="submit" className="btn-primary submit-btn pulse-cta" disabled={sending}>
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
