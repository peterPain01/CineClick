import Trailer from "../../components/Trailer/Trailer";
import DetailPopup from "../../components/DetailPopup/DetailPopup";
import styles from "./Home.module.css";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useEffect, useRef, useState } from "react";
import MovieCarouselItems from "../../modules/MovieCarouselItems";
import MovieCard from "../../components/MovieCard/MovieCard";
import { CSSTransition } from "react-transition-group";

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
    const [openModal, setOpenModal] = useState(false);
    const shouldRenderChild = useDelayUnmount(openModal, 500);

    // const mountedStyle = { opacity: '1', visibility: 'visible', scale:' 1', transition: 'all .5s' };
    // const unmountedStyle = { opacity: '0', visibility: "hidden", scale: '0', overflow: 'hidden' };

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

    const [isOpen, setOpen] = useState(false);

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
                />
            ) : (
                ""
            )}
            {MovieCarouselItems.map((item, index) => {
                return (
                    <MovieCarousel
                        key={index}
                        carouselClass={item.carouselClass}
                        wrapperClass={item.wrapperClass}
                        heading={item.heading}
                        marginTop={index === 0 ? -150 : 50}
                        openMovieBox={openMovieBox}
                        isOpen={isOpen}
                        setOpen={setOpen}
                    />
                );
            })}

            <div
                ref={openMovieBox}
                className={styles.boxMovieHover}
                onMouseLeave={(e) => openMovieBoxLeave(e)}
            >
                <MovieCard
                    image={cards[0].image}
                    title={cards[0].title}
                    matchScore={cards[0].matchScore}
                    maturityNumber={cards[0].maturityNumber}
                    year={cards[0].year}
                    duration={cards[0].duration}
                    addBtn={false}
                />
            </div>
        </div>
    );
}

