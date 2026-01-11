import React from "react";
import "./QuestionsCTA.css";
import { FiArrowUpRight } from "react-icons/fi";

const QuestionsCTA = ({ data }) => {
  const fallbackQuestions = [
    {
      text: "Checkout our AI/VR Lab",
      url: "#",
    },
    {
      text: "Get Quotation for Robotics Lab",
      url: "#",
    },
    {
      text: "Start building Robotics Lab with us",
      url: "#",
    },
  ];

  const questions =
    data?.length === 3 ? data : fallbackQuestions;

  const buttonClasses = ["primary", "secondary", "dark"];

  return (
    <section className="questions-cta">
      <h2 className="questions-title">Still have questions?</h2>

      <div className="questions-actions">
        {questions.map((item, index) => (
          <a
            key={index}
            href={item.url || "#"}
            className={`cta-btn ${buttonClasses[index]}`}
          >
            {item.text}
            <FiArrowUpRight />
          </a>
        ))}
      </div>
    </section>
  );
};

export default QuestionsCTA;
