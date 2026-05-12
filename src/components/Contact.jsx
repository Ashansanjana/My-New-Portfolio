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

export default function Contact() {
  const [secRef, secVisible] = useReveal();
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => setStatus('sent'), 1500);
  };

  return (
    <section id="contact">
      <div className="container">
        <div ref={secRef}>
          <div className={`section-label reveal-left${secVisible ? ' visible' : ''}`}>Get In Touch</div>
          <h2 className={`section-title reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.1s'}}>
            Contact <span>Me</span>
          </h2>
          <div className="section-line" />
          <div className="contact-grid">
            <div className={`reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.1s'}}>
              <h3 style={{fontSize:22,fontWeight:700,marginBottom:12}}>Let's work together</h3>
              <p style={{color:'var(--text-secondary)',lineHeight:1.8,marginBottom:8}}>
                I'm currently open to new opportunities — whether it's a full-time role, freelance project, or research collaboration. Let's build something amazing together.
              </p>
              <div className="contact-info-cards">
                {[
                  { icon:'📍', label:'Location', val:'Nattandiya, Sri Lanka' },
                  { icon:'✉️', label:'Email', val:'ashansanjana03@gmail.com' },
                  { icon:'📞', label:'Phone', val:'+94 77 598 6195' },
                ].map((c, i) => (
                  <div key={i} className="contact-card" style={{transitionDelay:`${.15 + i * .08}s`}}>
                    <div className="contact-icon">{c.icon}</div>
                    <div>
                      <div className="contact-lbl">{c.label}</div>
                      <div className="contact-val">{c.val}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className={`reveal${secVisible ? ' visible' : ''}`} style={{transitionDelay:'.2s'}}>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label>Name</label>
                    <input type="text" placeholder="Your name" required />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" placeholder="your@email.com" required />
                  </div>
                </div>
                <div className="form-group">
                  <label>Subject</label>
                  <input type="text" placeholder="Project inquiry..." required />
                </div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea rows={6} placeholder="Tell me about your project..." required />
                </div>
                <button type="submit" className="btn-send">
                  {status === 'sending' ? '⏳ Sending...' : status === 'sent' ? '✅ Message Sent!' : '🚀 Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
