import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";

export default function Terms() {
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
        <h1>Terms Of Publications</h1>
        <ul>
          <li>
            E-Publication Services Provides a wide range of publication and consultation
            services for various journals indexed in Scopus, web of science,
            PubMED, google scholar etc.
          </li>
          <li>
            We work as intermediator for publication between author and target
            journal. Now a days it is a very hectic work to select a respected
            journals with specific indexing and the journal who follows best
            practices for research publication.
          </li>
          <li>
            Once author submit the article and selects the journal from given
            list, the author can not withdraw the article.
          </li>
          <li>Once article is accepted author can not withdraw the article.</li>
          <li>
            If author withdraws article after processing with our partner
            journals or after acceptance of article, then the initial advance
            fee will not be refunded.
          </li>
          <li>
            E-Publication Services only helps in publication of article with our partner
            journals, so we do not guarantee a 100% publication.
          </li>
          <li>
            E-Publication Services does not involve any decision making regarding the
            article by our partner journals.
          </li>
          <li>Article processing fees and advance fee is not refundable.</li>
          <li>
            Our partner journal follows the review process with their own
            editorial members and they have the right to accept of reject your
            article.
          </li>
          <li>
            Article modification after submission will be tolerated according to
            policies of target journal.
          </li>
          <li>
            Author will be responsible for originality, authenticity of their
            article. And article should not be submitted to anywhere or should
            not be under review any other journal before submitting to RPS.
          </li>
          <li>
            Copyright of article will follow the policies of target journal.
          </li>
          <li>
            Corresponding author will be responsible to acceptance of article
            and he/she is responsible for the payment of publication charges.
          </li>

          <li>
            E-Publication Services have the right to take preliminary review of the
            article before submitting to target journal.
          </li>
          <li>
            E-Publication Services have the right to make formatting charges according
            to guidelines of target journals.
          </li>
          <li>
            E-Publication Services have the right to make minor modification in article
            with consultation of corresponding author.
          </li>
          <li>
            E-Publication Services only provide guidance, support and consultation for
            processing your article for publication in target journal.
          </li>
          <li>
            E-Publication Services have the right to ask for advance payment for
            maintenance of article.
          </li>
          <li>
            E-Publication Services is not responsible for inclusion or exclusion of
            indexed journals in different databases.
          </li>
          <li>
            If any article is accepted in target publication and author pays the
            charges after acceptance. And by any chance target journal is
            removed from a specific indexing before publication of your article.
            In that case E-Publication Services will not be responsible for refund, but
            we can try to get the refund from target journal.
          </li>
          <li>
            Author is responsible for selection of journal and crosscheck the
            information given on RPS website with target journal. E-Publication Services
            will not be responsible for queries after publication of your
            article.
          </li>
        </ul>
      </motion.div>
    </AnimatePresence>
  );
}
