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

function TimelineItem({ date, title, sub, desc, delay }) {
  const ref = useRef(null);
  const dotRef = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        setVisible(true);
        if (dotRef.current) dotRef.current.classList.add('pulse');
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return (
    <div className="timeline-item" ref={ref}>
      <div className="timeline-dot" ref={dotRef} />
      <div className="timeline-card" style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(30px)',
        transition: `opacity .6s ease ${delay}s, transform .6s ease ${delay}s`
      }}>
        <span className="timeline-date">{date}</span>
        <div className="timeline-title">{title}</div>
        <div className="timeline-sub">{sub}</div>
        <div className="timeline-desc">{desc}</div>
      </div>
    </div>
  );
}

const EDU = [
  { date:'2022–Present', title:'BSc. (Hons.) Computer Engineering', sub:'University of Jaffna, Sri Lanka', desc:'Coursework: ML, Deep Learning, AI, Generative AI, Computer Vision, Embedded Systems, Networks' },
  { date:'2017–2020', title:'G.C.E. Advanced Level (Physical Science)', sub:'Dhammissara National College, Nattandiya', desc:'Results: A – Chemistry, B – Combined Mathematics, C – Physics' },
];
const ACHIEVE = [
  { date:'2024', title:'🏆 MoraXtreme 9.0', sub:'Island Rank 85 out of 380+ teams', desc:'12-hour national coding hackathon' },
  { date:'2024', title:'🔐 ALGOXPLORE 1.0', sub:'Algorithmic & CTF Hackathon by NSBM', desc:'Competitive algorithm and capture-the-flag challenge' },
  { date:'2024', title:'🦈 GitHub Pull Shark Badge', sub:'Active collaborative contributor', desc:'Recognized for merging multiple pull requests in open source' },
  { date:'2024', title:'👥 GitHub Pair Extraordinaire', sub:'Co-authored collaborative commits', desc:'Badge for co-authored contributions across repositories' },
];

export default function Resume() {
  const [tab, setTab] = useState('edu');
  const [secRef, secVisible] = useReveal();

  return (
    <section id="resume">
      <div className="container">
        <div ref={secRef}>
          <div className={`section-label reveal-left${secVisible ? ' visible' : ''}`}>My Journey</div>
          <h2 className={`section-title reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.1s'}}>
            Resume & <span>Timeline</span>
          </h2>
          <div className="section-line" />
          <div className="resume-tabs">
            <button className={`filter-tab${tab === 'edu' ? ' active' : ''}`} onClick={() => setTab('edu')}>Education</button>
            <button className={`filter-tab${tab === 'ach' ? ' active' : ''}`} onClick={() => setTab('ach')}>Experience & Achievements</button>
          </div>
          <div className="tab-content">
            <div className="timeline">
              {(tab === 'edu' ? EDU : ACHIEVE).map((item, i) => (
                <TimelineItem key={i} {...item} delay={i * 0.12} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
