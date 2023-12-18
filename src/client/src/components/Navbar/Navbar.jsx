import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faBell,
    faCaretDown,
    faPencil,
    faUser,
    faCartShopping,
    faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";

function Navbar({ logoOnly = false }) {
    const [search, isSearch] = useState(false);
    const [searchValue, setSearchvalue] = useState("");
    const [fix, setFix] = useState(false);
    const [expand, setExpand] = useState(false);
    const searchInput = useRef(null);

    function handleSearch() {
        isSearch(true);
        searchInput.current.focus();
    }

    function closeInputField(){ 
        if(!searchValue){ 
            isSearch(false)
        }
    }
    
    function setFixed() {
        if (window.scrollY >= 20) {
            setFix(true);
        } else {
            setFix(false);
        }   
    }

    const [cookies, setCookie, removeCookie] = useCookies(['login']);
    window.addEventListener("scroll", setFixed);
    return (
        <>
            <div
                className={
                    fix
                        ? styles.navbar + " " + styles.navbarFixed
                        : styles.navbar
                }
                style={{backgroundColor: logoOnly ? '#000' : 'rgba(0, 0, 0, 0.2)' }}
            >
                <div className={styles.direct}>
                    <a href="/">
                        {" "}
                        <img
                            className={styles.logo}
                            src="./img/logo.png"
                            alt=""
                        />
                    </a>
                    {logoOnly || (
                        <ul className={styles.link}>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/tvshow">TV Show</Link>
                            </li>
                            <li className={styles.mainMenu}>
                                <Link to="/movies">Movies</Link>
                                <ul className={styles.subMenu}>
                                    <li className={styles.mainMenu}>
                                        Action
                                        <ul className={styles.subMenu}>
                                            <li>Martial Arts</li>
                                            <li>Superhero</li>
                                            <li>Espionage/Thriller</li>
                                            <li>Disaster</li>
                                            <li>War</li>
                                        </ul>
                                    </li>
                                    <li className={styles.mainMenu}>
                                        Comedy
                                        <ul className={styles.subMenu}>
                                            <li>Romantic Comedy</li>
                                            <li>Slapstick</li>
                                            <li>Satire/Parody</li>
                                            <li>Dark Comedy</li>
                                            <li>Screwball Comedy</li>
                                        </ul>
                                    </li>
                                    <li className={styles.mainMenu}>
                                        Drama
                                        <ul className={styles.subMenu}>
                                            <li>Historical Drama</li>
                                            <li>Crime Drama</li>
                                            <li>Melodrama</li>
                                            <li>Courtroom Drama</li>
                                            <li>Family Drama</li>
                                        </ul>
                                    </li>
                                    <li>Science Fiction</li>
                                    <li>Horror</li>
                                </ul>
                            </li>
                            <li>
                                <Link to="/browse"> Browse by Language</Link>
                            </li>
                            <li>
                                <Link to="/fav">My Favorite List</Link>
                            </li>
                        </ul>
                    )}
                </div>
                {logoOnly || (
                    <div className={styles.action}>
                        <div className={styles.searchBox}>
                            <div
                                className={
                                    search
                                        ? styles.searching +
                                          " " +
                                          styles.searchField
                                        : styles.searchField
                                }
                            >
                                <FontAwesomeIcon
                                    className={styles.searchIconField}
                                    icon={faMagnifyingGlass}
                                    size="lg"
                                    style={{ color: "#ffffff" }}
                                />
                                <input
                                    type="text"
                                    placeholder="Movies, Cast, ...."
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchvalue(e.target.value)
                                    }
                                    className={styles.searchFieldInput}
                                    ref={searchInput}
                                    onBlur={closeInputField}
                                />
                            </div>
                            <div
                                className={
                                    search
                                        ? styles.opacityForm +
                                          " " +
                                          styles.searchIcon
                                        : styles.searchIcon
                                }
                                onClick={handleSearch}
                            >
                                <FontAwesomeIcon
                                    icon={faMagnifyingGlass}
                                    size="lg"
                                    style={{ color: "#ffffff" }}
                                />
                            </div>
                        </div>
                        <div className={styles.infoBox}>
                            <div className={styles.notifyBox}>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faBell}
                                        className={styles.notifyIcon}
                                        style={{ color: "#ffffff" }}
                                        size="lg"
                                    />
                                </div>
                                <div className={styles.notifyExpand}>
                                    <p>Empty NotifyCation</p>
                                </div>
                            </div>
                            {/* Cart */}
                            <Link to={"cart"}>
                                <div className={styles.cardBox}>
                                    <div>
                                        <FontAwesomeIcon
                                            icon={faCartShopping}
                                            style={{ color: "#ffffff" }}
                                            size="lg"
                                        />
                                    </div>
                                    <span className={styles.cartNumber}>1</span>
                                </div>
                            </Link>

                            <div
                                className={styles.avatarBox}
                                onMouseEnter={() => setExpand(true)}
                                onMouseLeave={() => setExpand(false)}
                            >
                                <img
                                    className={styles.avatar}
                                    src="./img/avatar.jpg"
                                    alt=""
                                />

                                <FontAwesomeIcon
                                    icon={faCaretDown}
                                    style={{ color: "#ffffff" }}
                                    size="lg"
                                    rotation={expand ? 180 : 0}
                                />
                                <div className={styles.Boxlist}>
                                    <Link to="/profiles">
                                        <i>
                                            <FontAwesomeIcon
                                                icon={faPencil}
                                                style={{ color: "#ffffff" }}
                                            />
                                        </i>
                                        Mange Profiles
                                    </Link>
                                    <Link to="/YourAccount">
                                        <i>
                                            <FontAwesomeIcon
                                                icon={faUser}
                                                style={{ color: "#ffffff" }}
                                            />
                                        </i>
                                        Account
                                    </Link>
                                    <Link to="/help">
                                        <i>
                                            <FontAwesomeIcon
                                                icon={faQuestion}
                                                style={{ color: "#ffffff" }}
                                            />
                                        </i>
                                        Help Center
                                    </Link>
                                    <p className={styles.breakLine}></p>
                                    <Link to="/" onClick={async () => {
                                        axios.get("http://localhost:13123/auth/logout", {withCredentials: true}).then(res => {
                                            console.log(res.data);
                                        }).catch(err => alert(err?.response?.data));
                                        removeCookie("login");
                                    }}>
                                        Sign out of NetFlix
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}

export default Navbar;
