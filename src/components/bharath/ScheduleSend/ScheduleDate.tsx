import React from "react";
import classes from "../Overlays/Overlay.module.css";
import DateRangeOutlinedIcon from "@mui/icons-material/DateRangeOutlined";
export default function ScheduleDate() {
  return (
    <div className={classes.scheduleDateTime}>
      <div className={classes.selectorSchedule_item}>
        <DateRangeOutlinedIcon fontSize="large" />
        <p>Select date and time to schedule.</p>
      </div>
    </div>
  );
}
