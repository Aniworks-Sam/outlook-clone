import React from "react";
import classes3 from "../AttachFile/Attach.module.css";
import FolderDeleteOutlinedIcon from "@mui/icons-material/FolderDeleteOutlined";
import { useSelector, useDispatch } from "react-redux";
import {
  setIsLoading,
  setMessageValue,
  setSentOverlay,
} from "../../store/CounterSlice";
// interface ChildProps {
//   onclick: () => void;
// }

export default function ForwardMessage() {
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const mailBoxId = useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const prevData = useSelector((state: any) => {
    return state.counter.moveData;
  });
  const id = useSelector((state: any) => {
    return state.counter.id;
  });
  const deleteHandler = () => {
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": stateToken,
        },
      }
    )
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
        // onFetch();
      })
      .catch((err) => {
        console.error(err.message);
        alert(err.message);
      });
  };
  return (
    <div>
      <div onClick={deleteHandler} className={classes3.align}>
        <FolderDeleteOutlinedIcon fontSize="medium" />
        <p className={classes3.name}>Delete</p>
      </div>
    </div>
  );
}
