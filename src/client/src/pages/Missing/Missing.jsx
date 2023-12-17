import styles from "./Missing.module.css";
function Missing() {
    return (
        <div className={styles.main}>
            <div className={styles.debugInfo}>
                <h1>Lost your way</h1>
                <p>
                    Sorry, we can&apos;t find that page. You&apos;ll find lots
                    to explore on the home page.{" "}
                </p>
                <button><a href="/">CineClick Home</a></button>
            </div>
        </div>
    );
}

export default Missing;
