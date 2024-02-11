import React, { useContext } from "react";
import classes from "./Attach.module.css";
import AuthContext from "../Store/Auth-context";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
export default function Discard() {
  const AuthCtx = useContext(AuthContext);
  const discardHandler = () => {
    AuthCtx.setSentOverlay("3");
  };
  return (
    <div onClick={discardHandler}>
      <div className={classes.align}>
        <DeleteIcon fontSize="medium" />
        <p className={classes.name}>Discard</p>
      </div>
    </div>
  );
}
