import { useState, useRef, useEffect } from "react";
import styles from "./Profiles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "boring-avatars";
import AvatarPage from "../Avatar/AvatarPage";
import DropDown from "../../components/DropDown/DropDown";
import Loading from "../../components/Loading";
import request from "../../modules/request";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Profiles() {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        name: "",
        avatar: "",
    });
    const [showLanguage, isShowLanguage] = useState(false);
    const [selectedLanguage, setSelectedLannguage] = useState("");

    const languageDropDown = useRef(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isChoosingAvt, setIsChoosingAvt] = useState(false)
    // Get name and avatar
    useEffect(() => {
        request.get("/viewer/userInfo", (res) => {
            setInfo((prevInfo) => ({ ...prevInfo, ...res.data }));
            setIsLoading(false);
        });
    }, []);

    if (isLoading) {
        return <Loading />;
    }
    function showLanguageBox() {
        isShowLanguage(!showLanguage);
        if (showLanguage) languageDropDown.current.style.display = "flex";
        else languageDropDown.current.style.display = "none";
    }

    function handleSelectedLanguage(e) {
        setSelectedLannguage(e.target.innerHTML);
    }
    function handleCancel() {
        navigate("/");
    }
    function handleChangeValue(e) {
        setInfo({ ...info, [e.target.name]: e.target.value });
    }
    function handleSave() {
        setIsLoading(true)
        request.post('/viewer/userInfo', info)
        .then(res => { 
            toast.success(res.data)
            setIsLoading(false)
        })
        .catch(err => { 
            toast.err(err.data)
            setIsLoading(false)
        })
    }
    return (
       <>
        {isChoosingAvt ? <AvatarPage setIsChoosingAvt={setIsChoosingAvt} setInfo={setInfo}/>:  <div className={styles.centeredDiv}>
            <div className={styles.profileMain}>
                <h1>Edit Profiles</h1>
                <div className={styles.profileEntry}>
                    <div className={styles.profileAvatar}>
                        <img
                            src={
                                info.avatar ||
                                "https://source.boringavatars.com/beam/160/Mother%20Frances?square"
                            }
                            alt=""
                        />
                        <button
                            onClick={() => setIsChoosingAvt(true)}
                            className={styles.editButton}
                        >
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
                                name="name"
                                id="name"
                                value={info.name || "You have not set a username"}
                                onChange={(e) => handleChangeValue(e)}
                            />
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
                    <button
                        className={styles.saveButton}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                    <button
                        className={styles.cancelButton}
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>}
        <ToastContainer/>
       </>
    );
}
