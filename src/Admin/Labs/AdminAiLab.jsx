import { useEffect, useState } from "react";

const AdminAiLab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [aiLab, setAiLab] = useState({
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
    fetch(`${API_URL}/api/ai-lab`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        setAiLab((prev) => ({
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
    setAiLab((prev) => ({
      ...prev,
      hero: { ...prev.hero, [name]: value },
    }));
  };

  const handleStemChange = (e) => {
    const { name, value } = e.target;
    setAiLab((prev) => ({
      ...prev,
      stemSection: { ...prev.stemSection, [name]: value },
    }));
  };

  const handleVideoChange = (e) => {
    setAiLab((prev) => ({
      ...prev,
      videoSection: { videoUrl: e.target.value },
    }));
  };

  /* SUBMIT */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/ai-lab`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(aiLab),
      });

      if (!res.ok) throw new Error();
      alert("AI Lab saved successfully ✅");
    } catch {
      alert("Error saving AI Lab ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>AI Lab Page</h2>
          <p>Edit complete AI Lab page content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* HERO */}
          <div className="form-group full">
            <label>Hero Title</label>
            <input
              type="text"
              name="title"
              value={aiLab.hero.title}
              onChange={handleHeroChange}
            />
          </div>

          <div className="form-group full">
            <label>Hero Description</label>
            <textarea
              rows="3"
              name="description"
              value={aiLab.hero.description}
              onChange={handleHeroChange}
            />
          </div>

          {/* STEM */}
          <div className="form-group full">
            <label>STEM Sub Text</label>
            <textarea
              rows="3"
              name="subText"
              value={aiLab.stemSection.subText}
              onChange={handleStemChange}
            />
          </div>

          <div className="form-group full">
            <label>STEM Heading</label>
            <input
              type="text"
              name="heading"
              value={aiLab.stemSection.heading}
              onChange={handleStemChange}
            />
          </div>

          {/* VIDEO */}
          <div className="form-group full">
            <label>AI Lab Video URL</label>
            <input
              type="text"
              value={aiLab.videoSection.videoUrl}
              onChange={handleVideoChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save AI Lab"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminAiLab;
