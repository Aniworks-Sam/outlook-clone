import React, { ReactNode, useContext } from "react";
import Classes from "../SentMail/SendButton.module.css";
import AuthContext from "../Store/Auth-context";
import { useSelector } from "react-redux";

interface ChildProps {
  name: string;
  onClick: () => void;
}
export default function Button(props: ChildProps) {
  const AuthCtx = useContext(AuthContext);

  const sentOverlay = useSelector((state: any) => {
    return state.counter.SentOverlay;
  });
  const button_3 =
    sentOverlay === "3" || sentOverlay === "4"
      ? Classes.send_button33
      : Classes.send_button3;
  return (
    <div>
      <div>
        <button
          onClick={props.onClick}
          className={`${Classes.send_button1} ${button_3}`}
        >
          {props.name}
        </button>
      </div>
    </div>
  );
}
