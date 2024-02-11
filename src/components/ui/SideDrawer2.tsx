import { useContext, useState, useCallback, useEffect } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SideContainer from "./SideContainer";
import AuthContext from "../store/auth-context";
import NewFolder from "../Folders/NewFolder";
import { useSelector, useDispatch } from "react-redux";
import {
  setMailBoxId,
  setName,
  setFetchData,
  setId,
  setShowReply,
  setShowFrwd,
} from "../store/CounterSlice";
import DeleteFolder from "../Folders/DeleteFolder";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

interface SideDrawerProps {
  open: boolean;
}

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  marginTop: 2,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  marginTop: 2,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function SideDrawer2({ open }: SideDrawerProps) {
  const authCtx = useContext(AuthContext);
  const dispatch = useDispatch();
  // const [open, setOpen] = useState(false);
  const [loadedContacts, setLoadedContacts] = useState<any>([]);
  const [loadedItemData, setLoadedItemData] = useState<any>([]);
  const [MailBoxClick, setMailBoxClick] = useState<boolean>(false);
  const [rightClick, setRightClick] = useState<boolean>(false);
  const token = authCtx.token;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [xPos, setxPos] = useState<number>(0);
  const [yPos, setyPos] = useState<number>(0);
  const [mailId, setMailId] = useState<number>();
  const openMenu = Boolean(anchorEl);
  const stateId = useSelector((state: any) => {
    return state.counter.id;
  });
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log(event);
    console.log(event.nativeEvent.offsetX);
    console.log(event.nativeEvent.offsetY);
    setxPos(event.nativeEvent.offsetX - 10);
    setyPos(event.nativeEvent.offsetY - 10);
    console.log(event.nativeEvent.x);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = useSelector((state: any) => {
    return state.counter.id;
  });
  const fetchData = useCallback(() => {
    fetch(
<<<<<<< HEAD
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes?counters=true`,
=======
      `https://mail.aniworks.live/mapi/users/${stateId}/mailboxes?counters=true`,
>>>>>>> ebc45d08c28120ed6787725ce041cde1591d38df
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Token": stateToken,
        },
      }
    )
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setLoadedContacts(data.results);
        dispatch(setFetchData(data.results));
      });
  }, [stateId,stateToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const fetchMailBoxData = useCallback(
    (mId: number) => {
      fetch(
<<<<<<< HEAD
        `https://mail.aniworks.live/mapi/users/${id}/mailboxes/${mId}/messages`,
=======
        `https://mail.aniworks.live/mapi/users/${stateId}/mailboxes/${id}/messages`,
>>>>>>> ebc45d08c28120ed6787725ce041cde1591d38df
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "X-Access-Token": stateToken,
          },
        }
      )
        .then((response) => {
          console.log(response);
          return response.json();
        })
        .then((data) => {
          console.log(data);
          setLoadedItemData(data.results);
        });
    },
    [stateToken,stateId]
  );

<<<<<<< HEAD
  const deleteClickHandler = () => {
    // console.log(stateId, id, stateToken);
    // event.preventDefault();
    fetch(
      `https://mail.aniworks.live/mapi/users/${stateId}/mailboxes/${mailId}`,
      {
        method: "DELETE",
        body: JSON.stringify({}),
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

=======
>>>>>>> ebc45d08c28120ed6787725ce041cde1591d38df
  return (
    <div>
      <Box sx={{ display: "flex", zIndex: 1 }}>
        <CssBaseline />
        <Drawer variant="permanent" open={open}>
          <div
            style={{ display: "flex", alignItems: "center", marginTop: 118 }}
          ></div>
          <Divider />
          <List>
            {loadedContacts.map((text, index) => (
              <ListItemButton
                key={text.id}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                }}
                onClick={() => {
                  console.log(text.id);
                  setMailId(text.id);
                  dispatch(setMailBoxId(text.id));
                  dispatch(setName(text.name));
                  dispatch(setShowReply(false));
                  dispatch(setShowFrwd(false));
                  fetchMailBoxData(text.id);
                }}
                onContextMenu={handleClick}
              >
<<<<<<< HEAD
                <DeleteFolder
                  deleteClickHandler={deleteClickHandler}
                  anchorEl={anchorEl}
                  open={openMenu}
                  handleClose={handleClose}
                  xPos={xPos}
                  yPos={yPos}
                />
=======
                <DeleteFolder onFetch={fetchData} anchorEl={anchorEl} open={openMenu} handleClose={handleClose} xPos={xPos} yPos={yPos} />
>>>>>>> ebc45d08c28120ed6787725ce041cde1591d38df
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText
                  primary={text.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            ))}
            {open && <NewFolder onFetch={fetchData} />}
          </List>
        </Drawer>
        <SideContainer
          fetchMailBoxData={fetchMailBoxData}
          loadData={loadedItemData}
          open={open}
        />
      </Box>
    </div>
  );
}
