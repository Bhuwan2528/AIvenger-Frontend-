import { useEffect, useState } from "react";

import WhyCourse from "../../Components/WhyCourse/WhyCourse";
import OurLabs from "../../Components/OurLabs/OurLabs";
import SampleDesign from "../../Components/SampleDesign/SampleDesign";
import Pedagogy from "../../Components/Pedagogy/Pedagogy";
import OurFacilities from "../../Components/OurFacilities/OurFacilities";
import Curriculum from "../../Components/Curriculum/Curriculum";
import QuestionsCTA from "../../Components/QuestionsCTA/QuestionsCTA";

const CompositeLab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  /* =========================
     COMPOSITE LAB PAGE DATA
     (hero, stem, video)
  ========================= */
  const [compositeLabData, setCompositeLabData] = useState(null);

  /* =========================
     SIMILAR LAB CMS DATA
     (shared sections)
  ========================= */
  const [similarLabData, setSimilarLabData] = useState(null);

  /* =========================
     FETCH COMPOSITE LAB PAGE DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/composite-lab`)
      .then((res) => res.json())
      .then((resData) => {
        setCompositeLabData(resData);
      })
      .catch(() => {});
  }, []);

  /* =========================
     FETCH SIMILAR LAB SECTIONS
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/similar-lab`)
      .then((res) => res.json())
      .then((resData) => {
        setSimilarLabData(resData);
      })
      .catch(() => {});
  }, []);

  /* =========================
     SAFE FALLBACKS (COMPOSITE)
  ========================= */
  const heroTitle =
    compositeLabData?.hero?.title ||
    "Transform with Composite Labs";

  const heroDescription =
    compositeLabData?.hero?.description ||
    "Composite labs combine multiple technologies to deliver interdisciplinary, future-ready learning environments.";

  const stemSubText =
    compositeLabData?.stemSection?.subText ||
    "Integrated learning spaces that blend robotics, AI, electronics and more.";

  const stemHeading =
    compositeLabData?.stemSection?.heading ||
    "We design custom Composite Labs for schools.";

  const videoUrl =
    compositeLabData?.videoSection?.videoUrl || "";

  return (
    <main className="robotics-page">
      {/* ================= HERO ================= */}
      <section className="robotics-hero">
        <div className="composite robotics-hero-bg" />
        <div className="robotics-hero-overlay" />
        <div className="robotics-hero-content">
          <span className="robotics-hero-pill">
            COMPOSITE LAB
          </span>

          <h1 className="robotics-hero-title">
            {heroTitle}
          </h1>

          <p className="robotics-hero-desc">
            {heroDescription}
          </p>
        </div>
      </section>

      {/* ================= STEM ================= */}
      <section className="robotics-stem">
        <div className="robotics-stem-content">
          <span className="robotics-stem-pill">
            CUSTOM STEM LABS
          </span>

          <p className="robotics-stem-subtext">
            {stemSubText}
          </p>

          <h2 className="robotics-stem-title">
            {stemHeading}
          </h2>
        </div>
      </section>

      {/* ================= VIDEO ================= */}
      {videoUrl && (
        <section className="robotics-video">
          <video
            className="robotics-video-element"
            src={videoUrl}
            autoPlay
            muted
            loop
            playsInline
          />
        </section>
      )}

      {/* ================= DYNAMIC SECTIONS ================= */}
      <WhyCourse data={similarLabData?.whyCourse} />
      <OurLabs data={similarLabData?.ourLab} />
      <SampleDesign
        data={similarLabData?.sampleDesign}
        value="Composite"
      />
      <Pedagogy />
      <OurFacilities data={similarLabData?.ourFacilities} />
      <Curriculum />
      <QuestionsCTA data={similarLabData?.questions} />
    </main>
  );
};

export default CompositeLab;
