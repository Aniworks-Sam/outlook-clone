import React, { useState, useContext } from "react";
import Button3 from "../Overlays/Button3";
import AuthContext from "../../store/auth-context";
import classes from "./SideButton.module.css";
import { useSelector, useDispatch } from "react-redux";
import { showMail1 } from "../../store/CounterSlice";
export default function SideButton() {
  const [show, setShow] = useState(false);
  // const authCtx = useContext(AuthContext);

  const dispatch = useDispatch();
  const showHandler = () => {
    dispatch(showMail1());
    setShow((prevState) => !prevState);
  };
  return (
    <div>
      <div className={classes.SideButtonAlign}>
        <Button3 name={"New message"} onClick={showHandler}></Button3>
      </div>
    </div>
  );
}
