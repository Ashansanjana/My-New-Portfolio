import { useEffect, useRef, useState } from 'react';

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

function Counter({ target, suffix = '' }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 2000;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(easeOut(t) * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return (
    <div className="stat-card reveal" ref={ref} style={visible ? {opacity:1,transform:'none'} : {}}>
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-lbl">{suffix === '+' ? '' : ''}</div>
    </div>
  );
}

const STATS = [
  { num: 9, suffix: '+', label: 'Projects' },
  { num: 2, suffix: '', label: 'Hackathons' },
  { num: 38, suffix: '', label: 'GitHub Repos' },
  { num: 1, suffix: '', label: 'Active Research' },
];

export default function About() {
  const [secRef, secVisible] = useReveal(0.15);
  const [imgRef, imgVisible] = useReveal(0.15);
  const [txtRef, txtVisible] = useReveal(0.15);

  return (
    <section id="about">
      <div className="container">
        <div ref={secRef} className={`reveal-left${secVisible ? ' visible' : ''}`}>
          <div className="section-label">Who I Am</div>
        </div>
        <h2 className={`section-title reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.1s'}}>
          About <span>Me</span>
        </h2>
        <div className="section-line" />
        <div className="about-grid">
          <div ref={imgRef} className={`reveal${imgVisible ? ' visible' : ''}`}>
            <div className="about-img-wrap">
              <img src="https://avatars.githubusercontent.com/u/160347827?v=4" alt="Ashan Sanjana" className="about-img" />
              <div className="exp-badge">3+ Years Exp.</div>
            </div>
          </div>
          <div ref={txtRef} className={`reveal${txtVisible ? ' visible' : ''}`} style={{transitionDelay:'.15s'}}>
            <p style={{color:'var(--text-secondary)',lineHeight:1.9,marginBottom:24}}>
              I am a passionate AI Engineer and Computer Engineering undergraduate at the University of Jaffna, Sri Lanka.
              I specialize in building intelligent systems — from multimodal disease classifiers using Vision Transformers to
              RAG-powered document agents — turning complex AI research into working software. Currently mastering MLOps
              pipelines, Advanced RAG architectures, and Edge AI deployment.
            </p>
            <div className="about-info-grid">
              {[
                ['Name', 'Ashan Sanjana'],['Degree','BSc. (Hons.) Computer Engineering'],
                ['Location','Nattandiya, Sri Lanka'],['Email','ashansanjana03@gmail.com'],
                ['Phone','+94 77 598 6195'],['Status','Open to Opportunities'],
              ].map(([label, val], i) => (
                <div className="info-row" key={i} style={{transitionDelay:`${.1 + i * .05}s`}}>
                  <span className="info-label">{label}</span>
                  <span className="info-val">{val}</span>
                </div>
              ))}
            </div>
            <div className="stats-grid">
              {STATS.map((s, i) => (
                <div key={i}>
                  <StatCard target={s.num} suffix={s.suffix} label={s.label} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ target, suffix, label }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useReveal(0.3);

  useEffect(() => {
    if (!visible) return;
    const start = performance.now();
    const duration = 2000;
    const easeOut = t => 1 - Math.pow(1 - t, 3);
    const tick = (now) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round(easeOut(t) * target));
      if (t < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [visible, target]);

  return (
    <div className="stat-card" ref={ref}>
      <div className="stat-num">{count}{suffix}</div>
      <div className="stat-lbl">{label}</div>
    </div>
  );
}
