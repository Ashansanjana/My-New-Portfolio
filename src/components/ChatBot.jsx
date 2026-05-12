import { useState, useRef, useEffect } from 'react';

/* ─── Knowledge base about Ashan ─────────────────────────── */
const KB = {
  greet: [
    "Hi! I'm Ashan's AI assistant 🤖 I have full access to his portfolio data. Ask me about his **skills**, **projects**, **experience**, or **education**!",
  ],
  skills: [
    "Ashan's technical stack covers:\n\n🧠 **Languages** — Python, Java, C++, JavaScript, HTML/CSS, PHP\n⚙️ **AI & ML** — TensorFlow, PyTorch, Scikit-learn, OpenCV, HuggingFace\n✨ **Gen AI** — LangChain, LangGraph, CrewAI, Gemini API\n🚀 **Backend** — FastAPI, Spring Boot, Node.js, Firebase\n🎨 **Frontend** — React.js, Streamlit, Tailwind CSS\n🗄️ **Databases** — MySQL, MongoDB, ChromaDB\n🛠️ **Tools** — Git, Docker, Postman, Figma, Jupyter, Arduino",
  ],
  projects: [
    "Here are some of Ashan's notable projects:\n\n🧬 **Multimodal Eye Disease Classifier** — Vision CNN + NLP symptom analysis with RAG chatbot. React + FastAPI.\n📊 **CKD Prediction with ML** — Predicts Chronic Kidney Disease with 90%+ accuracy using ensemble ML.\n💬 **RAG Chat with Multiple PDFs** — LangChain + ChromaDB + Gemini 2.5 LLM for intelligent PDF Q&A.\n🤖 **CrewAI Multi-Agent System** — Autonomous research & code generation agents using CrewAI & LangGraph.\n🌐 **Portfolio Website** — This very site! Built with React, Vite, and custom CSS animations.",
  ],
  experience: [
    "Ashan's experience includes:\n\n💼 **AI/ML Intern** — Worked on real-world deep learning pipelines and NLP solutions.\n🔬 **Research** — Contributed to computer vision and multimodal AI research projects.\n🏫 **University Projects** — Full-stack systems, IoT with Arduino/ESP32, and AI-powered applications.\n🌍 **Freelance** — Delivered web development and automation solutions for clients.",
  ],
  education: [
    "🎓 Ashan is currently pursuing a **Bachelor's degree in Computer Science / Software Engineering** with a focus on AI & Machine Learning.\n\nHe has strong academic grounding in algorithms, data structures, software architecture, and applied AI.",
  ],
  contact: [
    "You can reach Ashan through:\n\n📧 **Email** — Available via the Contact section on this site\n💼 **LinkedIn** — Check his profile linked in the footer\n🐙 **GitHub** — Explore his open-source work via the links in the footer\n\nFeel free to scroll down to the **Contact** section to send him a message directly!",
  ],
  default: [
    "I'm not sure about that, but I can tell you about Ashan's **skills**, **projects**, **experience**, **education**, or how to **contact** him. What would you like to know?",
  ],
};

function getBotReply(input) {
  const q = input.toLowerCase();
  if (/hi|hello|hey|sup|hola/.test(q)) return KB.greet[0];
  if (/skill|tech|language|stack|tool|framework|library/.test(q)) return KB.skills[0];
  if (/project|built|made|work|portfolio|app|system|classifier|ckd|pdf|rag/.test(q)) return KB.projects[0];
  if (/experience|intern|job|work|freelance|career/.test(q)) return KB.experience[0];
  if (/education|study|degree|university|college|academic/.test(q)) return KB.education[0];
  if (/contact|email|reach|hire|linkedin|github/.test(q)) return KB.contact[0];
  return KB.default[0];
}

/* ─── Markdown-lite renderer (bold + line-breaks) ────────── */
function MsgText({ text }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <span>
      {parts.map((p, i) =>
        p.startsWith('**') && p.endsWith('**')
          ? <strong key={i}>{p.slice(2, -2)}</strong>
          : p.split('\n').map((line, j) => (
              <span key={`${i}-${j}`}>{line}{j < p.split('\n').length - 1 && <br />}</span>
            ))
      )}
    </span>
  );
}

/* ─── Main component ─────────────────────────────────────── */
export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: KB.greet[0], id: 0 },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg = { from: 'user', text, id: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const reply = getBotReply(text);
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: reply, id: Date.now() + 1 }]);
    }, 800 + Math.random() * 400);
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const QUICK = ['Skills', 'Projects', 'Experience', 'Education', 'Contact'];

  return (
    <>
      {/* ── Chat panel ── */}
      <div className={`cb-panel${open ? ' cb-open' : ''}`} role="dialog" aria-label="Portfolio Assistant">
        {/* Header */}
        <div className="cb-header">
          <div className="cb-avatar">A</div>
          <div className="cb-header-info">
            <span className="cb-name">Ashan's Assistant</span>
            <span className="cb-status"><span className="cb-dot" />Online | Powered by Portfolio Data</span>
          </div>
          <button className="cb-close" onClick={() => setOpen(false)} aria-label="Close chat">✕</button>
        </div>

        {/* Messages */}
        <div className="cb-messages">
          {messages.map(m => (
            <div key={m.id} className={`cb-bubble-wrap ${m.from}`}>
              <div className={`cb-bubble cb-bubble-${m.from}`}>
                <MsgText text={m.text} />
              </div>
            </div>
          ))}
          {typing && (
            <div className="cb-bubble-wrap bot">
              <div className="cb-bubble cb-bubble-bot cb-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick replies */}
        <div className="cb-quick">
          {QUICK.map(q => (
            <button key={q} className="cb-quick-btn" onClick={() => { setInput(q); setTimeout(send, 50); }}>
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="cb-input-row">
          <input
            ref={inputRef}
            className="cb-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Ask about projects, skills, experience…"
          />
          <button className="cb-send" onClick={send} aria-label="Send message">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* ── Toggle button ── */}
      <button
        className={`cb-toggle${open ? ' cb-toggle-open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Toggle chat"
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        }
      </button>
    </>
  );
}
