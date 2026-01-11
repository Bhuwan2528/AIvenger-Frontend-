import React from "react";
import "./SampleDesign.css";

import fallback1 from "../../assets/labs/robotics.png";
import fallback2 from "../../assets/labs/drone.png";
import fallback3 from "../../assets/labs/lab3.jpeg";

const SampleDesign = ({ data, value }) => {
  const description =
    data?.description ||
    `Choose from Our Sample ${value} Lab Designs and Customize Them to Suit
     Your School's Needs`;

  const images = [
    data?.images?.[0] || fallback1,
    data?.images?.[1] || fallback2,
    data?.images?.[2] || fallback3,
  ];

  return (
    <section className="sample-design">
      <div className="sample-design-header">
        <h2 className="sample-design-title">
          Sample design for <span>{value}</span> Lab
        </h2>

        <p className="sample-design-subtitle">
          {description}
        </p>
      </div>

      <div className="sample-design-grid">
        {images.map((img, index) => (
          <div className="sample-design-card" key={index}>
            <img
              src={img}
              alt={`${value} lab design ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SampleDesign;
