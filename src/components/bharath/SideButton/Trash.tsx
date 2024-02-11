import React from "react";
import classes3 from "../AttachFile/Attach.module.css";
import FileX from "@mui/icons-material/DeleteOutline";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsLoading,
  setMessageValue,
  setSentOverlay,
  // testFunc,
  // setfetchData,
} from "../../store/CounterSlice";
// import Reload from "./Reload";
export default function ForwardMessage() {
  const dispatch = useDispatch();
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const mailBoxId = useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const prevData = useSelector((state: any) => {
    return state.counter.moveData;
  });
  // const deleteHandler = () => {
  //   let data = prevData;
  //   fetch(`https://anisoft.us/mailapp/api/mail/deletemessage`, {
  //     method: "POST",
  //     body: JSON.stringify({
  //       messages: "147,137",
  //       mailbox: mailBoxId,
  //     }),
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Access-Token": stateToken,
  //     },
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       return response.json();
  //     })
  //     .then((response) => {
  //       console.log(response);
  //     });
  // };

  // const deleteHandler = () => {
  let arrayids: number[] = [];
  const trashHandler = () => {
    console.log(prevData);
    prevData.forEach((d) => {
      console.log(arrayids);
      arrayids.push(d.id);
    });
    console.log(arrayids);
    for (let h = 0; h < arrayids.length; h++) {
      let curItem = arrayids[h];
      let foundCount = 0;
      // search array for item
      for (let i = 0; i < arrayids.length; i++) {
        if (arrayids[i] === arrayids[h]) foundCount++;
      }
      if (foundCount > 1) {
        // remove repeated item from new array
        for (let j = 0; j < arrayids.length; j++) {
          if (arrayids[j] === curItem) {
            arrayids.splice(j, 1);
            j--;
          }
        }
      }
    }
    let dataString = arrayids.toString();
    console.log(arrayids);
    console.log(dataString);
    fetch(`https://anisoft.us/mailapp/api/mail/deletemessage`, {
      method: "POST",
      body: JSON.stringify({
        messages: dataString,
        mailbox: mailBoxId,
      }),
      headers: {
        "Content-Type": "application/json",
        "X-Access-Token": stateToken,
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log(res);
          return res.text();
        } else {
          return res.json().then((data) => {
            let errorMessage = "Authentication failed!";
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        // dispatch(testFunc());
      })
      .catch((err) => {
        console.error(err.message);
        alert(err.message);
      });
  };

  return (
    <div>
      {/* <Reload></Reload> */}
      <div onClick={trashHandler} className={classes3.align}>
        <FileX fontSize="medium" />
        <p className={classes3.name}>Send to Trash</p>
      </div>
    </div>
  );
}
