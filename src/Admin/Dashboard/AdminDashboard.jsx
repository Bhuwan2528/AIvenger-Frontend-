import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminDashboard.css";

/* ========= IMPORTS ========= */
import AdminFooter from "../ContactFooter/AdminFooter";
import AdminHero from "../Home/AdminHero";
import AdminChooseSection from "../Home/AdminChooseSection";
import AdminTestimonials from "../Home/AdminTestimonials";
import AdminContactSection from "../Home/AdminContactSection";

import AdminRoboticsLab from "../Labs/AdminRoboticsLab";
import AdminAiLab from "../Labs/AdminAiLab";
import AdminCompositeLab from "../Labs/AdminCompositeLab";
import CourseLabSample from "../Labs/CourseLabSample";
import AdminOurFacilities from "../Labs/AdminOurFacilities";
import AdminQuestions from "../Labs/AdminQuestions";

import AdminIlmsHero from "../ILMS/AdminIlmsHero";
import AdminIlmsChoose from "../ILMS/AdminIlmsChoose";

import AdminCompetitionHero from "../Competiton/AdminCompetitionHero";
import AdminVictory from "../Competiton/AdminVictory";
import AdminWin from "../Competiton/AdminWin";

import AdminContact from "../ContactFooter/AdminContact";

/* ========= SMALL COMPONENTS ========= */

const Dashboard = () => (
  <div>
    <h2>Admin Panel Dashboard</h2>
    <br />
    <p style={{ color: "grey" }}>
      "Choose a page from Sidebar to Insert or Update Website's Content"
    </p>
  </div>
);

const Footer = () => <AdminFooter />;
const Hero = () => <AdminHero />;
const Choose = () => <AdminChooseSection />;
const Testimonials = () => <AdminTestimonials />;
const ContactForm = () => <AdminContactSection />;

const RoboticsLab = () => <AdminRoboticsLab />;
const AiLab = () => <AdminAiLab />;
const CompositeLab = () => <AdminCompositeLab />;

const TriSection = () => <CourseLabSample />;
const Facilities = () => <AdminOurFacilities />;
const Questions = () => <AdminQuestions />;

const IlmsHero = () => <AdminIlmsHero />;
const IlmsChoose = () => <AdminIlmsChoose />;

const CompetitionHero = () => <AdminCompetitionHero />;
const Victory = () => <AdminVictory />;
const Win = () => <AdminWin />;

const Contact = () => <AdminContact />;

/* ========= MAIN COMPONENT ========= */

const AdminDashboard = () => {
  /* ✅ ALL HOOKS AT TOP */
  const navigate = useNavigate();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [active, setActive] = useState("dashboard");

  /* ========= AUTH CHECK ========= */
  useEffect(() => {
    const checkAdminAuth = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/admin/check", {
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/admin/login");
          return;
        }

        setCheckingAuth(false);
      } catch (error) {
        navigate("/admin/dashboard");
      }
    };

    checkAdminAuth();
  }, [navigate]);

  /* ========= LOGOUT ========= */
  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/admin/logout", {
        method: "POST",
        credentials: "include",
      });

      navigate("/admin/login");
    } catch (error) {
      alert("Logout failed");
    }
  };

  /* ========= LOADING STATE ========= */
  if (checkingAuth) {
    return <div style={{ padding: "40px" }}>Checking authentication...</div>;
  }

  /* ========= MENU ITEM ========= */
  const MenuItem = ({ id, label }) => (
    <div
      className={`menu-link ${active === id ? "active" : ""}`}
      onClick={() => setActive(id)}
    >
      {label}
    </div>
  );

  return (
    <div className="admin-layout">
      {/* SIDEBAR */}
      <aside className="sidebar">
        <div className="sidebar-title">Admin Panel</div>

        <MenuItem id="dashboard" label="Dashboard" />
        <MenuItem id="footer" label="Footer" />

        <div className="menu-section">Home Page</div>
        <MenuItem id="hero" label="Hero Section" />
        <MenuItem id="choose" label="Choose Section" />
        <MenuItem id="testimonials" label="Testimonials" />
        <MenuItem id="contactForm" label="Contact Form" />

        <div className="menu-section">Lab Pages</div>
        <MenuItem id="robotics" label="Robotics Lab" />
        <MenuItem id="ai" label="AI Lab" />
        <MenuItem id="composite" label="Composite Lab" />

        <div className="menu-section">Repeating Lab Sections</div>
        <MenuItem id="tri" label="Course Lab Sample" />
        <MenuItem id="facilities" label="Our Facilities" />
        <MenuItem id="questions" label="Questions CTA" />

        <div className="menu-section">ILMS Page</div>
        <MenuItem id="ilmsHero" label="Hero Section" />
        <MenuItem id="ilmsChoose" label="Choose Section" />

        <div className="menu-section">Competition & Exhibition</div>
        <MenuItem id="competitionHero" label="Hero Section" />
        <MenuItem id="victory" label="Victory Section" />
        <MenuItem id="win" label="Win Section" />

        <div className="menu-section">Contact Page</div>
        <MenuItem id="contact" label="Contact Form" />

        <div className="logout-wrapper">
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </aside>

      {/* CONTENT */}
      <main className="content">
        {active === "dashboard" && <Dashboard />}
        {active === "footer" && <Footer />}
        {active === "hero" && <Hero />}
        {active === "choose" && <Choose />}
        {active === "testimonials" && <Testimonials />}
        {active === "contactForm" && <ContactForm />}
        {active === "robotics" && <RoboticsLab />}
        {active === "ai" && <AiLab />}
        {active === "composite" && <CompositeLab />}
        {active === "tri" && <TriSection />}
        {active === "facilities" && <Facilities />}
        {active === "questions" && <Questions />}
        {active === "ilmsHero" && <IlmsHero />}
        {active === "ilmsChoose" && <IlmsChoose />}
        {active === "competitionHero" && <CompetitionHero />}
        {active === "victory" && <Victory />}
        {active === "win" && <Win />}
        {active === "contact" && <Contact />}
      </main>
    </div>
  );
};

export default AdminDashboard;
