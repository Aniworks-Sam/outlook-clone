import React, { useContext } from "react";
import classes from "../Overlays/Overlay.module.css";
import isWeekend from "date-fns/isWeekend";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import AuthContext from "../Store/Auth-context";
import Button1 from "../Overlays/Button1";
import Button2 from "../Overlays/Button2";
import Classes from "../Overlays/Overlay.module.css";
import { useSelector, useDispatch } from "react-redux";
import { setSendTime } from "../../store/CounterSlice";
interface ChildProps {
  onClick: () => void;
}
export default function Schedule(props: ChildProps) {
  const AuthCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [value1, setValue1] = React.useState<Date | null>(new Date());
  const [value2, setValue2] = React.useState("");
  const sendTimeHandler = () => {
    if (value2 === "") {
      AuthCtx.setIsValid(false);
    } else if (value2 !== "") {
      let date =
        value1 !== null
          ? value1.getFullYear() +
            "-" +
            String(value1.getMonth() + 1).padStart(2, "0") +
            "-" +
            value1.getDate() +
            "T" +
            value2 +
            "Z"
          : "";
      // AuthCtx.setSendTime(date);
      dispatch(setSendTime(date));
      AuthCtx.setSentOverlay("0");
      AuthCtx.setIsValid(true);
    }
  };
  return (
    <div>
      <div>
        <div className={` ${classes.scheduleOverlay_calender}`}>
          <div className={classes.scheduleOverlayAlign}>
            <p className={classes.name2}>Select date and time</p>
            {/* <ArrowLeft size={40} weight="light" /> */}
          </div>
          <div className={classes.calender}>
            {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker<Date>
                orientation="landscape"
                openTo="day"
                value={value1}
                shouldDisableDate={isWeekend}
                onChange={(newValue) => {
                  setValue1(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />
              <input
                className={classes.name2}
                type="time"
                id="appt"
                defaultValue=""
                name="appt"
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  setValue2(e.currentTarget.value);
                  console.log(value1);
                }}
              ></input>
              {!AuthCtx.isValidValue && (
                <p className={classes.errorName}>Plese Give the date</p>
              )}
            </LocalizationProvider> */}
          </div>
          <div className={Classes.calenderButtonAlign}>
            <Button1 name={"ok"} onClick={sendTimeHandler}></Button1>
            <Button2 name={"cancel"} onClick={props.onClick}></Button2>
          </div>
        </div>
        <div className={`${Classes.overylay_backdrop} `}></div>
      </div>
    </div>
  );
}
