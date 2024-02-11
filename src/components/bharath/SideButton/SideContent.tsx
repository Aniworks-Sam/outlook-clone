import React, { useState } from "react";
import ForwardMessage from "./ForwardMessage";
import Reply from "./Replay";
import ReplyAll from "./ReplyAll";
import classes from "../SentMail/SentMail.module.css";
import classes1 from "./SideButton.module.css";
import ReplyBack from "./ReplyBack";
import Forward from "./ForwardMail";
import { useSelector, useDispatch } from "react-redux";
import { setShowReply, setShowFrwd } from "../../store/CounterSlice";

export default function () {
  // const [showReply, setShowReply] = useState(false);
  // const [forward, setForward] = useState(false);
  const dispatch = useDispatch();
  const showReply = useSelector((state: any) => {
    return state.counter.showReply;
  });
  const forward = useSelector((state: any) => {
    return state.counter.showFrwd;
  });
  const showReplyHandler = () => {
    dispatch(setShowReply(true));
    // setShowReply(!showReply);
  };
  const forwardHandler = () => {
    // setForward(!forward);
    dispatch(setShowFrwd(true));
  };
  const burgerOpen = useSelector((state: any) => {
    return state.counter.openValue;
  });
  const mailData = useSelector((state: any) => {
    return state.counter.maildata;
  });
  const adress = useSelector((state: any) => {
    return state.counter.address;
  });
  console.log(adress);
  // const adress = mailData.from.address;
  // console.log(adress + "*************************************");
  return (
    <div style={burgerOpen ? { width: "70%" } : { width: "90%" }}>
      <p className={classes.sideContentName}>{mailData.subject}</p>
      {!showReply && !forward ? (
        <div className={`${classes.app1} ${classes.app4_width}`}>
          <div className={classes1.sideButton_content_align}>
            <div className={classes1.sideButton_content_align_items}>
              <div>
                <p className={classes1.sideButton_content_items_shortName}>
                  JB
                </p>
              </div>
              <div>
                <h4 className={classes1.sideButton_content_items_Name}>
                  {adress}
                </h4>
                <p className={classes1.sideButton_content_items_Datentime}>
                  {mailData.date}
                </p>
                <h3 className={classes1.sideButton_content_items_to}>
                  To: You
                </h3>
              </div>
            </div>
            <div className={classes1.sideContentnav_align}>
              <Reply onclick={showReplyHandler}></Reply>
              <ReplyAll onclick={showReplyHandler}></ReplyAll>
              <ForwardMessage onclick={forwardHandler}></ForwardMessage>
            </div>
          </div>
          <div className={classes1.mailText}>
            <p> {mailData.text}</p>
          </div>
        </div>
      ) : showReply ? (
        <ReplyBack></ReplyBack>
      ) : (
        <Forward></Forward>
      )}
    </div>
  );
}
