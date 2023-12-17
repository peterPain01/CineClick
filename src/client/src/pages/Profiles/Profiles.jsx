import { useState, useRef } from "react";
import styles from "./Profiles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

import DropDown from "../../components/DropDown/DropDown";

function Profiles() {
    const [name, setName] = useState("Pham Hoang Gia Huy");
    const [showLanguage, isShowLanguage] = useState(false);
    const [selectedLanguage, setSelectedLannguage] = useState("");

    const languageDropDown = useRef(null);
    function showLanguageBox() {
        isShowLanguage(!showLanguage);
        if (showLanguage) languageDropDown.current.style.display = "flex";
        else languageDropDown.current.style.display = "none";
    }

    function handleSelectedLanguage(e) {
        setSelectedLannguage(e.target.innerHTML);
    }
    return (
        <div className={styles.centeredDiv}>
            <div className={styles.profileMain}>
                <h1>Edit Profiles</h1>
                <div className={styles.profileEntry}>
                    <div className={styles.profileAvatar}>
                        <img src="./img/avatar.jpg" alt="" />
                        <button className={styles.editButton}>
                            <i>
                                <FontAwesomeIcon
                                    className={styles.searchIconField}
                                    icon={faPencil}
                                    size="lg"
                                    style={{ color: "#bebebe" }}
                                />
                            </i>
                        </button>
                    </div>
                    <div className={styles.profileData}>
                        <div className={styles.editForm}>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={styles.balanceData}>
                            <div className={styles.balanceInfo}>
                                <h2>Balance:</h2>
                                <p>100000₫</p>
                            </div>
                            <button className={styles.topUpBtn}>
                                <Link to='/topup'>Top up</Link>
                                </button>
                        </div>
                        <div className={styles.language}>
                            <h2>Language:</h2>
                            <DropDown
                                title={"Language"}
                                contentList={[
                                    "VietNam",
                                    "English",
                                    "Germany",
                                    "France",
                                ]}
                            />
                        </div>

                        <div className={styles.maturity}>
                            <h2>Maturity Settings:</h2>
                            <span className={styles.maturityInfo}>
                                All Maturity Rating
                            </span>
                            <p className={styles.desc}>
                                Show titles of all maturity rating for this
                                profile
                            </p>
                            <button className={styles.editMaturityButton}>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
                <div className={styles.boxButton}>
                    <button className={styles.saveButton}>Save</button>
                    <button className={styles.cancelButton}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default Profiles;
