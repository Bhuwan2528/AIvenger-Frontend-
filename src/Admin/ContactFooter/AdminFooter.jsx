import { useEffect, useState } from "react";

const AdminFooter = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    brand: {
      logoUrl: "",
      description: "",
    },
    about: {
      heading: "",
      link1: { text: "", url: "" },
      link2: { text: "", url: "" },
      link3: { text: "", url: "" },
      link4: { text: "", url: "" },
      link5: { text: "", url: "" },
    },
    company: {
      heading: "",
      link1: { text: "", url: "" },
      link2: { text: "", url: "" },
      link3: { text: "", url: "" },
      link4: { text: "", url: "" },
      link5: { text: "", url: "" },
    },
    support: {
      heading: "",
      link1: { text: "", url: "" },
      link2: { text: "", url: "" },
      link3: { text: "", url: "" },
      link4: { text: "", url: "" },
      link5: { text: "", url: "" },
    },
    socials: {
      instagramUrl: "",
      youtubeUrl: "",
    },
    bottomText: "",
  });

  const [saving, setSaving] = useState(false);

  /* =========================
     FETCH FOOTER DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/footer`)
      .then((res) => res.json())
      .then((resData) => {
        if (resData) {
          setData((prev) => ({ ...prev, ...resData }));
        }
      })
      .catch(() => {});
  }, []);

  /* =========================
     HANDLERS
  ========================= */
  const handleBrandChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      brand: { ...prev.brand, [field]: value },
    }));
  };

  const handleColumnChange = (column, field, value) => {
    setData((prev) => ({
      ...prev,
      [column]: { ...prev[column], [field]: value },
    }));
  };

  const handleLinkChange = (column, linkKey, field, value) => {
    setData((prev) => ({
      ...prev,
      [column]: {
        ...prev[column],
        [linkKey]: {
          ...prev[column][linkKey],
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
    setSaving(true);

    try {
      const res = await fetch(`${API_URL}/api/footer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      alert("Footer saved successfully ✅");
    } catch {
      alert("Error saving footer ❌");
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
          <h2>Footer Settings</h2>
          <p>Edit footer content, links and social URLs</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          {/* BRAND */}
          <div className="form-group full">
            <label>Logo URL</label>
            <input
              value={data.brand.logoUrl}
              onChange={(e) =>
                handleBrandChange("logoUrl", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Brand Description</label>
            <textarea
              rows="3"
              value={data.brand.description}
              onChange={(e) =>
                handleBrandChange("description", e.target.value)
              }
            />
          </div>

          {/* SOCIALS */}
          <div className="form-group">
            <label>Instagram URL</label>
            <input
              value={data.socials.instagramUrl}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  socials: {
                    ...prev.socials,
                    instagramUrl: e.target.value,
                  },
                }))
              }
            />
          </div>

          <div className="form-group">
            <label>YouTube URL</label>
            <input
              value={data.socials.youtubeUrl}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  socials: {
                    ...prev.socials,
                    youtubeUrl: e.target.value,
                  },
                }))
              }
            />
          </div>

          {/* BOTTOM TEXT */}
          <div className="form-group full">
            <label>Bottom Copyright Text</label>
            <input
              value={data.bottomText}
              onChange={(e) =>
                setData((prev) => ({
                  ...prev,
                  bottomText: e.target.value,
                }))
              }
            />
          </div>

          {/* COLUMNS */}
          {["about", "company", "support"].map((col) => (
            <div key={col} className="form-group full">
              <label>{col.toUpperCase()} Heading</label>
              <input
                value={data[col].heading}
                onChange={(e) =>
                  handleColumnChange(col, "heading", e.target.value)
                }
              />

              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="form-group">
                  <label>{col} link {i} text</label>
                  <input
                    value={data[col][`link${i}`].text}
                    onChange={(e) =>
                      handleLinkChange(
                        col,
                        `link${i}`,
                        "text",
                        e.target.value
                      )
                    }
                  />

                  <label>{col} link {i} url</label>
                  <input
                    value={data[col][`link${i}`].url}
                    onChange={(e) =>
                      handleLinkChange(
                        col,
                        `link${i}`,
                        "url",
                        e.target.value
                      )
                    }
                  />
                </div>
              ))}
            </div>
          ))}

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Footer"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminFooter;
