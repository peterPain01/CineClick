import styles from "./MovieCarousel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faColonSign,
    faGreaterThan,
    faLessThan,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import { getCoords } from "@/modules/getCoords";

function MovieCarousel({
    carouselClass,
    wrapperClass,
    heading,
    marginTop = 0,
    openMovieBox,
    isOpen = false,
    setOpen = null,
}) {
    function handleClick(e) {
        if (e.currentTarget === e.target) {
            let img_perScroll = 4;
            let carousel = document.querySelector(`.${carouselClass}`);
            let arrowIcons = document.querySelectorAll(`.${wrapperClass} i`);
            let firstImg = document.querySelectorAll(`.${wrapperClass} img`)[0];
            let firstImgWidth = firstImg.clientWidth * img_perScroll + 14;
            carousel.scrollLeft +=
                e.target.id === "left" ? -firstImgWidth : firstImgWidth;
        }
    }

    let openMovieTimeOut = useRef(false);

    function handleMouseEnter(event) {
        const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
        const box_width = 0.25 * vw;
        const box_height = 400;
        const { top, left } = getCoords(event.target);

        const x = left + event.target.offsetWidth / 2 - box_width / 2;
        const y = top + event.target.offsetHeight / 2 - box_height / 2.5;

        window.setTimeout(() => {
            openMovieBox.current.style.opacity = 0;
            openMovieBox.current.style.scale = 0;
            openMovieBox.current.style.visibility = "hidden";
        }, 100);
        window.setTimeout(() => {
            openMovieBox.current.style.left = `${x}px`;
            openMovieBox.current.style.top = `${y}px`;
            openMovieBox.current.style.width = `${box_width}px`;
            // openMovieBox.current.style.height = `${box_height}px`;
        }, 500);
        openMovieTimeOut.current = window.setTimeout(() => {
            openMovieBox.current.style.opacity = 1;
            openMovieBox.current.style.scale = 1;
            openMovieBox.current.style.visibility = "visible";
        }, 800);
    }

    function handleMouseLeave() {
        if (openMovieTimeOut.current) {
            window.clearTimeout(openMovieTimeOut.current);
        }
    }

    return (
        <>
            <div
                className={styles.container}
                style={{ marginTop: `${marginTop}px` }}
            >
                <div className={styles.heading}>
                    <h1>{heading}</h1>
                </div>
                <div className={styles.wrapper + ` ${wrapperClass}`}>
                    <div
                        className={styles.leftSection}
                        onClick={(e) => handleClick(e)}
                        id="left"
                    >
                        <FontAwesomeIcon
                            className={styles.left}
                            icon={faLessThan}
                            style={{ color: "#ffffff" }}
                            size={"2x"}
                        />
                    </div>

                    <div className={styles.carousel + ` ${carouselClass}`}>
                        <img
                            src="./img/img-1.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <img
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            // onMouseEnter={(event) => handleShowMovieBox(event)}
                            src="./img/img-2.jpg"
                            alt=""
                        />
                        <img
                            src="./img/img-3.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <img
                            src="./img/img-4.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <img
                            src="./img/img-5.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <img
                            src="./img/img-6.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <img
                            src="./img/img-7.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                        <img
                            src="./img/img-8.jpg"
                            alt=""
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        />
                    </div>
                    <div
                        className={styles.rightSection}
                        onClick={(e) => handleClick(e)}
                        id="right"
                    >
                        <FontAwesomeIcon
                            className={styles.right}
                            icon={faGreaterThan}
                            style={{ color: "#ffffff" }}
                            size={"2x"}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default MovieCarousel;
