import React from "react";
import Classes from "../SentMail/SendButton.module.css";

interface ChildProps {
  name: string;
  onClick: () => void;
}
export default function Button(props: ChildProps) {
  return (
    <div>
      <div>
        <button
          onClick={props.onClick}
          className={`${Classes.send_button_cancel}`}
        >
          {props.name}
        </button>
      </div>
    </div>
  );
}
