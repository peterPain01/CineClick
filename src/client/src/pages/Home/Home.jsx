import Trailer from "../../components/Trailer/Trailer";
import DetailPopup from "../../components/DetailPopup/DetailPopup";
import styles from "./Home.module.css";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useEffect, useRef, useState } from "react";
import MovieCarouselItems from "../../modules/MovieCarouselItems";
import MovieCard from "../../components/MovieCard/MovieCard";
import { CSSTransition } from "react-transition-group";
import axios from "axios";
import {useCookies} from "react-cookie";
import request from "../../modules/request";

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

export function Home() {
    const [popupMovie, setPopupMovie] = useState(null);
    const [movieCard, setMovieCard] = useState(null);
    const [openModal, setOpenModal] = useState(false);
    const shouldRenderChild = useDelayUnmount(openModal, 500);

    const mountedStyle = { animation: "inAnimation 500ms ease-in" };
    const unmountedStyle = {
        animation: "outAnimation 510ms ease-in",
        overflow: "hidden",
    };
    // Fetch Trailer Movie
    // Fetch 4 MovieCarousel


    useEffect(() => {
        document.body.style.maxHeight = openModal ? "100vh" : "";
        document.body.style.overflow = openModal
            ? "visible !important;"
            : "hidden";
    }, [openModal]);

    const genres = ["Action", "Comedy", "Drama"];
    let genreList = {};
    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    genres.forEach(genre => {
        const [data, set] = useState([]);
        genreList[genre] = {data, set};
    });
    useEffect(() => {
        const url = new URL("http://localhost:13123/movie/list-all");
        genres.forEach(genre => {
            url.search = new URLSearchParams({genres: genre, length: 20});
            request.get(url, res => {
                if (res.status === 200) {
                    genreList[genre].set(res.data);
                } else {
                    alert(res.data);
                }
            });
        })
    }, []);

    const openMovieBox = useRef(null);
    const homeDiv = useRef(null);

    function openMovieBoxLeave(e) {
        openMovieBox.current.style.opacity = 0;
        openMovieBox.current.style.visibility = "hidden";
        openMovieBox.current.style.scale = 0;
    }

    return (
        <div ref={homeDiv} className={styles.home}>
            <Trailer setOpenModal={setOpenModal} />
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
            {genres.map((item, index) => {
                return (
                    <MovieCarousel
                        key={index}
                        carouselClass={"carousel-" + item.toLowerCase()}
                        wrapperClass={"wrapper-" + item.toLowerCase()}
                        heading={item}
                        marginTop={index === 0 ? -150 : 50}
                        items={genreList[item].data}
                        openMovieBox={openMovieBox}
                        setMovieCard={setMovieCard}
                        setOpenModal={setOpenModal}
                        setPopupMovie={setPopupMovie}
                    />
                );
            })}

            <div
                ref={openMovieBox}
                className={styles.boxMovieHover}
                onMouseLeave={(e) => openMovieBoxLeave(e)}
            >
                <MovieCard
                    movie={movieCard}
                    addBtn={false}
                    setPopupMovie={setPopupMovie}
                    setOpenModal={setOpenModal}
                />
            </div>
        </div>
    );
}
