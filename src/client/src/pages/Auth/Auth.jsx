import styles from "./Auth.module.css";
import { useState, useRef } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

function Auth() {
    const { setAuth } = useAuth();

    const [account, setAccount] = useState({ username: "", password: "" });

    const logInForm = useRef(null);

    function handleInput(event) {
        setAccount({ ...account, [event.target.name]: event.target.value });
    }

    function createPopupWin(pageURL, popupWinWidth, popupWinHeight) {
        let left = (screen.width - popupWinWidth) / 2
        let top = (screen.height - popupWinHeight) / 4
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
        const googleLoginURL = "http://localhost:8000/auth/google";
        createPopupWin(googleLoginURL, 500, 600);

        // axios
        //     .get("http://localhost:8000/auth/google", { account })
        //     .then((response) => console.log(response))
        //     .catch((err) => console.log(err));
    }

    // Sign in with system account
    function handleSignIn(event) {
        event.preventDefault();
        axios
            .post("http://localhost:8000/auth/login", { account })
            .then((response) => console.log(response))
            .catch((err) => console.log(err));
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
                                    className={styles.inputForm}
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={account.username}
                                    onChange={handleInput}
                                />
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
                                    className={styles.inputForm}
                                    type="password"
                                    name="password"
                                    id="password"
                                    value={account.password}
                                    onChange={handleInput}
                                />
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

export default Auth;
