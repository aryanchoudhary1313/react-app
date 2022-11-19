import { useInView } from "framer-motion";
import { useRef } from "react";
import call from "../media/call.svg";
import facebook from "../media/facebook.svg";
import instagram from "../media/instagram.svg";
import logo from "../media/logo512.png";
import mail from "../media/mail.svg";
import twitter from "../media/twitter.svg";
import { FooterLink } from "./CustomLinks";
import { publicationName, contactInfo, social } from "../services/siteData";

export default function Footer({ header }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <>
      <footer ref={ref}>
        <div
          className="contact-page"
          style={{
            transform: isInView ? "none" : "translateY(50px)",
            opacity: isInView ? 1 : 0,
            transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) 0.5s",
          }}
        >
          <div className="contact-details">
            {!header && (
              <div className="contact-us-mikky">
                <img src={logo} alt="flogo" />
                <span>World Class Publication Services</span>
              </div>
            )}

            <a href={`tel:${contactInfo.phone}`}>
              <div className="contact-us">
                <img src={call} alt="c" />
                <p>Call Us</p>
                <p>{contactInfo.phone}</p>
                {!header && <span>Mon-Sat from 10am to 7pm</span>}
              </div>
            </a>
            <a href={`mailto:${contactInfo.email}`}>
              <div className="contact-us">
                <img src={mail} alt="c" />
                <p>Email Us</p>
                <p>{contactInfo.email}</p>
                {!header && <span>Speak to our friendly team</span>}
              </div>
            </a>
          </div>

          <div className="support-details">
            <div>
              <h4>Company</h4>
              <FooterLink to="/about"> About Us</FooterLink>
              <FooterLink to="/submit-journals"> Contact Us</FooterLink>
              <FooterLink to="/submit-journals"> Submit Articles</FooterLink>
            </div>
            <div>
              <h4>Resources</h4>
              <FooterLink to="/faq"> FAQ</FooterLink>
              <FooterLink to="/customer-help"> Help Center</FooterLink>
              <FooterLink to="/support"> Guidance Support</FooterLink>
            </div>
            <div>
              <h4>Legal</h4>
              <FooterLink to="/terms"> Terms of Use</FooterLink>
              <FooterLink to="/terms"> Privacy Policy</FooterLink>
            </div>
          </div>

          <div className="footer-info">
            <h3>&copy; 2022 {publicationName}. All rights reserved </h3>
            <div className="social-links">
              <a
                href={social.instagram}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <img src={instagram} alt="s" />
                </button>
              </a>
              <a
                href={social.facebook}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <img src={facebook} alt="s" />
                </button>
              </a>
              <a
                href={social.twitter}
                target="_blank"
                rel="noopener noreferrer"
              >
                <button>
                  <img src={twitter} alt="s" />
                </button>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
