import React, { useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Classes from "./Overlay.module.css";
interface ChildProps {
  onClick: () => void;
}
export default function Overlay(props: ChildProps) {
  return (
    <div>
      <div onClick={props.onClick} className={Classes.overlay}>
        <CloseOutlinedIcon fontSize="large" />
      </div>
      <div
        onClick={props.onClick}
        className={`${Classes.overylay_backdrop} `}
      ></div>
    </div>
  );
}
