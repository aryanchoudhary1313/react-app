import { AnimatePresence, motion } from "framer-motion";
import React from "react";

export default function Support() {
  const animation = {
    initial: { y: "100px", opacity: 0 },
    animate: { y: "0", opacity: 1 },
    exit: { opacity: 0, y: "100px" },
    transition: {
      duration: 1,
      type: "spring",
    },
  };
  return (
    <AnimatePresence>
      <motion.div {...animation} className="extra-text-page">
        <h1>Guidance & Support</h1>

        <ul>
          <li>
            E-Publication understands the author requirements and guide the
            author in best way we can.
          </li>
          <li>
            We provide a wide range of journals indexed in some major databases
            like Scopus, Web of Science, PubMed etc and much more.
          </li>
          <li>
            We help authors in journal selection and provide our article
            maintenance service for proper formatting of article before final
            submission to target journal.
          </li>
          <li>
            We help our author to assist with their review revisions and make
            the necessary changes so that there would be higher chances of
            acceptance.
          </li>
          <li>
            We can not help you with the research material as you know best
            about your field but we can ensure everything else for possible
            publication in indexed journals.
          </li>
          <li>
            Author can contact us any time and consult about their publication
            process.
          </li>
          <li>
            We provide 24X7 support to our authors and help with their
            publication.
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
