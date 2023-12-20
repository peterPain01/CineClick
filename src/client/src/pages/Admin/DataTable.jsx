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
import { getCoords } from "@/modules/getCoords";
import axios from 'axios'
import { useState } from "react";
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

const box_width = 200;
const box_height = 400;
// Title's Columns that you want to display
const TableHeadTitles = [
    "Title",
    "Description",
    "MaturityNumber",
    "Image",
    "Video",
];

export default function DataTable() {
    const per_page = 10;
    const [movies, setMovies] = useState([]);
    React.useEffect(() => {
        // TODO Change api
        axios.get(`http://localhost:13123/movie/list?page=1&per_page=${per_page}`)
        .then(response => { 
            setMovies(response.data || []);
        })
        .catch(err => { 
            if (err?.response?.status === 401) {
                window.open("/", "_self");
            }
        })
    }, []);

    const imgPreview = React.useRef(null);
    const previewImageBox = React.useRef(null);
    const vidPreviewBox = React.useRef(null);
    const vidPreview = React.useRef(null);

    const [openImgBox, setOpenImgBox] = React.useState(false);
    const [srcImage, setSrcImg] = React.useState("");

    const [openVidBox, setOpenVidBox] = React.useState(false);
    const [srcVid, setSrcVid] = React.useState("");

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

    React.useEffect(() => {
        if (openVidBox) {
            vidPreviewBox.current.style.display = "block";
        } else {
            vidPreviewBox.current.style.display = "none";
        }
    }, [openVidBox]);

    function handleOpenImage(e, src) {
        const { top, left } = getCoords(e.target);
        const x = left + e.target.offsetWidth / 2 - 1.1 * box_width;
        const y = top + e.target.offsetHeight / 2 - box_height / 2;
        previewImageBox.current.style.left = `${x}px`;
        previewImageBox.current.style.top = `${y}px`;
        setOpenImgBox(true);
        setSrcImg(src);
    }

    function handleCloseImage() {
        setOpenImgBox(false);
    }

    function handleDeleteMovie(id) {
        axios.get(`http://localhost:13123/admin/delete-movie?id=${id}`, {
            withCredentials: true
        }).then(res => {
            movies.splice(movies.findIndex(x => x.id === id), 1);
            setMovies([...movies]);
        }).catch(err => {
            if (err?.response?.status === 401) {
                window.open("/", "_self");
            }
            console.log(err);
        });
    }

    function handleOpenVideo(e, src) {
        const { top, left } = getCoords(e.target);
        const x = left + e.target.offsetWidth / 2 - 1.1 * box_width;
        const y = top + e.target.offsetHeight / 2 - box_height / 2;
        vidPreviewBox.current.style.left = `${x}px`;
        vidPreviewBox.current.style.top = `${y}px`;
        setOpenVidBox(!openVidBox);
        setSrcVid(src);
    }
    function handleMovePage(e, page){ 
        axios.get(`http://localhost:13123/movie/list?page=${page}&per_page=${per_page}`)
        .then(response => { 
            setMovies(response.data || []);
        })
        .catch(err => { 
            if (err?.response?.status === 401) {
                window.open("/", "_self");
            }
        })
        // Fetch api with page 
    }
    return (
        <>
            {/* TODO vide instead of iframe */}
            <div
                ref={vidPreviewBox}
                style={{
                    display: "none",
                    position: "absolute",
                    maxWidth: `${box_width}px`,
                    maxHeight: `${box_height}px`,
                    zIndex: 9999,
                }}
            >
                <video width="100%" ref={vidPreview} controls></video>
            </div>
            <div
                ref={previewImageBox}
                style={{
                    position: "absolute",
                    maxWidth: `${box_width}px`,
                    maxHeight: `${box_height}px`,
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
                    overflow: "hidden",
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
                            {movies.map((movie) => (
                                <StyledTableRow key={movie.title}>
                                    <StyledTableCell component="th" scope="row">
                                        {movie.title}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {movie.summary}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        {movie.restrict_age}
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <IconButton
                                            onMouseEnter={(e) =>
                                                handleOpenImage(e, movie.image)
                                            }
                                            onMouseLeave={() => {
                                                handleCloseImage(movie.image);
                                            }}
                                        >
                                            <ImageIcon />
                                        </IconButton>
                                    </StyledTableCell>
                                    <StyledTableCell component="th" scope="row">
                                        <IconButton
                                            onClick={(e) =>
                                                handleOpenVideo(e, movie.video) // TODO:
                                            }
                                        >
                                            <OndemandVideoIcon />
                                        </IconButton>
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
                                            onClick={() => handleDeleteMovie(movie.id)}
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
                <Stack spacing={2}>
                    <Pagination count={10} color="primary" onChange={handleMovePage}/>
                </Stack>
                <div style={{ marginTop: "40px" }}>
                    <Link to="/admin/movie/upload">
                        <Button variant="outlined" startIcon={<UploadIcon />}>
                            Upload Movie
                        </Button>
                    </Link>
                </div>
            </Box>
        </>
    );
}

// name, video, img thumb, desc, genres, maturity, year
