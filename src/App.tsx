import { useEffect, useRef, useState } from "react";
import "./romantic.css";

export default function App() {
  const [typingDone, setTypingDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentSection, setCurrentSection] = useState<"landing" | "video" | "final">("landing");
  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  // ─── CUSTOMIZE THESE ───────────────────────────────────────────────
  const HER_NAME = "My Love";                          // Change her name
  const SORRY_MESSAGE = "I'm truly, deeply sorry.";   // Main sorry line
  const SUBTITLE = "I’m truly sorry for all the mistakes I’ve made and for hurting you. I’m sorry I wasn’t there when you needed me the most.I regret not showing my love and unintentionally making you cry.You mean everything to me, and I hope you can forgive me ❤️";
  const VIDEO_URL = "/video/apology.mp4";  // Place your video as public/video/apology.mp4
  const FINAL_MESSAGE = "You are my whole world. I promise to do better, to love you better, every single day. 💕";
  const MUSIC_URL = "";                                // Paste a soft music URL or leave empty
  // ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setTimeout(() => setTypingDone(true), 3200);
    const btnTimer = setTimeout(() => setShowButton(true), 4500);
    return () => { clearTimeout(timer); clearTimeout(btnTimer); };
  }, []);

  const goToVideo = () => {
    setCurrentSection("video");
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play().catch(() => {});
      }
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    }, 600);
  };

  const goToFinal = () => setCurrentSection("final");

  return (
    <div className="romantic-app">
      {/* Floating Hearts Background */}
      <FloatingHearts />

      {/* Background Music */}
      {MUSIC_URL && (
        <audio ref={audioRef} loop>
          <source src={MUSIC_URL} />
        </audio>
      )}

      {/* ── SECTION 1: Landing ── */}
      <section className={`romantic-section landing-section ${currentSection === "landing" ? "active" : "exit"}`}>
        <div className="landing-content">
          <div className="sparkle-ring">
            <span className="big-heart">💗</span>
          </div>

          <p className="to-name fade-in-slow">To {HER_NAME},</p>

          <h1 className={`sorry-text ${typingDone ? "typing-done" : ""}`}>
            <span className="typing-cursor">{SORRY_MESSAGE}</span>
          </h1>

          <p className={`subtitle ${typingDone ? "fade-in-up" : "hidden-text"}`}>
            {SUBTITLE}
          </p>

          <button
            className={`continue-btn ${showButton ? "btn-visible" : "btn-hidden"}`}
            onClick={goToVideo}
          >
            <span>Continue</span>
            <span className="btn-heart">💕</span>
          </button>
        </div>
      </section>

      {/* ── SECTION 2: Video ── */}
      <section className={`romantic-section video-section ${currentSection === "video" ? "active" : currentSection === "final" ? "exit" : "hidden-section"}`}>
        <div className="video-content">
          <p className="video-label">I made this for you...</p>

          <div className="video-frame">
            <video
              ref={videoRef}
              controls
              playsInline
              className="the-video"
              onError={(e) => {
                const el = e.currentTarget;
                el.style.display = "none";
                const ph = el.nextElementSibling as HTMLElement;
                if (ph) ph.style.display = "flex";
              }}
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="video-placeholder" style={{ display: "none" }}>
              <div className="placeholder-inner">
                <span className="placeholder-icon">🎬</span>
                <p>Upload your video to</p>
                <p className="placeholder-hint"><code>public/video/apology.mp4</code></p>
              </div>
            </div>
          </div>

          <button className="continue-btn btn-visible" onClick={goToFinal}>
            <span>Keep Reading</span>
            <span className="btn-heart">💌</span>
          </button>
        </div>
      </section>

      {/* ── SECTION 3: Final ── */}
      <section className={`romantic-section final-section ${currentSection === "final" ? "active" : "hidden-section"}`}>
        <div className="final-content">
          <div className="heart-burst">
            {"💗💖💕💓💞".split("").map((h, i) => (
              <span key={i} className="burst-heart" style={{ "--i": i } as React.CSSProperties}>{h}</span>
            ))}
          </div>

          <p className="final-message">{FINAL_MESSAGE}</p>

          <p className="hope-text">I hope you forgive me ❤️</p>

          <ForgiveMeButton />
        </div>
      </section>
    </div>
  );
}

/* ── Floating Hearts ── */
function FloatingHearts() {
  const hearts = Array.from({ length: 18 }, (_, i) => i);
  const emojis = ["💗", "💕", "💖", "✨", "🌸", "💓", "⭐", "💞"];
  return (
    <div className="floating-hearts-container" aria-hidden>
      {hearts.map((i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            "--delay": `${(i * 1.3) % 8}s`,
            "--duration": `${6 + (i % 5)}s`,
            "--left": `${(i * 17 + 5) % 95}%`,
            "--size": `${0.8 + (i % 4) * 0.4}rem`,
          } as React.CSSProperties}
        >
          {emojis[i % emojis.length]}
        </span>
      ))}
    </div>
  );
}

/* ── Forgive Me Button ── */
function ForgiveMeButton() {
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleClick = () => setClicked(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (clicked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 80) {
      setPos({ x: -dx * 1.5, y: -dy * 1.5 });
    }
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  if (clicked) {
    return (
      <div className="forgiven-message">
        <span className="forgiven-emoji">🥰</span>
        <p>Thank you, my love! I'll never stop trying for you. 💕</p>
      </div>
    );
  }

  return (
    <button
      className="forgive-btn"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      Forgive Me? 🥺
    </button>
  );
}
