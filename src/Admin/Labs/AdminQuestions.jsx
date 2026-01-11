import { useEffect, useState } from "react";

const AdminQuestions = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const emptyQuestions = [
    { text: "", url: "" },
    { text: "", url: "" },
    { text: "", url: "" },
  ];

  const [questions, setQuestions] = useState(emptyQuestions);
  const [saving, setSaving] = useState(false);

  /* FETCH */
  useEffect(() => {
    fetch(`${API_URL}/api/similar-lab`)
      .then((res) => res.json())
      .then((resData) => {
        const dbQuestions = resData?.questions || [];

        // 🔑 ALWAYS RETURN EXACT 3 ITEMS
        const normalizedQuestions = [0, 1, 2].map((i) => ({
          text: dbQuestions[i]?.text || "",
          url: dbQuestions[i]?.url || "",
        }));

        setQuestions(normalizedQuestions);
      });
  }, []);

  /* CHANGE HANDLER */
  const handleChange = (index, field, value) => {
    setQuestions((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [field]: value,
      };
      return updated;
    });
  };

  /* SAVE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`${API_URL}/api/similar-lab`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ questions }),
    });

    setSaving(false);
    alert("Questions saved successfully ✅");
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">

        {/* HEADER */}
        <div className="admin-hero-header">
          <h2>Questions / CTA Buttons</h2>
          <p>Edit CTA button text and links</p>
        </div>

        {/* FORM */}
        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {questions.map((q, i) => (
            <div key={i}>
              <div className="form-group full">
                <label>Button {i + 1} Text</label>
                <input
                  type="text"
                  value={q.text}
                  onChange={(e) =>
                    handleChange(i, "text", e.target.value)
                  }
                />
              </div>

              <div className="form-group full">
                <label>Button {i + 1} URL</label>
                <input
                  type="text"
                  value={q.url}
                  onChange={(e) =>
                    handleChange(i, "url", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save CTA Buttons"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminQuestions;
