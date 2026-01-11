import { useEffect, useState } from "react";

const AdminIlmsChoose = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    whyChooseHeader: {
      heading: "",
      description: "",
    },
    card1: { title: "", description: "", imageUrl: "" },
    card2: { title: "", description: "", imageUrl: "" },
    card3: { title: "", description: "", imageUrl: "" },
  });

  const [saving, setSaving] = useState(false);

  /* FETCH */
  useEffect(() => {
    fetch(`${API_URL}/api/ilms`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData) {
          setData((prev) => ({
            ...prev,
            ...resData,
          }));
        }
      })
      .catch(() => {});
  }, []);

  /* HANDLER */
  const handleChange = (section, field, value) => {
    setData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  /* SAVE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/ilms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      alert("Choose section saved ✅");
    } catch {
      alert("Error saving choose section ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>ILMS – Why Choose Us</h2>
          <p>Edit choose section content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          {/* HEADER */}
          <div className="form-group">
            <label>Heading</label>
            <input
              value={data.whyChooseHeader.heading}
              onChange={(e) =>
                handleChange("whyChooseHeader", "heading", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Description</label>
            <textarea
              rows="3"
              value={data.whyChooseHeader.description}
              onChange={(e) =>
                handleChange("whyChooseHeader", "description", e.target.value)
              }
            />
          </div>

          {/* CARD 1 */}
          <div className="form-group">
            <label>Card 1 Title</label>
            <input
              value={data.card1.title}
              onChange={(e) =>
                handleChange("card1", "title", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Card 1 Image URL</label>
            <input
              value={data.card1.imageUrl}
              onChange={(e) =>
                handleChange("card1", "imageUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Card 1 Description</label>
            <textarea
              rows="2"
              value={data.card1.description}
              onChange={(e) =>
                handleChange("card1", "description", e.target.value)
              }
            />
          </div>

          {/* CARD 2 */}
          <div className="form-group">
            <label>Card 2 Title</label>
            <input
              value={data.card2.title}
              onChange={(e) =>
                handleChange("card2", "title", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Card 2 Image URL</label>
            <input
              value={data.card2.imageUrl}
              onChange={(e) =>
                handleChange("card2", "imageUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Card 2 Description</label>
            <textarea
              rows="2"
              value={data.card2.description}
              onChange={(e) =>
                handleChange("card2", "description", e.target.value)
              }
            />
          </div>

          {/* CARD 3 */}
          <div className="form-group">
            <label>Card 3 Title</label>
            <input
              value={data.card3.title}
              onChange={(e) =>
                handleChange("card3", "title", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Card 3 Image URL</label>
            <input
              value={data.card3.imageUrl}
              onChange={(e) =>
                handleChange("card3", "imageUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Card 3 Description</label>
            <textarea
              rows="2"
              value={data.card3.description}
              onChange={(e) =>
                handleChange("card3", "description", e.target.value)
              }
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Choose Section"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminIlmsChoose;
