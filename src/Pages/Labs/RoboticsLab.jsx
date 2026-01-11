import { useEffect, useState } from "react";
import "./RoboticsLab.css";

import WhyCourse from "../../Components/WhyCourse/WhyCourse";
import OurLabs from "../../Components/OurLabs/OurLabs";
import SampleDesign from "../../Components/SampleDesign/SampleDesign";
import Pedagogy from "../../Components/Pedagogy/Pedagogy";
import OurFacilities from "../../Components/OurFacilities/OurFacilities";
import Curriculum from "../../Components/Curriculum/Curriculum";
import QuestionsCTA from "../../Components/QuestionsCTA/QuestionsCTA";

const RoboticsLab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  /* =========================
     ROBOTICS LAB PAGE DATA
     (hero, stem, video)
  ========================= */
  const [roboticsData, setRoboticsData] = useState(null);

  /* =========================
     SIMILAR LAB CMS DATA
     (sections)
  ========================= */
  const [similarLabData, setSimilarLabData] = useState(null);

  /* =========================
     FETCH ROBOTICS LAB PAGE DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/lab`)
      .then((res) => res.json())
      .then((resData) => {
        setRoboticsData(resData);
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
     SAFE FALLBACKS (ROBOTICS)
  ========================= */
  const heroTitle =
    roboticsData?.hero?.title ||
    "Transform with Robotics";

  const heroDescription =
    roboticsData?.hero?.description ||
    "Robotics is at the forefront of modern industries, emerging as a groundbreaking technology set to reshape the future.";

  const stemSubText =
    roboticsData?.stemSection?.subText ||
    "We provide everything from personalized learning spaces through iLMS to hands-on projects and competition support, guiding schools every step of the way.";

  const stemHeading =
    roboticsData?.stemSection?.heading ||
    "We design custom Robotics Labs for our schools.";

  const videoUrl =
    roboticsData?.videoSection?.videoUrl || "";

  return (
    <main className="robotics-page">

      {/* ================= HERO ================= */}
      <section className="robotics-hero">
        <div className="robotics-hero-bg" />
        <div className="robotics-hero-overlay" />
        <div className="robotics-hero-content">
          <span className="robotics-hero-pill">
            ROBOTICS LAB
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
        value="Robotics"
      />
      <Pedagogy />
      <OurFacilities data={similarLabData?.ourFacilities} />
      <Curriculum />
      <QuestionsCTA data={similarLabData?.questions} />

    </main>
  );
};

export default RoboticsLab;
