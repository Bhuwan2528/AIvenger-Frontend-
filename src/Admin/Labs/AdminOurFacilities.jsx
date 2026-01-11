import { useEffect, useState } from "react";

const AdminOurFacilities = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [data, setData] = useState({
    ourFacilities: {
      heading: "",
      description: "",
      facilities: Array.from({ length: 6 }, () => ({
        image: "",
        title: "",
        description: "",
      })),
    },
  });

  const [saving, setSaving] = useState(false);

  /* FETCH */
  useEffect(() => {
    fetch(`${API_URL}/api/similar-lab`)
      .then((res) => res.json())
      .then((resData) => {
        if (!resData?.ourFacilities) return;

        setData({
          ourFacilities: {
            heading: resData.ourFacilities.heading || "",
            description: resData.ourFacilities.description || "",
            facilities:
              resData.ourFacilities.facilities?.length === 6
                ? resData.ourFacilities.facilities
                : Array.from({ length: 6 }, (_, i) => ({
                    image:
                      resData.ourFacilities.facilities?.[i]?.image || "",
                    title:
                      resData.ourFacilities.facilities?.[i]?.title || "",
                    description:
                      resData.ourFacilities.facilities?.[i]?.description || "",
                  })),
          },
        });
      });
  }, []);

  /* CHANGE HANDLER */
  const handleFacilityChange = (index, field, value) => {
    const facilities = [...data.ourFacilities.facilities];
    facilities[index] = {
      ...facilities[index],
      [field]: value,
    };

    setData({
      ourFacilities: {
        ...data.ourFacilities,
        facilities,
      },
    });
  };

  /* SAVE */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    await fetch(`${API_URL}/api/similar-lab`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    setSaving(false);
    alert("Facilities saved successfully ✅");
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">

        {/* HEADER */}
        <div className="admin-hero-header">
          <h2>Our Facilities</h2>
          <p>Edit facilities section content</p>
        </div>

        {/* FORM */}
        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* HEADING */}
          <div className="form-group full">
            <label>Facilities Heading</label>
            <input
              type="text"
              value={data.ourFacilities.heading}
              onChange={(e) =>
                setData({
                  ourFacilities: {
                    ...data.ourFacilities,
                    heading: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* DESCRIPTION */}
          <div className="form-group full">
            <label>Facilities Description</label>
            <textarea
              rows="3"
              value={data.ourFacilities.description}
              onChange={(e) =>
                setData({
                  ourFacilities: {
                    ...data.ourFacilities,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>

          {/* 6 FACILITY CARDS */}
          {data.ourFacilities.facilities.map((facility, i) => (
            <div key={i}>
              <div className="form-group full">
                <label>Facility {i + 1} Image URL</label>
                <input
                  type="text"
                  value={facility.image}
                  onChange={(e) =>
                    handleFacilityChange(i, "image", e.target.value)
                  }
                />
              </div>

              <div className="form-group full">
                <label>Facility {i + 1} Title</label>
                <input
                  type="text"
                  value={facility.title}
                  onChange={(e) =>
                    handleFacilityChange(i, "title", e.target.value)
                  }
                />
              </div>

              <div className="form-group full">
                <label>Facility {i + 1} Description</label>
                <textarea
                  rows="2"
                  value={facility.description}
                  onChange={(e) =>
                    handleFacilityChange(i, "description", e.target.value)
                  }
                />
              </div>
            </div>
          ))}

          {/* ACTIONS */}
          <div className="form-actions">
            <button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Facilities"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminOurFacilities;
