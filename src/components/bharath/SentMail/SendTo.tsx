import React, { useState, useContext, useRef } from "react";
import classes from "./SendTo.module.css";
import AuthContext from "../Store/Auth-context";
import Erty from "./Erty";
import ToCCBcc from "./ToCcBcc";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsLoading,
  setMessageValue,
  setSentOverlay,
} from "../../store/CounterSlice";
export default function SentTo() {
  const AuthCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [scheduleValue, setschedule] = useState(false);
  const [toValue, settoValue] = useState("");
  const [ccValue, setccValue] = useState("");
  const [bccValue, setbccValue] = useState("");
  const Subject: any = useRef<HTMLInputElement>(null);
  const Text: any = useRef<HTMLInputElement>(null);
  const stateId = useSelector((state: any) => {
    return state.counter.id;
  });
  const sendTimeValue = useSelector((state: any) => {
    return state.counter.sendTimeValue;
  });
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const sendHandler = () => {
    const enteredTo = toValue;
    const enteredCc = ccValue;
    const enteredBcc = bccValue;
    const enteredSubject = Subject.current.value;
    const enteredText = Text.current.value;

    if (
      enteredTo.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/) &&
      enteredSubject !== ""
    ) {
      dispatch(setIsLoading());
      const data = {
        textMessage: enteredText,
        // files: stateFiles,
      };
      const presentDate = new Date();
      console.log(stateId);
      fetch(`https://mail.aniworks.live/mapi/users/${stateId}/submit`, {
        method: "POST",
        body: JSON.stringify({
          from: {
            address: "user50@aniworks.live",
            name: "Mr superuser",
          },
          to: [
            {
              address: enteredTo,
              name: "SwisMail Support",
            },
          ],
          subject: enteredSubject,
          text: data.textMessage,
          html: "hi whats up in italic",
          sendTime:
            sendTimeValue === ""
              ? presentDate.getFullYear() +
                "-" +
                String(presentDate.getMonth() + 1).padStart(2, "0") +
                "-" +
                presentDate.getDate() +
                "T" +
                presentDate.getHours() +
                ":" +
                presentDate.getMinutes() +
                ":" +
                "00Z"
              : sendTimeValue,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": stateToken,
        },
      })
        .then((response) => {
          dispatch(setIsLoading());
          console.log(response);
          if (response.ok) {
            return response.json();
          } else {
            return response.json().then(() => {
              let errorMessage = "send failed!";
              throw new Error(errorMessage);
            });
          }
        })
        .then((response) => {
          dispatch(setMessageValue());
        })
        .catch((error) => {
          console.log(error);
        });
    }
    if (!enteredTo.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/)) {
      console.log("oioio");
      dispatch(setSentOverlay("1"));
    } else if (enteredSubject === "") {
      dispatch(setSentOverlay("2"));
    }
  };

  const scheduleHandler = () => {
    setschedule(!scheduleValue);
  };

  const setScheduleHandler = () => {
    if (!toValue.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/)) {
      setschedule(!scheduleValue);
      console.log("email");
      dispatch(setSentOverlay("1"));
    } else if (Subject.current.value === "") {
      setschedule(!scheduleValue);
      dispatch(setSentOverlay("2"));
    } else {
      setschedule(!scheduleValue);
      dispatch(setSentOverlay("4"));
    }
  };
  const toHandler = (e: any) => {
    settoValue(e);
  };
  const ccHandler = (e: string) => {
    console.log(e);
  };
  const bccHandler = (e: string) => {
    console.log(e);
  };
  let scheduleClass = scheduleValue
    ? classes.scheduleAlign
    : classes.sendTo_hide;
  return (
    <div className={classes.asder}>
      <div className={classes.toCCBcc}>
        <ToCCBcc to={toHandler} cc={ccHandler} bcc={bccHandler}></ToCCBcc>
        <div className={classes.subject}>
          <div className={`${classes.sendTo_Bc}`}>
            <input
              ref={Subject}
              placeholder="Subject"
              className={` ${classes.input}`}
            ></input>
          </div>
          <div className={classes.sendTo_info}>
            <textarea
              ref={Text}
              data-grammarly
              data-client-id="your-client-id-here"
              rows={4}
              cols={50}
            ></textarea>
          </div>
        </div>
      </div>

      <Erty
        scheduleClass={scheduleClass}
        setScheduleHandler={setScheduleHandler}
        sendHandler={sendHandler}
        scheduleHandler={scheduleHandler}
      ></Erty>
    </div>
  );
}
