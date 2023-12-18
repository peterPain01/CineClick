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
import { useRef } from "react";
function DetailPopup({ openModal, setOpenModal, style}) {
    const cards = [
        {
            image: "https://occ-0-64-58.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbUEHtsBjMAR4bBmJ0_a36FBPtRH-RveuuIKSwU6dlao2gANeSca7-6LvZI73BkpKqHTYEebYc4S1XgEJ5T7rInCE9MnhOuGSyo.webp?r=443",
            title: "Fight Club",
            description:
                "A disillusioned office worker finds an outlet for his repressed emotions when he and a mysterious new friend named Tyler Durden start an underground fight club.",
            matchScore: "9",
            maturityNumber: "18+",
            year: "1999",
            duration: "2hours 15m",
        },
    ];
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
                            <div className={styles.playBtnBox}>
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
                                        Released: 2023
                                    </span>
                                    <span className={styles.duration}>
                                        7 seasons
                                    </span>
                                </div>
                                <div className={styles.maturityNumber}>
                                    <span>13+</span>
                                </div>
                                <div>
                                    <p className={styles.desc}>
                                        Lorem ipsum, dolor sit amet consectetur
                                        adipisicing elit. Voluptas vel facilis
                                        qui accusamus distinctio animi ratione,
                                        quod quas ut vero facere eveniet nisi
                                        aspernatur voluptatum obcaecati
                                        consequatur doloremque incidunt beatae.
                                    </p>
                                </div>
                            </div>
                            <div className={styles.previewInfoLeftBox}>
                                <div className={styles.previewModalTags}>
                                    <span className={styles.tagLabel}>
                                        Actors:
                                    </span>
                                    <a href="/">Comedy</a>
                                    <a href="/">Comedy</a>
                                </div>
                                <div className={styles.previewModalTags}>
                                    <span className={styles.tagLabel}>
                                        Category:
                                    </span>
                                    <a href="/">Comedy</a>
                                    <a href="/">Comedy</a>
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
                            <MovieGrid />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DetailPopup;
