import { useEffect, useState } from "react";
import "./Footer.css";
import { FiInstagram, FiYoutube } from "react-icons/fi";
import fallbackLogo from "../../assets/logo.png"; // 👈 fallback logo

const Footer = () => {
  const API_URL = import.meta.env.VITE_API_URL;
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/footer`)
      .then((res) => res.json())
      .then((resData) => setData(resData))
      .catch(() => {});
  }, []);

  const brand = data?.brand || {};
  const about = data?.about || {};
  const company = data?.company || {};
  const support = data?.support || {};
  const socials = data?.socials || {};

  const renderLinks = (column) => {
    return [1, 2, 3, 4, 5].map((i) => {
      const link = column[`link${i}`];
      if (!link?.text) return null;

      return (
        <li key={i}>
          <a href={link.url || "#"}>{link.text}</a>
        </li>
      );
    });
  };

  return (
    <footer className="footer">
      <div className="footer-top">
        {/* LEFT INFO */}
        <div className="footer-brand">
          <div className="footer-logo">
            <img
              src={brand.logoUrl || fallbackLogo}
              alt="Footer Logo"
            />
          </div>

          <p>{brand.description || ""}</p>
        </div>

        {/* ABOUT */}
        <div className="footer-col">
          <h4>{about.heading || ""}</h4>
          <ul>{renderLinks(about)}</ul>
        </div>

        {/* COMPANY */}
        <div className="footer-col">
          <h4>{company.heading || ""}</h4>
          <ul>{renderLinks(company)}</ul>
        </div>

        {/* SUPPORT */}
        <div className="footer-col">
          <h4>{support.heading || ""}</h4>
          <ul>{renderLinks(support)}</ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="footer-bottom">
        <span>{data?.bottomText || ""}</span>

        <div className="footer-socials">
          {socials.instagramUrl && (
            <a
              href={socials.instagramUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FiInstagram /> Instagram
            </a>
          )}

          {socials.youtubeUrl && (
            <a
              href={socials.youtubeUrl}
              target="_blank"
              rel="noreferrer"
            >
              <FiYoutube /> Youtube
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
