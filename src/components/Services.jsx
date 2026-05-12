import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const SERVICES = [
  { emoji:'🤖', title:'AI Model Development', desc:'Building and training ML/DL models for classification, prediction, and detection tasks.' },
  { emoji:'🔗', title:'RAG & LLM Applications', desc:'Document-grounded AI agents using LangChain, ChromaDB, and Gemini.' },
  { emoji:'👁️', title:'Computer Vision Systems', desc:'Image classification, YOLO object detection, and multimodal pipelines.' },
  { emoji:'🌐', title:'Full-Stack Web Apps', desc:'React frontend + FastAPI/Spring Boot backend + SQL/NoSQL databases.' },
  { emoji:'📊', title:'Data Analysis & Visualization', desc:'EDA, feature engineering, and insight reporting with Python.' },
  { emoji:'🔌', title:'IoT Integration', desc:'ESP32/Arduino with cloud sync, real-time monitoring, and mobile app control.' },
];

export default function Services() {
  const [secRef, secVisible] = useReveal();

  return (
    <section id="services">
      <div className="container">
        <div ref={secRef}>
          <div className={`section-label reveal-left${secVisible ? ' visible' : ''}`}>What I Offer</div>
          <h2 className={`section-title reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.1s'}}>
            My <span>Services</span>
          </h2>
          <div className="section-line" />
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div key={i} className={`service-card reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:`${.1 + i * .1}s`}}>
                <div className="service-icon-wrap">{s.emoji}</div>
                <h3 className="service-title">{s.title}</h3>
                <p className="service-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
