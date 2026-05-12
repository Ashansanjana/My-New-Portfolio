import { useEffect, useState } from 'react';

const ROLES = ['AI Engineer', 'Computer Vision Specialist', 'Full-Stack Developer', 'RAG Systems Builder'];

export default function Typewriter() {
  const [display, setDisplay] = useState('');
  const [roleIdx, setRoleIdx] = useState(0);
  const [typing, setTyping] = useState(true);
  const [charIdx, setCharIdx] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIdx];
    let timer;
    if (typing) {
      if (charIdx < current.length) {
        timer = setTimeout(() => setCharIdx(i => i + 1), 80);
      } else {
        timer = setTimeout(() => setTyping(false), 2000);
      }
    } else {
      if (charIdx > 0) {
        timer = setTimeout(() => setCharIdx(i => i - 1), 40);
      } else {
        setRoleIdx(i => (i + 1) % ROLES.length);
        setTyping(true);
      }
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timer);
  }, [charIdx, typing, roleIdx]);

  return (
    <div className="hero-typewriter">
      {display}<span className="cursor">|</span>
    </div>
  );
}
