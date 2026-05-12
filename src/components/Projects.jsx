import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const PROJECTS = [
  { cat:'AI & ML', emoji:'🧠', title:'Multimodal Eye Disease Classifier', desc:'Combines OCT image analysis using Vision CNN + NLP symptom data for eye disease classification. Integrated RAG chatbot for real-time patient guidance. React frontend + FastAPI backend.', tech:['PyTorch','ViT','FastAPI','React','NLP'], url:'https://github.com/Ashansanjana' },
  { cat:'AI & ML', emoji:'🫘', title:'CKD Prediction Using ML', desc:'ML models predicting Chronic Kidney Disease with 90%+ accuracy. Full EDA and visualizations identifying key health indicators.', tech:['Python','Flask','Scikit-learn','Pandas','NumPy'], url:'https://github.com/Ashansanjana' },
  { cat:'AI & ML', emoji:'📄', title:'RAG Chat with Multiple PDFs', desc:'Chat with multiple PDFs using natural language. LangChain RAG + ChromaDB vector storage + Gemini 2.5-pro LLM.', tech:['LangChain','ChromaDB','Gemini 2.5-pro','Streamlit'], url:'https://github.com/Ashansanjana' },
  { cat:'AI & ML', emoji:'⚖️', title:'AI Legal Document Explainer', desc:'Upload legal docs, get AI-powered simplified explanations, highlighted clauses, risk flags and context-aware Q&A.', tech:['FastAPI','React','Gemini API','LangChain','PyMuPDF'], url:'https://github.com/Ashansanjana' },
  { cat:'AI & ML', emoji:'✈️', title:'AI Travel Guide Assistant', desc:'AI travel assistant for trip planning, destination discovery, and personalized itineraries with downloadable city reports.', tech:['CrewAI','LangChain','Gemini API','Streamlit'], url:'https://github.com/Ashansanjana' },
  { cat:'AI & ML', emoji:'📈', title:'Stock Market Prediction LSTM', desc:'LSTM deep learning model forecasting stock price trends from historical data with preprocessing and visualization.', tech:['Python','TensorFlow/Keras','Pandas','Matplotlib'], url:'https://github.com/Ashansanjana' },
  { cat:'AI & ML', emoji:'🃏', title:'Poker Hand Detector (Ongoing)', desc:'Real-time CV system detecting poker hands via webcam using YOLO object detection.', tech:['YOLO','OpenCV','Flask','Python'], url:'https://github.com/Ashansanjana' },
  { cat:'Web', emoji:'🏥', title:'HealthHub Smart Hospital', desc:'Smart Hospital Management System with role-based access, digital prescriptions, and admin dashboards.', tech:['Spring Boot','React','MySQL'], url:'https://github.com/Ashansanjana/HealthHub_Smart-Hospital' },
  { cat:'IoT', emoji:'🚂', title:'Smart Railway Gate Control', desc:'IoT automated railway gate control using real-time GPS tracking and mobile app integration for safety.', tech:['ESP32','C','Firebase','React Native','GPS'], url:'https://github.com/Ashansanjana/Smart-Railway-Gate-Control-System-with-GPS-Tracking' },
];

const TABS = ['All','AI & ML','Web','IoT'];

export default function Projects() {
  const [activeTab, setActiveTab] = useState('All');
  const [secRef, secVisible] = useReveal();

  const filtered = activeTab === 'All' ? PROJECTS : PROJECTS.filter(p => p.cat === activeTab);

  return (
    <section id="projects">
      <div className="container">
        <div ref={secRef}>
          <div className={`section-label reveal-left${secVisible ? ' visible' : ''}`}>What I Built</div>
          <h2 className={`section-title reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.1s'}}>
            My <span>Projects</span>
          </h2>
          <div className="section-line" />
          <div className="filter-tabs">
            {TABS.map(t => (
              <button key={t} className={`filter-tab${activeTab === t ? ' active' : ''}`} onClick={() => setActiveTab(t)}>{t}</button>
            ))}
          </div>
          <div className="projects-grid">
            {filtered.map((p, i) => (
              <div key={p.title} className="project-card reveal visible" style={{transitionDelay:`${i * .05}s`}}>
                <div className="project-emoji">{p.emoji}</div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-techs">
                  {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
                <a href={p.url} target="_blank" rel="noreferrer" className="project-link">
                  ⌥ GitHub
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
