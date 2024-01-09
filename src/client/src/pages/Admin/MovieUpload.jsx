import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Typography, Alert } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import request from "../../modules/request";

// TODO Fetch this from Server
const services = [
    {
        value: "premium",
        label: "premium",
    },
    {
        value: "free",
        label: "free",
    },
];
function MovieUpload() {
    const [message, setMessage] = useState(null);
    const [movie, setMovie] = useState({
        title: "",
        genres: "",
        maturity: "",
        year: "",
        typeService: "",
        description: "",
        img: "",
        video: "",
    });

    const [imgName, setImgName] = useState("");
    const [videoname, setVideoName] = useState("");
    const [openImg, setOpenImg] = useState(false);

    const imgPreview = useRef(null);
    const videoPreview = useRef(null);

    const [videoSrc, setVideoSrc] = useState("");

    const handleImageUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setImgName(name);
        console.log(file);
        setMovie({
            ...movie,
            img: file,
        });

        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.addEventListener("load", function () {
            imgPreview.current.src = this.result;
        });
    };

    const handleVideoUpload = (e) => {
        if (!e.target.files) {
            return;
        }
        const file = e.target.files[0];
        const { name } = file;
        setVideoName(name);
        setMovie({
            ...movie,
            video: file,
        });

        let url = URL.createObjectURL(file);
        console.log(url);
        videoPreview.current.style.display = "block";
        setVideoSrc(url);
    };

    useEffect(() => {
        if (openImg) {
            imgPreview.current.style.display = "block";
            imgPreview.current.style.position = "absolute";
            imgPreview.current.style.left = "0";
            imgPreview.current.style.top = "10%";
            imgPreview.current.style.right = "0";
            imgPreview.current.style.marginRight = "auto";
            imgPreview.current.style.marginLeft = "auto";
            imgPreview.current.style.maxWidth = "80vw";
            imgPreview.current.style.minWidth = "500px";
            imgPreview.current.style.minHeight = "500px";
            imgPreview.current.style.maxHeight = "80vh";
            imgPreview.current.style.objectFit = "contain";
            imgPreview.current.style.zIndex = "9999";
            imgPreview.current.style.cursor = "pointer";
        } else {
            imgPreview.current.style.width = "auto";
            imgPreview.current.style.position = "static";
            imgPreview.current.style.maxHeight = "300px";
            imgPreview.current.style.objectFit = "contain";
            imgPreview.current.style.cursor = "pointer";
            imgPreview.current.style.minWidth = "auto";
            imgPreview.current.style.minHeight = "auto";
        }
    }, [openImg]);
    function openFullPage() {
        setOpenImg((prev) => !prev);
    }

    function handleInputForm(e) {
        setMovie({ ...movie, [event.target.name]: event.target.value });
    }
    function handleSubmit(event) {
        event.preventDefault();
        let data = new FormData(event.target);
        request.post("admin/upload-movie", data)
            .then(res => {
                setMessage("Upload successfully");
            }).catch(err => {
                if (res?.response?.status === 401) {
                    window.open("/", "_self");
                }
            });
    }

    return (
        <form style={{position: "relative"}} onSubmit={handleSubmit}>
        <div
            style={{
                position: "relative",
                width: "100vw",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflow: "auto",
            }}
        >
            <Typography variant="h3" component="h3" mb={3} color={""}>
                Upload Movie Form
            </Typography>
            <div
                style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    columnGap: "12px",
                    rowGap: "12px",
                    maxWidth: "768px",
                    margin: "12px 0px",
                }}
            >
                <TextField
                    id="title"
                    name="title"
                    label="Movie"
                    variant="outlined"
                    value={movie.title}
                    onChange={(e) => handleInputForm(e)}
                />
                <TextField
                    name="genres"
                    id="genres"
                    label="Genres"
                    variant="outlined"
                    value={movie.genres}
                    onChange={(e) => handleInputForm(e)}
                />

                <TextField name="restrict_age" id="maturity" label="Maturity" variant="outlined" />
                <TextField
                    id="outlined-basic"
                    name="year"
                    label="year"
                    type="number"
                    onChange={(e) => handleInputForm(e)}
                    variant="outlined"
                />
                <TextField
                    id="select-plan"
                    select
                    defaultValue={services[0].value}
                    name="type"
                    label="Type"
                    onChange={(e) => handleInputForm(e)}
                    helperText="Please select type service of Movie"
                >
                    {services.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                    ))}
                </TextField>
            </div>
            <div style={{ width: "100%", maxWidth: "768px" }}>
                <TextField
                    id="filled-multiline-static"
                    label="Description"
                    multiline
                    rows={4}
                    variant="filled"
                    name="summary"
                    fullWidth
                    onChange={(e) => handleInputForm(e)}
                />
            </div>
            <div
                style={{
                    marginTop: "40px",
                    marginBottom: "40px",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "12px",
                        padding: "0px 20px",
                        borderRight: "1px solid #fff",
                    }}
                >
                    <span>{imgName}</span>
                    <img
                        ref={imgPreview}
                        onClick={openFullPage}
                        style={{
                            maxWidth: "400px",
                            maxHeight: "300px",
                            objectFit: "contain",
                        }}
                    />
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            width: "180px",
                            height: "40px",
                        }}
                    >
                        Upload Thumbnail
                        <input
                            type="file"
                            accept="image/png, image/gif, image/jpeg"
                            name="picture"
                            hidden
                            onChange={(e) => handleImageUpload(e)}
                        />
                    </Button>
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "12px",
                    }}
                >
                    <p
                        style={{
                            width: "200px",
                            wordWrap: "break-word",
                            padding: "6px 0px",
                        }}
                    >
                        {videoname}
                    </p>
                    <video
                        ref={videoPreview}
                        style={{
                            display: "none",
                            width: "300px",
                            height: "300px",
                        }}
                        src={videoSrc}
                        controls
                    ></video>
                    <Button
                        variant="contained"
                        component="label"
                        sx={{
                            width: "180px",
                            height: "40px",
                        }}
                    >
                        Upload Video
                        <input
                            type="file"
                            accept=" video/*"
                            name="video"
                            hidden
                            onChange={(e) => handleVideoUpload(e)}
                        />
                    </Button>
                </div>
            </div>
            <Button type="submit" variant="contained">
                Submit
            </Button>
        </div>
        {message ? <Alert severity="success" color="info" style={{position: "absolute", bottom: 0}}>
            {message}
        </Alert> : null}
        </form>
    );
}

export default MovieUpload;
