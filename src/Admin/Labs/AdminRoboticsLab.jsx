import { useEffect, useState } from "react";

const AdminRoboticsLab = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  /* =========================
     FULL PAGE STATE
     (MODEL BASED)
  ========================= */
  const [robotics, setRobotics] = useState({
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

  /* =========================
     FETCH EXISTING DATA
     (SAFE EVEN IF DB EMPTY)
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/lab`)
      .then((res) => res.json())
      .then((data) => {
        if (!data) return;

        setRobotics((prev) => ({
          ...prev,
          hero: {
            ...prev.hero,
            ...(data.hero || {}),
          },
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

  /* =========================
     CHANGE HANDLERS
  ========================= */
  const handleHeroChange = (e) => {
    const { name, value } = e.target;
    setRobotics((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [name]: value,
      },
    }));
  };

  const handleStemChange = (e) => {
    const { name, value } = e.target;
    setRobotics((prev) => ({
      ...prev,
      stemSection: {
        ...prev.stemSection,
        [name]: value,
      },
    }));
  };

  const handleVideoChange = (e) => {
    setRobotics((prev) => ({
      ...prev,
      videoSection: {
        videoUrl: e.target.value,
      },
    }));
  };

  /* =========================
     SUBMIT FORM
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/lab`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(robotics),
      });

      if (!res.ok) throw new Error();

      alert("Robotics Lab page saved successfully ✅");
    } catch (err) {
      console.error(err);
      alert("Error saving Robotics Lab ❌");
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
          <h2>Robotics Lab Page</h2>
          <p>Edit complete Robotics Lab page content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* ================= HERO ================= */}
          <div className="form-group full">
            <label>Hero Title</label>
            <input
              type="text"
              name="title"
              value={robotics.hero.title}
              onChange={handleHeroChange}
              placeholder="Transform with Robotics"
            />
          </div>

          <div className="form-group full">
            <label>Hero Description</label>
            <textarea
              rows="3"
              name="description"
              value={robotics.hero.description}
              onChange={handleHeroChange}
            />
          </div>

          {/* ================= STEM ================= */}
          <div className="form-group full">
            <label>STEM Sub Text</label>
            <textarea
              rows="3"
              name="subText"
              value={robotics.stemSection.subText}
              onChange={handleStemChange}
            />
          </div>

          <div className="form-group full">
            <label>STEM Heading</label>
            <input
              type="text"
              name="heading"
              value={robotics.stemSection.heading}
              onChange={handleStemChange}
            />
          </div>

          {/* ================= VIDEO ================= */}
          <div className="form-group full">
            <label>Robotics Video URL</label>
            <input
              type="text"
              value={robotics.videoSection.videoUrl}
              onChange={handleVideoChange}
              placeholder="https://example.com/robotics-video.mp4"
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Robotics Page"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminRoboticsLab;
