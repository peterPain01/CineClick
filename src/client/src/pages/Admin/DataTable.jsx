import * as React from "react";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import UploadIcon from "@mui/icons-material/Upload";
import Box from "@mui/material/Box";
import SearchCustom from "./SearchCustom";
import { Link, useParams, useSearchParams } from "react-router-dom";
import Loading from "../../components/Loading";

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
import { useState } from "react";
import request, { deleteMovie, getMovies } from "../../modules/request";
import { useCookies } from "react-cookie";

import { PAGE_SIZE } from "./constant";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

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
    const per_page = PAGE_SIZE;
    const [cookies, setCookie, removeCookie] = useCookies(["login"]);
    const [searchParams, setSearchParams] = useSearchParams();
    const queryClient = useQueryClient();

    const page = searchParams.get("page") || 1;
    const { data, isLoading } = useQuery({
        queryKey: ["movies", page],
        queryFn: async () => getMovies(page, per_page),
        staleTime: 60 * 1000,
    });

    const { mutate } = useMutation({
        mutationFn: (id) => deleteMovie(id),
        onSuccess: (data) => {
            console.log(data);
            toast.success(data?.data);
            queryClient.invalidateQueries({ queryKey: ["movies", page] });
        },
    });

    const imgPreview = React.useRef(null);
    const previewImageBox = React.useRef(null);
    const vidPreviewBox = React.useRef(null);
    const vidPreview = React.useRef(null);

    const [openImgBox, setOpenImgBox] = React.useState(false);
    const [srcImage, setSrcImg] = React.useState("");

    const [openVidBox, setOpenVidBox] = React.useState(false);
    const [srcVid, setSrcVid] = React.useState("");

    React.useEffect(() => {
        if (openImgBox && imgPreview && previewImageBox) {
            imgPreview.current.src = srcImage;
            (previewImageBox.current.style.opacity = 1),
                (previewImageBox.current.style.visibility = "visible");
        } else {
            if (previewImageBox?.current) {
                (previewImageBox.current.style.opacity = 0),
                    (previewImageBox.current.style.visibility = "hidden");
            }
        }
    }, [openImgBox]);

    React.useEffect(() => {
        if (openVidBox && vidPreviewBox) {
            vidPreviewBox.current.style.display = "block";
        } else {
            vidPreview?.current
                ? (vidPreviewBox.current.style.display = "none")
                : null;
        }
    }, [openVidBox]);

    function handleOpenImage(e, src) {
        const { top, left } = getCoords(e.target);
        const x = left + e.target.offsetWidth / 2 - 1.1 * box_width;
        const y = top + e.target.offsetHeight / 2 - box_height / 2;
        if (previewImageBox) {
            previewImageBox.current.style.left = `${x}px`;
            previewImageBox.current.style.top = `${y}px`;
            setOpenImgBox(true);
            setSrcImg(src);
        }
    }

    function handleCloseImage() {
        setOpenImgBox(false);
    }

    function handleDeleteMovie(id) {
        mutate(id);
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

    function handleMovePage(e, page) {
        searchParams.set("page", page);
        setSearchParams(searchParams);
    }

    if (isLoading) return <Loading />;
    return (
        <>
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
                            {data.movies.map((movie) => (
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
                                            onClick={
                                                (e) =>
                                                    handleOpenVideo(
                                                        e,
                                                        movie.video
                                                    ) // TODO:
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
                                            onClick={() =>
                                                handleDeleteMovie(movie.id)
                                            }
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
                    <Pagination
                        count={data.total_page}
                        color={"primary"}
                        onChange={(e, page) => handleMovePage(e, page)}
                    />
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
