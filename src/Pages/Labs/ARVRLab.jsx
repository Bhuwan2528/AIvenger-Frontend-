import { useEffect, useState } from "react";
import "./RoboticsLab.css"; // SAME CSS FILE

import WhyCourse from "../../Components/WhyCourse/WhyCourse";
import OurLabs from "../../Components/OurLabs/OurLabs";
import SampleDesign from "../../Components/SampleDesign/SampleDesign";
import Pedagogy from "../../Components/Pedagogy/Pedagogy";
import OurFacilities from "../../Components/OurFacilities/OurFacilities";
import Curriculum from "../../Components/Curriculum/Curriculum";
import QuestionsCTA from "../../Components/QuestionsCTA/QuestionsCTA";

const ARVRLab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  /* =========================
     AI / ARVR LAB PAGE DATA
     (hero, stem, video)
  ========================= */
  const [aiLabData, setAiLabData] = useState(null);

  /* =========================
     SIMILAR LAB CMS DATA
     (shared sections)
  ========================= */
  const [similarLabData, setSimilarLabData] = useState(null);

  /* =========================
     FETCH AI LAB PAGE DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/ai-lab`)
      .then((res) => res.json())
      .then((resData) => {
        setAiLabData(resData);
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
     SAFE FALLBACKS (AI / ARVR)
  ========================= */
  const heroTitle =
    aiLabData?.hero?.title || "Craft your own Reality";

  const heroDescription =
    aiLabData?.hero?.description ||
    "Augmented and Virtual Reality are revolutionizing modern industries and technologies poised to reshape the world.";

  const stemSubText =
    aiLabData?.stemSection?.subText ||
    "Personalized Learning Spaces to Empower Schools Every Step of the Way.";

  const stemHeading =
    aiLabData?.stemSection?.heading ||
    "We design custom AI & Drone Labs for your schools.";

  const videoUrl =
    aiLabData?.videoSection?.videoUrl || "";

  return (
    <main className="robotics-page">

      {/* ================= HERO ================= */}
      <section className="robotics-hero">
        <div className="arvr robotics-hero-bg" />
        <div className="robotics-hero-overlay" />
        <div className="robotics-hero-content">

          <span className="robotics-hero-pill">
            AI / DRONE LABS
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
      <WhyCourse
        data={similarLabData?.whyCourse}
        value="AI & Drone"
      />
      <OurLabs data={similarLabData?.ourLab} />
      <SampleDesign
        data={similarLabData?.sampleDesign}
        value="AI & Drone"
      />
      <Pedagogy />
      <OurFacilities data={similarLabData?.ourFacilities} />
      <Curriculum />
      <QuestionsCTA data={similarLabData?.questions} />

    </main>
  );
};

export default ARVRLab;
