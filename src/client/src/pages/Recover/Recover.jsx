import styles from "./Recover.module.css";
import { useState, useRef, useEffect } from "react";
import axios from "axios";

// Material UI
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TYPE_EMAIL = "email";
const TYPE_PHONE = "phone";

export default function Recover() {
    const [email, setEmail] = useState("");
    const [validEmail, setValidEmail] = useState(true);
    const [choice, setChoice] = useState(TYPE_EMAIL);
    const [disabled, setDisabled] = useState(false);
    const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    useEffect(() => {
        setValidEmail(true);
    }, []);

    function handleInput(e) {
        setEmail(e.target.value); 
        setValidEmail(EMAIL_REGEX.test(e.target.value));
    }

    function handleChangeRadio(e) {
        setChoice(e.target.value);
    }

    //123456@gmail.com
    function handleRecover() {
        if(email === ""){
            setValidEmail(false); 
            return
        }
        if(setValidEmail && choice === TYPE_EMAIL){
            axios
            .post("http://localhost:13123/auth/forgot-password", JSON.stringify({email}), {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => {   
                if(response.status === 200){
                    toast.success(response.data); 
                }
                setDisabled(true);
                setTimeout(() => {
                  setDisabled(false);
                }, 10 * 1000);

            })
            .catch((error) => {
                if (error.response && error.response.status === 404) {
                    toast.error(error.response.data);
                }
            });
        }
    }

    return (
        <div>
            <div className={styles.header}>
                <div className={styles.overlay}></div>
                <div className={styles.hero}>
                    <div className={styles.heroForm}>
                        <div
                            onSubmit={handleRecover}
                            method="post"
                            className={styles.form}
                        >
                            <h1 className={styles.heroHeading}>
                                Forgot Password
                            </h1>
                            <span className={styles.helpInput}></span>
                            <FormControl>
                                <FormLabel
                                    id="demo-radio-buttons-group-label"
                                    style={{ color: "#fff", fontSize: "16px", margin: "12px 0px"}}
                                >
                                    How would you like to reset your password?
                                </FormLabel>
                                <RadioGroup
                                    defaultValue={TYPE_EMAIL}
                                    name="radio-buttons-group"
                                    value={choice}
                                    onChange={handleChangeRadio}
                                >
                                    <FormControlLabel
                                        value={TYPE_EMAIL}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#fff",
                                                }}
                                            />
                                        }
                                        label="Email"
                                        style={{
                                            color: "#fff",
                                            fontSize: "14px",
                                        }}
                                    />
                                    <FormControlLabel
                                        color="default"
                                        value={TYPE_PHONE}
                                        control={
                                            <Radio
                                                sx={{
                                                    color: "#fff",
                                                }}
                                            />
                                        }
                                        label="Text Message (SMS)"
                                        style={{
                                            color: "#fff",
                                            fontSize: "14px",
                                            marginBottom: "12px",
                                        }}
                                    />
                                </RadioGroup>
                            </FormControl>
                            <p className={styles.helpText} style={{margin: 0, marginBottom: "20px"}}>
                                {choice === TYPE_EMAIL
                                    ? "We will send you an email with instructions on how to reset your password."
                                    : "We will text you a verification code to reset your password. Message and data rates may apply."}
                            </p>
                            <div className={styles.formDiv}>
                                <input
                                    className={
                                        styles.inputForm +
                                        (validEmail ? "" : " " + styles.errForm)
                                    }
                                    type="text"
                                    name="username"
                                    id="username"
                                    value={email}
                                    onChange={handleInput}
                                />
                                <p
                                    className={styles.errText}
                                    style={{
                                        display: validEmail ? "none" : "block",
                                    }}
                                >
                                    Please enter a valid email
                                </p>

                                <label
                                    className={
                                        styles.labelForm +
                                        " " +
                                        (email ? styles.texted : "")
                                    }
                                >
                                    {choice === TYPE_EMAIL
                                    ? "name@example.com."
                                    : "Phone number"}
                                    
                                </label>
                            </div>
                         
                            <button onClick={(e) => handleRecover(e)} className={styles.submitBtn} disabled={disabled} style={{backgroundColor: disabled ? "#b3b3b3" : "#0080ff"}}>
                                Email me
                            </button>
                        </div>
                    </div>
                    <ToastContainer />
                </div>
            </div>
        </div>
    );
}