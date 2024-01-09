import styles from "./Trailer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import ActionButton from "../ActionButton/ActionButton";
import { Link } from "react-router-dom";
import request from "../../modules/request";

function Trailer({ setOpenModal = () => {}, setPopupMovie = () => {} }) {
    // set Title of Trailer here
    // const [trailerId, setTrailerId] = useState("");
    // const [trailerTitle, setTrailerTitle] = useState("Lord of the Rings");
    const imageThumb = useRef(null);
    const [movie, setMovie] = useState({});
    useEffect(() => {
        request.get("movie/daily-movie", res => {
            setMovie(res.data);
            console.log(res.data);
        });
    }, []);

    return (
        <>
            {movie !== null ? <div className={styles.Trailer}>
                <div>
                    <img
                        className={styles.imageThumb}
                        id="imageThumbnail"
                        src={movie.thumbnail}
                        alt=""
                        ref={imageThumb}
                    />
                </div>

                <div className={styles.action}>
                    <div>
                        <h1
                            className={styles.movieThumb}>
                            {movie.title}
                        </h1>
k                       <p className={styles.trailerDesc}>
                            {movie.summary}
                        </p>
                    </div>

                    <Link to={`/watch/${movie.id}/${movie.title}`} className={styles.playBtnBox}>
                        <ActionButton
                            text="Play"
                            icon={
                                <FontAwesomeIcon
                                    icon={faPlay}
                                    style={{ color: "#000000" }}
                                    size="2xl"
                                />
                            }
                            bgc="#fff"
                            gap="8px"
                            paddingTopBot="12px"
                            paddingLeftRight="25px"
                            minWidth="70px"
                        />
                    </Link>

                    <div className={styles.detailBtnBox}>
                        <ActionButton
                            text="More info"
                            icon={
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    style={{ color: "#fff" }}
                                    size="2xl"
                                />
                            }
                            bgc="rgba(109, 109, 110, 0.7)"
                            color="white"
                            border="none"
                            gap="8px"
                            paddingTopBot="12px"
                            paddingLeftRight="25px"
                            handleOpenState={() => {
                                setPopupMovie(movie);
                                setOpenModal(true);
                            }}
                            marginLeft="20px"

                        />
                    </div>
                </div>
            </div> : null}
        </>
    );
}

export default Trailer;
