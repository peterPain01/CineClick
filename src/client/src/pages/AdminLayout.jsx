import * as React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import AppBarCustom from "../pages/Admin/AppBarCustom";
import DrawerCustom from "../pages/Admin/DrawerCustom";

export default function AdminLayout({children}) {
    const [mode, setMode] = React.useState("dark");
    const colorMode = React.useMemo(
        () => ({
            toggleColorMode: () => {
                setMode((prevMode) =>
                    prevMode === "light" ? "dark" : "light"
                );
            },
        }),
        []
    );

    const theme = React.useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode]
    );
    const [open, setOpen] = React.useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={theme}>
            <Box sx={{ display: "flex" }}>
                <CssBaseline />
                <AppBarCustom
                    theme={theme}
                    toggleDrawer={toggleDrawer}
                    open={open}
                    colorMode={colorMode}
                />
                <DrawerCustom toggleDrawer={toggleDrawer} open={open} />
                {children}

            </Box>
        </ThemeProvider>
    );
}
