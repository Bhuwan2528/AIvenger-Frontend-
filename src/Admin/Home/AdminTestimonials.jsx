import { useEffect, useState } from "react";
import "./AdminForm.css";

const emptyItem = {
  name: "",
  designation: "",
  message: "",
  imageUrl: "",
};

const AdminTestimonials = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [testimonials, setTestimonials] = useState({
    meetingButtonText: "",
    meetingButtonURL: "",
    items: [{ ...emptyItem }, { ...emptyItem }],
  });

  /* =========================
     FETCH EXISTING DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then(res => res.json())
      .then(data => {
        if (data?.testimonialsSection) {
          setTestimonials(prev => ({
            ...prev,
            meetingButtonText: data.testimonialsSection.meetingButtonText || "",
            meetingButtonURL: data.testimonialsSection.meetingButtonURL || "",
            items:
              data.testimonialsSection.items?.length === 2
                ? data.testimonialsSection.items
                : [{ ...emptyItem }, { ...emptyItem }],
          }));
        }
      });
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonials(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...testimonials.items];
    updated[index] = { ...updated[index], [field]: value };

    setTestimonials(prev => ({
      ...prev,
      items: updated,
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
        testimonialsSection: testimonials,
      }),
    });

    alert("Testimonials saved successfully ✅");
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Testimonials</h2>
          <p>Manage testimonials shown on website</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* CTA */}
          <div className="form-group">
            <label>Meeting Button Text</label>
            <input
              name="meetingButtonText"
              value={testimonials.meetingButtonText}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Meeting Button URL</label>
            <input
              name="meetingButtonURL"
              value={testimonials.meetingButtonURL}
              onChange={handleChange}
            />
          </div>

          {/* TESTIMONIALS (2 FIXED) */}
          {testimonials.items.map((item, i) => (
            <div key={i} className="form-group full">
              <label>Testimonial {i + 1}</label>

              <input
                placeholder="Name"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(i, "name", e.target.value)
                }
              />

              <input
                placeholder="Designation"
                value={item.designation}
                onChange={(e) =>
                  handleItemChange(i, "designation", e.target.value)
                }
              />

              <textarea
                rows="2"
                placeholder="Message"
                value={item.message}
                onChange={(e) =>
                  handleItemChange(i, "message", e.target.value)
                }
              />

              <input
                placeholder="Image URL"
                value={item.imageUrl}
                onChange={(e) =>
                  handleItemChange(i, "imageUrl", e.target.value)
                }
              />
            </div>
          ))}

          <div className="form-actions">
            <button type="submit">Save Testimonials</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminTestimonials;
