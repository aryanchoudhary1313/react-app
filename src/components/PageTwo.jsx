import { useInView } from "framer-motion";
import React from "react";
import research from "../media/research.jpg";
import guidance from "../media/guidance.jpg";
import conference from "../media/conference.jpg";

export default function PageTwo({ serviceRef }) {
  const inView = useInView(serviceRef, { once: true });
  return (
    <div
      ref={serviceRef}
      className="page-two-content"
      style={{
        transform: inView ? "none" : "translateY(150px)",
        opacity: inView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1),  color 0.5s",
      }}
    >
      <h1>Services We Offer</h1>

      <div className="box-all">
        <div className="box-container">
          <img loading="lazy" src={guidance} alt="rs" />
          <div className="box-info">
            <h2> Research Guidance</h2>
            <p>
              Research guidance is a group of professionals who are engaged in
              delivering end-to-end research consultation services for research
              scholars..
            </p>
          </div>
        </div>
        <div className="box-container-invert">
          <div className="box-info">
            <h2> Research Publication</h2>
            <p>
              Publications make scientific information publicly available, and
              allow the rest of the academic audience to evaluate the quality of
              the research.
            </p>
          </div>
          <img loading="lazy" src={research} alt="rs" />
        </div>
        <div className="box-container">
          <img loading="lazy" src={conference} alt="rs" />
          <div className="box-info">
            <h2>Conference</h2>
            <p>
              Discover and register for E-Publication's events including
              virtual, hybrid conference proceedings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
