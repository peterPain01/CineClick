import styles from "./Trailer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import axios from "axios";
import ActionButton from "../ActionButton/ActionButton";
import { Link } from "react-router-dom";

function Trailer({ setOpenModal }) {
    // set Title of Trailer here
    // const [trailerId, setTrailerId] = useState("");
    // const [trailerTitle, setTrailerTitle] = useState("Lord of the Rings");
    const imageThumb = useRef(null);

    return (
        <>
            <div className={styles.Trailer}>
                <div>
                    <img
                        className={styles.imageThumb}
                        id="imageThumbnail"
                        src="./img/Thumbnail.jpg"
                        alt=""
                        ref={imageThumb}
                    />
                </div>

                <div className={styles.action}>
                    <div>
                        <img
                            className={styles.movieThumb}
                            src="./img/trailerthumb.png"
                            alt=""
                        />
                        <p className={styles.trailerDesc}>
                            World-renowned detective Benoit Blanc travels to
                            Greece to investigate a mystery surrounding a tech
                            billionaire and his unlikely group of friends.
                        </p>
                    </div>

                    <Link to="/watch/1/spider" className={styles.playBtnBox}>
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
                            handleOpenState={setOpenModal}
                            marginLeft="20px"

                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Trailer;
