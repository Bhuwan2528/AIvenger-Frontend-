import { useEffect, useState } from "react";

const AdminCompositeLab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [compositeLab, setCompositeLab] = useState({
    hero: {
      title: "",
      description: "",
    },
    stemSection: {
      subText: "",
      heading: "",
    },
    videoSection: {
      videoUrl: "",
    },
  });

  const [saving, setSaving] = useState(false);

  /* FETCH EXISTING DATA */
  useEffect(() => {
    fetch(`${API_URL}/api/composite-lab`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        setCompositeLab((prev) => ({
          ...prev,
          hero: { ...prev.hero, ...(data.hero || {}) },
          stemSection: {
            ...prev.stemSection,
            ...(data.stemSection || {}),
          },
          videoSection: {
            ...prev.videoSection,
            ...(data.videoSection || {}),
          },
        }));
      })
      .catch(() => {});
  }, []);

  /* HANDLERS */
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setCompositeLab((prev) => ({
      ...prev,
      hero: { ...prev.hero, [name]: value },
    }));
  };

  const handleStemChange = (e) => {
    const { name, value } = e.target;
    setCompositeLab((prev) => ({
      ...prev,
      stemSection: { ...prev.stemSection, [name]: value },
    }));
  };

  const handleVideoChange = (e) => {
    setCompositeLab((prev) => ({
      ...prev,
      videoSection: { videoUrl: e.target.value },
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/composite-lab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(compositeLab),
      });

      if (!res.ok) throw new Error();
      alert("Composite Lab saved successfully ✅");
    } catch {
      alert("Error saving Composite Lab ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Composite Lab Page</h2>
          <p>Edit complete Composite Lab page content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* HERO */}
          <div className="form-group full">
            <label>Hero Title</label>
            <input
              type="text"
              name="title"
              value={compositeLab.hero.title}
              onChange={handleHeroChange}
            />
          </div>

          <div className="form-group full">
            <label>Hero Description</label>
            <textarea
              rows="3"
              name="description"
              value={compositeLab.hero.description}
              onChange={handleHeroChange}
            />
          </div>

          {/* STEM */}
          <div className="form-group full">
            <label>STEM Sub Text</label>
            <textarea
              rows="3"
              name="subText"
              value={compositeLab.stemSection.subText}
              onChange={handleStemChange}
            />
          </div>

          <div className="form-group full">
            <label>STEM Heading</label>
            <input
              type="text"
              name="heading"
              value={compositeLab.stemSection.heading}
              onChange={handleStemChange}
            />
          </div>

          {/* VIDEO */}
          <div className="form-group full">
            <label>Composite Lab Video URL</label>
            <input
              type="text"
              value={compositeLab.videoSection.videoUrl}
              onChange={handleVideoChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Composite Lab"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminCompositeLab;
