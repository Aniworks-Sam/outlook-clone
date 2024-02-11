import { Box, styled } from "@mui/material";
import React, { useState, useContext, Fragment, useCallback } from "react";
import List from "@mui/material/List";
import "./SideNav.css";
import "./SideContainer.css";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { MenuItem } from "@mui/material";
import List1 from "./List1";
interface SideContProps {
  open: boolean;
  loadData: any;
  fetchMailBoxData: any;
  views: string;
}
const defaultDrawerWidth = 450;
const minDrawerWidth = 450;
const maxDrawerWidth = 1000;
export default function SideContainer2({   open,
  loadData,
  fetchMailBoxData,
  views, }: SideContProps) {
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const [labelView, setLabelView] = useState("All");
  const [contentView, setContentView] = useState("All");
  const [view, setView] = useState("1");
  const handleChangeView = (event: SelectChangeEvent) => {
    setView(event.target.value as string);
  };
  const handleMenuItemView = (menuItem: string,e: string) => {
    setLabelView(menuItem);
    setContentView(menuItem);
    setView(e);
  };
  const [checkedState, setCheckedState] = useState<any>([]);
  console.log(checkedState);

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

  return (
    <Fragment>
      <Box
        sx={
          open
            ? { overflow: "auto", marginLeft: "37.5%" }
            : { overflow: "auto", marginLeft: "14.5%" }
        }
      >
        <Box sx={{ maxWidth: 100, marginTop: 8 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Filter</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={view}
              label={labelView}
              onChange={handleChangeView}
            >
            <MenuItem
                value={1}
                onClick={() => handleMenuItemView("All", "1")}
              >
                All
              </MenuItem>
              <MenuItem
                value={2}
                onClick={() => handleMenuItemView("Flag", "2")}
              >
                Flag
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
        <List>
          <List1 fetchMailBoxData={fetchMailBoxData}
            open={open}
            loadData={loadData}
            views={view}></List1>
        </List>
      </Box>
    </Fragment>
  );
}
