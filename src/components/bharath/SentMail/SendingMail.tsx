import React, { useContext } from "react";
import classes from "./SendingMail.module.css";
import AuthContext from "../Store/Auth-context";
import { useSelector, useDispatch } from "react-redux";
import { setMessageValue } from "../../store/CounterSlice";
export default function SendingMail() {
  const AuthCtx = useContext(AuthContext);
  const dispatch = useDispatch();

  const isLoadingValue = useSelector((state: any) => {
    return state.counter.isLoadingValue;
  });
  const messageValue = useSelector((state: any) => {
    return state.counter.messageValue;
  });
  if (messageValue) {
    setTimeout(() => {
      dispatch(setMessageValue());
    }, 10000);
  }
  return (
    <div className={classes.sendingMail}>
      {isLoadingValue ? (
        <div
          className={`${classes.sendingMail_position} ${classes.sendingMail_message}`}
        >
          <p>Sending...</p>
        </div>
      ) : (
        ""
      )}

      {messageValue ? (
        <div
          className={`${classes.sendingMail_position} ${classes.sendingMail_message}`}
        >
          <p>Message Sent</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
