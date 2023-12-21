import React, { useState } from "react";

import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { getAllowedRoutes, hasChildren } from './../../utils/utils';
import routes from './../../../config/routes';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { mainTheme } from '../../utils/theme';
import { ThemeProvider } from "@mui/system";
import { Link } from "react-router-dom";
import { Box } from "@mui/material";
import { ChevronRight } from "@mui/icons-material";
import { useSelector } from "react-redux";
import { useIsAuthenticated } from "@azure/msal-react";

export default function Sidebar() {
    const getUserDetail = (state) => state?.getUser;
    const { userDetail, status, error } = useSelector(getUserDetail);

    const isAuthenticated = useIsAuthenticated();

    return (
        <ThemeProvider theme={mainTheme()}>
            <Box height="100vh"
                sx={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: 'background.default',
                    color: 'text.primary',
                    p: 3,
                }}
            >
                <br />
                <br />
                {isAuthenticated && status === "succeeded" && (
                    getAllowedRoutes(routes, userDetail?.roleName).map((item, key) => (
                        <MenuItem key={key} item={item} />
                    ))
                )}
            </Box>
        </ThemeProvider>

    )
}

const MenuItem = (item) => {
    const Component = hasChildren(item.item) ? MultiLevel : SingleLevel;
    return <Component item={item} />;
};

const SingleLevel = (item) => {
    return (
        <Link to={item.item.item.path}>
            <ListItem button>
                {item.item.item.icon && <ListItemIcon>{<item.item.item.icon className="w-8 h-8" />}</ListItemIcon>}
                <ListItemText primary={item.item.item.name} />
            </ListItem>
        </Link>
    );
};

const MultiLevel = (item) => {
    const { children: items } = item.item.item;
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prev) => !prev);
    };

    return (
        <>
            <ListItem button onClick={handleClick}>
                <ListItemIcon>{<item.item.item.icon className="w-8 h-8" />}</ListItemIcon>
                <ListItemText primary={item.item.item.name} />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse className="collapseDiv" in={open} timeout="auto" unmountOnExit>
                <List className="collapsed" component="div" disablePadding>
                    {items.map((child, key) => (
                        <MenuItem key={key} item={child} />
                    ))}
                </List>
            </Collapse>
        </>
    );
};