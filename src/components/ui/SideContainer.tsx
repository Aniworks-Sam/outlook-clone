import { Box, AppBar, Toolbar, Button } from "@mui/material";
import React, {
  useState,
  useRef,
  useContext,
  Fragment,
  useCallback,
  useEffect,
} from "react";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import ListItem from "@mui/material/ListItem";
import AuthContext from "../store/auth-context";
import "./SideNav.css";
import { useNavigate } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import SideDrawer from "./SideDrawer";
import Grid from "@mui/material/Grid";
import img from "../../util/notFound.png";
import "./SideContainer.css";
import DeleteIcon from "@mui/icons-material/Delete";
import FlagIcon from "@mui/icons-material/Flag";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import DraftsIcon from "@mui/icons-material/Drafts";
import { Tooltip, IconButton } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import SendMail from "../bharath/SentMail/SendMail";
import { useSelector, useDispatch } from "react-redux";
// import MenuBar from "./MenuBar";
import SideContainer2 from "./SideContainer2";
import SideContent from "../bharath/SideButton/SideContent";
const text = {
  fontWeight: "900",
};
const label = { inputProps: { "aria-label": "Checkbox demo" } };
interface SideContProps {
  open: boolean;
  loadData: any;
  fetchMailBoxData: any;
}
const defaultDrawerWidth = 450;
const minDrawerWidth = 450;
const maxDrawerWidth = 1000;
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));
const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

export default function SideContainer({ open,
  loadData,
  fetchMailBoxData, }: SideContProps) {
  const [value, setValue] = useState(null);
  const [isClicked, setIsClicked] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const [inputText, setInputText] = useState("");
  const [isRead, setIsRead] = useState(true);
  const [isFlag, setIsFlag] = useState(false);
  const [labelView, setLabelView] = useState("All");
  const [contentView, setContentView] = useState("All");
  const [view, setView] = useState("1");
  const [loadedContacts, setLoadedContacts] = useState<any>([]);
  const [isMenuShown, setIsMenuShown] = useState(false);
  const ref: any = useRef<any>(null);
  const authCtx = useContext(AuthContext);
  console.log(loadData);

  const handleChangeView = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };

  const handleMenuItemView = (menuItem: string) => {
    setLabelView(menuItem);
    setContentView(menuItem);
  };
  
  const [checkedState, setCheckedState] = useState<any>([]);
  console.log(checkedState);

  let inputHandler = (e: any) => {
    let lowerCase = e.target.value;
    setInputText(lowerCase);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    document.addEventListener("mouseup", handleMouseUp, true);
    document.addEventListener("mousemove", handleMouseMove, true);
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
  console.log(authCtx.sideContainerValue);
  const count = useSelector((state: any) => {
    return state.counter.value;
  });
  const composeMail = useSelector((state: any) => {
    return state.counter.composeValue;
  });
  const mailValue = useSelector((state: any) => {
    return state.counter.mailValue;
  });
  return (
    <Fragment>
      <Box
        className="container-main container-secondary"
        style={{ marginTop: "64px" }}
      >
        <DrawerHeader />
        <Drawer
          variant="permanent"
          className="drawer"
          PaperProps={{ style: { width: open ? 640 : drawerWidth } }}
          sx={{
            width: open ? 640 : drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: open ? 640 : drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <div className="toolbar" />
          <div onMouseDown={(e) => handleMouseDown(e)} className="dragger" />
          <Toolbar />
          <SideContainer2
            fetchMailBoxData={fetchMailBoxData}
            open={open}
            loadData={loadData}
            views={view}
          ></SideContainer2>
        </Drawer>
        {!value && !isClicked && !count && (
          <div className="imgContainer">
            <img src={img} alt="Empty" />
            <p className="text1">Select an item to read</p>
            <p className="text2">Nothing is selected !</p>
          </div>
        )}
        {composeMail && <SendMail />}
        {mailValue && <SideContent></SideContent>}
        <></>
      </Box>
    </Fragment>
  );
}
