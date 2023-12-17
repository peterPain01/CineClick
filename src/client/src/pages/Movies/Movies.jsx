import styles from "./Movies.module.css";
import DropDown from "../../components/DropDown/DropDown";

function Movies() {
  
    return (
        <div className={styles.centeredDiv}>
            <div>
                <header className={styles.headerWrapper}>
                    <h1 className={styles.headerText}>Sort Movies by ....</h1>
                    <div className={styles.headerAction}>

                    </div>
                </header>
            </div>
        </div>
    );
}

export default Movies;
