import React, { useState } from "react";
import Classes from "./SendButton.module.css";
import classes from "./SendTo.module.css";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import TimerOffIcon from "@mui/icons-material/TimerOff";
interface ChildProps {
  sendHandler: () => void;
  scheduleHandler: () => void;
  setScheduleHandler: () => void;
  scheduleClass: string;
}
export default function (props: ChildProps) {
  return (
    <div className={classes.ba}>
      <div>
        <div className={Classes.Rooster}></div>
        <div>
          <div
            onClick={props.setScheduleHandler}
            className={props.scheduleClass}
          >
            <TimerOffIcon fontSize="medium" />
            <p className={` ${classes.scheduleName}`}>Schedule send</p>
          </div>
        </div>
        <div className={Classes.send_button}>
          <div className={Classes.send}>
            <button
              onClick={props.sendHandler}
              className={Classes.send_button1}
            >
              Send
            </button>

            <button
              onClick={props.scheduleHandler}
              className={Classes.send_button2}
            >
              <KeyboardArrowDownOutlinedIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
