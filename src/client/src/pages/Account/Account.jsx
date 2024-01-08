import styles from "./Account.module.css";
import { Link } from "react-router-dom";

import Footer from "../../components/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCalendarDays,
    faCircleInfo,
    faLock,
} from "@fortawesome/free-solid-svg-icons";

import { useEffect, useState } from "react";
import request from "../../modules/request.js";
import Loading from "../../components/Loading";

export function Account() {
    const [userInfo, setUserInfo] = useState({
        email: "",
        type: "",
    });
    const [isLoading, setIsLoading] = useState(true);

    const [expired_day, set_expired_day] = useState("");
    useEffect(() => {
        // lay ve email va type
        request.get(request.baseURL + "viewer/profile", (res) => {
            setUserInfo((userInfo) => ({ ...userInfo, ...res.data }));
            setIsLoading(false);
        });

        // TODO 1: Lay ngay het han
        if (userInfo.type === "free-viewer") {
            set_expired_day("");
        } else {
            // get expired day from server
        }
    }, []);

    function handleChangePassword() {}

    function handleChangeEmail() {}

    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            <div className={styles.centeredDiv}>
                <div className={styles.accountBox}>
                    <div className={styles.accountHeader}>
                        <h1>Account</h1>
                        <span className={styles.expiredDate}>
                            <i>
                                <FontAwesomeIcon
                                    icon={faCalendarDays}
                                    style={{ color: "#ff0000" }}
                                    size="lg"
                                />
                            </i>
                            {/* hard data */}
                            Member Since November 2023
                        </span>
                    </div>
                    <div className={styles.accountNotify}>
                        <div className={styles.notifyItem}>
                            <i className={styles.notifyIcon}>
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    style={{ color: "#000000" }}
                                    size="2xl"
                                />
                            </i>
                            {/* Hard data */}
                            <p className={styles.notifyDesc}>
                                Your membership has been canceled. Your last day
                                to watch Netflix is 12/16/23. To continue
                                watching,
                                <span className={styles.notifyDescSignUp}>
                                    sign up for your own plan.
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className={styles.accountNotify}>
                        <div className={styles.notifyItem}>
                            <i className={styles.notifyIcon}>
                                <FontAwesomeIcon
                                    icon={faCircleInfo}
                                    style={{ color: "#000000" }}
                                    size="2xl"
                                />
                            </i>
                            {/* Hard data */}
                            <p className={styles.notifyDesc}>
                                Your membership will be canceled at the end of
                                your current billing period.
                            </p>
                        </div>
                    </div>
                    <div className={styles.accountRecovery}>
                        <div className={styles.notifyItem}>
                            <p className={styles.notifyDesc}>
                                Your membership will be canceled at the end of
                                your current billing period.
                            </p>
                            <i className={styles.notifyIcon}>
                                <FontAwesomeIcon
                                    icon={faLock}
                                    style={{ color: "#000000" }}
                                />
                            </i>
                        </div>
                    </div>
                    <div className={styles.accountContent}>
                        <div className={styles.accountInformation}>
                            <header>
                                <h2 className={styles.accountInfoHeading}>
                                    membership & billing
                                </h2>
                            </header>
                            <div className={styles.accountInfoContent}>
                                {/* hard Code */}
                                <span>{userInfo.email}</span>
                                <span>Password: ********</span>
                                <span>Phone Number: 0772538679</span>
                            </div>
                            <div className={styles.accountInfoAction}>
                                <span className={styles.accountInfoActionText}>
                                    Change Email
                                </span>
                                <span className={styles.accountInfoActionText}>
                                    Change Password
                                </span>
                                {/* Hard code */}
                                <span className={styles.accountInfoActionText}>
                                    Add PhoneNumber
                                </span>
                            </div>
                        </div>
                        <div className={styles.accountPlan}>
                            <header>
                                <h2 className={styles.accountInfoHeading}>
                                    plan detail
                                </h2>
                            </header>
                            <div className={styles.accountInfoContent}>
                                {/* hard Code */}
                                <span>
                                    Your Account Type is{" "}
                                    <strong>{userInfo.type}</strong>
                                </span>
                            </div>
                            <div className={styles.accountInfoAction}>
                                <span className={styles.accountInfoActionText}>
                                    <Link to={"/UpgradePlan"}>
                                        Upgrade Plan
                                    </Link>
                                </span>
                            </div>
                        </div>
                        <div className={styles.accountPolicy}>
                            <header>
                                <h2 className={styles.accountInfoHeading}>
                                    SECURITY & PRIVACY
                                </h2>
                            </header>
                            <div className={styles.accountInfoContent}>
                                {/* hard Code */}
                                <span>
                                    Control access to this account, view the
                                    most recently active devices and more.
                                </span>
                            </div>
                            <div className={styles.accountInfoAction}>
                                <span className={styles.accountInfoActionText}>
                                    Manage access and devices
                                </span>
                                <span className={styles.accountInfoActionText}>
                                    Sign out of all devices
                                </span>
                                {/* Hard code */}
                                <span className={styles.accountInfoActionText}>
                                    Download your personal information
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer backGroundColor={"#fff"} />
        </>
    );
}
