import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function About() {
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
        <h1>About Us</h1>
        <p>
          Today there are thousands of publishers with millions of publication
          in each field of research that are not limited to engineering,
          science, medical, social science, business, education, mathematics,
          economics etc. There are a lot of indexing available and some of most
          reputable databases are Scopus by Elsevier, Web of Science by
          Clarivate, DOAJ, PubMed, UGC CARE etc. Journals ranging from open
          access to closed access, free publication to paid publication.
        </p>
        <p>
          Author faces very difficulty in selecting a specific journal according
          their specific requirement. An author may be researcher, a PhD
          student, lecturer, professor, HOD, principle of any institution,
          employee of any private or public sector institution. Many author with
          low knowledge of computers face issues in formatting of article
          according to journal guidelines.
        </p>
        <p>
          And about many articles are just rejected due to incorrect scope of
          journal, formatting not according to journal guidelines, author not
          submitted in specific review period and much more little reasons that
          can be avoided with our help.
        </p>
        <p>
          All author needs to get their research published with a tight schedule
          with minimal budget in indexed and reputed journal. Many institutions
          require different journals indexed in different databases.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
