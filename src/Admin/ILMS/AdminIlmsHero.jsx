import { useEffect, useState } from "react";

const AdminIlmsHero = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [hero, setHero] = useState({
    description: "",
    ctaText: "",
    ctaUrl: "",
    videoUrl: "",
  });

  const [saving, setSaving] = useState(false);

  /* FETCH EXISTING DATA */
  useEffect(() => {
    fetch(`${API_URL}/api/ilms`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.hero) {
          setHero((prev) => ({ ...prev, ...data.hero }));
        }
      })
      .catch(() => {});
  }, []);

  /* INPUT HANDLER */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setHero((prev) => ({ ...prev, [name]: value }));
  };

  /* SAVE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/ilms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hero }),
      });

      if (!res.ok) throw new Error();
      alert("ILMS Hero saved ✅");
    } catch {
      alert("Error saving ILMS Hero ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>ILMS Hero Section</h2>
          <p>Edit ILMS hero content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          <div className="form-group full">
            <label>Description</label>
            <textarea
              rows="3"
              name="description"
              value={hero.description}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CTA Text</label>
            <input
              type="text"
              name="ctaText"
              value={hero.ctaText}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>CTA URL</label>
            <input
              type="text"
              name="ctaUrl"
              value={hero.ctaUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-group full">
            <label>Video URL</label>
            <input
              type="text"
              name="videoUrl"
              value={hero.videoUrl}
              onChange={handleChange}
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Hero"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminIlmsHero;
