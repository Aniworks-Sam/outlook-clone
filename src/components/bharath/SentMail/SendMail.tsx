import React, { useContext } from "react";
import SendTo from "./SendTo";
import Sending from "./SendingMail";
import classes from "./SentMail.module.css";
import AuthContext from "../Store/Auth-context";
import Overlay from "../Overlays/Overlay";
import SendOverlay from "../Overlays/SendOverlay";
import SchduleOverlay from "../Overlays/ScheduleOverlay";

import { useSelector, useDispatch } from "react-redux";
import { overlayOpenr, setSentOverlay } from "../../store/CounterSlice";
export default function SendMail() {
  const AuthCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const handleClick = (e: { type: string }) => {
    if (e.type === "click") {
      console.log("Left click");
    } else if (e.type === "contextmenu") {
      console.log("Right click");
    }
  };
  const overlayHandler = () => {
    console.log("SendMail");
    dispatch(overlayOpenr());
    // AuthCtx.setOverlay();
  };
  const sendOverlayHandler = () => {
    dispatch(setSentOverlay("0"));
  };
  const overlayOpen = useSelector((state: any) => {
    return state.counter.overlayValue;
  });
  const burgerOpen = useSelector((state: any) => {
    return state.counter.openValue;
  });

  const sentOverlay = useSelector((state: any) => {
    return state.counter.SentOverlay;
  });
  return (
    <div>
      {overlayOpen ? <Overlay onClick={overlayHandler}></Overlay> : ""}
      {sentOverlay === "1" ? (
        <SendOverlay onClick={sendOverlayHandler}>
          {"Please specify at least one recipient."}
        </SendOverlay>
      ) : (
        ""
      )}
      {sentOverlay === "2" ? (
        <SendOverlay onClick={sendOverlayHandler}>
          {"Please give a subject to the mail."}
        </SendOverlay>
      ) : (
        ""
      )}

      {sentOverlay === "3" ? (
        <SendOverlay onClick={sendOverlayHandler}>
          {"Are you sure you want to discard this draft?"}
        </SendOverlay>
      ) : (
        ""
      )}
      {sentOverlay === "4" ? (
        <SchduleOverlay onClick={sendOverlayHandler}></SchduleOverlay>
      ) : (
        ""
      )}
      <div
        className={`${classes.app1}`}
        style={
          burgerOpen
            ? { width: "100%" }
            : { width: "150%", marginLeft: "4.3rem" }
        }
      >
        <Sending></Sending>
        <SendTo></SendTo>
      </div>
    </div>
  );
}
