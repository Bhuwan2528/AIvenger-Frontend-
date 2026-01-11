import { useEffect, useState } from "react";
import "./AdminForm.css";

const AdminHero = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  /* =========================
     HERO STATE (MODEL BASED)
  ========================= */
  const [hero, setHero] = useState({
    badgeText: "",
    leadText: "",
    subText: "",
    primaryButtonText: "",
    primaryButtonURL: "",
    mediaUrl: "",
  });

  const [saving, setSaving] = useState(false);

  /* =========================
     FETCH EXISTING HERO
     (DB empty ho to bhi safe)
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/home`)
      .then((res) => res.json())
      .then((data) => {
        if (data && data.hero) {
          setHero((prev) => ({
            ...prev,
            ...data.hero,
          }));
        }
      })
      .catch(() => {});
  }, []);


  /* =========================
     INPUT CHANGE HANDLER
  ========================= */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /* =========================
     SAVE HERO (CREATE / UPDATE)
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/home`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hero }),
      });

      if (!res.ok) {
        throw new Error("Failed to save hero");
      }

      alert("Hero section saved successfully ✅");
    } catch (error) {
      console.error(error);
      alert("Error saving hero data ❌");
    } finally {
      setSaving(false);
    }
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Hero Section</h2>
          <p>Edit the main hero content of the home page</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          <div className="form-group">
            <label>Badge Text</label>
            <input
              type="text"
              name="badgeText"
              value={hero.badgeText}
              onChange={handleChange}
              placeholder="India’s Most Advanced Labs"
            />
          </div>

          <div className="form-group">
            <label>Lead Text</label>
            <input
              type="text"
              name="leadText"
              value={hero.leadText}
              onChange={handleChange}
              placeholder="Where students don’t just learn"
            />
          </div>

          <div className="form-group full">
            <label>Sub Text</label>
            <textarea
              rows="3"
              name="subText"
              value={hero.subText}
              onChange={handleChange}
              placeholder="Short supporting description"
            />
          </div>

          <div className="form-group">
            <label>Primary Button Text</label>
            <input
              type="text"
              name="primaryButtonText"
              value={hero.primaryButtonText}
              onChange={handleChange}
              placeholder="Book a Meeting"
            />
          </div>

          <div className="form-group">
            <label>Primary Button URL</label>
            <input
              type="text"
              name="primaryButtonURL"
              value={hero.primaryButtonURL}
              onChange={handleChange}
              placeholder="/contact"
            />
          </div>

          <div className="form-group full">
            <label>Hero Video URL</label>
            <input
              type="text"
              name="mediaUrl"
              value={hero.mediaUrl}
              onChange={handleChange}
              placeholder="https://example.com/hero-video.mp4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Hero Section"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminHero;