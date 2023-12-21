import React from "react";
import { Drawer } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Sidebar from "../sidebar/sidebar";
import Navbar from "./navbar";

const drawerWidth = 260;

interface Props {
  window?: () => Window;
}

export const SideDrawer = (props: Props) => {

  return (
    <>
      <Navbar />
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          display: { xs: "none", sm: "none", md: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        <Toolbar style={{ marginTop: "-25px" }} />
        <Sidebar />
      </Drawer>
    </>
  );
};