import { useEffect, useState } from "react";
import "./Competition.css";

const Competition = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/competition`)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch(() => {});
  }, []);

  const hero = data?.hero || {};
  const gallery = data?.galleryImages || {};
  const victoriesHeader = data?.victoriesHeader || {};

  const victory1 = data?.victory1 || {};
  const victory2 = data?.victory2 || {};
  const victory3 = data?.victory3 || {};

  const winsHeader = data?.winsHeader || {};
  const win1 = data?.win1 || {};
  const win2 = data?.win2 || {};
  const win3 = data?.win3 || {};

  return (
    <main className="competition-page">
      {/* ================= HERO ================= */}
      <section className="competition-hero">
        {hero.videoUrl && (
          <video
            className="hero-video"
            src={hero.videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        )}

        <div className="hero-overlay" />

        <div className="hero-content">
          <span className="hero-pill">COMPETITIONS & EXHIBITIONS</span>

          <h1>{hero.title || ""}</h1>
          <p>{hero.description || ""}</p>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="competition-gallery">
        <p className="gallery-heading">
          We helped more than <span>150+</span> schools create memorable
          Exhibitions and Competitions
        </p>

        <div className="gallery-strip">
          {gallery.img1 && (
            <div className="gallery-item">
              <img src={gallery.img1} alt="" />
            </div>
          )}
          {gallery.img2 && (
            <div className="gallery-item">
              <img src={gallery.img2} alt="" />
            </div>
          )}
          {gallery.img3 && (
            <div className="gallery-item">
              <img src={gallery.img3} alt="" />
            </div>
          )}
          {gallery.img4 && (
            <div className="gallery-item cropped">
              <img src={gallery.img4} alt="" />
            </div>
          )}
          {gallery.img5 && (
            <div className="gallery-item cropped">
              <img src={gallery.img5} alt="" />
            </div>
          )}
        </div>
      </section>

      {/* ================= VICTORIES ================= */}
      <section className="victories-section">
        <div className="victories-header">
          <span className="victories-pill">OUR VICTORIES</span>
          <h2>{victoriesHeader.heading || ""}</h2>
          <p>{victoriesHeader.description || ""}</p>
        </div>

        {[victory1, victory2, victory3].map((victory, index) => (
          <div
            key={index}
            className={`victory-row ${index === 1 ? "reverse" : ""}`}
          >
            <div className="victory-image">
              {victory.imageUrl && <img src={victory.imageUrl} alt="" />}
            </div>

            <div className="victory-content">
              <h3>{victory.title || ""}</h3>
              <p>
                <strong>Project –</strong>{" "}
                {victory.description || ""}
              </p>
            </div>
          </div>
        ))}
      </section>

      {/* ================= WINS ================= */}
      <section className="wins-section">
        <div className="wins-header">
          <h2>{winsHeader.heading || ""}</h2>
          <p>{winsHeader.description || ""}</p>
        </div>

        <div className="wins-grid">
          {[win1, win2, win3].map((win, index) => (
            <div key={index} className="win-card">
              {win.imageUrl && <img src={win.imageUrl} alt="" />}

              <div className="win-card-body">
                <h4>{win.teamName || ""}</h4>
                <span>{win.schoolName || ""}</span>

                <ul>
                  <li>
                    <strong>Competition:</strong>{" "}
                    {win.competition || ""}
                  </li>
                  <li>
                    <strong>Event:</strong> {win.event || ""}
                  </li>
                  <li>
                    <strong>Position:</strong> {win.position || ""}
                  </li>
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= STATIC SECTIONS (UNCHANGED) ================= */}




{/* ================= SUPPORT STEPS ================= */}
<section className="support-section">
  <div className="support-header">
    <h2>From Registration to Mentorship, We Support Every Step</h2>
    <p>
      We offer complete support for every stage of the competition, from seamless
      registration to expert mentorship, training, and resources, ensuring
      participants are fully equipped to succeed.
    </p>
  </div>

  <div className="support-cards">
    <div className="support-card">
      <div className="support-icon">
        {/* trophy icon */}
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            fill="currentColor"
            d="M7 4V2h10v2h3v3a5 5 0 0 1-5 5h-1a5 5 0 0 1-4 3.9V18h3v2H8v-2h3v-2.1A5 5 0 0 1 7 12H6a5 5 0 0 1-5-5V4h6zm-4 2v1a3 3 0 0 0 3 3h1V6H3zm18 0h-4v4h1a3 3 0 0 0 3-3V6z"
          />
        </svg>
      </div>
      <h4>
        Aim for Prestigious National and International Competitions like WRO,
        Technoxian, NASA Robotics, and more, showcasing your skills on global
        platforms.
      </h4>
    </div>

    <div className="support-card">
      <div className="support-icon">
        {/* user icon */}
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            fill="currentColor"
            d="M12 12a5 5 0 1 0-5-5a5 5 0 0 0 5 5m0 2c-4.42 0-8 2.24-8 5v1h16v-1c0-2.76-3.58-5-8-5Z"
          />
        </svg>
      </div>
      <h4>
        Receive Expert Guidance and Personalized Mentorship for Success
      </h4>
    </div>

    <div className="support-card">
      <div className="support-icon">
        {/* chart icon */}
        <svg viewBox="0 0 24 24" width="22" height="22">
          <path
            fill="currentColor"
            d="M3 3h2v18H3zm16 7h2v11h-2zM7 13h2v8H7zm4-6h2v14h-2zm4 4h2v10h-2z"
          />
        </svg>
      </div>
      <h4>
        Comprehensive Participation Support and Performance Analysis
      </h4>
    </div>
  </div>

  <div className="support-cta">
    <button>
      Want to compete? Join Us
      <span>↗</span>
    </button>
  </div>
</section>


{/* ================= EXHIBITIONS SUPPORT ================= */}
    <section className="exhibition-section">
      <div className="exhibition-header">
        <h2>
          We help your school in organizing exhibitions for the students to
          showcase their innovations.
        </h2>
        <p>
          We offer complete support for every stage of the competition, from
          seamless registration to expert mentorship, training, and resources,
          ensuring participants are fully equipped to succeed.
        </p>
      </div>

      <div className="exhibition-cards">
        <div className="exhibition-card">
          <div className="exhibition-icon">
            {/* network / innovation icon */}
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                fill="currentColor"
                d="M12 2a4 4 0 0 0-4 4a3.9 3.9 0 0 0 .3 1.5L4.9 10a4 4 0 1 0 1.1 2.7l3.4-2a4 4 0 0 0 5.2 0l3.4 2a4 4 0 1 0 1.1-2.7l-3.4-2A3.9 3.9 0 0 0 16 6a4 4 0 0 0-4-4Z"
              />
            </svg>
          </div>
          <p>
            Setting up interactive tech booths to showcase innovative projects by
            your students.
          </p>
        </div>

        <div className="exhibition-card">
          <div className="exhibition-icon">
            {/* calendar / event icon */}
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                fill="currentColor"
                d="M7 2h2v2h6V2h2v2h3v18H4V4h3V2Zm13 8H4v10h16V10Z"
              />
            </svg>
          </div>
          <p>
            Hosting exhibitions across diverse fields like AI & Drone, Robotics, AI,
            and Coding etc.
          </p>
        </div>

        <div className="exhibition-card">
          <div className="exhibition-icon">
            {/* code / project icon */}
            <svg viewBox="0 0 24 24" width="26" height="26">
              <path
                fill="currentColor"
                d="M8 17L3 12l5-5l1.4 1.4L5.8 12l3.6 3.6Zm8 0l-1.4-1.4L18.2 12l-3.6-3.6L16 7l5 5Z"
              />
            </svg>
          </div>
          <p>
            Showcasing real-life, problem-solving projects aligned with your
            school's theme.
          </p>
        </div>
      </div>
    </section>

    </main>
  );
};

export default Competition;

