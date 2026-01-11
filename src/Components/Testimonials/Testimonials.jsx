import React from "react";
import "./Testimonials.css";

/* FALLBACK IMAGES */
import fallback1 from "../../assets/person1.avif";
import fallback2 from "../../assets/person2.avif";

const Testimonials = ({ data }) => {
  const items = data?.items || [];
  const meetingButtonText = data?.meetingButtonText || "Book a Meeting with us";
  const meetingButtonURL = data?.meetingButtonURL || "#";

  const first = items[0] || {};
  const second = items[1] || {};

  return (
    <section className="testimonial-section">

      <h2 className="testimonial-heading">
        What our <span>valuable partners</span> have to say ?
      </h2>

      {/* TESTIMONIAL 1 */}
      <div className="testimonial-row">
        <div className="testimonial-content">
          <h4 className="testimonial-name">
            {first.name || "Mrs. Anuradha Handa"}
          </h4>

          <p className="testimonial-designation">
            {first.designation || "Principal, GD Goenka School, Gurugram"}
          </p>

          <blockquote>
            “{first.message ||
              "Our growth no longer necessitates the recruitment and education of additional design professionals"}”
          </blockquote>
        </div>

        <div className="testimonial-media">
          <img
            src={first.imageUrl || fallback1}
            alt={first.name || "Testimonial"}
          />
          <div className="play-btn">▶</div>
        </div>
      </div>

      {/* TESTIMONIAL 2 (REVERSED) */}
      <div className="testimonial-row reverse">
        <div className="testimonial-content">
          <h4 className="testimonial-name">
            {second.name || "Mrs. XYZ Name"}
          </h4>

          <p className="testimonial-designation">
            {second.designation || "Principal, ABC International School"}
          </p>

          <blockquote>
            “{second.message ||
              "The partnership enabled us to implement STEM education seamlessly while focusing on student outcomes."}”
          </blockquote>
        </div>

        <div className="testimonial-media">
          <img
            src={second.imageUrl || fallback2}
            alt={second.name || "Testimonial"}
          />
          <div className="play-btn">▶</div>
        </div>
      </div>

      {/* MEETING CTA */}
      <div className="meeting-btn-wrap">
        <a
          href={meetingButtonURL}
          className="meeting-btn"
        >
          {meetingButtonText}
          <span className="meeting-arrow">↗</span>
        </a>
      </div>

    </section>
  );
};

export default Testimonials;
