import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import MovieIcon from "@mui/icons-material/Movie";
import WorkspacePremiumIcon from "@mui/icons-material/WorkspacePremium";
import BackupIcon from "@mui/icons-material/Backup";

import { Link } from "react-router-dom";

export const mainListItems = (
    <React.Fragment>
        <Link to="/admin">
            <ListItemButton>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItemButton>
        </Link>
        <Link to="/admin/movie">
            <ListItemButton onClick={() => console.log("Movie")}>
                <ListItemIcon>
                    <MovieIcon />
                </ListItemIcon>
                <ListItemText primary="Movie" />
            </ListItemButton>
        </Link>
        <Link to="/admin/customer">
            <ListItemButton onClick={() => console.log("Customers")}>
                <ListItemIcon>
                    <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Customers" />
            </ListItemButton>
        </Link>
        <Link to="/admin/reports">
            <ListItemButton onClick={() => console.log("Reports")}>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
            </ListItemButton>
        </Link>
        <Link to="/admin/plan">
            <ListItemButton onClick={() => console.log("Plan")}>
                <ListItemIcon>
                    <WorkspacePremiumIcon />
                </ListItemIcon>
                <ListItemText primary="Edit Plan" />
            </ListItemButton>
        </Link>
        <ListItemButton onClick={() => console.log("Backup")}>
            <ListItemIcon>
                <BackupIcon />
            </ListItemIcon>
            <ListItemText primary="Backup" />
        </ListItemButton>
    </React.Fragment>
);

export const secondaryListItems = (
    <React.Fragment>
        <ListSubheader component="div" inset>
            Saved reports
        </ListSubheader>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItemButton>
        <ListItemButton>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItemButton>
    </React.Fragment>
);
