import React from "react";
import classes3 from "../AttachFile/Attach.module.css";

import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
export default function ForwardMessage() {
  return (
    <div>
      <div className={classes3.align}>
        <VisibilityOffOutlinedIcon fontSize="large" />
        <p className={classes3.name}>Mark as Unseen</p>
      </div>
    </div>
  );
}
