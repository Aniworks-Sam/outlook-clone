import { useCallback, useContext, Fragment } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AuthContext from "../store/auth-context";
import { useSelector } from "react-redux";
import classes from "./DropDown.module.css";
interface MenuBarProps {
  anchorEl: null | HTMLElement;
  open: boolean;
  handleClose: () => void;
  xPos: number;
  yPos: number;
  id: number | null;
}

export default function MenuBar({
  anchorEl,
  open,
  handleClose,
  xPos,
  yPos,
  id,
}: MenuBarProps) {
  const stateId = useSelector((state: any) => {
    return state.counter.id;
  });
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const mailBoxId = useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const fetchData = useSelector((state: any) => {
    return state.counter.fetchData;
  });
  console.log(id);
  console.log(fetchData);
  const moveHandler = () => {
    fetch(
      `https://mail.aniworks.live/mapi/users/${stateId}/mailboxes/${mailBoxId}/messages`,
      {
        method: "PUT",
        body: JSON.stringify({
          message: `${id}`,
          seen: true,
          moveTo: "621701b688a09605e70cc031",
          flagged: false,
          draft: true,
          metaData: {},
        }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": stateToken,
        },
      }
    )
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.error(err.message);
        alert(err.message);
      });
  };

  console.log(xPos, yPos);
  return (
    <Fragment>
      {/* <div className={classes.df}> */}
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        style={{ marginTop: yPos, marginLeft: xPos }}
        className={classes.df}
      >
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem className={classes.dropdown}>
          <div>
            <button className={classes.dropbtn}>Move</button>
          </div>
          <ul className={classes.dropdownContent}>
            {fetchData.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
        </MenuItem>
        <MenuItem className={classes.dropdown} onClick={handleClose}>
          <div>
            <button className={classes.dropbtn}>Flag</button>
          </div>
          <ul className={classes.dropdownContent}>
            {fetchData.map((e) => (
              <li key={e.id}>{e.name}</li>
            ))}
          </ul>
        </MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
        <MenuItem onClick={handleClose}>Delete</MenuItem>
      </Menu>

      {/* <ul>
          <li>Delete</li>
          <li>Move</li>
          <li>Flag</li>
        </ul> */}
      {/* </div> */}
    </Fragment>
  );
}
