import { useEffect, useState } from "react";
import "./AdminForm.css";

const AdminContactSection = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [contact, setContact] = useState({
    dropdownOptions: Array(6).fill(""),
    contactInfo: {
      phone: "",
      email: "",
      address: "",
      businessHours: {
        weekday: "",
        weekend: "",
      },
    },
  });

  /* =========================
     FETCH EXISTING DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then(res => res.json())
      .then(data => {
        if (data?.contactSection) {
          setContact(prev => ({
            ...prev,
            ...data.contactSection,
            dropdownOptions:
              data.contactSection.dropdownOptions?.length === 6
                ? data.contactSection.dropdownOptions
                : Array(6).fill(""),
          }));
        }
      });
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleOptionChange = (index, value) => {
    const updated = [...contact.dropdownOptions];
    updated[index] = value;
    setContact(prev => ({ ...prev, dropdownOptions: updated }));
  };

  const handleInfoChange = (field, value) => {
    setContact(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        [field]: value,
      },
    }));
  };

  const handleHoursChange = (field, value) => {
    setContact(prev => ({
      ...prev,
      contactInfo: {
        ...prev.contactInfo,
        businessHours: {
          ...prev.contactInfo.businessHours,
          [field]: value,
        },
      },
    }));
  };

  /* =========================
     SAVE
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/home`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contactSection: contact,
      }),
    });

    alert("Contact section saved successfully ✅");
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Contact Section</h2>
          <p>Manage contact form options & contact information</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* DROPDOWN OPTIONS */}
          {contact.dropdownOptions.map((opt, i) => (
            <div key={i} className="form-group full">
              <label>Dropdown Option {i + 1}</label>
              <input
                value={opt}
                onChange={(e) => handleOptionChange(i, e.target.value)}
                placeholder="e.g. AI Lab Setup"
              />
            </div>
          ))}

          {/* CONTACT INFO */}
          <div className="form-group">
            <label>Phone Number</label>
            <input
              value={contact.contactInfo.phone}
              onChange={(e) => handleInfoChange("phone", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              value={contact.contactInfo.email}
              onChange={(e) => handleInfoChange("email", e.target.value)}
            />
          </div>

          <div className="form-group full">
            <label>Address</label>
            <textarea
              rows="2"
              value={contact.contactInfo.address}
              onChange={(e) => handleInfoChange("address", e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Weekday Hours</label>
            <input
              value={contact.contactInfo.businessHours.weekday}
              onChange={(e) => handleHoursChange("weekday", e.target.value)}
              placeholder="Mon – Sat: 9:00 AM – 6:00 PM"
            />
          </div>

          <div className="form-group">
            <label>Weekend Hours</label>
            <input
              value={contact.contactInfo.businessHours.weekend}
              onChange={(e) => handleHoursChange("weekend", e.target.value)}
              placeholder="Sunday: Closed"
            />
          </div>

          <div className="form-actions">
            <button type="submit">Save Contact Section</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminContactSection;
