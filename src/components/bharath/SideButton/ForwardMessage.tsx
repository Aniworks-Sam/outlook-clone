import React from "react";
import classes from "./SideButton.module.css";
import ArrowRightAltOutlinedIcon from "@mui/icons-material/ArrowRightAltOutlined";
interface ChildProps {
  onclick: () => void;
}

export default function ForwardMessage(props: ChildProps) {
  return (
    <div>
      <div onClick={props.onclick} className={classes.alignContent}>
        <ArrowRightAltOutlinedIcon fontSize="large" />
      </div>
    </div>
  );
}
