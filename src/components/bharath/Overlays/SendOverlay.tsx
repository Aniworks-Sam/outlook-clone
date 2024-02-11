import React, { ReactNode, useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import AuthContext from "../Store/Auth-context";
import Classes from "./Overlay.module.css";
import Button1 from "./Button1";
import Button2 from "./Button2";
import { useSelector } from "react-redux";
interface ChildProps {
  children: ReactNode;
  onClick: () => void;
}
export default function SendOverlay(props: ChildProps) {
  console.log("Sent overlay");
  const AuthCtx = useContext(AuthContext);
  const sentOverlay = useSelector((state: any) => {
    return state.counter.SentOverlay;
  });
  if (AuthCtx.SentOverlay) {
    console.log("Sent overlay");
    return (
      <div>
        <div className={Classes.sentOverlay}>
          <div className={Classes.overlayAlign}>
            {sentOverlay === "1" && <p>Error</p>}
            {sentOverlay === "2" && <p>Missing Subject</p>}
            {sentOverlay === "3" && <p>Discard Message</p>}
            <div>
              <CloseOutlinedIcon onClick={props.onClick} fontSize="medium" />
            </div>
          </div>
          <div className={Classes.errorMsg}>
            <h2>{props.children}</h2>
          </div>
          <div className={Classes.buttonsAlign}>
            <div>
              <Button1 name={"ok"} onClick={props.onClick}></Button1>
            </div>
            <div>
              {sentOverlay === "3" ? (
                <Button2 name={"cancel"} onClick={props.onClick}></Button2>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        <div
          onClick={props.onClick}
          className={`${Classes.overylay_backdrop} `}
        ></div>
      </div>
    );
  } else return <></>;
}
