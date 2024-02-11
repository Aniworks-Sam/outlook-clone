import React, { useState, useContext } from "react";
import classes from "./Overlay.module.css";
import ScheduleCalender from "../ScheduleSend/Schedule";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import SetDateTime from "../ScheduleSend/ScheduleDate";
interface ChildProps {
  onClick: () => void;
}
export default function ScheduleOverlay(props: ChildProps) {
  const [daySchedule, setDaySchedule] = useState(true);

  let date = new Date();
  let months = date.toLocaleString("default", { month: "long" });
  let day = date.getDate();
  let d = new Date();
  d.setDate(d.getDate() + ((((7 - d.getDay()) % 7) + 1) % 7));
  let tomorrowMorning = `${day + 1} 
  ${months}, 08:00`;
  let tomorrowEvening = `${day + 1} 
  ${months}, 13:00`;
  let nextMonday = `${d.getDate()} 
  ${months}, 08:00`;
  const dayScheduleHandler = () => {
    setDaySchedule(!daySchedule);
  };
  if (daySchedule)
    return (
      <div>
        <div className={`${classes.scheduleOverlay} `}>
          <div
            className={`${classes.overlayAlign} ${classes.scheduleOverlayAlign}`}
          >
            <p>Schedule Send</p>
            <div>
              <CloseOutlinedIcon onClick={props.onClick} fontSize="medium" />
            </div>
          </div>

          <div className={classes.selectorSchedule}>
            <div className={classes.selectorSchedule_item}>
              <p>Tomorrow morning</p>
              <p>{tomorrowMorning}</p>
            </div>
            <div className={classes.selectorSchedule_item}>
              <p>Tomorrow afternoon</p>
              <p>{tomorrowEvening}</p>
            </div>
            <div className={classes.selectorSchedule_item}>
              <p>Monday morning</p>
              <p>{nextMonday}</p>
            </div>
          </div>
          <div onClick={dayScheduleHandler}>
            <SetDateTime></SetDateTime>
          </div>
        </div>

        <div
          onClick={props.onClick}
          className={`${classes.overylay_backdrop} `}
        ></div>
      </div>
    );
  else return <ScheduleCalender onClick={props.onClick}></ScheduleCalender>;
}
