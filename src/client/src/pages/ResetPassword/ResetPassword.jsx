import styles from "./ResetPassword.module.css";
import { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function ResetPassword() {
    const [pwd, setPwd] = useState({ pwd: "", Cpwd: "" });
    let { email, token } = useParams();
    email = decodeURIComponent(email)
    token = decodeURIComponent(token)
  
    const [validPwd, setValidPwd] = useState(true);
    const [validCPwd, setValidCPwd] = useState(true);
    const navigate = useNavigate();
    const PWD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
       

    function handleResetPassword() {
        if (setPwd && setValidCPwd) {
            axios
                .post(
                    "http://localhost:13123/auth/reset-password",
                    JSON.stringify({ email,token, password: pwd.pwd }),
                    {
                        withCredentials: true,
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((res) => {
                    if(res.status === 200){
                        toast.success(res.data)
                        setTimeout(() => {
                            navigate('/login');
                        }, 3000);
                    }
                })
                .catch((error) => {
                    if (error.response && error.response.status === 404) {
                        toast.error(error.response.data);
                    }
                    if (error.response && error.response.status === 400) {
                        toast.error(error.response.data);
                    }
                });
        }
    }
    function handleInput(event) {
        setPwd({ ...pwd, [event.target.name]: event.target.value });
        if (event.target.name == "pwd")
            setValidPwd(PWD_REGEX.test(event.target.value));
        else if (event.target.name == "Cpwd")
            setValidCPwd(pwd.pwd === event.target.value);
    }

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.overlay}></div>
                <div className={styles.hero}>
                    <div className={styles.heroForm}>
                        <div
                            onSubmit={handleResetPassword}
                            method="post"
                            className={styles.form}
                        >
                            <h1 className={styles.heroHeading}>
                                Reset Password
                            </h1>
                            <span className={styles.helpInput}></span>

                            <div className={styles.formDiv}>
                                <input
                                    className={
                                        styles.inputForm +
                                        (validPwd ? "" : " " + styles.errForm)
                                    }
                                    type="password"
                                    name="pwd"
                                    id="pwd"
                                    value={pwd.pwd}
                                    onChange={handleInput}
                                />
                                <p
                                    className={styles.errText}
                                    style={{
                                        display: validPwd ? "none" : "block",
                                    }}
                                >
                                    Minimum 8 characters, at least 1 letter and
                                    1 number <br />
                                    (No special characters)
                                </p>
                                <label
                                    className={
                                        styles.labelForm +
                                        " " +
                                        (pwd.pwd ? styles.texted : "")
                                    }
                                >
                                    New Password
                                </label>
                            </div>
                            <div className={styles.formDiv}>
                                <input
                                    className={
                                        styles.inputForm +
                                        (validPwd ? "" : " " + styles.errForm)
                                    }
                                    type="password"
                                    name="Cpwd"
                                    id="Cpwd"
                                    value={pwd.Cpwd}
                                    onChange={handleInput}
                                />
                                <p
                                    className={styles.errText}
                                    style={{
                                        display: validCPwd ? "none" : "block",
                                    }}
                                >
                                    {" "}
                                    Must match the password before
                                </p>
                                <label
                                    className={
                                        styles.labelForm +
                                        " " +
                                        (pwd.Cpwd ? styles.texted : "")
                                    }
                                >
                                    Confirm New Password
                                </label>
                            </div>
                            <button
                                onClick={(e) => handleResetPassword(e)}
                                className={styles.submitBtn}
                            >
                                Change now
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}

export default ResetPassword;
