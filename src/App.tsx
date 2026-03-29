import { useEffect, useRef, useState } from "react";
import "./romantic.css";

export default function App() {
  const [typingDone, setTypingDone] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [currentSection, setCurrentSection] = useState<"landing" | "video" | "final">("landing");
  const audioRef = useRef<HTMLAudioElement>(null);

  // ─── CUSTOMIZE THESE ───────────────────────────────────────────────
  const HER_NAME = "My Love";
  const SORRY_MESSAGE = "I'm truly, deeply sorry.";
  const SUBTITLE = "I’m truly sorry for all the mistakes I’ve made and for hurting you. I’m sorry I wasn’t there when you needed me the most. I regret not showing my love and unintentionally making you cry. You mean everything to me, and I hope you can forgive me ❤️";

  // ✅ Cloudinary video (WORKING)
  const VIDEO_URL = "https://res.cloudinary.com/daoud1ilm/video/upload/v1774785246/VN20260329_153044_1_tpfqfh.mp4";

  const FINAL_MESSAGE = "You are my whole world. I promise to do better, to love you better, every single day. 💕";
  const MUSIC_URL = "";
  // ───────────────────────────────────────────────────────────────────

  useEffect(() => {
    const timer = setTimeout(() => setTypingDone(true), 3200);
    const btnTimer = setTimeout(() => setShowButton(true), 4500);
    return () => {
      clearTimeout(timer);
      clearTimeout(btnTimer);
    };
  }, []);

  const goToVideo = () => {
    setCurrentSection("video");

    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.volume = 0.3;
        audioRef.current.play().catch(() => {});
      }
    }, 600);
  };

  const goToFinal = () => setCurrentSection("final");

  return (
    <div className="romantic-app">
      <FloatingHearts />

      {MUSIC_URL && (
        <audio ref={audioRef} loop>
          <source src={MUSIC_URL} />
        </audio>
      )}

      {/* ── LANDING ── */}
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

      {/* ── VIDEO ── */}
      <section className={`romantic-section video-section ${currentSection === "video" ? "active" : currentSection === "final" ? "exit" : "hidden-section"}`}>
        <div className="video-content">
          <p className="video-label">I made this for you...</p>

          <div className="video-frame">
            <video
              key={VIDEO_URL}
              controls
              autoPlay
              muted
              playsInline
              preload="auto"
              controlsList="nodownload"
              className="the-video"
              style={{ width: "100%", borderRadius: "12px" }}
            >
              <source src={VIDEO_URL} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>

          <button className="continue-btn btn-visible" onClick={goToFinal}>
            <span>Keep Reading</span>
            <span className="btn-heart">💌</span>
          </button>
        </div>
      </section>

      {/* ── FINAL ── */}
      <section className={`romantic-section final-section ${currentSection === "final" ? "active" : "hidden-section"}`}>
        <div className="final-content">
          <div className="heart-burst">
            {"💗💖💕💓💞".split("").map((h, i) => (
              <span key={i} className="burst-heart" style={{ "--i": i } as React.CSSProperties}>
                {h}
              </span>
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

/* Floating Hearts */
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

/* Forgive Button */
function ForgiveMeButton() {
  const [clicked, setClicked] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleClick = () => setClicked(true);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (clicked) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 80) {
      setPos({ x: -dx * 1.5, y: -dy * 1.5 });
    }
  };

  if (clicked) {
    return (
      <div className="forgiven-message">
        <span>🥰</span>
        <p>Thank you, my love! I'll never stop trying for you. 💕</p>
      </div>
    );
  }

  return (
    <button
      className="forgive-btn"
      onClick={handleClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      style={{ transform: `translate(${pos.x}px, ${pos.y}px)` }}
    >
      Forgive Me? 🥺
    </button>
  );
}