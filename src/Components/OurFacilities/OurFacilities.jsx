import React from "react";
import "./OurFacilities.css";

/* FALLBACK IMAGES */
import fallback3D from "../../assets/facilities/printer.png";
import fallbackDrone from "../../assets/facilities/drone.png";
import fallbackIot from "../../assets/facilities/iot.png";
import fallbackMechanical from "../../assets/mechanical.avif";
import fallbackTools from "../../assets/facilities/tools.webp";
import fallbackSoldering from "../../assets/facilities/soldering.jpeg";

const fallbackImages = [
  fallback3D,
  fallbackDrone,
  fallbackIot,
  fallbackMechanical,
  fallbackTools,
  fallbackSoldering,
];

const OurFacilities = ({ data }) => {
  const heading =
    data?.heading || "Ready to elevate your Lab with our facilities";

  const description =
    data?.description ||
    "We provide the following comprehensive facilities to enhance your school lab, ensuring it is well-equipped to support cutting-edge learning and hands-on experimentation for students";

  const facilities =
    data?.facilities?.length > 0
      ? data.facilities
      : [
          {
            image: fallbackImages[0],
            title: "3D Printer Station",
            description:
              "A dedicated space for hands-on learning with 3D printing technology.",
          },
          {
            image: fallbackImages[1],
            title: "Drone Station",
            description:
              "A specialized area for exploring and learning drone technology.",
          },
          {
            image: fallbackImages[2],
            title: "IOT Station",
            description:
              "A space for hands-on experience with Internet of Things (IoT) projects.",
          },
          {
            image: fallbackImages[3],
            title: "Mechanical Station",
            description:
              "Exploring and using mechanical tools in your projects.",
          },
          {
            image: fallbackImages[4],
            title: "Tools Station",
            description:
              "Fully equipped station for hands-on learning with various tools.",
          },
          {
            image: fallbackImages[5],
            title: "Soldering Station",
            description:
              "A dedicated area for precision soldering and electronics assembly.",
          },
        ];

  return (
    <section className="facilities">
      <div className="facilities-header">
        {/* PILL (STATIC) */}
        <span className="facilities-pill">OUR FACILITIES</span>

        {/* DYNAMIC */}
        <h2 className="facilities-title">
          {heading}
        </h2>

        <p className="facilities-desc">
          {description}
        </p>
      </div>

      <div className="facilities-grid">
        {facilities.map((item, index) => (
          <FacilityCard
            key={index}
            img={item.image || fallbackImages[index]}
            title={item.title}
            desc={item.description}
          />
        ))}
      </div>
    </section>
  );
};

const FacilityCard = ({ img, title, desc }) => {
  return (
    <div className="facility-card">
      <div className="facility-image">
        <img src={img} alt={title} />
      </div>
      <div className="facility-content">
        <h3>{title}</h3>
        <p>{desc}</p>
      </div>
    </div>
  );
};

export default OurFacilities;
