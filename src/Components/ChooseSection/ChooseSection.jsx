import React from "react";
import "./ChooseSection.css";

/* FALLBACK ASSETS (only used if DB image missing) */
import fallbackLab from "../../assets/labs/robotics.png";
import fallbackLms from "../../assets/card-2.avif";
import fallbackService from "../../assets/students/student6.jpeg";

/* ICONS (STATIC CARD 4) */
import { HiOutlineBookOpen } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";
import { HiOutlineCube } from "react-icons/hi";

const ChooseSection = ({ data }) => {
  const intro = data?.intro || {};
  const labs = data?.labs?.items || [];
  const lms = data?.lms || {};
  const services = data?.services?.items || [];

  return (
    <section className="choose-section">

      {/* INTRO */}
      <div className="choose-intro">
        <span className="choose-pill">WHY CHOOSE US?</span>

        <h2>
          {intro.heading || "Not just a Lab. Not just a Course. A Complete Skill Ecosystem."}
        </h2>

        <p>
          {intro.description ||
            "AIVenger is a composite skill lab designed to create confident innovators, problem-solvers, and future founders through hands-on STEM, AI tools, and personality development."}
        </p>
      </div>

      {/* NORMAL FLOW */}
      <div className="stack-area">

        {/* CARD 1 – LABS */}
        <div className="stack-card card-1">
          <div className="stack-card-inner">
            <h3>Cutting Edge Labs</h3>

            <div className="labs-grid">
              {labs.map((lab, index) => (
                <div className="lab-card" key={index}>
                  <img
                    src={lab.imageUrl || fallbackLab}
                    alt={lab.title || "Lab"}
                  />
                  <h4>{lab.title}</h4>
                  <p>{lab.description}</p>
                  <button>{lab.buttonText || "Know More"} ↗</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2 – LMS */}
        <div className="stack-card card-2">
          <div className="stack-card-inner">
            <div className="card-2-content">
              <div className="card-2-media">
                <img
                  src={lms.imageUrl || fallbackLms}
                  alt="Learning Management System"
                />
              </div>

              <div className="card-2-text">
                <h3>Learning Management System (iLMS)</h3>
                <p>{lms.description}</p>
                <button className="outline-btn">
                  {lms.buttonText || "Learn more"} <span>↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 3 – SERVICES */}
        <div className="stack-card card-3">
          <div className="stack-card-inner">
            <h3>End to End Services</h3>

            <div className="labs-grid">
              {services.map((service, index) => (
                <div className="lab-card" key={index}>
                  <img
                    src={service.imageUrl || fallbackService}
                    alt={service.title || "Service"}
                  />
                  <h4>{service.title}</h4>
                  <p>{service.description}</p>
                  <button>{service.buttonText || "Know More"} ↗</button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 4 – STATIC (CURRICULUM REMOVED FROM MODEL) */}
        <div className="stack-card card-4">
          <div className="stack-card-inner">
            <h3>Future ready curriculum & Kits</h3>

            <div className="icon-grid">

              <div className="icon-card">
                <div className="icon-circle">
                  <HiOutlineBookOpen />
                </div>
                <h4>NEP Powered Curriculum</h4>
                <p>
                  Our NEP 2020-aligned curriculum prepares students for the
                  future which is Tech.
                </p>
              </div>

              <div className="icon-card">
                <div className="icon-circle">
                  <HiOutlineDocumentText />
                </div>
                <h4>Workbooks Integration</h4>
                <p>
                  Our workbooks combine traditional and digital learning
                  methods giving an advanced learning process.
                </p>
              </div>

              <div className="icon-card">
                <div className="icon-circle">
                  <HiOutlineCube />
                </div>
                <h4>Innovative Kits</h4>
                <p>
                  Explore hands-on learning with our innovative kits designed
                  to inspire creativity and knowledge.
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ChooseSection;
