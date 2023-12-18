import styles from "./Cart.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export function Cart() {
    const [movies, setMovies] = useState([
        {
            image: "https://occ-0-64-58.1.nflxso.net/dnm/api/v6/6gmvu2hxdfnQ55LZZjyzYR4kzGk/AAAABbUEHtsBjMAR4bBmJ0_a36FBPtRH-RveuuIKSwU6dlao2gANeSca7-6LvZI73BkpKqHTYEebYc4S1XgEJ5T7rInCE9MnhOuGSyo.webp?r=443",
            title: "Fight Club",
            description:
                "A disillusioned office worker finds an outlet for his repressed emotions when he and a mysterious new friend named Tyler Durden start an underground fight club.",
            matchScore: "9",
            maturityNumber: "18+",
            year: "1999",
            duration: "2hours 15m",
            price: "123",
        },
        {
            image: "./img/img-1.jpg",
            title: "Spy Family",
            description: "An anime about family.",
            matchScore: "9",
            maturityNumber: "18+",
            year: "2021",
            duration: "1hours",
            price: "1234",
        },
        {
            image: "./img/img-5.jpg",
            title: "Spider man",
            description: "Spider man in the other universe. It's so nice",
            matchScore: "8",
            maturityNumber: "18+",
            year: "1999",
            duration: "2hours 15m",
            price: "345",
        },
    ]);
    const totalCost = movies.reduce((curSum, object) => {
        return curSum + Number(object.price)
      },0);

    function handleRemoveProduct(price) {
        setMovies((movies) => movies.filter((movie) => movie.price != price));
    }
    return (
        <div className={styles.centeredDiv}>
            <div className={styles.cartWrapper}>
                <div className={styles.cartInfo}>
                    <header className={styles.cartInfoHeader}>
                        <h1>Shopping Cart</h1>
                        <span className={styles.itemNumber}>
                            {movies.length} Items
                        </span>
                    </header>
                    <div className={styles.productDetails}>
                        <table className={styles.productTable}>
                            <thead>
                                <tr className={styles.productRow}>
                                    <td
                                        className={
                                            styles.productCol1 +
                                            " " +
                                            styles.tdata
                                        }
                                    >
                                        Product Details
                                    </td>
                                    <td
                                        className={
                                            styles.productCol2 +
                                            " " +
                                            styles.tdata
                                        }
                                    >
                                        Price
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {movies.map((movie) => {
                                    return (
                                        <tr
                                            className={styles.productRow}
                                            key={movie.image}
                                        >
                                            <td className={styles.tdata}>
                                                <img
                                                    src={movie.image}
                                                    alt=""
                                                    className={
                                                        styles.productImage +
                                                        " " +
                                                        styles.productCol1
                                                    }
                                                />
                                                <button
                                                    onClick={() =>
                                                        handleRemoveProduct(
                                                            movie.price
                                                        )
                                                    }
                                                    className={
                                                        styles.removeButton
                                                    }
                                                >
                                                    <i
                                                        className={
                                                            styles.removeIcon
                                                        }
                                                    >
                                                        {" "}
                                                        <FontAwesomeIcon
                                                            icon={faX}
                                                            style={{
                                                                color: "#e50914",
                                                            }}
                                                        />
                                                    </i>
                                                    Remove
                                                </button>
                                            </td>
                                            <td
                                                className={
                                                    styles.productPrice +
                                                    " " +
                                                    styles.tdata
                                                }
                                            >
                                                {movie.price}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className={styles.cartCheckOut}>
                    <h1>Order Summary</h1>
                    <div>
                        <div className={styles.subDetailWrapper}>
                            <span>Items {movies.length}</span>
                            <span>Cost: {totalCost}</span>
                        </div>
                        <div className={styles.promoWrapper}>
                            <label htmlFor="" className={styles.promoText}>
                                Promo code
                            </label>
                            <input
                                type="text"
                                className={styles.promoInput}
                                placeholder="Enter your code"
                            />
                            <button className={styles.applyButton}>
                                Apply
                            </button>
                        </div>
                        <div className={styles.totalWrapper}>
                            <span className={styles.totalText}>Total Cost</span>
                            <span className={styles.totalPrice}>{totalCost}</span>
                        </div>
                        <button className={styles.checkOutButton}>
                            Check out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

