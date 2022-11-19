import React from "react";
import "./FormRest.css";
import error from "./media/resterror.svg";
import pending from "./media/restprocess.svg";
import mailerror from "./media/restemail.svg";
import success from "./media/restdone.svg";
import { motion, AnimatePresence } from "framer-motion";

export default function FormResponses({
  invalidEmail,
  sending,
  sent,
  failed,
  setSent,
  setFailed,
}) {
  let userName = window.localStorage.getItem("username");

  const animation = {
    initial: { x: "100px", opacity: 0 },
    animate: { x: "0", opacity: 1 },
    exit: { opacity: 0, x: "100px" },
    transition: {
      duration: 1,
      type: "spring",
    },
  };

  return (
    <>
      <AnimatePresence>
        {sending && (
          <motion.div className="response-msg" {...animation}>
            <img src={pending} alt="restresponse" />
            <p>Please Wait, We are processing your request!</p>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {failed && (
          <motion.div
            className="response-error-msg"
            {...animation}
            onClick={() => setFailed(false)}
          >
            {!invalidEmail && (
              <>
                <img src={error} alt="restresponse" />
                <p>
                  Hi {userName}, Your Request Failed <br></br>
                  Please Connect with us directly<br></br>
                </p>
              </>
            )}
            {invalidEmail && (
              <>
                <img src={mailerror} alt="restresponse" />
                <p>
                  Hi {userName}, Your Request Failed <br></br>
                  Please Check Your Email Address<br></br>
                </p>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {sent && (
          <motion.div
            className="response-msg"
            {...animation}
            onClick={() => setSent(false)}
          >
            <img src={success} alt="restresponse" />
            <p>
              Hi {userName}, We have Received your Request and We will get back
              to you shortly
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
