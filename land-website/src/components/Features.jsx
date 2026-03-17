import { useEffect, useRef } from 'react';
import { features } from '../data/lands';

export default function Features() {
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

    const elements = sectionRef.current?.querySelectorAll('.animate-on-scroll, .animate-fade-in-up, .animate-scale-in, .animate-pop-in');
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" className="features" ref={sectionRef}>
      <div className="feature-grid-bg"></div>
      <div className="container">
        <div className="section-header animate-on-scroll animate-fade-in-up">
          <h2 className="decorative-line">Why Choose Us</h2>
          <p className="animate-fade-in-up delay-1">Your trusted partner in land acquisition</p>
        </div>

        <div className="features-grid">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card animate-on-scroll animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-icon animate-pop-in" style={{ animationDelay: `${index * 0.1 + 0.15}s` }}>{feature.icon}</div>
              <h3 className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}>{feature.title}</h3>
              <p className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1 + 0.25}s` }}>{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
