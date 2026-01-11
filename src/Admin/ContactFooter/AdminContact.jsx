import { useEffect, useState } from "react";

const AdminContact = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    leftInfo: {
      introText: "",
      officeAddress: "",
      phone: "",
      email: "",
    },
    designationOptions: {
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      option5: "",
    },
  });

  const [saving, setSaving] = useState(false);

  /* =========================
     FETCH EXISTING DATA
  ========================= */
  useEffect(() => {
    fetch(`${API_URL}/api/contact`)
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

  /* =========================
     HANDLERS
  ========================= */
  const handleLeftChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      leftInfo: {
        ...prev.leftInfo,
        [field]: value,
      },
    }));
  };

  const handleDesignationChange = (field, value) => {
    setData((prev) => ({
      ...prev,
      designationOptions: {
        ...prev.designationOptions,
        [field]: value,
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
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();
      alert("Contact data saved ✅");
    } catch {
      alert("Error saving contact data ❌");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Contact Page Settings</h2>
          <p>Edit left info and form designation options</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>
          {/* LEFT INFO */}
          <div className="form-group full">
            <label>Intro Text</label>
            <textarea
              rows="3"
              value={data.leftInfo.introText}
              onChange={(e) =>
                handleLeftChange("introText", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Office Address</label>
            <textarea
              rows="4"
              value={data.leftInfo.officeAddress}
              onChange={(e) =>
                handleLeftChange("officeAddress", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              value={data.leftInfo.phone}
              onChange={(e) =>
                handleLeftChange("phone", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={data.leftInfo.email}
              onChange={(e) =>
                handleLeftChange("email", e.target.value)
              }
            />
          </div>

          {/* DESIGNATION OPTIONS */}
          <div className="form-group">
            <label>Designation Option 1</label>
            <input
              value={data.designationOptions.option1}
              onChange={(e) =>
                handleDesignationChange("option1", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Designation Option 2</label>
            <input
              value={data.designationOptions.option2}
              onChange={(e) =>
                handleDesignationChange("option2", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Designation Option 3</label>
            <input
              value={data.designationOptions.option3}
              onChange={(e) =>
                handleDesignationChange("option3", e.target.value)
              }
            />
          </div>

          <div className="form-group">
            <label>Designation Option 4</label>
            <input
              value={data.designationOptions.option4}
              onChange={(e) =>
                handleDesignationChange("option4", e.target.value)
              }
            />
          </div>

          <div className="form-group full">
            <label>Designation Option 5</label>
            <input
              value={data.designationOptions.option5}
              onChange={(e) =>
                handleDesignationChange("option5", e.target.value)
              }
            />
          </div>

          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Contact Settings"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminContact;
