import TawkMessengerReact from "@tawk.to/tawk-messenger-react";
import { useRef, useState } from "react";
import arrow from "../media/arrow.svg";
import Whatsapp from "../media/WhatsApp.svg";

export default function Tawk() {
  const tawkPropId = process.env.REACT_APP_TAWK_PROP_ID;
  const tawkWidgetId = process.env.REACT_APP_TAWK_WIDGET_ID;
  const ref = useRef();
  const [showOptions, setShowOptions] = useState(false);
  function handleClick() {
    setShowOptions(!showOptions);
    if (showOptions) ref.current.hideWidget();
    else ref.current.showWidget();
  }

  return (
    <div
      className={showOptions ? "live-help" : "live-help-mini"}
      onClick={handleClick}
    >
      <div className="chat-text">
        <p className="chat-info">Chat</p>
        <img
          src={arrow}
          alt="chatArrow"
          className={showOptions ? "chat-arrow-down" : "chat-arrow-up"}
        />
      </div>

      <TawkMessengerReact
        propertyId={tawkPropId}
        widgetId={tawkWidgetId}
        ref={ref}
      />
      {showOptions && (
        <img
          src={Whatsapp}
          alt="wh"
          onClick={() =>
            window.open("https://wa.me/message/UAEZJINSB3PIO1", "_blank")
          }
        />
      )}
    </div>
  );
}
