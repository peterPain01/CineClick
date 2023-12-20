import styles from "./MovieGrid.module.css";
import MovieCard from "../MovieCard/MovieCard";
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

// Nhan vao 1 list cards -> Duyet qua list
function MovieGrid({ CardNumber = 9 }) {
    return (
        <div className={styles.MovieCards}>
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
            <MovieCard
                image={cards[0].image}
                title={cards[0].title}
                description={cards[0].description}
                matchScore={cards[0].matchScore}
                maturityNumber={cards[0].maturityNumber}
                year={cards[0].year}
                duration={cards[0].duration}
            />
        </div>
    );
}

export default MovieGrid;
