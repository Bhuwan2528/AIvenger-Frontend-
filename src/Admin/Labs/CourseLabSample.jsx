import { useEffect, useState } from "react";

const CourseLabSample = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    whyCourse: { content: "" },
    ourLab: { images: ["", "", ""] },
    sampleDesign: { description: "", images: ["", "", ""] },
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/similar-lab`)
      .then((res) => res.json())
      .then((resData) => {
        if (!resData) return;
        setData({
          whyCourse: resData.whyCourse || { content: "" },
          ourLab: { images: resData.ourLab?.images || ["", "", ""] },
          sampleDesign: {
            description: resData.sampleDesign?.description || "",
            images: resData.sampleDesign?.images || ["", "", ""],
          },
        });
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`${API_URL}/api/similar-lab`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    alert("Saved successfully ✅");
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">

        {/* HEADER */}
        <div className="admin-hero-header">
          <h2>Why Course / Our Lab / Sample Design</h2>
          <p>Edit Similar Lab content sections</p>
        </div>

        {/* FORM */}
        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* WHY COURSE */}
          <div className="form-group full">
            <label>Why Course Content</label>
            <textarea
              rows="4"
              value={data.whyCourse.content}
              onChange={(e) =>
                setData({ ...data, whyCourse: { content: e.target.value } })
              }
            />
          </div>

          {/* OUR LAB IMAGES */}
          {[0, 1, 2].map((i) => (
            <div className="form-group full" key={i}>
              <label>Our Lab Image {i + 1}</label>
              <input
                type="text"
                value={data.ourLab.images[i]}
                onChange={(e) => {
                  const images = [...data.ourLab.images];
                  images[i] = e.target.value;
                  setData({ ...data, ourLab: { images } });
                }}
              />
            </div>
          ))}

          {/* SAMPLE DESIGN */}
          <div className="form-group full">
            <label>Sample Design Description</label>
            <textarea
              rows="4"
              value={data.sampleDesign.description}
              onChange={(e) =>
                setData({
                  ...data,
                  sampleDesign: {
                    ...data.sampleDesign,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>

          {[0, 1, 2].map((i) => (
            <div className="form-group full" key={i}>
              <label>Sample Design Image {i + 1}</label>
              <input
                type="text"
                value={data.sampleDesign.images[i]}
                onChange={(e) => {
                  const images = [...data.sampleDesign.images];
                  images[i] = e.target.value;
                  setData({
                    ...data,
                    sampleDesign: { ...data.sampleDesign, images },
                  });
                }}
              />
            </div>
          ))}

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Section"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CourseLabSample;
