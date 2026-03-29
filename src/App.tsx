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
  const SUBTITLE =
    "I’m truly sorry for all the mistakes I’ve made and for hurting you. I’m sorry I wasn’t there when you needed me the most. I regret not showing my love and unintentionally making you cry. You mean everything to me, and I hope you can forgive me ❤️";

  // ✅ GOOGLE DRIVE EMBED LINK (WORKING)
  const VIDEO_ID = "1gXPBylaUM8BuBQhbm57DoVn3SD34gDD5";
  const VIDEO_EMBED = `https://drive.google.com/file/d/${VIDEO_ID}/preview`;

  const FINAL_MESSAGE =
    "You are my whole world. I promise to do better, to love you better, every single day. 💕";

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
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.play().catch(() => {});
    }
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

      {/* ── SECTION 1 ── */}
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

      {/* ── SECTION 2 (VIDEO FIXED) ── */}
      <section className={`romantic-section video-section ${currentSection === "video" ? "active" : currentSection === "final" ? "exit" : "hidden-section"}`}>
        <div className="video-content">
          <p className="video-label">I made this for you...</p>

          <div className="video-frame">
            {/* ✅ GOOGLE DRIVE VIDEO */}
            <iframe
              src={VIDEO_EMBED}
              width="100%"
              height="400"
              allow="autoplay"
              className="the-video"
            ></iframe>
          </div>

          <button className="continue-btn btn-visible" onClick={goToFinal}>
            <span>Keep Reading</span>
            <span className="btn-heart">💌</span>
          </button>
        </div>
      </section>

      {/* ── SECTION 3 ── */}
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
    <div className="floating-hearts-container">
      {hearts.map((i) => (
        <span
          key={i}
          className="floating-heart"
          style={{
            "--delay": `${(i * 1.3) % 8}s`,
            "--duration": `${6 + (i % 5)}s`,
            "--left": `${(i * 17 + 5) % 95}%`,
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

  if (clicked) {
    return (
      <div className="forgiven-message">
        <span>🥰</span>
        <p>Thank you, my love! I'll never stop trying for you 💕</p>
      </div>
    );
  }

  return (
    <button className="forgive-btn" onClick={() => setClicked(true)}>
      Forgive Me? 🥺
    </button>
  );
}