import { useEffect, useState } from "react";

const AdminCompetitionHero = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    hero: {
      videoUrl: "",
      title: "",
      description: "",
    },
    galleryImages: {
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
    },
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/competition`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData) {
          setData((prev) => ({ ...prev, ...resData }));
        }
      })
      .catch(() => {});
  }, []);

  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      hero: { ...prev.hero, [name]: value },
    }));
  };

  const handleGalleryChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      galleryImages: { ...prev.galleryImages, [name]: value },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/competition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      alert("Competition Hero saved ✅");
    } catch {
      alert("Error saving hero ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Competition – Hero & Gallery</h2>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          <div className="form-group full">
            <label>Hero Video URL</label>
            <input
              name="videoUrl"
              value={data.hero.videoUrl}
              onChange={handleHeroChange}
            />
          </div>

          <div className="form-group full">
            <label>Hero Title</label>
            <input
              name="title"
              value={data.hero.title}
              onChange={handleHeroChange}
            />
          </div>

          <div className="form-group full">
            <label>Hero Description</label>
            <textarea
              rows="3"
              name="description"
              value={data.hero.description}
              onChange={handleHeroChange}
            />
          </div>

          {["img1", "img2", "img3", "img4", "img5"].map((img) => (
            <div className="form-group full" key={img}>
              <label>{img.toUpperCase()} URL</label>
              <input
                name={img}
                value={data.galleryImages[img]}
                onChange={handleGalleryChange}
              />
            </div>
          ))}

          <div className="form-actions">
            <button disabled={saving}>
              {saving ? "Saving..." : "Save Hero & Gallery"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCompetitionHero;
