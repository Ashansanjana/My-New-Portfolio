import { useEffect, useRef, useState } from 'react';

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

const LEFT_SKILLS = [
  { category: 'Languages',  techs: ['Python', 'Java', 'C++', 'JavaScript', 'HTML/CSS', 'PHP'],               percent: 90 },
  { category: 'AI & ML',    techs: ['TensorFlow', 'PyTorch', 'Scikit-learn', 'OpenCV', 'HuggingFace'],        percent: 88 },
  { category: 'Gen AI',     techs: ['LangChain', 'LangGraph', 'CrewAI', 'Gemini API'],                        percent: 85 },
  { category: 'Backend',    techs: ['FastAPI', 'Spring Boot', 'Node.js', 'Firebase'],                         percent: 82 },
];

const RIGHT_SKILLS = [
  { category: 'Frontend',   techs: ['React.js', 'Streamlit', 'Tailwind CSS'],                                 percent: 88 },
  { category: 'Databases',  techs: ['MySQL', 'MongoDB', 'ChromaDB'],                                          percent: 85 },
  { category: 'Tools',      techs: ['Git', 'Docker', 'Postman', 'Figma', 'Jupyter', 'Arduino'],               percent: 90 },
];

export default function Skills() {
  const [secRef, secVisible] = useReveal();

  const SkillBar = ({ skill, i, baseDelay }) => (
    <div
      className={`skill-bar-wrap reveal${secVisible ? ' visible' : ''}`}
      style={{ transitionDelay: `${baseDelay + i * 0.1}s` }}
    >
      {/* Category title + percent */}
      <div className="skill-bar-header">
        <span className="skill-cat-name">{skill.category}</span>
        <span className="skill-cat-pct">{skill.percent}%</span>
      </div>

      {/* Progress bar */}
      <div className="skill-bar-track">
        <div
          className="skill-bar-fill"
          style={{
            width: secVisible ? `${skill.percent}%` : '0%',
            transitionDelay: `${baseDelay + 0.15 + i * 0.1}s`,
          }}
        />
      </div>

      {/* Tech chips */}
      <div className="skill-chips">
        {skill.techs.map((t) => (
          <span key={t} className="skill-chip">{t}</span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        {/* Header — left-aligned like Projects */}
        <div ref={secRef} className="skills-header">
          <div
            className={`section-label reveal${secVisible ? ' visible' : ''}`}
          >
            MY EXPERTISE
          </div>
          <h2
            className={`section-title reveal${secVisible ? ' visible' : ''}`}
            style={{ transitionDelay: '.1s' }}
          >
            Technical <span>Skills</span>
          </h2>
          <div className={`section-line reveal${secVisible ? ' visible' : ''}`} style={{ transitionDelay: '.15s' }} />
          <p
            className={`reveal${secVisible ? ' visible' : ''}`}
            style={{ color: 'var(--text-secondary)', transitionDelay: '.2s', marginBottom: '48px' }}
          >
            Technologies I work with daily to build robust, scalable applications.
          </p>
        </div>

        {/* Two-column grid */}
        <div className="skills-grid">
          <div className="skills-column">
            {LEFT_SKILLS.map((skill, i) => (
              <SkillBar key={skill.category} skill={skill} i={i} baseDelay={0.2} />
            ))}
          </div>
          <div className="skills-column">
            {RIGHT_SKILLS.map((skill, i) => (
              <SkillBar key={skill.category} skill={skill} i={i} baseDelay={0.3} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

