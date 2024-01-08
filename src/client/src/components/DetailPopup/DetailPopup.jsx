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
import { Link } from "react-router-dom";
import request from "../../modules/request";
function DetailPopup({ openModal, setOpenModal, style, info, setPopupMovie}) {
    const [is_favorite, set_favorite] = useState(false);
    const [similars, setSimilars] = useState(null)
    useEffect(() => {
        request.get(`movie/list-similar?id=${info.id}`, res => {
            setSimilars(res.data);
        });
        request.get(`viewer/is-favorite?mv_id=${info.id}`, res => {
            set_favorite(res.data);
        });
    }, [info]);

    function format_date(date) {
        date = new Date(date);
        return `${(date.getMonth() + 1)}/${date.getDate()}/${date.getFullYear()}`;
    }

    function toggle_favorite() {
        request.get(`viewer/set-favorite?mv_id=${info.id}&fav=${!is_favorite}`, res => {
            set_favorite(!is_favorite);
        });
    }
    return (
        <> 
            <div className={styles.overlay}></div>
            <div
                className={styles.previewModal}
                style={style}
            >
                <div className={styles.previewModalContent}>
                    <div style={{textAlign: "center"}} className={styles.previewVideo}>
                        <img style={{}} src={info?.image}></img>
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
                            <Link to={info?.id ? `/watch/${info.id}/${info.title}` : ""} className={styles.playBtnBox}>
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
                            </Link>
                            <ActionButton
                                icon={
                                    <FontAwesomeIcon
                                        icon={faThumbsUp}
                                        style={{ color: is_favorite ? "#0000ff" : "#ffffff" }}
                                        size="xl"
                                    />
                                }
                                type="circle"
                                paddingTopBot="10px"
                                paddingLeftRight="6px"
                                bgc="rgba(0,0,0,0.4)"
                                desc="Add to my Favorite List"
                                click_event={toggle_favorite}
                            />
                        </div>
                    </div>

                    <div className={styles.previewInfo}>
                        <div className={styles.textInfo}>
                            <div className={styles.previewInfoLeft}>
                                <div className={styles.metadata}>
                                    <span className={styles.matchScore}>
                                        Match: 90%
                                    </span>
                                    <br/><span style={{paddingLeft: "0px"}} className={styles.year}>
                                        Released: {format_date(info?.release)}
                                    </span>
                                    <br/><span style={{paddingLeft: "0px"}} className={styles.duration}>
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
                            <div className={styles.previewInfoRightBox}>
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
