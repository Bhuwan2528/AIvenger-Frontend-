import { useEffect, useState } from "react";
import "./ILMS.css";
import Curriculum from "../../Components/Curriculum/Curriculum";

const ILMS = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState(null);

  /* =========================
     FETCH ILMS DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/ilms`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
      })
      .catch(() => {});
  }, []);

  const hero = data?.hero || {};
  const whyHeader = data?.whyChooseHeader || {};
  const card1 = data?.card1 || {};
  const card2 = data?.card2 || {};
  const card3 = data?.card3 || {};

  return (
    <main className="ilms-page">
      {/* ================= HERO ================= */}
      <section className="ilms-hero">
        <div className="ilms-bg-grid"></div>

        <div className="ilms-hero-inner">
          {/* LEFT */}
          <div className="ilms-hero-content">
            <h1>
              Create <span className="accent">Impactful Learning</span>{" "}
              Environments with Our Platform
            </h1>

            <p>{hero.description || ""}</p>

            {hero.ctaText && (
              <a
                href={hero.ctaUrl || "#"}
                className="ilms-cta"
              >
                {hero.ctaText} <span>↗</span>
              </a>
            )}
          </div>

          {/* RIGHT */}
          <div className="ilms-video-wrap">
            <div className="ilms-video-glow"></div>

            {hero.videoUrl && (
              <video
                src={hero.videoUrl}
                autoPlay
                muted
                loop
                playsInline
              />
            )}
          </div>
        </div>
      </section>

      {/* ================= STATS (STATIC) ================= */}
      <section className="ilms-stats">
        <h2>Students love our Platform</h2>

        <div className="ilms-stats-grid">
          <div className="stat-card">
            <h3>15 Y+</h3>
            <p>Legacy</p>
          </div>
          <div className="stat-card">
            <h3>1 Lac +</h3>
            <p>Student base</p>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <p>Projects created</p>
          </div>
          <div className="stat-card">
            <h3>1K+</h3>
            <p>Hours of content</p>
          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE ================= */}
      <section className="ilms-why">
        {/* HEADER */}
        <div className="ilms-why-header">
          <span className="ilms-pill">WHY CHOOSE US?</span>
          <h2>{whyHeader.heading || ""}</h2>
          <p>{whyHeader.description || ""}</p>
        </div>

        {/* BIG CARD */}
        <div className="ilms-why-box">
          <div className="ilms-why-content">
            <h3>{card1.title || ""}</h3>
            <p>{card1.description || ""}</p>
          </div>

          <div className="ilms-why-image">
            {card1.imageUrl && (
              <img src={card1.imageUrl} alt="" />
            )}
          </div>
        </div>

        {/* SMALL CARDS */}
        <div className="ilms-why-cards">
          {/* CARD 2 */}
          <div className="ilms-feature-card blue">
            <div className="ilms-feature-text">
              <h3>{card2.title || ""}</h3>
              <p>{card2.description || ""}</p>
            </div>
            <div className="ilms-feature-image">
              {card2.imageUrl && (
                <img src={card2.imageUrl} alt="" />
              )}
            </div>
          </div>

          {/* CARD 3 */}
          <div className="ilms-feature-card mint">
            <div className="ilms-feature-text">
              <h3>{card3.title || ""}</h3>
              <p>{card3.description || ""}</p>
            </div>
            <div className="ilms-feature-image">
              {card3.imageUrl && (
                <img src={card3.imageUrl} alt="" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ================= CURRICULUM ================= */}
      <Curriculum />
    </main>
  );
};

export default ILMS;
