import styles from "./MovieCard.module.css";
import ActionButton from "../ActionButton/ActionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faChevronDown } from "@fortawesome/free-solid-svg-icons";

function MovieCard({
    movie={},
    addBtn = true,
    setPopupMovie = null,
    setOpenModal = null
}) {
    return (
        <div className={styles.card} onClick={() => {
            setPopupMovie(movie);
            setOpenModal(true);
        }}>
            <div className={styles.thumb}>
                <img src={movie?.image} alt="" />
                <span>{movie?.length}</span>
                <div className={styles.overlay}></div>
            </div>
            <div className={styles.cardMetadata}>
                <div className={styles.topCard}>
                    <div className={styles.info}>
                        <div className={styles.matchScore}>
                            <span>Match Score: {(Math.random() * 10).toPrecision(2)}</span>
                        </div>
                        <div>
                            <div className={styles.moreInfo}>
                                <span className={styles.maturityNumber}>
                                    {movie?.restrict_age}
                                </span>
                                <span className={styles.year}>{movie?.year}</span>
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
                {movie?.summary ? (
                    <div className={styles.desc}>
                        <p>{movie?.summary}</p>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

export default MovieCard;
