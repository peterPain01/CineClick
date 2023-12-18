import Trailer from "../../components/Trailer/Trailer";
import DetailPopup from "../../components/DetailPopup/DetailPopup";
import styles from "./TVShow.module.css";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";

import { useState } from "react";

export function TVShow() {
    const [openModal, setOpenModal] = useState(false);
    return (
        <div className={styles.home}>
            <Trailer setOpenModal={setOpenModal} />
            {openModal ? (
                <DetailPopup
                    setOpenModal={setOpenModal}
                    openModal={openModal}
                />
            ) : (
                ""
            )}
            <MovieCarousel
                carouselClass={"carousel-action"}
                wrapperClass={"wrapper-action"}
                heading={"Action"}
                marginTop={-100}
            />
            <MovieCarousel
                carouselClass={"carousel-comedy"}
                wrapperClass={"wrapper-comedy"}
                heading={"Comedy"}
            />
            <MovieCarousel
                carouselClass={"carousel-drama"}
                wrapperClass={"wrapper-drama"}
                heading={"Drama"}
            />
        </div>
    );
}

