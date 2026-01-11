import { useEffect, useState } from "react";
import "./AdminForm.css";

const emptyCard = {
  title: "",
  description: "",
  imageUrl: "",
  buttonText: "",
  buttonURL: "",
};

const normalizeChooseSection = (data) => ({
  intro: {
    heading: data?.intro?.heading || "",
    description: data?.intro?.description || "",
  },
  labs: {
    items:
      data?.labs?.items?.length === 3
        ? data.labs.items
        : [{ ...emptyCard }, { ...emptyCard }, { ...emptyCard }],
  },
  lms: {
    description: data?.lms?.description || "",
    imageUrl: data?.lms?.imageUrl || "",
    buttonText: data?.lms?.buttonText || "",
    buttonURL: data?.lms?.buttonURL || "",
  },
  services: {
    items:
      data?.services?.items?.length === 3
        ? data.services.items
        : [{ ...emptyCard }, { ...emptyCard }, { ...emptyCard }],
  },
});


const AdminChooseSection = () => {
  const API_URL = import.meta.env.VITE_API_URL;

  const [chooseSection, setChooseSection] = useState({
    intro: {
      heading: "",
      description: "",
    },
    labs: {
      items: [{ ...emptyCard }, { ...emptyCard }, { ...emptyCard }],
    },
    lms: {
      description: "",
      imageUrl: "",
      buttonText: "",
      buttonURL: "",
    },
    services: {
      items: [{ ...emptyCard }, { ...emptyCard }, { ...emptyCard }],
    },
  });

  /* =========================
     FETCH EXISTING DATA
  ========================= */
    useEffect(() => {
    fetch(`${API_URL}/api/home`)
        .then((res) => res.json())
        .then((data) => {
        if (data?.chooseSection) {
            setChooseSection(normalizeChooseSection(data.chooseSection));
        }
        })
        .catch(() => {});
    }, []);


  /* =========================
     HANDLERS
  ========================= */
  const handleIntroChange = (e) => {
    const { name, value } = e.target;
    setChooseSection((prev) => ({
      ...prev,
      intro: { ...prev.intro, [name]: value },
    }));
  };

  const handleCardChange = (section, index, field, value) => {
    setChooseSection((prev) => {
      const updatedItems = [...prev[section].items];
      updatedItems[index] = {
        ...updatedItems[index],
        [field]: value,
      };

      return {
        ...prev,
        [section]: {
          ...prev[section],
          items: updatedItems,
        },
      };
    });
  };

  const handleLmsChange = (e) => {
    const { name, value } = e.target;
    setChooseSection((prev) => ({
      ...prev,
      lms: { ...prev.lms, [name]: value },
    }));
  };

  /* =========================
     SAVE
  ========================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch(`${API_URL}/api/home`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chooseSection }),
    });

    alert("Choose Section saved successfully ✅");
  };

  return (
    <div className="admin-hero-page">
      <div className="admin-hero-card">
        <div className="admin-hero-header">
          <h2>Choose Section</h2>
          <p>Manage “Why Choose Us” content</p>
        </div>

        <form className="admin-hero-form" onSubmit={handleSubmit}>

          {/* INTRO */}
          <div className="form-group full">
            <label>Section Heading</label>
            <input
              name="heading"
              value={chooseSection.intro.heading}
              onChange={handleIntroChange}
            />
          </div>

          <div className="form-group full">
            <label>Section Description</label>
            <textarea
              rows="4"
              name="description"
              value={chooseSection.intro.description}
              onChange={handleIntroChange}
            />
          </div>

          {/* LABS */}
          {chooseSection.labs.items.map((item, i) => (
            <div key={`lab-${i}`} className="form-group full">
              <label>Lab {i + 1}</label>
              <input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  handleCardChange("labs", i, "title", e.target.value)
                }
              />
              <textarea
                rows="2"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleCardChange("labs", i, "description", e.target.value)
                }
              />
              <input
                placeholder="Image URL"
                value={item.imageUrl}
                onChange={(e) =>
                  handleCardChange("labs", i, "imageUrl", e.target.value)
                }
              />
              <input
                placeholder="Button Text"
                value={item.buttonText}
                onChange={(e) =>
                  handleCardChange("labs", i, "buttonText", e.target.value)
                }
              />
              <input
                placeholder="Button URL"
                value={item.buttonURL}
                onChange={(e) =>
                  handleCardChange("labs", i, "buttonURL", e.target.value)
                }
              />
            </div>
          ))}

          {/* LMS */}
          <div className="form-group full">
            <label>LMS Description</label>
            <textarea
              rows="3"
              name="description"
              value={chooseSection.lms.description}
              onChange={handleLmsChange}
            />
          </div>

          <div className="form-group">
            <label>LMS Image URL</label>
            <input
              name="imageUrl"
              value={chooseSection.lms.imageUrl}
              onChange={handleLmsChange}
            />
          </div>

          <div className="form-group">
            <label>LMS Button Text</label>
            <input
              name="buttonText"
              value={chooseSection.lms.buttonText}
              onChange={handleLmsChange}
            />
          </div>

          <div className="form-group full">
            <label>LMS Button URL</label>
            <input
              name="buttonURL"
              value={chooseSection.lms.buttonURL}
              onChange={handleLmsChange}
            />
          </div>

          {/* SERVICES */}
          {chooseSection.services.items.map((item, i) => (
            <div key={`service-${i}`} className="form-group full">
              <label>Service {i + 1}</label>
              <input
                placeholder="Title"
                value={item.title}
                onChange={(e) =>
                  handleCardChange("services", i, "title", e.target.value)
                }
              />
              <textarea
                rows="2"
                placeholder="Description"
                value={item.description}
                onChange={(e) =>
                  handleCardChange("services", i, "description", e.target.value)
                }
              />
              <input
                placeholder="Image URL"
                value={item.imageUrl}
                onChange={(e) =>
                  handleCardChange("services", i, "imageUrl", e.target.value)
                }
              />
              <input
                placeholder="Button Text"
                value={item.buttonText}
                onChange={(e) =>
                  handleCardChange("services", i, "buttonText", e.target.value)
                }
              />
              <input
                placeholder="Button URL"
                value={item.buttonURL}
                onChange={(e) =>
                  handleCardChange("services", i, "buttonURL", e.target.value)
                }
              />
            </div>
          ))}

          <div className="form-actions">
            <button type="submit">Save Choose Section</button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default AdminChooseSection;
