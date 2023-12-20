import styles from "./Auth.module.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import {useCookies} from "react-cookie";

export function Auth() {
    const [cookies, setCookie, removeCookie] = useCookies(['login']);

    const [account, setAccount] = useState({ username: "", password: "" });

    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const PHONE_REGEGX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    useEffect(() => {
        setValidUserName(EMAIL_REGEX.test(account.username));
    }, [account.username]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(account.password));
    }, [account.password]);

    // Ignore user have not input
    useEffect(() => {
        setValidUserName(true);
    }, []);

    useEffect(() => {
        setValidPwd(true);
    }, []);

    const [validUserName, setValidUserName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);

    const logInForm = useRef(null);

    function handleInput(event) {
        setAccount({ ...account, [event.target.name]: event.target.value });
    }

    function createPopupWin(pageURL, popupWinWidth, popupWinHeight) {
        let top = (screen.height - popupWinHeight) / 4;
        let left = (screen.width - popupWinWidth) / 2;
        let myWindow = window.open(
            pageURL,
            "_self",
            "resizable=yes, width=" +
                popupWinWidth +
                ", height=" +
                popupWinHeight +
                ", top=" +
                top +
                ", left=" +
                left
        );
    }
    // Sign in with Google
    function handleSignINGoogle(event) {
        event.preventDefault();
        const googleLoginURL = "http://localhost:13123/auth/google";
        createPopupWin(googleLoginURL, 500, 600);

        // axios
        //     .get("http://localhost:8000/auth/google", { account })
        //     .then((response) => console.log(response))
        //     .catch((err) => console.log(err));
    }

    // Sign in with system account
    function handleSignIn(event) {
        event.preventDefault();
        if (validUserName && validPwd) {
            const data = new FormData(event.target);
            const value = Object.fromEntries(data);
            axios
                .post("http://localhost:13123/auth/login", JSON.stringify(value), {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    if (response.status == 200) {
                        setCookie("login", true, {
                            maxAge: response.data.age || undefined,
                        });
                        window.open(document.location, "_self");
                    }
                })
                .catch((err) => {
                    removeCookie("login");
                    alert(err.response.data);
                });
        }
        if (!validUserName || account.username === '') 
            setValidUserName(false)
        if(!validPwd || account.password === '')
            setValidPwd(false)
    }

    // Validate Form Function

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.overlay}></div>
                <div className={styles.hero}>
                    <div className={styles.heroForm}>
                        <form
                            onSubmit={handleSignIn}
                            ref={logInForm}
                            method="post"
                            className={styles.form}
                        >
                            <h1 className={styles.heroHeading}>Sign In</h1>
                            <div className={styles.formDiv}>
                                <input
                                    className={
                                        styles.inputForm +
                                        (validUserName
                                            ? ""
                                            : " " + styles.errForm)
                                    }
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={account.username}
                                    onChange={handleInput}
                                />
                                <p
                                    className={styles.errText}
                                    style={{
                                        display: validUserName
                                            ? "none"
                                            : "block",
                                    }}
                                >
                                    Please enter a valid email
                                </p>
                                <label
                                    className={
                                        styles.labelForm +
                                        " " +
                                        (account.username ? styles.texted : "")
                                    }
                                >
                                    Email or username
                                </label>
                            </div>
                            <div className={styles.formDiv}>
                                <input
                                    className={
                                        styles.inputForm +
                                        (validPwd ? "" : " " + styles.errForm)
                                    }
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={account.password}
                                    onChange={handleInput}
                                />
                                <p
                                    className={styles.errText}
                                    style={{
                                        display: validPwd ? "none" : "block",
                                    }}
                                >
                                    Minimum 8 characters, at least 1 letter and
                                    1 number
                                </p>
                                <label
                                    className={
                                        styles.labelForm +
                                        " " +
                                        (account.password ? styles.texted : "")
                                    }
                                >
                                    Password
                                </label>
                            </div>
                            <button className={styles.submitBtn}>
                                Sign in
                            </button>

                            <button
                                className={styles.googleBtn}
                                onClick={handleSignINGoogle}
                            >
                                <i>
                                    <img
                                        src="./img/icons8-google.svg"
                                        alt=""
                                        className={styles.googleIcon}
                                    />
                                </i>
                                Sign in with Gmail
                            </button>
                            <div className={styles.helpAction}>
                                <div className={styles.remember}>
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                    />{" "}
                                    <label
                                        htmlFor=""
                                        className={styles.rememberText}
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className={styles.action}>
                                    <a href="/" className={styles.actionText}>
                                        Need help?
                                    </a>
                                </div>
                            </div>
                        </form>
                        <div className={styles.helpDesc}>
                            <div className={styles.signup}>
                                <p>New to Netflix?</p>
                                <a
                                    href="/register"
                                    className={styles.signUpTag}
                                >
                                    Sign up now
                                </a>
                            </div>
                            <div className={styles.captcha}>
                                <p>
                                    This page is protected by Google reCAPTCHA
                                    to ensure you&apos;re not a bot{" "}
                                    <a href="/" className={styles.captchaText}>
                                        Learn more.
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


