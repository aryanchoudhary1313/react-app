import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useEffect, useState } from 'react';
import "./Faq.css";

export default function FaqContainer({faq, controlAll}) {
    const [controlFaq, setControlFaq] = useState(false)
    
    useEffect(() => {
      !!controlAll ? setControlFaq(true) : setControlFaq(false)
    }, [controlAll])

    return (
      <div className="faq-container" onClick={()=> {setControlFaq(!controlFaq)}} >
        <div className="faq-question" >
          <p>{faq.question}</p>
          <p >
            <ExpandMoreIcon 
            className={controlFaq ? 'faq-expand-icon rotate180' : "faq-expand-icon"} 
            />
            </p>
        </div>
        <div className={controlFaq ? "faq-answer isOpen" : "faq-answer"}>
          <p>{faq.answer}</p>
        </div>
      </div>
    )
  }