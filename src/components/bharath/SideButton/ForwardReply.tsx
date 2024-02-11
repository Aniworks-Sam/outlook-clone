import React, { useContext } from "react";
import classes from "../SentMail/SentMail.module.css";
import classes2 from "./SideButton.module.css";
import Delete from "./Delete";
import Mark from "./Mark";
import Move from "./Move";
export default function ForwardReply() {
  return (
    <div className={classes2.SentMailnav_align}>
      <div className={classes.SentMailnav_align}>
        <Mark></Mark>
        <Delete></Delete>
        <Move></Move>
      </div>
    </div>
  );
}
