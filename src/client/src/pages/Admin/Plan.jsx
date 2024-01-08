import {useState, useEffect}from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";
import Box from "@mui/material/Box";
import SearchCustom from "./SearchCustom";
import { Link } from "react-router-dom";

// Table Component
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import ImageIcon from "@mui/icons-material/Image";
import IconButton from "@mui/material/IconButton";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import { getCoords } from "@/modules/getCoords";
import axios from "axios";
import request from "../../modules/request.js";
// Table Style
const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

//TODO Fetch this from Server
const plans = [
    {
        name: "Mobile",
        price: "70000",
        devices: "phone, tablet",
        registered: 1000,
        videoQuality: "Good",
        Resolution: "480p",
    },
    {
        name: "Basic",
        price: "108.000",
        devices: "phone, tablet, computer, TV",
        registered: 2000,
        videoQuality: "Good",
        Resolution: "720p",
    },
    {
        name: "Standard",
        price: "220.000",
        devices: "phone, tablet, computer, TV",
        registered: 1000,
        videoQuality: "Better",
        Resolution: "1080p",
    },
    {
        name: "Premium",
        price: "260.000",
        devices: "phone, tablet, computer, TV",
        registered: 12330,
        videoQuality: "Best",
        Resolution: "4k+HDR",
    },
];

const box_width = 500;
const box_height = 400;
// Title's Columns that you want to display
const TableHeadTitles = [
    "Plan Name",
    "Price",
    "Devices",
    "Registered",
    "Video Quality",
    "Resolution",
];

export default function Plan() {
    const [plans, setPlans] = useState([])
    useEffect(() => {
        // TODO Change api
        request.get("/plan", res => {
            setPlans(response.data)
        });
    }, []);

    function handleMovePage(e) {
        const page = e.target.textContent;
        // Fetch api with page
    }
    return (
        <>
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: "100vh",
                    overflow: "auto",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                <SearchCustom
                    sx={{
                        alignSelf: "flex-end",
                    }}
                />
                {/* Column name [] */}
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                {TableHeadTitles.map((title) => (
                                    <StyledTableCell key={title}>
                                        {title}
                                    </StyledTableCell>
                                ))}
                                <StyledTableCell></StyledTableCell>
                                <StyledTableCell></StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {plans.map((plan) => (
                                <StyledTableRow key={plan.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {plan.name}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {plan.price}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {plan.devices}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {plan.registered}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {plan.videoquality}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {plan.resolution}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Button
                                            variant="contained"
                                            color="success"
                                        >
                                            Edit
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Button
                                            variant="contained"
                                            color="error"
                                        >
                                            Delete
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
}

// name, video, img thumb, desc, genres, maturity, year
