import React from "react";
import classes from "./SideButton.module.css";
import classes3 from "../AttachFile/Attach.module.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import DoNotDisturbAltIcon from "@mui/icons-material/DoNotDisturbAlt";
import SendIcon from "@mui/icons-material/Send";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ForwardMessage() {
  return (
    <div>
      <div
        className={`${classes3.align} ${classes.dropbtn} ${classes.dropdown}`}
      >
        <p className={classes3.name}>Move</p>
        <KeyboardArrowDownIcon fontSize="large" />

        <div>
          <div className={classes.dropdowncontent}>
            <div>
              <InsertDriveFileIcon />
              <p>Drafts</p>
            </div>
            <div>
              <DoNotDisturbAltIcon />
              <p>junk</p>
            </div>
            <div>
              <SendIcon />
              <p>Sent Mail</p>
            </div>
            <div>
              <DeleteIcon />
              <p>Trash</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
