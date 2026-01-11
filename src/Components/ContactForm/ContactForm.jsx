import React from "react";
import "./ContactForm.css";
import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiSend,
} from "react-icons/fi";

const ContactForm = ({ data }) => {
  const dropdownOptions = data?.dropdownOptions || [];
  const info = data?.contactInfo || {};

  return (
    <section className="contact-section">
      <div className="contact-container">

        {/* LEFT : FORM */}
        <div className="contact-form-card">
          <form>
            <div className="form-grid">
              <div className="form-group">
                <label>Full Name *</label>
                <input type="text" placeholder="Enter your name" />
              </div>

              <div className="form-group">
                <label>Email Address *</label>
                <input type="email" placeholder="your@email.com" />
              </div>

              <div className="form-group">
                <label>Phone Number *</label>
                <input type="tel" placeholder="+91 98765 43210" />
              </div>

              <div className="form-group">
                <label>School / Organization</label>
                <input type="text" placeholder="Your school name" />
              </div>
            </div>

            {/* DROPDOWN (DYNAMIC) */}
            <div className="form-group full">
              <label>I'm Interested In *</label>
              <select>
                <option className="option1">Select an option</option>
                {dropdownOptions.map((opt, index) => (
                  <option key={index}>{opt}</option>
                ))}
              </select>
            </div>

            <div className="form-group full">
              <label>Message</label>
              <textarea placeholder="Tell us more about your requirements..." />
            </div>

            <button className="submit-btn">
              Submit Request <FiSend />
            </button>
          </form>
        </div>

        {/* RIGHT : INFO */}
        <div className="contact-info">

          <div className="info-card">
            <h3>Contact Information</h3>

            <div className="info-item">
              <span className="icon"><FiPhone /></span>
              <div>
                <p>Call Us</p>
                <span>{info.phone || "+91 9999204834"}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="icon"><FiMail /></span>
              <div>
                <p>Email Us</p>
                <span>{info.email || "info@aivengers.co.in"}</span>
              </div>
            </div>

            <div className="info-item">
              <span className="icon"><FiMapPin /></span>
              <div>
                <p>Visit Us</p>
                <span>
                  {info.address ||
                    "E cell IIT Gawhati, Bangalore office, Gurgaon office, Jaipur office."}
                </span>
              </div>
            </div>

            <div className="info-item">
              <span className="icon"><FiClock /></span>
              <div>
                <p>Business Hours</p>
                <span>
                  {info.businessHours?.weekday ||
                    "Mon – Sat: 9:00 AM – 6:00 PM"}
                </span>
                <span>
                  {info.businessHours?.weekend || "Sunday: Closed"}
                </span>
              </div>
            </div>
          </div>

          <div className="response-card">
            <h4>Quick Response Guaranteed</h4>
            <p>Our team responds to all inquiries within 24 hours</p>

            <div className="response-time">
              <span>24hrs</span>
              <small>Average Response Time</small>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactForm;
