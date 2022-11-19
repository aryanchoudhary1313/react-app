import { useInView } from "framer-motion";
import React, { useRef } from "react";
import CountUp from "react-countup";
import assurity from "../media/assurity.svg";
import authentic from "../media/authentic.svg";
import customers from "../media/customers.svg";
import fast from "../media/fast.svg";
import globe from "../media/globe.svg";
import homeImage from "../media/desktop.jpg";
import support from "../media/support.svg";

export default function PageOne() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div className="page-one-bg" ref={ref}>
      <div className="page-one">
        <div
          className="page-one-content"
          style={{
            transform: isInView ? "none" : "translateY(100px)",
            opacity: isInView ? 1 : 0,
            transition:
              "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.3s ,color 0.5s",
          }}
        >
          {/* <div className="img-landing">
            <img src={homeImage} alt="main" />
          </div> */}
          <div className="landing-page-info">
            <h1>Hassle-free Publications</h1>
            <p className="content-info">
              E-Publication Services provides a wide range of publication and
              consultation services for various journals indexed in Scopus, web
              of science, PubMed, Google Scholar etc. We work as an
              intermediator for publication between the author and the target
              journal
            </p>
            <h2>Our Dignity</h2>
            <div className="counters">
              <div className="counter-box">
                <div className="countries">
                  <CountUp
                    className="big-numbers"
                    start={0}
                    end={180}
                    duration={2}
                    delay={1}
                  />
                  <span>Countries</span>
                </div>
                <img src={globe} alt="counters" />
              </div>

              <div className="counter-box">
                <div className="customers">
                  <CountUp
                    className="big-numbers-cust"
                    start={0}
                    end={10}
                    duration={2}
                    delay={1}
                  />
                  <span>Customers</span>
                </div>
                <img src={customers} alt="counters" />
              </div>
            </div>
          </div>
        </div>

        <div
          className="addition-info"
          style={{
            transform: isInView ? "none" : "translateY(100px)",
            opacity: isInView ? 1 : 0,
            transition:
              "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.6s ,color 0.5s",
          }}
        >
          <div className="features">
            <img src={authentic} alt="nl" />
            <span>Authenticity</span>
          </div>

          <div className="features">
            <img src={assurity} alt="nl" />
            <span>Assurity</span>
          </div>

          <div className="features">
            <img src={support} alt="nl" />

            <span>Best Support</span>
          </div>

          <div className="features">
            <img src={fast} alt="nl" />
            <span>Fast Process</span>
          </div>
        </div>
      </div>
    </div>
  );
}
