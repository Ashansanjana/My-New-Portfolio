import ParticleCanvas from './ParticleCanvas';
import Typewriter from './Typewriter';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <ParticleCanvas />
      <div className="container">
        <div className="hero-inner">
          <div className="hero-content">
            <div className="hero-greeting">Hello, I'm</div>
            <h1 className="hero-name">
              Ashan <span>Sanjana</span>
            </h1>
            <Typewriter />
            <p className="hero-bio">
              Computer Engineering Undergraduate at University of Jaffna — bridging complex AI research and practical software solutions.
            </p>
            <div className="hero-btns">
              <a href="#projects" className="btn-primary" onClick={e=>{e.preventDefault();document.getElementById('projects').scrollIntoView({behavior:'smooth'});}}>View My Work</a>
              <a href="#contact" className="btn-outline" onClick={e=>{e.preventDefault();document.getElementById('contact').scrollIntoView({behavior:'smooth'});}}>Hire Me</a>
            </div>
            <div className="hero-socials">
              {[
                { href:'https://github.com/Ashansanjana', icon:'⌥', label:'GitHub' },
                { href:'https://www.linkedin.com/in/ashan-sanjana-53107b36b', icon:'in', label:'LinkedIn' },
                { href:'mailto:ashansanjana03@gmail.com', icon:'✉', label:'Email' },
                { href:'https://wa.me/94775986195', icon:'✆', label:'WhatsApp' },
              ].map((s,i) => (
                <a key={i} href={s.href} target="_blank" rel="noreferrer" className="social-icon" title={s.label}
                  style={{animationDelay:`${1 + i*0.1}s`, animation:'fadeInUp .5s ease both'}}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>
          <div className="hero-img-wrap">
            <img
              src="https://avatars.githubusercontent.com/u/160347827?v=4"
              alt="Ashan Sanjana"
              className="hero-img"
            />
          </div>
        </div>
      </div>
      <div className="hero-scroll">↓ scroll</div>
    </section>
  );
}
