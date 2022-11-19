import { useState } from "react";
import FaqContainer from './FaqContainer';

const faqs = [
  {
    key: "1",
    question: "What is the authenticity of your publication service? ",
    answer:
      "We have been publishing the research articles for last 7 years. We are absolutely genuine. You may check our website: https://ijrdopubservice.com/ or contact our team to solve each query you have, for your article publication. ",
  },
  {
    key: "2",
    question: "Authors ask for budget-friendly journals.",
    answer:
      "Since, multidisciplinary journals have lower charges as it covers all the scope areas and journals specific to the scope area have higher publication charges. This is decided from journal side, we cannot change it. Please raise your budget. ",
  },
  {
    key: "3",
    question:
      "Doubts on the authenticity of the Letter of Acceptance. How and why should we trust the Letter of Acceptance? ",
    answer:
      "We work as a mediator between the author and the target journal, and we are providing publication services, for the last 7 years. We have a collaboration with the journal, so our clients deal with the journal through us. And we provide the Letter of Acceptance on behalf of journal to our authors. ",
  },
  {
    key: "4",
    question:
      "What is the proof that our article is accepted by the journal?",
    answer:
      "We are the third-party service provider that link author to the target journal. Journal doesn't answer to each and every query, so we are here to link the authors and journals. And Letter of Acceptance provided to you is the proof, that the article is accepted by the journal.",
  },
  {
    key: "5",
    question: "Old authors don't want repeated journals.",
    answer:
      "Authors may check other new journals, specifically to the scope area of the article.",
  },
  {
    key: "6",
    question: "What is the role of Galley Proof?",
    answer:
      "Galley Proof is the pre-published article. It is meant for a Final review of the article by authors, before publication. Since, after publication, no changes will be allowed. So, the author just needs to check everything before we send the article for final publication, in order to decrease the rate of corrections to be made after publication.",
  },
  {
    key: "7",
    question: "Can article publication duration be reduced?",
    answer:
      "The publication time is set from journal side; we cannot alter that.",
  },
  {
    key: "8",
    question: "Can discontinued journals be discouraged from promotion?",
    answer:
      "Journals are discontinued from Scopus, but we can publish the author's article in the back-date issue.",
  },
  {
    key: "9",
    question: "What Review Policy is followed by your publication service?",
    answer:
      "We follow the Double-blind Peer Review Policy. This means that both the reviewer and author's identities are concealed from the reviewers, and vice versa, throughout the review process.",
  },
  {
    key: "10",
    question:
      "Why there are a smaller number of articles published on the Scopus and more on the Journal website?",
    answer:
      "The article must pass through Scopus Criteria for getting Indexed. All the articles do not qualify to get indexed. Hence, there are more articles on the journal website and less on the Scopus.",
  },
];

const faqControlHeader = {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center"
}

const buttonStyle = {
  paddingInline: "1em",
  paddingBlock: "0.5em",
  backgroundColor: "var(--background-color)",
  boxShadow: "0 0 .5em var(--box-shadow)",
  borderRadius: "1em",
  borderColor: "transparent",
  fontSize: "1.4em",
  transition: "0.3s ease-in-out"
}

export default function Faq() {

  const [controlAll, setControl] = useState(false);

  return (
  <div className="faqs-header">
    <h1>How can we help?</h1>
    <p>
        We want you to have the simplest and easiest experience possible. But we
        know you might have a few questions. Read on for details about
        publishing, purchasing, checking order status and more.
    </p>
    <div style={faqControlHeader}>
      <h2>FAQ</h2>
      <div>
        <button onClick={()=>setControl(!controlAll)} style={buttonStyle}>{controlAll ? "Close All" : "Show All"}</button>
      </div>
    </div>
    <div className="faqs-container">
      {faqs.map((faq)=> <FaqContainer controlAll={controlAll} faq={faq} key={faq.key}/>)}
    </div>
  </div>)
}