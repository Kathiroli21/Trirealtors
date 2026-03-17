import { useState, useEffect, useRef } from 'react';
import { testimonials } from '../data/lands';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="testimonials" className="testimonials" ref={sectionRef}>
      <div className="container">
        <div className="section-header animate-on-scroll">
          <h2>What Our Clients Say</h2>
          <p>Trusted by landowners across the country</p>
        </div>

        <div className="testimonial-carousel animate-on-scroll">
          <div className="testimonial-card">
            <div className="quote-icon">"</div>
            <p className="testimonial-text">{testimonials[currentIndex].text}</p>
            <div className="testimonial-author">
              <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
              <div className="author-info">
                <h4>{testimonials[currentIndex].name}</h4>
                <span>{testimonials[currentIndex].location}</span>
              </div>
            </div>
            <div className="star-rating">
              {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                <span key={i} className="star">★</span>
              ))}
            </div>
          </div>

          <div className="carousel-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
