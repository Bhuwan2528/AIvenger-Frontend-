import React from "react";
import "./OurLabs.css";

import fallback1 from "../../assets/students/student4.jpeg";
import fallback2 from "../../assets/students/student2.jpeg";
import fallback3 from "../../assets/students/student3.jpeg";

const OurLabs = ({ data }) => {
  const images = [
    data?.images?.[0] || fallback1,
    data?.images?.[1] || fallback2,
    data?.images?.[2] || fallback3,
  ];

  return (
    <section className="our-labs">
      <div className="our-labs-inner">
        {/* Pill (STATIC) */}
        <span className="our-labs-pill">OUR LABS</span>

        {/* Text (STATIC) */}
        <p className="our-labs-text">
          We have our <span>25+</span>{" "}
          <strong>cutting edge labs</strong> set up in multiple schools in Delhi,
          providing the tools that today’s students need to tackle future
          standards.
        </p>

        {/* Images (DYNAMIC) */}
        <div className="our-labs-grid">
          {images.map((img, index) => (
            <div className="our-labs-card" key={index}>
              <img
                src={img}
                alt={`Our lab ${index + 1}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurLabs;
