import styles from "./Browse.module.css";
import DropDown from "../../components/DropDown/DropDown";

export function Browse() {
    const languages = [
        'English',
        'Spanish',
        'Mandarin Chinese',
        'Hindi',
        'Arabic',
        'French',
        'Russian',
        'Portuguese',
        'Bengali',
        'Swahili'
      ];
    return (
        <div className={styles.centeredDiv}>
            <div>
                <header className={styles.headerWrapper}>
                    <h1 className={styles.headerText}>Browse by Languages</h1>
                    <div className={styles.headerAction}>
                        <DropDown title={"Language"} minWidth="180px" contentList={languages}/>
                    </div>
                </header>
                <div className={styles.MovieGrid}>
                    <img className={styles.image} src="./img/img-3.jpg" alt="" />
                    <img className={styles.image} src="./img/img-4.jpg" alt="" />
                    <img className={styles.image} src="./img/img-5.jpg" alt="" />
                    <img className={styles.image} src="./img/img-6.jpg" alt="" />
                    <img className={styles.image} src="./img/img-7.jpg" alt="" />
                    <img className={styles.image} src="./img/img-8.jpg" alt="" />
                    <img className={styles.image} src="./img/img-3.jpg" alt="" />
                    <img className={styles.image} src="./img/img-4.jpg" alt="" />
                    <img className={styles.image} src="./img/img-5.jpg" alt="" />
                    <img className={styles.image} src="./img/img-6.jpg" alt="" />
                    <img className={styles.image} src="./img/img-7.jpg" alt="" />
                    <img className={styles.image} src="./img/img-8.jpg" alt="" />
                    <img className={styles.image} src="./img/img-3.jpg" alt="" />
                    <img className={styles.image} src="./img/img-4.jpg" alt="" />
                    <img className={styles.image} src="./img/img-5.jpg" alt="" />
                    <img className={styles.image} src="./img/img-6.jpg" alt="" />
                    <img className={styles.image} src="./img/img-7.jpg" alt="" />
                    <img className={styles.image} src="./img/img-8.jpg" alt="" />
                </div>
                <div className={styles.pagination}>
                    <a className={styles.paginationItem}>1</a>
                    <a className={styles.paginationItem}>2</a>
                    <a className={styles.paginationItem}>3</a>
                </div>
            </div>
        </div>
    );
}
