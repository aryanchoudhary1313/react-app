import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import addfile from "./media/addfile.svg";
import file from "./media/file.svg";
import fileerror from "./media/fileerror.svg";
import support from "../../media/support.jpg";
import "./submit.css";
export default function Submit({
  invalidEmail,
  sending,
  sent,
  failed,
  setInvalidEmail,
  setFailed,
  setSending,
  setSent,
  header,
}) {
  const apiURL = process.env.REACT_APP_FORM_LINK;
  const maxFileSizeMB = 17;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [uploadSize, setUploadSize] = useState(false);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileName, setFileName] = useState("Not Selected");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    window.localStorage.setItem("username", name);
    const formData = new FormData();
    formData.append("file", uploadedFile);
    formData.append("name", name);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("subject", subject);
    formData.append("message", message);
    setSending(true);
    axios
      .post(apiURL, formData)
      .then(() => {
        setSent(true);
        setFailed(false);
        setSending(false);
      })
      .catch(() => {
        setSending(false);
        setSent(false);
        setFailed(true);
      });
  }
  useEffect(() => {
    if (sent) {
      setName("");
      setEmail("");
      setPhone("");
      setSubject("");
      setMessage("");
      setFileName("Not Selected");
      setSending(false);
      setUploadSize(false);
      setInvalidEmail(false);
      setButtonDisabled(false);
      setUploadedFile(null);

      setTimeout(() => {
        setSent(false);
        setFailed(false);
      }, 10000);
    }
  }, [sent]);

  useEffect(() => {
    if (failed) {
      setTimeout(() => {
        setInvalidEmail(false);
        setFailed(false);
      }, 10000);
    }
  }, [failed]);

  function handleFileUpload(event) {
    let file = event.target.files[0];
    if (file) {
      if (file.size > maxFileSizeMB * 1000000) {
        setUploadSize(true);
        setUploadedFile(null);
        setFileName("File Size Limited To 16MB");
      } else {
        setFileName(file.name);
        setUploadedFile(file);
        setUploadSize(false);
      }
    } else {
      setUploadSize(false);
      setUploadedFile(null);
      setFileName("Not Selected");
    }
  }
  function validateEmail(email) {
    if (email === "") setInvalidEmail(false);
    else {
      let reg = /^[A-Z0-9._%+-]+@([A-Z0-9-]+\.)+[A-Z]{2,4}$/i;
      if (reg.test(email)) {
        setInvalidEmail(false);
      } else setInvalidEmail(true);
    }
  }
  useEffect(() => {
    if (uploadSize || invalidEmail || sending) setButtonDisabled(true);
    else setButtonDisabled(false);
  }, [uploadSize, invalidEmail, sending]);
  const animation = {
    initial: { y: "10vw", opacity: 0 },
    animate: { y: "0", opacity: 1 },
    exit: { opacity: 0, y: "10vw" },
    transition: {
      duration: 2,
      type: "spring",
      stiffness: 50,
    },
  };
  return (
    <AnimatePresence>
      <motion.div {...animation} className="submit-articles">
        <div className="submit-extra-info">
          <h1>Talk to our experts</h1>
          <p>
            Have Questions about publishing, pricing, custom offer? Fill out the
            form and our team will be in touch shortly.
          </p>
          {!header && (
            <>
              <h2>Our team will guide you through every step</h2>
              <div className="support-img-c">
                <img loading="lazy" src={support} alt="f-s" />
              </div>
            </>
          )}
        </div>

        <form
          className="submit-journal-form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <div className="form-input-fields">
            <label>
              Name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Enter Your Full Name"
              />
            </label>

            <div>
              <label>
                Phone Numbers
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                  placeholder="Eg +1 234-23443242"
                />
              </label>
              <label>
                E-mail
                <input
                  id={invalidEmail ? "error-alert" : ""}
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  required
                  placeholder="email@something.com"
                />
              </label>
            </div>
            <div>
              <label>
                Subject
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Subject of Your Query"
                />
              </label>
              <label>
                Message
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Publication Requirements"
                  rows="5"
                  required
                ></textarea>
              </label>
            </div>
            <label id={uploadSize ? "file-upload-error" : "file-upload"}>
              <div className="file-upload-content">
                <input
                  hidden
                  type="file"
                  accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint,
                text/plain, application/pdf"
                  onChange={handleFileUpload}
                />
                {uploadedFile && (
                  <img src={uploadSize ? fileerror : file} alt="file" />
                )}
                {!uploadedFile && (
                  <img src={uploadSize ? fileerror : addfile} alt="file" />
                )}
                <p>
                  {uploadedFile ? "Selected File Name" : "Browse Files"} -{" "}
                  {fileName}
                </p>
              </div>
            </label>
          </div>

          {buttonDisabled ? (
            <button disabled>Send</button>
          ) : (
            <button>Send</button>
          )}
        </form>
      </motion.div>
    </AnimatePresence>
  );
}
