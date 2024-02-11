import React from "react";
import classes from "./SideButton.module.css";
import ReplyIcon from "@mui/icons-material/Reply";
interface ChildProps {
  onclick: () => void;
}
export default function ForwardMessage(props: ChildProps) {
  return (
    <div>
      <div onClick={props.onclick} className={classes.alignContent}>
        <ReplyIcon fontSize="large" />
      </div>
    </div>
  );
}
