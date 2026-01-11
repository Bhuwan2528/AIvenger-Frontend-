import { useEffect, useState } from "react";

const AdminWin = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    winsHeader: {
      heading: "",
      description: "",
    },
    win1: {
      imageUrl: "",
      teamName: "",
      schoolName: "",
      competition: "",
      event: "",
      position: "",
    },
    win2: {
      imageUrl: "",
      teamName: "",
      schoolName: "",
      competition: "",
      event: "",
      position: "",
    },
    win3: {
      imageUrl: "",
      teamName: "",
      schoolName: "",
      competition: "",
      event: "",
      position: "",
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
      alert("Wins saved ✅");
    } catch {
      alert("Error saving wins ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Competition – Wins</h2>
          <p>Edit competition wins data</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          {/* HEADER */}
          <div className="form-group full">
            <label>Section Heading</label>
            <input
              value={data.winsHeader.heading}
              onChange={(e) =>
                handleChange("winsHeader", "heading", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Section Description</label>
            <textarea
              rows="3"
              value={data.winsHeader.description}
              onChange={(e) =>
                handleChange("winsHeader", "description", e.target.value)
              }
            />
          </div>

          {/* WIN CARDS */}
          {["win1", "win2", "win3"].map((winKey, index) => (
            <div key={winKey} className="form-group full">
              <label>Win {index + 1} Image URL</label>
              <input
                value={data[winKey].imageUrl}
                onChange={(e) =>
                  handleChange(winKey, "imageUrl", e.target.value)
                }
              />

              <label>Team Name</label>
              <input
                value={data[winKey].teamName}
                onChange={(e) =>
                  handleChange(winKey, "teamName", e.target.value)
                }
              />

              <label>School Name</label>
              <input
                value={data[winKey].schoolName}
                onChange={(e) =>
                  handleChange(winKey, "schoolName", e.target.value)
                }
              />

              <label>Competition</label>
              <input
                value={data[winKey].competition}
                onChange={(e) =>
                  handleChange(winKey, "competition", e.target.value)
                }
              />

              <label>Event</label>
              <input
                value={data[winKey].event}
                onChange={(e) =>
                  handleChange(winKey, "event", e.target.value)
                }
              />

              <label>Position</label>
              <input
                value={data[winKey].position}
                onChange={(e) =>
                  handleChange(winKey, "position", e.target.value)
                }
              />
            </div>
          ))}

          <div className="form-actions">
            <button disabled={saving}>
              {saving ? "Saving..." : "Save Wins"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminWin;
