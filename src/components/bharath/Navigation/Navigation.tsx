import React, { useState, useContext } from "react";
import classes from "../SentMail/SentMail.module.css";
import Attach from "../AttachFile/Attach";
import Discard from "../AttachFile/Discard";
import Delete from "../SideButton/Delete";
import SideButtton from "../SideButton/SideButton";
import AuthContext from "../Store/Auth-context";
import ForwardReply from "../SideButton/ForwardReply";
import ClearIcon from "@mui/icons-material/Clear";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Trash from "../SideButton/Trash";
import { useSelector, useDispatch } from "react-redux";
import { overlayOpenr, setSentOverlay } from "../../store/CounterSlice";
interface NavigationProps {
  onClick: any;
}

export default function Navigation({ onClick }: NavigationProps) {
  const AuthCtx = useContext(AuthContext);
  const name = useSelector((state: any) => {
    return state.counter.name;
  });
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="fixed"
        style={{ top: "64px", height: "3.4rem", backgroundColor: " #f3f2f1",zIndex:10000 }}
      >
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <IconButton
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              onClick={onClick}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <SideButtton></SideButtton>
          </div>
          <div>
            <div className={classes.SentMailNav_Bar_container}>
              <div className={classes.SentMailNav_Bar}>
                {AuthCtx.sideButtonValue ? (
                  <div className={classes.SentMailnav_align}>
                    <ForwardReply></ForwardReply>
                  </div>
                ) : (
                  <div className={classes.SentMailnav_align}>
                    <Attach></Attach>
                    <Discard></Discard>
                    <Trash></Trash>
                    <Delete></Delete>
                  </div>
                )}
                <ul className={classes.SentMail_Bar}>
                  <li className={classes.SentMail_Bar_items}>
                    <ClearIcon fontSize="medium" />
                  </li>
                </ul>
              </div>
              {/* {name === "Trash" && (
                <div>
                  <Delete></Delete>
                </div>
              )} */}
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
