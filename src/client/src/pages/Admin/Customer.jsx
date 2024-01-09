import * as React from "react";
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
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { getCoords } from "@/modules/getCoords";
import request from "../../modules/request";
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

// Title's Columns that you want to display
const TableHeadTitles = [
    "ID",
    "Email",
    "Name",
    "Age",
    "Type",
    "Status",
];

export default function Customer() {
    //TODO Fetch this from Server
    const [data, set_data] = React.useState({viewers: [], total_page: 1});
    const per_page = 5;
    function get_viewers(page) {
        request.get(`admin/list-viewers?page=${1}&per_page=${per_page}`, res => {
            set_data(res.data);
        });
    }
    React.useEffect(() => {
        get_viewers(1);
    }, []);

    const imgPreview = React.useRef(null);
    const previewImageBox = React.useRef(null);
    const [openImgBox, setOpenImgBox] = React.useState(false);
    const [srcImage, setSrcImg] = React.useState("");
    React.useEffect(() => {
        if (openImgBox) {
            imgPreview.current.src = srcImage;
            (previewImageBox.current.style.opacity = 1),
                (previewImageBox.current.style.visibility = "visible");
        } else {
            (previewImageBox.current.style.opacity = 0),
                (previewImageBox.current.style.visibility = "hidden");
        }
    }, [openImgBox]);

    function handleOpenImage(e, src) {
        const box_width = 400;
        const box_height = 400;
        const { top, left } = getCoords(e.target);

        const x = left + e.target.offsetWidth / 2 - 2.5 * box_width;
        const y = top + e.target.offsetHeight / 2 - box_height / 2;
        previewImageBox.current.style.left = `${x}px`;
        previewImageBox.current.style.top = `${y}px`;
        setOpenImgBox(true);
        setSrcImg(src);
    }

    function handleCloseImage() {
        setOpenImgBox(false);
    }

    function handleMovePage(e, page){ 
        get_viewers(page);
    }

    function handle_ban_click(viewer) {
        request.post("admin/update-ban", {email: viewer.email, ban: !viewer.is_ban});
        viewer.is_ban = !viewer.is_ban;
        set_data({...data});
    }

    return (
        <>
            <div
                ref={previewImageBox}
                style={{
                    top: "20%",
                    left: "0",
                    right: "0",
                    marginLeft: "auto",
                    marginRight: "auto",
                    position: "absolute",
                    width: "500px",
                    objectFit: "cover",
                    zIndex: "9999",
                    opacity: 0,
                    visibility: "hidden",
                    transition: "all 0.5s",
                }}
            >
                <img
                    ref={imgPreview}
                    style={{ width: "100%", border: "2px solid #000" }}
                />
            </div>
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
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.viewers.map((viewer, index) => (
                                <StyledTableRow key={index}>
                                    <StyledTableCell component="th" scope="row">
                                        {index}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {viewer.email}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {viewer.name}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {viewer.age}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {viewer.type}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Button
                                            style={{
                                                cursor: "default",
                                                pointerEvents: "none",
                                            }}
                                            variant="contained"
                                            color={
                                                viewer.is_ban ? "error" : "success"
                                            }
                                        >
                                            {viewer.is_ban ? "Banned" : "Active"}
                                        </Button>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <Button
                                            variant="contained"
                                            color="error"
                                            onClick={() => handle_ban_click(viewer)}
                                        >
                                            {viewer.is_ban ? "Unban" : "Ban"}
                                        </Button>
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Stack spacing={2}>
                    <Pagination
                        count={data.total_page}
                        color="primary"
                        onClick={handleMovePage}
                    />
                </Stack>
                <div style={{ marginTop: "40px" }}>
                    <Link to="/admin/movie/upload">
                        <Button
                            variant="outlined"
                            startIcon={<AddCircleOutlineIcon />}
                        >
                            Add new User
                        </Button>
                    </Link>
                </div>
            </Box>
        </>
    );
}

// name, video, img thumb, desc, genres, maturity, year
