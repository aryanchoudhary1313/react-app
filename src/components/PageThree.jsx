import publication from "../media/1e.jpg";
import procedure from "../media/procedure.jpg";
import { useRef } from "react";
import { useInView } from "framer-motion";

export default function PageThree() {
  const ref = useRef(null);
  const ref2 = useRef(null);
  const inView = useInView(ref, { once: true });
  const inView2 = useInView(ref2, { once: true });

  return (
    <div
      ref={ref}
      className="page-three-content"
      style={{
        transform: inView ? "none" : "translateY(150px)",
        opacity: inView ? 1 : 0,
        transition: "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1),  color 0.5s",
      }}
    >
      <h1>Publication Process</h1>

      <div className="page-three-box-info">
        <div>
          <div className="page-three-info">
            <h2>Requirement Specification</h2>
            <ul>
              <li> Indexing Requirement </li>
              <li> Journal’s Scope</li>
              <li> Expected time of publication </li>
              <li> Maximum budget for publication charges </li>
              <li> Any other specific requirement</li>
              <li> Article file </li>
            </ul>
          </div>
          <div className="page-three-img">
            <img loading="lazy" src={publication} alt="ps" />
          </div>
        </div>
        <div
          ref={ref2}
          style={{
            transform: inView2 ? "none" : "translateY(150px)",
            opacity: inView2 ? 1 : 0,
            transition:
              "all 0.9s cubic-bezier(0.17, 0.55, 0.55, 1) ,  color 0.5s",
          }}
        >
          <div className="page-three-img">
            <img loading="lazy" src={procedure} alt="ps" />
          </div>
          <div className="page-three-info">
            <h2>Final Procedure</h2>
            <ul>
              <li>
                We provide a list of available journals matching to author’s
                requirements.
              </li>
              <li>
                Author need to make a selection from the given list of journals
              </li>
              <li>
                Ensure journal by visiting their website and check the
                authenticity of journals.
              </li>
              <li>Then the article will be processed with selected journal</li>
              <li>
                Then we will ensure about the publication process with target
                journal.
              </li>
              <li>
                After getting the acceptance author needs to pay the charges as
                per our terms.
              </li>
              <li>
                Once all formalities completes then the target journals
                publishes the work
              </li>
              <li>Then we inform the author about their publication.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
