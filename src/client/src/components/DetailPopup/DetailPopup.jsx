import styles from "./DetailPopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faX,
    faPlay,
    faCircleInfo,
    faPlus,
    faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";

import MovieGrid from "../MovieGrid/MovideGrid";
import ActionButton from "../ActionButton/ActionButton";
import { useEffect, useState } from "react";
import axios from "axios";
function DetailPopup({ openModal, setOpenModal, style, info, setPopupMovie}) {
    function playMovie() {
        if (info?.id) {
        }
    }

    const [similars, setSimilars] = useState(null)
    useEffect(() => {
        axios.get(`http://localhost:13123/movie/list-similar?id=${info.id}`, {
            withCredentials: true
        }).then(res => setSimilars(res.data)).catch(err => alert(err));
    }, []);
    return (
        <> 
            <div className={styles.overlay}></div>
            <div
                className={styles.previewModal}
                style={style}
            >
                <div className={styles.previewModalContent}>
                    <div className={styles.previewVideo}>
                        <video src="./trailer.mp4"></video>
                        <div className={styles.closeModal}>
                            <ActionButton
                                handleCloseState={setOpenModal}
                                icon={
                                    <FontAwesomeIcon
                                        icon={faX}
                                        style={{ color: "#ffffff" }}
                                        size="lg"
                                    />
                                }
                                type="circle"
                                border="none"
                                bgc="rgba(0,0,0,0.5)"
                            />
                        </div>
                        <div className={styles.actionModal}>
                            <div className={styles.playBtnBox} onClick={playMovie}>
                                <ActionButton
                                    icon={
                                        <FontAwesomeIcon
                                            icon={faPlay}
                                            style={{ color: "#000" }}
                                            size="xl"
                                        />
                                    }
                                    bgc="#fff"
                                    text="Play"
                                    paddingTopBot="6px"
                                    paddingLeftRight="30px"
                                    gap="8px"
                                    border="none"
                                />
                            </div>
                            <ActionButton
                                icon={
                                    <FontAwesomeIcon
                                        icon={faPlus}
                                        style={{ color: "#fff" }}
                                        size="xl"
                                    />
                                }
                                type="circle"
                                paddingTopBot="10px"
                                paddingLeftRight="6px"
                                bgc="rgba(0,0,0,0.4)"
                                desc="Add to my Favorite List"
                            />
                            <ActionButton
                                icon={
                                    <FontAwesomeIcon
                                        icon={faThumbsUp}
                                        style={{ color: "#ffffff" }}
                                        size="xl"
                                    />
                                }
                                type="circle"
                                paddingTopBot="10px"
                                paddingLeftRight="6px"
                                bgc="rgba(0,0,0,0.4)"
                            />
                        </div>
                    </div>

                    <div className={styles.previewInfo}>
                        <div className={styles.textInfo}>
                            <div className={styles.previewInfoRight}>
                                <div className={styles.metadata}>
                                    <span className={styles.matchScore}>
                                        Match: 90%
                                    </span>
                                    <span className={styles.year}>
                                        Released: {info?.release}
                                    </span>
                                    <span className={styles.duration}>
                                        {info?.length}
                                    </span>
                                </div>
                                <div className={styles.maturityNumber}>
                                    <span>{info?.restrict_age}</span>
                                </div>
                                <div>
                                    <p className={styles.desc}>
                                        {info?.summary}
                                    </p>
                                </div>
                            </div>
                            <div className={styles.previewInfoLeftBox}>
                                <div className={styles.previewModalTags}>
                                    <span className={styles.tagLabel}>
                                        Actors:
                                    </span>
                                    {(info?.actors?.split(", ") || []).map((actor, index) =>
                                        <><a key={index} href="/">{actor}</a>,&nbsp;</>)}
                                </div>
                                <div className={styles.previewModalTags}>
                                    <span className={styles.tagLabel}>
                                        Category:
                                    </span>
                                    {(info?.genres || []).map((genre, index) =>
                                        <><a key={index} href="/">{genre}</a>,&nbsp;</>)}
                                </div>
                                <div className={styles.previewModalTags}>
                                    <span className={styles.tagLabel}>
                                        More Like:
                                    </span>
                                    <a href="/">Comedy</a>
                                    <a href="/">Comedy</a>
                                </div>
                            </div>
                        </div>
                        <div className={styles.moreLike}>
                            <h1 className={styles.moreLikeHeading}>
                                Related Movies
                            </h1>
                            <MovieGrid
                                movies={similars}
                                setOpenModal={setOpenModal}
                                setPopupMovie={setPopupMovie}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailPopup;
