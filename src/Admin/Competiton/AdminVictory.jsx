import { useEffect, useState } from "react";

const AdminVictory = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    victoriesHeader: {
      heading: "",
      description: "",
    },
    victory1: { imageUrl: "", title: "", description: "" },
    victory2: { imageUrl: "", title: "", description: "" },
    victory3: { imageUrl: "", title: "", description: "" },
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

  const handleChange = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(`${API_URL}/api/competition`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      alert("Victories saved ✅");
    } catch {
      alert("Error saving victories ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Competition – Victories</h2>
          <p>Edit victories section content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          {/* HEADER */}
          <div className="form-group full">
            <label>Section Heading</label>
            <input
              value={data.victoriesHeader.heading}
              onChange={(e) =>
                handleChange("victoriesHeader", "heading", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Section Description</label>
            <textarea
              rows="3"
              value={data.victoriesHeader.description}
              onChange={(e) =>
                handleChange("victoriesHeader", "description", e.target.value)
              }
            />
          </div>

          {/* VICTORY 1 */}
          <div className="form-group full">
            <label>Victory 1 Image URL</label>
            <input
              value={data.victory1.imageUrl}
              onChange={(e) =>
                handleChange("victory1", "imageUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Victory 1 Title</label>
            <input
              value={data.victory1.title}
              onChange={(e) =>
                handleChange("victory1", "title", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Victory 1 Description</label>
            <textarea
              rows="3"
              value={data.victory1.description}
              onChange={(e) =>
                handleChange("victory1", "description", e.target.value)
              }
            />
          </div>

          {/* VICTORY 2 */}
          <div className="form-group full">
            <label>Victory 2 Image URL</label>
            <input
              value={data.victory2.imageUrl}
              onChange={(e) =>
                handleChange("victory2", "imageUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Victory 2 Title</label>
            <input
              value={data.victory2.title}
              onChange={(e) =>
                handleChange("victory2", "title", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Victory 2 Description</label>
            <textarea
              rows="3"
              value={data.victory2.description}
              onChange={(e) =>
                handleChange("victory2", "description", e.target.value)
              }
            />
          </div>

          {/* VICTORY 3 */}
          <div className="form-group full">
            <label>Victory 3 Image URL</label>
            <input
              value={data.victory3.imageUrl}
              onChange={(e) =>
                handleChange("victory3", "imageUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Victory 3 Title</label>
            <input
              value={data.victory3.title}
              onChange={(e) =>
                handleChange("victory3", "title", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Victory 3 Description</label>
            <textarea
              rows="3"
              value={data.victory3.description}
              onChange={(e) =>
                handleChange("victory3", "description", e.target.value)
              }
            />
          </div>

          <div className="form-actions">
            <button disabled={saving}>
              {saving ? "Saving..." : "Save Victories"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminVictory;
