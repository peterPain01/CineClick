import styles from "./UpgradePlan.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate   } from "react-router-dom";
import { CheckOut } from "../CheckOut/CheckOut";
import request from "../../modules/request";
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../../components/Loading";

export function UpgradePlan() {
    const navigate = useNavigate();
    const [selectPlan, setSelectPlan] = useState("");
    const [plans, setPlans] = useState([]);
    const table = useRef(null);
    const selectStyle = {
        color: "#e50914",
    };
    useEffect(() => {
        request
            .get("/plan")
            .then((res) => {
                setPlans(res.data); 
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        const list = document.querySelectorAll("div > label");
        const tdList = document.querySelectorAll("td");
        tdList.forEach((td, index) => {
            if (td.classList.contains(selectPlan)) {
                td.style.color = "#e50914";
            } else {
                td.style.color = "#737373";
            }
        });
        list.forEach((item) => {
            if (item.id === selectPlan) {
                item.style.opacity = "1";
                item.lastChild.style.display = "inline-block";
            } else {
                item.style.opacity = "0.6";
                item.lastChild.style.display = "none";
            }
        });
    });
    
    function handleSelectedPlan(e) {
        e.preventDefault();
        setSelectPlan(e.target.id);
    }

    const [planPrice, setPlanPrice] = useState(0);
    const [loadPrice, setLoadPrice] = useState(false);
    const [isLoading, setIsLoading] = useState(true)
   
    if (isLoading) {
        return <Loading/>
    }
    // POST PLAN 
    function handleSubmitPlan() {
        if(selectPlan){
            navigate(`/checkout/${selectPlan}`)    
        }
        toast.warning('You must select plan before checkout')
    }

    return (
        <>
            {planPrice ? (
                <CheckOut price={planPrice} plan={selectPlan} />
            ) : (
                <div className={styles.centered}>
                    <div className={styles.paymentContent}>
                        <div className={styles.stepHeaderContainer}>
                            <div className={styles.stepHeader}>
                                <span className={styles.stepIndicator}>
                                    step 1 of 2
                                </span>
                                <h2 className={styles.stepTitle}>
                                    Choose the plan that&apos; right for you
                                </h2>
                            </div>
                            <div>
                                <ul>
                                    <li className={styles.checkMarkItem}>
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ color: "#e50914" }}
                                            size="lg"
                                        />
                                        <span
                                            className={styles.checkMarkItemText}
                                        >
                                            Watch all you want. Ad-free.
                                        </span>
                                    </li>
                                    <li className={styles.checkMarkItem}>
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ color: "#e50914" }}
                                            size="lg"
                                        />
                                        <span
                                            className={styles.checkMarkItemText}
                                        >
                                            Recommendations just for you.
                                        </span>
                                    </li>
                                    <li className={styles.checkMarkItem}>
                                        <FontAwesomeIcon
                                            icon={faCheck}
                                            style={{ color: "#e50914" }}
                                            size="lg"
                                        />
                                        <span
                                            className={styles.checkMarkItemText}
                                        >
                                            Change or cancel your plan anytime.
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.paymentHeader}>
                            {plans.map((plan) => {
                                return (
                                    <>
                                        <label
                                            className={styles.label}
                                            onClick={(e) =>
                                                handleSelectedPlan(e)
                                            }
                                            key={plan.plan_id}
                                            id={plan.plan_id}
                                        >
                                            <input type="radio" />
                                            <span className={styles.planOption}>
                                                {plan.name}
                                            </span>
                                            <span
                                                className={styles.labelAfter}
                                            ></span>
                                        </label>
                                    </>
                                );
                            })}
                        </div>
                        <table ref={table} className={styles.tablePlan}>
                            <tbody>
                                <tr className={styles.tableRow}>
                                    <th className={styles.tableHeader}>
                                        Price
                                    </th>
                                    {plans.map((plan) => {
                                        return (
                                            <>
                                                <td
                                                    className={styles.tableData+ " " + plan.plan_id}
                                                    key={plan.name}
                                                >
                                                    {plan.price}$
                                                </td>
                                            </>
                                        );
                                    })}
                                </tr>
                                <tr className={styles.tableRow}>
                                    <th className={styles.tableHeader}>
                                        Video quality
                                    </th>
                                    {plans.map((plan) => {
                                        return (
                                            <>
                                                <td
                                                    className={styles.tableData+ " " + plan.plan_id}
                                                    key={plan.name}
                                                >
                                                    {plan.videoquality}
                                                </td>
                                            </>
                                        );
                                    })}
                                </tr>
                                <tr className={styles.tableRow}>
                                    <th className={styles.tableHeader}>
                                        Resolution
                                    </th>
                                    {plans.map((plan) => {
                                        return (
                                            <>
                                                <td
                                                    className={styles.tableData+ " " + plan.plan_id}
                                                key={plan.name}
                                                >
                                                    {plan.resolution}
                                                </td>
                                            </>
                                        );
                                    })}
                                </tr>
                                <tr className={styles.tableRow}>
                                    <th className={styles.tableHeader}>
                                        Devices you can use to watch
                                    </th>

                                    {/* Mobile */}
                                    <td className={styles.tableData}>
                                        <div>
                                            <img
                                                src="img/phone.svg"
                                                alt="Phone Icon"
                                            />
                                            <div>Phone</div>
                                        </div>
                                        <div>
                                            <img src="/img/tablet.svg" alt="" />
                                            <div>Tablet</div>
                                        </div>
                                    </td>
                                    {/* Basic */}
                                    <td className={styles.tableData}>
                                        <div>
                                            <img
                                                src="img/phone.svg"
                                                alt="Phone Icon"
                                            />
                                            <div>Phone</div>
                                        </div>
                                        <div>
                                            <img src="/img/tablet.svg" alt="" />
                                            <div>Tablet</div>
                                        </div>
                                        <div>
                                            <img
                                                src="img/computer.svg"
                                                alt=""
                                            />
                                            <div>Computer</div>
                                        </div>
                                        <div>
                                            <img src="/img/tv.svg" alt="" />
                                            <div>TV</div>
                                        </div>
                                    </td>
                                    {/* Standard */}

                                    <td className={styles.tableData}>
                                        <div>
                                            <img
                                                src="img/phone.svg"
                                                alt="Phone Icon"
                                            />
                                            <div>Phone</div>
                                        </div>
                                        <div>
                                            <img src="/img/tablet.svg" alt="" />
                                            <div>Tablet</div>
                                        </div>
                                        <div>
                                            <img
                                                src="img/computer.svg"
                                                alt=""
                                            />
                                            <div>Computer</div>
                                        </div>
                                        <div>
                                            <img src="/img/tv.svg" alt="" />
                                            <div>TV</div>
                                        </div>
                                    </td>
                                    {/* Premium */}
                                    <td className={styles.tableData}>
                                        <div>
                                            <img
                                                src="img/phone.svg"
                                                alt="Phone Icon"
                                            />
                                            <div>Phone</div>
                                        </div>
                                        <div>
                                            <img src="/img/tablet.svg" alt="" />
                                            <div>Tablet</div>
                                        </div>
                                        <div>
                                            <img
                                                src="img/computer.svg"
                                                alt=""
                                            />
                                            <div>Computer</div>
                                        </div>
                                        <div>
                                            <img src="/img/tv.svg" alt="" />
                                            <div>TV</div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        {/* Information */}
                        <div>
                            <p className={styles.informationText}>
                                HD (720p), Full HD (1080p), Ultra HD (4K) and
                                HDR availability subject to your internet
                                service and device capabilities. Not all content
                                is available in all resolutions. See our{" "}
                                <span>Terms of Use</span> for more details. Only
                                people who live with you may use your account.
                                Watch on 4 different devices at the same time
                                with Premium, 2 with Standard, and 1 with Basic
                                and Mobile.
                            </p>
                        </div>
                        <div className={styles.submitButtonBox}>
                            <button
                                style={{
                                    backgroundColor: loadPrice
                                        ? "#bebebe"
                                        : "#e50914",
                                    cursor: loadPrice ? "none" : "pointer",
                                }}
                                className={styles.submitButton}
                                onClick={handleSubmitPlan}
                            >
                                Buy now
                            </button>
                        </div>
                    </div>
                <ToastContainer theme="dark"/>
                </div>
            )}
        </>
    );
}
