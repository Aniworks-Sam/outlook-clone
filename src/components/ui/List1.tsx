import React, { useState, useCallback } from "react";
import ListItem from "@mui/material/ListItem";
import "./SideNav.css";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import "./SideContainer.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Tooltip, IconButton } from "@mui/material";
import { SelectChangeEvent } from "@mui/material/Select";
import MenuBar from "./MenuBar";
import { useSelector, useDispatch } from "react-redux";
import {
  setMailValue,
  mailData,
  address,
  setMoveData,
  setShowReply,
  setShowFrwd,
} from "../store/CounterSlice";
const text = {
  fontWeight: "900",
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };
interface SideContProps {
  open: boolean;
  loadData: any;
  fetchMailBoxData: any;
  views: string;
}
const defaultDrawerWidth = 450;
const minDrawerWidth = 450;
const maxDrawerWidth = 1000;
export default function List({
  open,
  loadData,
  fetchMailBoxData,
  views,
}: SideContProps) {
  const [value, setValue] = useState(null);
  const [mailBox, setMailBox] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const [isRead, setIsRead] = useState(true);
  const [view, setView] = useState("1");
  const handleChangeView = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };
  const dispatch = useDispatch();
  const [checkedState, setCheckedState] = useState<any>([]);
  console.log(checkedState);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [xPos, setxPos] = useState<number>(0);
  const [yPos, setyPos] = useState<number>(0);
  const openMenu = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    setxPos(event.nativeEvent.offsetX - 10);
    setyPos(event.nativeEvent.offsetY - 10);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = useSelector((state: any) => {
    return state.counter.id;
  });
  const token = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const mailBoxId = useSelector((state: any) => {
    return state.counter.mailBoxId;
  });
  const prevData = useSelector((state: any) => {
    return state.counter.moveData;
  });
  const setFlagHandler = (e1: any, e2: any) => {
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages`,
      {
        method: "PUT",
        body: JSON.stringify({ message: e1 + "", flagged: !e2 }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(e1 + "flagged");
        fetchMailBoxData(mailBoxId);
      });

    // setIsFlag((prevState) => !prevState);
  };
  const setReadHandler = (e1: any, e2: any) => {
    console.log(e2 + "seen");
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages`,
      {
        method: "PUT",
        body: JSON.stringify({ message: e1 + "", seen: !e2, metaData: {} }),
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        fetchMailBoxData(mailBoxId);
      });
  };

  const setDeleteHandler = (e1: any) => {
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages`,
      {
        method: "PUT",
        body: JSON.stringify({
          message: e1 + "",
          seen: true,
          moveTo: mailBoxId,
          // flagged: false,
          draft: true,
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
        return response.json();
      })
      .then((data) => {
        console.log(e1 + "Delete");
        fetchMailBoxData(mailBoxId);
      });
  };
  const setMailDataHandler = (e1) => {
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mailBoxId}/messages/${e1} `,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": token,
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        dispatch(mailData(data));
        dispatch(address(data.from.address));
      });
  };
  const handleMouseUp = () => {
    document.removeEventListener("mouseup", handleMouseUp, true);
    document.removeEventListener("mousemove", handleMouseMove, true);
  };
  const handleMouseMove = useCallback((e) => {
    const newWidth = e.clientX - document.body.offsetLeft;
    if (newWidth > minDrawerWidth && newWidth < maxDrawerWidth) {
      setDrawerWidth(newWidth);
    }
  }, []);
  console.log(loadData);
  const data1 =
    views == "1"
      ? loadData
      : loadData.filter((e) => {
          return e.flagged;
        });
  console.log(data1);
  return (
    <div>
      {data1.map((note: any) => (
        <div
          key={note.id}
          className="container"
          id="cont"
          onClick={() => {
            console.log(note);
            dispatch(setMailValue());
            dispatch(setShowReply(false));
            dispatch(setShowFrwd(false));
            setValue(note.id);
            setMailBox(note.mailbox);
            setIsClicked(false);
            setMailDataHandler(note.id);
          }}
          onContextMenu={handleClick}
        >
          <MenuBar
            id={note.id}
            xPos={xPos}
            yPos={yPos}
            anchorEl={anchorEl}
            open={openMenu}
            handleClose={handleClose}
          />
          <ListItem
            className="box"
            button
            sx={
              value === note.id && !isClicked
                ? {
                    borderLeft: "0.3rem solid #2196f3",
                    backgroundColor: "#eee",
                  }
                : {
                    borderLeft: "0.3rem solid #fff",
                    backgroundColor: "#fff",
                  }
            }
          >
            <Checkbox
              className="checkbox"
              {...label}
              value={`${note.name}`}
              onChange={(e) => {
                setCheckedState((prev) => [
                  ...prev,
                  { id: note.id, value: e.target.checked },
                ]);
                dispatch(
                  setMoveData([
                    ...prevData,
                    { id: note.id, value: e.target.checked },
                  ])
                );
              }}
            />
            <div
              style={
                !note.flagged
                  ? {
                      display: "flex",
                      justifyContent: "space-between",
                    }
                  : {
                      display: "flex",
                      justifyContent: "space-between",
                      backgroundColor: "rgba(255, 255, 0, 0.233)",
                    }
              }
            >
              <div>
                <ListItemText
                  sx={{ marginLeft: "0.8rem" }}
                  primaryTypographyProps={
                    value === note.id ? { style: text } : {}
                  }
                  primary={note.to[0]?.address}
                  secondary={note.subject}
                />
                <ListItemText
                  sx={{ marginLeft: "0.8rem" }}
                  primaryTypographyProps={
                    value === note.id ? { style: text } : {}
                  }
                  secondary={`${new Date(note.date).toDateString()} ${new Date(
                    note.date
                  ).toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  })}`}
                />
              </div>
              <div>
                <Tooltip
                  className="iconsOptions"
                  title="Delete"
                  onClick={() => {
                    setDeleteHandler(note.id);
                  }}
                >
                  <IconButton>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                <Tooltip
                  className="iconsOptions"
                  title="Flag"
                  onClick={() => {
                    setFlagHandler(note.id, note.flagged);
                  }}
                >
                  <IconButton color={note.flagged ? "error" : "default"}>
                    <FlagIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
                {!isRead && (
                  <Tooltip
                    className="iconsOptions"
                    title="Read"
                    onClick={() => {
                      setReadHandler(note.id, note.seen);
                    }}
                  >
                    <IconButton>
                      <MarkunreadIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
                {isRead && (
                  <Tooltip
                    className="iconsOptions"
                    title="Unread"
                    onClick={() => {
                      setReadHandler(note.id, note.seen);
                    }}
                  >
                    <IconButton>
                      <DraftsIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                )}
              </div>
            </div>
          </ListItem>
        </div>
      ))}
    </div>
  );
}
