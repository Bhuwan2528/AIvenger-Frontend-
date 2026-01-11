import React from "react";
import "./Hero.css";

import { HiOutlineAcademicCap, HiOutlineOfficeBuilding } from "react-icons/hi";
import { MdOutlineVerified } from "react-icons/md";

/* ASSETS */
import heroVideo from "../../assets/robotics-lab.webm";

/* SCHOOL LOGOS */
const schoolImages = import.meta.glob(
  "../../assets/schools/*.{jpg,jpeg,png}",
  { eager: true }
);

const schoolLogos = Object.values(schoolImages).map(
  (img) => img.default
);

const Hero = ({ hero }) => {
  // 🛡️ SAFE FALLBACKS (sirf backend-driven fields)
  const {
    badgeText = "India’s Most Advanced Labs",
    leadText = "Where students don’t just learn — they build, launch, and lead.",
    subText = "From STEM innovation to AI-powered entrepreneurship, we prepare children for the world that doesn’t exist yet.",
    primaryButtonText = "Book a Meeting",
    primaryButtonURL = "#",
    mediaUrl,
  } = hero || {};

  return (
    <section className="hero">

      {/* GRID BACKGROUND */}
      <div className="hero-grid" />

      <div className="hero-container">

        {/* LEFT CONTENT */}
        <div className="hero-left">

          {/* ✅ DYNAMIC */}
          <span className="hero-badge">
            {badgeText}
          </span>

          {/* ❌ STATIC (AS PER YOUR DESIGN) */}
          <h1>
            AIVenger is India’s most <br />
            <span>Advanced AI & Robotics</span> Skill Lab
          </h1>

          {/* ✅ DYNAMIC */}
          <p className="hero-lead">
            {leadText}.
          </p>

          {/* ✅ DYNAMIC */}
          <p className="hero-subtext">
            {subText}
          </p>

          {/* ❌ STATIC */}
          <ul className="hero-highlights">
            <li>
              <HiOutlineAcademicCap />
              NEP 2020 Aligned Curriculum
            </li>
            <li>
              <MdOutlineVerified />
              Trusted by 50+ Schools
            </li>
            <li>
              <HiOutlineOfficeBuilding />
              World-Class Innovation Labs
            </li>
          </ul>

          {/* ✅ DYNAMIC */}
          <div className="hero-actions">
            <a
              href={primaryButtonURL}
              className="hero-btn primary"
            >
              {primaryButtonText} <span>↗</span>
            </a>
          </div>

        </div>

        {/* RIGHT VIDEO */}
        <div className="hero-right">
          <video
            className="hero-media"
            src={mediaUrl || heroVideo}
            autoPlay
            muted
            loop
            playsInline
          />
        </div>

      </div>

      {/* STATIC */}
      <div className="trust-text">
        <span>50+</span> schools trust AIVenger to shape future innovators
      </div>

      {/* LOGO SLIDER */}
      <div className="logo-slider">
        <div className="logo-track">
          {[...schoolLogos, ...schoolLogos].map((logo, index) => (
            <div className="logo-card" key={index}>
              <img src={logo} alt="School logo" />
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default Hero;
