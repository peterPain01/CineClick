import styles from "./Register.module.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

function Register() {
    const [account, setAccount] = useState({
        username: "",
        password: "",
        Cpassword: "",
    });
    const [validUserName, setValidUserName] = useState(false);
    const [validPwd, setValidPwd] = useState(false);
    const [validCPwd, setValidCPwd] = useState(false);
    const [focusConfirmPwd, isFocusConfirmPws] = useState(false); 

    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const PHONE_REGEGX = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    useEffect(() => {
        setValidUserName(EMAIL_REGEX.test(account.username));
    }, [account.username]);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(account.password));
    }, [account.password]);

    useEffect(() => {
        setValidCPwd(focusConfirmPwd ? (account.password === account.Cpassword) : true);
    }, [account.password, account.Cpassword]);
    // Ignore user have not input
    useEffect(() => {
        setValidUserName(true);
    }, []);

    useEffect(() => {
        setValidPwd(true);
    }, []);

    useEffect(() => {
        setValidCPwd(true);
    }, []);
    
    const logInForm = useRef(null);
    
    function handleConfirmPwdFocus(){ 
        isFocusConfirmPws(true) 
    }
    function handleInput(event) {
        setAccount({ ...account, [event.target.name]: event.target.value });
    }

    // Sign in with system account
    function handleRegister(event) {
        event.preventDefault();
        if (account.password === account.Cpassword) {
            let data = JSON.stringify(account);
            axios
                .post("http://10.123.0.217:13123/auth/register", data, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                })
                .then((response) => console.log(response))
                .catch((err) => console.log(err));
        }
    }

    // Validate Form Function

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.overlay}></div>
                <div className={styles.hero}>
                    <div className={styles.heroForm}>
                        <form
                            onSubmit={handleRegister}
                            ref={logInForm}
                            method="post"
                            className={styles.form}
                        >
                            <h1 className={styles.heroHeading}>Register</h1>

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
                                    required
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
                                    Email or phone number
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
                                    required
                                    autoComplete="on"
                                />
                                <p
                                    className={styles.errText}
                                    style={{
                                        display: validPwd
                                            ? "none"
                                            : "block",
                                    }}
                                >
                                    Minimum 8 characters, at least 1
                                    letter and 1 number
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
                            <div className={styles.formDiv}>
                                <input
                                    className={styles.inputForm}
                                    type="password"
                                    name="Cpassword"
                                    id="Cpassword"
                                    value={account.Cpassword}
                                    onChange={handleInput}
                                    required
                                    autoComplete="on"
                                    onFocus={handleConfirmPwdFocus}
                                />
                                  <p
                                    className={styles.errText}
                                    style={{
                                        display: validCPwd
                                            ? "none"
                                            : "block",
                                    }}
                                >
                                    Must match the password before
                                </p>
                                <label
                                    className={
                                        styles.labelForm +
                                        " " +
                                        (account.Cpassword ? styles.texted : "")
                                    }
                                >
                                    Confirm Password
                                </label>
                            </div>
                            <button className={styles.submitBtn}>
                                Register
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
