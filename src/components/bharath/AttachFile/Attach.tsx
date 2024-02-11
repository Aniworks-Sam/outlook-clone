import React from "react";
import classes from "./Attach.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AttachFileIcon from "@mui/icons-material/AttachFile";
export default function Attach() {
  return (
    <div>
      <form className={classes.align}>
        <AttachFileIcon fontSize="medium" />
        <p className={classes.name}>Attach</p>
        <KeyboardArrowDownIcon fontSize="medium" />
      </form>
    </div>
  );
}
