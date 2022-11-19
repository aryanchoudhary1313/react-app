import "./App.css";
import "./AppP.css";
import "./AppD.css";
import Header from "./components/Header";
import { useState, useRef, useEffect } from "react";
import Journals from "./reusable-components/journals/Journals";
import Footer from "./components/Footer";
import Home from "./components/Home";
import About from "./components/About";
import { Route, Routes } from "react-router-dom";
import Support from "./components/Support";
import Terms from "./components/Terms";
import ScrollToTop from "./components/ScrollToTop";
import Submit from "./reusable-components/submit-form/Submit";
import FormResponses from "./reusable-components/submit-form/FormResponses";
import JournalInfo from "./reusable-components/journals/JournalInfo";
import Faq from "./reusable-components/Faq/Faq";

function App() {
  const serviceRef = useRef(null);

  const [header, setHeader] = useState();
  const [selectedJournal, setSelectedJournal] = useState();
  const [searchQuery, setSearchQuery] = useState("");
  const [invalidEmail, setInvalidEmail] = useState(false);
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [failed, setFailed] = useState(false);
  const [sideHeader, setSideHeader] = useState();

  useEffect(() => {
    if (window.innerHeight > window.innerWidth || window.innerWidth <= 900)
      setHeader(true);
    else setHeader(false);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const handleResize = () => {
    if (window.innerHeight > window.innerWidth || window.innerWidth <= 900) {
      setHeader(true);
    } else {
      setHeader(false);
      setSideHeader(false);
    }
  };
  const submitprops = {
    invalidEmail,
    sending,
    sent,
    failed,
    setInvalidEmail,
    setFailed,
    setSending,
    setSent,
    header,
  };
  const restprops = {
    invalidEmail,
    sending,
    sent,
    setSent,
    setFailed,
    failed,
  };
  const headerprops = {
    selectedJournal,
    setSelectedJournal,
    setSearchQuery,
    searchQuery,
    serviceRef,
    setHeader,
    header,
    setSideHeader,
    sideHeader,
  };
  const journalprops = {
    selectedJournal,
    setSelectedJournal,
    searchQuery,
    setSearchQuery,
    header,
  };
  return (
    <div id="theme" className="App">
      <Header {...headerprops} />
      <div className="content-all">
        <FormResponses {...restprops} />
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<Home serviceRef={serviceRef} />} />
          <Route path="/" element={<Home serviceRef={serviceRef} />} />
          <Route path="/about" element={<About />} />
          <Route path="/support" element={<Support />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/faq" element={<Faq />} />
          <Route
            path="/submit-journals"
            element={<Submit {...submitprops} />}
          />
          <Route
            path="/journals/:id"
            element={<Journals {...journalprops} />}
          />
          <Route path="/journal/:j_id" element={<JournalInfo />} />
        </Routes>
        <Footer header={header} />
      </div>
    </div>
  );
}

export default App;
