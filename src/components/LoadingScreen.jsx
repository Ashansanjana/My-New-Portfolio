import { useEffect, useRef, useState } from 'react';

export default function LoadingScreen({ onComplete }) {
  const [pct, setPct] = useState(0);
  const [hidden, setHidden] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    const duration = 2500;
    const start = performance.now();
    const easeInOutQuad = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

    const tick = (now) => {
      const elapsed = now - start;
      const raw = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(raw);
      const val = Math.round(eased * 100);
      setPct(val);
      if (barRef.current) barRef.current.style.width = val + '%';
      if (raw < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHidden(true);
          setTimeout(onComplete, 600);
        }, 300);
      }
    };
    requestAnimationFrame(tick);
  }, [onComplete]);

  return (
    <div className={`loading-screen${hidden ? ' hidden' : ''}`}>
      <div className="loading-sys">
        AS v1.0.0 | <span>NEURAL CORE ACTIVE</span>
      </div>
      <div className="loading-title">INITIALIZING AI SYSTEMS...</div>
      <div className="loading-pct">{pct}%</div>
      <div className="loading-bar-wrap">
        <div className="loading-bar" ref={barRef} />
      </div>
    </div>
  );
}
