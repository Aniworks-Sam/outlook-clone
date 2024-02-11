import React, { useState, useContext, useRef } from "react";
import classes from "./SideButton.module.css";
import classes1 from "../SentMail/SendTo.module.css";
import classes2 from "../SentMail/SentMail.module.css";
import AuthContext from "../Store/Auth-context";
import SchduleOverlay from "../Overlays/ScheduleOverlay";
import Button1 from "../Overlays/Button1";
import { useSelector, useDispatch } from "react-redux";
// import { setShowReply } from "../../store/CounterSlice";
export default function ForwardMessage() {
  let fromAdress = "",
    toAdress = "";
  const AuthCtx = useContext(AuthContext);
  const mailData = useSelector((state: any) => {
    return state.counter.maildata;
  });
  console.log(mailData);
  const sendOverlayHandler = () => {
    AuthCtx.setSentOverlay("0");
  };
  const id = useSelector((state: any) => {
    return state.counter.id;
  });
  const mailBoxId = useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const name = useSelector((state: any) => {
    return state.counter.name;
  });
  if (name === "INBOX") {
    fromAdress = mailData.to[0].address;
    toAdress = mailData.from.address;
  } else {
    fromAdress = mailData.from.address;
    toAdress = mailData.to[0].address;
  }
  const token = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const Text: any = useRef<HTMLInputElement>(null);
  console.log(fromAdress, toAdress);
  const sendHandler = () => {
    const enteredText = Text.current.value;

    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages`,
      {
        method: "POST",
        body: JSON.stringify({
          unseen: true,
          flagged: true,
          draft: false,
          raw: "string",
          from: {
            address: fromAdress,
            name: "SwisMail Support",
          },
          to: [
            {
              address: toAdress,
              name: "Mr superuser",
            },
          ],
          text: enteredText,
          metaData: {},
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      }
    )
      .then((response) => {
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
        console.log("ReplyBack");
      })
      .catch((error) => {
        console.log(error);
        console.log(id, mailBoxId);
      });
  };
  return (
    <div className={`${classes2.app1} ${classes2.app4_width}`}>
      <div>
        {AuthCtx.SentOverlay === "4" ? (
          <SchduleOverlay onClick={sendOverlayHandler}></SchduleOverlay>
        ) : (
          ""
        )}
        <div className={classes.replyBack}>
          <div className={classes.sideButton_content_align}>
            <div className={classes.sideButton_content_align_items}>
              <div>
                <p className={classes.sideButton_content_items_shortName}>JB</p>
              </div>
              <div>
                <h4>From:{fromAdress}</h4>
                <h4>To:{toAdress}</h4>
              </div>
            </div>
          </div>
          <div className={classes1.sendTo_info}>
            <textarea
              ref={Text}
              data-grammarly
              data-client-id="your-client-id-here"
              rows={4}
              cols={50}
            ></textarea>
          </div>
        </div>
        <div>
          <div>
            <Button1 name={"send"} onClick={sendHandler}></Button1>
          </div>
        </div>
      </div>
    </div>
  );
}
