import styles from "./Navbar.module.css";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faMagnifyingGlass,
    faBell,
    faCaretDown,
    faPencil,
    faUser,
    faQuestion,
    faList,
} from "@fortawesome/free-solid-svg-icons";
import { useRef, useState } from "react";
import { useCookies } from "react-cookie";
import { logout } from "../../modules/logout";
import axios from "axios";
import { counter } from "@fortawesome/fontawesome-svg-core";

function Navbar({ logoOnly = false }) {
    const [search, isSearch] = useState(false);
    const [searchValue, setSearchvalue] = useState("");
    const [fix, setFix] = useState(false);
    const [expand, setExpand] = useState(false);
    const searchInput = useRef(null);
    const [isDrop, setDrop] = useState(false);
    const dropDown = useRef(null);
    const navigateLink = useRef(null);
    const search_link = useRef(null);
    const [cookies, setCookie, removeCookie] = useCookies(["login"]);

    function handleSearch() {
        isSearch(true);
        searchInput.current.focus();
    }

    function closeInputField() {
        if (!searchValue) {
            isSearch(false);
        }
    }

    function setFixed() {
        if (window.scrollY >= 20) {
            setFix(true);
        } else {
            setFix(false);
        }
    }

    function checkWidth() {
        let windowWidth = window.innerWidth;

        if (windowWidth < 800) {
            dropDown.current.style.display = "block";
            dropDown.current.style.position = "relative";
            navigateLink.current.style.display = "none";
        } else {
            if(dropDown.current != null){
                dropDown.current.style.display = "none";
                navigateLink.current.style.display = "flex";
            }
        }
    }
    window.addEventListener("scroll", setFixed);
    window.addEventListener("resize", checkWidth);

    function handleDropDown(e) {
        setDrop((isDrop) => !isDrop);
        if (isDrop) {
            handleOpenDropDown();
        } else {
            handleCloseDropDown();
        }
    }
    function handleOpenDropDown() {
        navigateLink.current.style.display = "flex";
        navigateLink.current.style.flexDirection = "column";
        navigateLink.current.style.backgroundColor = "#000";
        navigateLink.current.style.border = "1px solid #fff";
        navigateLink.current.style.padding = "20px";
        navigateLink.current.style.borderRadius = "6px";
        navigateLink.current.style.width = "200px";
        navigateLink.current.style.height = "220px";
        navigateLink.current.style.position = "absolute";
        navigateLink.current.style.top = "30px";
        navigateLink.current.style.left = "30px";
        navigateLink.current.firstChild.style.padding = "0";
    }

    function handleCloseDropDown() {
        navigateLink.current.style.flexDirection = "unset";
        navigateLink.current.style.backgroundColor = "unset";
        navigateLink.current.style.border = "unset";
        navigateLink.current.style.padding = "unset";
        navigateLink.current.style.borderRadius = "unset";
        navigateLink.current.style.width = "unset";
        navigateLink.current.style.height = "unset";
        navigateLink.current.style.position = "unset";
        navigateLink.current.style.top = "unset";
        navigateLink.current.style.left = "unset";
        navigateLink.current.style.display = "none";
    }
    return (
        <>
            <div
                className={
                    fix
                        ? styles.navbar + " " + styles.navbarFixed
                        : styles.navbar
                }
                style={{
                    backgroundColor: logoOnly ? "#000" : "rgba(0, 0, 0, 0.2)",
                }}
            >
                <div className={styles.direct}>
                    <a href="/">
                        {" "}
                        <img
                            className={styles.logo}
                            src="/img/cineclicklogo.svg"
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
                                <Link to="/favorite">My Favorite List</Link>
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
                                <Link
                                    style={{ display: "none" }}
                                    ref={search_link} // change page without reload window
                                    to={{
                                        pathname: `/search`,
                                        search: `?pattern=${searchValue}`,
                                    }}
                                >
                                    {" "}
                                </Link>
                                <input
                                    type="text"
                                    placeholder="Movies, Cast, ...."
                                    value={searchValue}
                                    onChange={(e) =>
                                        setSearchvalue(e.target.value)
                                    }
                                    onKeyUp={(e) => {
                                        if (
                                            e.key === "Enter" ||
                                            e.keyCode === 13
                                        ) {
                                            search_link.current.click();
                                        }
                                    }}
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
                            {/* Cart
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
                            </Link> */}

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
                                    <Link
                                        to="/"
                                        onClick={async () => {
                                            await logout();
                                            removeCookie("login");
                                        }}
                                    >
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
