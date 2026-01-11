import { useEffect, useState } from "react";
import "./contact.css";
import { HiOutlineOfficeBuilding, HiOutlineMail } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";

const Contact = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/contact`)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch(() => {});
  }, [API_URL]);

  const leftInfo = data?.leftInfo || {};
  const designation = data?.designationOptions || {};

  return (
    <>
      <section className="contact-v2-section">
        {/* HERO */}
        <div className="contact-v2-hero">
          <span className="contact-v2-pill">LET&apos;S CONNECT</span>

          <h1 className="contact-v2-title">
            We would love to hear <br /> from you
            <span className="contact-v2-emoji">✉️</span>
          </h1>

          <p className="contact-v2-subtitle">
            Have questions or want to connect? Share your basic details below,
            and we’ll get in touch!
          </p>
        </div>

        {/* CARD */}
        <div className="contact-v2-card">
          {/* LEFT */}
          <div>
            <p className="contact-v2-intro">
              {leftInfo.introText || ""}
            </p>

            <div className="contact-v2-info">
              <div className="contact-v2-info-block">
                <HiOutlineOfficeBuilding className="contact-v2-info-icon" />
                <div>
                  <h4>Head Office</h4>
                  <p>{leftInfo.officeAddress || ""}</p>
                </div>
              </div>

              <div className="contact-v2-info-block">
                <FiPhone className="contact-v2-info-icon" />
                <div>
                  <h4>Phone</h4>
                  <p>{leftInfo.phone || ""}</p>
                </div>
              </div>

              <div className="contact-v2-info-block">
                <HiOutlineMail className="contact-v2-info-icon" />
                <div>
                  <h4>Email</h4>
                  <p>{leftInfo.email || ""}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT FORM */}
          <form className="contact-v2-form">
            <input type="text" placeholder="Name" />
            <input type="text" placeholder="Contact No." />
            <input type="email" placeholder="Email" />

            <select>
              <option>Designation</option>
              {designation.option1 && <option>{designation.option1}</option>}
              {designation.option2 && <option>{designation.option2}</option>}
              {designation.option3 && <option>{designation.option3}</option>}
              {designation.option4 && <option>{designation.option4}</option>}
              {designation.option5 && <option>{designation.option5}</option>}
            </select>

            <input type="text" placeholder="School Name" />
            <input type="text" placeholder="City" />

            <button type="submit">
              Submit <span>↗</span>
            </button>

            <p className="contact-v2-form-note">
              We will reach out to you about 24 hours in work days
            </p>
          </form>
        </div>
      </section>

      {/* FAQ */}
      <section className="contact-v2-faq-section">
        <div className="contact-v2-faq-header">
          <span className="contact-v2-faq-pill">WE&apos;VE GOT YOU COVERED</span>
          <h2 className="contact-v2-faq-title">Frequently Asked Questions</h2>
        </div>

        <div className="contact-v2-faq-list">
          {[
            "What age groups and classes do you cater to with our STEM curriculums?",
            "What kind of support do we offer for schools participating in competitions and exhibitions?",
            "How do you set up a Robotics Lab in a school?",
            "What makes our iLMS different from other platforms?",
            "What is included in the Virtual Reality Lab setup?",
            "Can our school integrate existing resources into your programs?",
            "How do we get started with setting up a Maker Space in our school?",
          ].map((q, i) => (
            <div key={i} className="contact-v2-faq-item">
              <p>{q}</p>
              <span className="contact-v2-faq-icon">⌄</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default Contact;
