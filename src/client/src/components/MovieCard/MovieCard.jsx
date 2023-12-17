import styles from "./MovieCard.module.css";
import ActionButton from "../ActionButton/ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function MovieCard({
    image,
    title,
    description = "",
    matchScore,
    year,
    maturityNumber,
    duration,
    addBtn = true,
}) {
    return (
        <div className={styles.card}>
            <div className={styles.thumb}>
                <img src={image} alt="" />
                <span>{duration}</span>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.cardMetadata}>
                <div className={styles.topCard}>
                    <div className={styles.info}>
                        <div className={styles.matchScore}>
                            <span>Match Score: {matchScore}</span>
                        </div>
                        <div>
                            <div className={styles.moreInfo}>
                                <span className={styles.maturityNumber}>
                                    {maturityNumber}
                                </span>
                                <span className={styles.year}>{year}</span>
                            </div>
                        </div>
                    </div>

                    {addBtn ? (
                        <ActionButton
                            icon={
                                <FontAwesomeIcon
                                    icon={faPlus}
                                    color="#fff"
                                    size="lg"
                                />
                            }
                            desc="Add to my Favorite List"
                            type="circle"
                        />
                    ) : (
                        <ActionButton
                            icon={
                                <FontAwesomeIcon
                                    icon={faChevronDown}
                                    style={{ color: "#ffffff" }}
                                    size="lg"
                                />
                            }
                            desc="More info"
                            type="circle"
                        />
                    )}
                </div>
                {description ? (
                    <div className={styles.desc}>
                        <p>{description}</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default MovieCard;
