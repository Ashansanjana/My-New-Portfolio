export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">AS</div>
            <p className="footer-tagline">
              AI Engineer & Computer Engineering Undergraduate at University of Jaffna, Sri Lanka. Building intelligent systems that matter.
            </p>
          </div>
          <div>
            <div className="footer-heading">Quick Links</div>
            <ul className="footer-links">
              {['home','about','skills','projects','resume','contact'].map(l => (
                <li key={l}>
                  <a href={`#${l}`} onClick={e => { e.preventDefault(); scrollTo(l); }}>
                    {l.charAt(0).toUpperCase() + l.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <div className="footer-heading">Services</div>
            <ul className="footer-links">
              {['AI Model Development','RAG & LLM Applications','Computer Vision Systems','Full-Stack Web Apps','Data Analysis','IoT Integration'].map(s => (
                <li key={s}><a href="#services" onClick={e => { e.preventDefault(); scrollTo('services'); }}>{s}</a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="footer-copy">
          © 2026 Ashan Sanjana. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
