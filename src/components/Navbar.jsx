import { useState, useEffect } from 'react';

const links = ['Home','About','Skills','Projects','Resume','Services','Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('Home');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = links.map(l => document.getElementById(l.toLowerCase()));
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id.charAt(0).toUpperCase() + e.target.id.slice(1)); });
    }, { threshold: 0.3 });
    sections.forEach(s => s && obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
      <div className="container">
        <div className="nav-inner">
          <span className="nav-logo">AS</span>
          <ul className="nav-links">
            {links.map(l => (
              <li key={l}>
                <a href={`#${l.toLowerCase()}`} className={active === l ? 'active' : ''}
                  onClick={e => { e.preventDefault(); scrollTo(l); }}>
                  {l}
                </a>
              </li>
            ))}
          </ul>
          <div className={`hamburger${menuOpen ? ' open' : ''}`} onClick={() => setMenuOpen(o => !o)}>
            <span /><span /><span />
          </div>
        </div>
        {menuOpen && (
          <div className="mobile-menu">
            {links.map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className={active === l ? 'active' : ''}
                onClick={e => { e.preventDefault(); scrollTo(l); }}>{l}</a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
