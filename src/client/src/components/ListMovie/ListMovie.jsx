import { useEffect, useState } from "react";
import styles from "./ListMovie.module.css";
import DetailPopup from "../DetailPopup/DetailPopup";
export function ListMovie({
    header = "",
    movies = [],
    total_page = 1,
    item_space = "1fr",
    per_row = 6,
    on_change_page = (page) => {},
    marginL = "200px"
}) {
    function useDelayUnmount(isMounted, delayTime) {
        const [shouldRender, setShouldRender] = useState(false);
        useEffect(() => {
            let timeoutId;
            if (isMounted && !shouldRender) {
                setShouldRender(true);
            } else if (!isMounted && shouldRender) {
                timeoutId = setTimeout(() => setShouldRender(false), delayTime);
            }
            return () => clearTimeout(timeoutId);
        }, [isMounted, delayTime, shouldRender]);
        return shouldRender;
    }
    const [popupMovie, setPopupMovie] = useState(null);
    const [movieCard, setMovieCard] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const shouldRenderChild = useDelayUnmount(openModal, 500);
    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 510ms ease-in",
        overflow: "hidden",
    };
    useEffect(() => {
        document.body.style.maxHeight = openModal ? "100vh" : "";
        document.body.style.overflow = openModal
            ? "visible !important;"
            : "hidden";
    }, [openModal]);
    return (
        <div className={styles.centeredDiv}>
            {shouldRenderChild ? (
                <DetailPopup
                    style={openModal ? mountedStyle : unmountedStyle}
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                    info={popupMovie}
                    setPopupMovie={setPopupMovie}
                />
            ) : (
                ""
            )}
            <div>
                <header className={styles.headerWrapper}>
                    <h1 className={styles.headerText}>{header}</h1>
                </header>
                <div style={{marginLeft: marginL, gridTemplateColumns: `repeat(${per_row}, ${item_space})`}} className={styles.MovieGrid}>
                    {
                        movies.map((mv, index) =>
                            <img onClick={() => {
                                setPopupMovie(mv);
                                setOpenModal(true);
                            }} key={index} className={styles.image} src={mv.image} />
                        )
                    }
                </div>
                <div className={styles.pagination}>
                    {
                        [...Array(total_page).keys()].map(i =>
                            <a key={i} className={styles.paginationItem} onClick={() => on_change_page(i+1)}>{i+1}</a>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
