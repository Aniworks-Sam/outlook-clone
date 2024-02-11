import React from "react";
import classes from "./SideButton.module.css";
import ReplyAllIcon from "@mui/icons-material/ReplyAll";

interface ChildProps {
  onclick: () => void;
}
export default function ForwardMessage(props: ChildProps) {
  return (
    <div>
      <div onClick={props.onclick} className={classes.alignContent}>
        <ReplyAllIcon fontSize="large" />
        {/* <p className={classes3.name}>ReplyAll</p> */}
      </div>
    </div>
  );
}
