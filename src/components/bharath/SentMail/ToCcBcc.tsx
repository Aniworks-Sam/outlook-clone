import React, { useState, useContext, useRef } from "react";
import classes from "./SendTo.module.css";
import AuthContext from "../Store/Auth-context";
import { useSelector, useDispatch } from "react-redux";
import { overlayOpenr } from "../../store/CounterSlice";
interface ChildProps {
  to: (e: string) => void;
  cc: (e: string) => void;
  bcc: (e: string) => void;
}
export default function ToCcBcc(props: ChildProps) {
  const toHandler = (e: React.FormEvent<HTMLInputElement>) => {
    props.to(e.currentTarget.value);
  };
  const ccHandler = (e: React.FormEvent<HTMLInputElement>) => {
    props.to(e.currentTarget.value);
  };
  const bccHandler = (e: React.FormEvent<HTMLInputElement>) => {
    props.to(e.currentTarget.value);
  };

  const AuthCtx = useContext(AuthContext);
  const [CcValue, setCC] = useState(true);
  const [bccValue, setBCC] = useState(true);
  const dispatch = useDispatch();

  const activeHandler1 = () => {
    setCC(!CcValue);
  };
  const activeHandler2 = () => {
    setBCC(!bccValue);
  };
  const overlayHandler = () => {
    console.log("overlay");
    dispatch(overlayOpenr());
    AuthCtx.setOverlay();
  };
  let Active1 = CcValue ? classes.sendTo_hide : classes.sendTo_Bc;
  let Active2 = bccValue ? classes.sendTo_hide : classes.sendTo_Bc;
  return (
    <div>
      <div className={classes.sendTo}>
        {/* <div className={}></div> */}
        <div className={classes.sendTo_Bc}>
          <p onClick={overlayHandler} className={classes.sendTo_To}>
            To
          </p>
          <input
            type="email"
            onChange={toHandler}
            className={` ${classes.input}`}
            autoFocus
          ></input>
        </div>
        <div className={classes.sendTo_Cc}>
          {CcValue && bccValue && (
            <p
              className={`${classes.sendTo_Cc_hover} `}
              onClick={activeHandler1}
            >
              Cc
            </p>
          )}
          {bccValue && CcValue && (
            <p className={classes.sendTo_Cc_hover} onClick={activeHandler2}>
              Bcc
            </p>
          )}
        </div>
      </div>
      <div className={Active1}>
        <p onClick={overlayHandler} className={`${classes.sendTo_To} `}>
          Cc
        </p>
        <input onChange={ccHandler} className={`${classes.input}`}></input>

        {bccValue && (
          <p
            className={`${classes.sendTo_Cc_hover} ${classes.sendTo_Cc} `}
            onClick={activeHandler2}
          >
            Bcc
          </p>
        )}
      </div>
      <div className={Active2}>
        <p
          onClick={overlayHandler}
          className={`${classes.sendTo_To} ${classes.sendTo_BCc}`}
        >
          Bcc
        </p>
        <input onChange={bccHandler} className={` ${classes.input}`}></input>
        {CcValue && (
          <p
            className={`${classes.sendTo_Cc_hover} ${classes.sendTo_Cc}`}
            onClick={activeHandler1}
          >
            Cc
          </p>
        )}
      </div>
    </div>
  );
}
