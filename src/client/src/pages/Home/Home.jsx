import Trailer from "../../components/Trailer/Trailer";
import DetailPopup from "../../components/DetailPopup/DetailPopup";
import styles from "./Home.module.css";
import MovieCarousel from "../../components/MovieCarousel/MovieCarousel";
import { useEffect, useRef, useState } from "react";
import MovieCarouselItems from "../../modules/MovieCarouselItems";
import MovieCard from "../../components/MovieCard/MovieCard";

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
function Home() {
    const [openModal, setOpenModal] = useState(false);
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
            {openModal ? (
                <DetailPopup
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
                        marginTop={index === 0 ? -200 : 50}
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

export default Home;
