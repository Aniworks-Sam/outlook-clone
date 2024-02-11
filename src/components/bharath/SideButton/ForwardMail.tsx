import React, { useState, useContext } from "react";
import classes from "./SideButton.module.css";
import classes1 from "../SentMail/SendTo.module.css";
import classes2 from "../SentMail/SentMail.module.css";
import AuthContext from "../Store/Auth-context";
import ToCCBcc from "../SentMail/ToCcBcc";
import Button1 from "../Overlays/Button1";
import { useSelector, useDispatch } from "react-redux";
import { overlayOpenr } from "../../store/CounterSlice";
import Overlay from "../Overlays/Overlay";
export default function ForwardMail() {
  const AuthCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  const [toValue, settoValue] = useState("");

  const [CcValue, setCC] = useState(true);
  const [bccValue, setBCC] = useState(true);
  const mailData = useSelector((state: any) => {
    return state.counter.maildata;
  });
  const id = useSelector((state: any) => {
    return state.counter.id;
  });
  const mailBoxId = useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const token = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const toHandler = (e: any) => {
    settoValue(e);
  };
  const ccHandler = (e: string) => {
    console.log(e);
  };
  const bccHandler = (e: string) => {
    console.log(e);
  };
  const sendHandler = () => {
    console.log(toValue);
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages/${mailData.id}/forward`,
      {
        method: "POST",
        body: JSON.stringify({
          target: 1,
          addresses: toValue,
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      }
    )
      .then((response) => {
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
        console.log("forwareded");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const overlayHandler = () => {
    console.log("SendMail");
    dispatch(overlayOpenr());
  };
  const overlayOpen = useSelector((state: any) => {
    return state.counter.overlayValue;
  });
  return (
    <div className={`${classes2.app1} ${classes2.app4_width}`}>
      {overlayOpen ? <Overlay onClick={overlayHandler}></Overlay> : ""}
      <div className={classes.forwardMessage}>
        <div className={classes.sideButton_content_align}>
          <div className={classes.sideButton_content_align_items}>
            <div>
              <p className={classes.sideButton_content_items_shortName}>JB</p>
            </div>
            <div>
              <h4>From:{mailData.from.address}</h4>
              <p className={classes.sideButton_content_items_Datentime}>
                {mailData.date}
              </p>
            </div>
          </div>
        </div>
        <div>
          <ToCCBcc to={toHandler} cc={ccHandler} bcc={bccHandler}></ToCCBcc>
        </div>
        <div>
          <Button1 name={"send"} onClick={sendHandler}></Button1>
        </div>
      </div>
    </div>
  );
}
// superuser1@aniworks.live,pramod@aniworks.live,info@aniworks.live
