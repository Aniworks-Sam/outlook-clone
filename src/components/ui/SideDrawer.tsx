import { useContext, useState, useCallback, useEffect } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SideContainer from "./SideContainer";
import AvatarGen from "./AvatarGen";
import { useNavigate } from "react-router-dom";
import AuthContext from "../store/auth-context";
import Navigation from "../bharath/Navigation/Navigation";
import { useSelector, useDispatch } from "react-redux";
import { burgerOpen } from "../store/CounterSlice";
import SideDrawer2 from "./SideDrawer2";

const drawerWidth = 240;
const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  marginTop: 120,
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  marginTop: 120,
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100%)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

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

export default function SideDrawer() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [loadedContacts, setLoadedContacts] = useState<any>([]);
  const [loadedItemData, setLoadedItemData] = useState<any>([]);
  const token = authCtx.token;
  const dispatch = useDispatch();
  console.log(loadedContacts);
<<<<<<< HEAD
  const id = useSelector((state: any) => {
    return state.counter.id;
  });
  const fetchData = useCallback(() => {
    fetch(
      `https://mail.aniworks.live/mapi/users/${id}/mailboxes?counters=true`,
=======
  const stateId = useSelector((state: any) => {
    return state.counter.id;
  });
  const stateToken = useSelector((state: any) => {
    return state.counter.tokenValue;
  });
  const mailBoxId=useSelector((state: any) => {
    return state.counter.mailBoxId;
  });

  const fetchData = useCallback(() => {
    fetch(
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
      });
  }, [stateId,stateToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDrawerOpen = () => {
    dispatch(burgerOpen());
    setOpen((prevState) => !prevState);
  };

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  const fetchMailBoxData = useCallback(
    (id: number) => {
      fetch(
        `https://mail.aniworks.live/mapi/users/${stateId}/mailboxes/${mailBoxId}/messages`,
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
    [stateId,stateToken,mailBoxId]
  );

  return (
    <>
      <AppBar position="fixed" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h6" noWrap component="div">
              Mini variant drawer
            </Typography>
          </div>
          <div onClick={logoutHandler}>
            <AvatarGen customClass="" fullName="Dummy Name" />
          </div>
        </Toolbar>
      </AppBar>
      <Navigation onClick={handleDrawerOpen} />
      <SideDrawer2 open={open}></SideDrawer2>
    </>
  );
}
