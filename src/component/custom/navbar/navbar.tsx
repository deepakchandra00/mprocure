import { AppBar, Toolbar, Grid, ThemeProvider, Typography,  Drawer, IconButton } from '@mui/material';
import LogoImgDark from '../../../assets/images/Cargill_white.png';
import { mainTheme } from '../../utils/theme';
import * as React from 'react';
import AccountMenu from './../../global/accountMenu';
import MenuIcon from "@mui/icons-material/Menu";

import Sidebar from "../sidebar/sidebar";

const drawerWidth = 260;
interface Props {
    window?: () => Window;
}
export default function Navbar(props: Props) {

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const container =
        window !== undefined ? () => window().document.body : undefined;

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <ThemeProvider theme={mainTheme()}>
            <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: "42px !important" }}>
                <Grid container>

                    <Grid item margin={0} style={{ flexGrow: 1 }}>
                        <Toolbar style={{ paddingLeft: "0px" }}>
                            <img src={LogoImgDark} className="cargil-logo" alt="Cargill" style={{ cursor: 'pointer', marginTop: "-8px", height: '48px' }} />
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                edge="start"
                                onClick={handleDrawerToggle}
                                sx={{ mr: 2, marginLeft: "20px", display: { sm: "inline", md: "inline" } }}
                            >
                                <>
                                    <MenuIcon />
                                </>
                            </IconButton>
                            <Drawer
                                container={container}
                                variant="temporary"
                                open={mobileOpen}
                                onClose={handleDrawerToggle}
                                ModalProps={{
                                    keepMounted: true, // Better open performance on mobile.
                                }}
                                sx={{
                                    display: { xs: "block", sm: "block" },
                                    "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
                                }}
                            >
                                <Sidebar />
                            </Drawer>
                            <Typography variant="h6" noWrap component="div">
                                Procurement and Pays
                            </Typography>
                        </Toolbar>
                    </Grid>
                    <Grid item alignSelf='center' style={{ textDecoration: "none", color: "#fff", paddingRight: "15px" }}>
                        <AccountMenu />
                    </Grid>
                </Grid>
            </AppBar>
        </ThemeProvider>
    )
}