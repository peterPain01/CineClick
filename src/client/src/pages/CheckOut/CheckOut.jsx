import React, { useEffect, useState } from "react";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Alert, AlertTitle } from "@mui/material";
import styles from "./CheckOut.module.css";
import { useParams, useNavigate } from "react-router-dom";
import request from "../../modules/request";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../../components/Loading"; 

// Todo nhận và plan -> Fetch len server lay gia ve sau do thuc hien thanh toan
export function CheckOut() {
    const [is_paypal_loaded, setPaypalLoaded] = useState(false);
    const navigate = useNavigate();
    let { p_id } = useParams();
    const [plan, setPlan] = useState({});
    // fetch plan info
    useEffect(() => {
        request
            .get("/plan/info", { params: { p_id } })
            .then((res) => {
                console.log(res.data[0]);
                setPlan(res.data[0]);
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    const initialOptions = {
        "client-id": "test",
        "enable-funding": "card",
        "disable-funding": "paylater,venmo",
        "data-sdk-integration-source": "integrationbuilder_sc",
    };

    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(true)
    if (isLoading) {
        return <Loading/> 
    }
    return (
        <>
            <div className={styles.main}>
                <div className={styles.container}>
                    <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                            style={{
                                shape: "rect",
                                layout: "vertical",
                            }}
                            createOrder={async () => {
                                try {
                                    const response = await fetch(
                                        "http://localhost:13123/premium/orders",
                                        {
                                            method: "POST",
                                            credentials: "include",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                            body: JSON.stringify({
                                                cart: [
                                                    {
                                                        id: p_id,
                                                    },
                                                ],
                                            }),
                                        }
                                    );
                                    const orderData = await response.json();
                                    if (orderData.id) {
                                        return orderData.id;
                                    } else {
                                        const errorDetail =
                                            orderData?.details?.[0];
                                        const errorMessage = errorDetail
                                            ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                                            : JSON.stringify(orderData);

                                        throw new Error(errorMessage);
                                    }
                                } catch (error) {
                                    console.error(error);
                                    toast.error(
                                        `Could not initiate PayPal Checkout...${error}`
                                    );
                                }
                            }}
                            onApprove={async (data, actions) => {
                                try {
                                    const response = await fetch(
                                        `http://localhost:13123/premium/orders/${data.orderID}/capture`,
                                        {
                                            method: "POST",
                                            credentials: "include",
                                            headers: {
                                                "Content-Type":
                                                    "application/json",
                                            },
                                        }
                                    );

                                    const orderInfo = await actions.order.get();
                                    console.log("Order info", orderInfo);

                                    const orderData = await response.json();
                                    // Three cases to handle:
                                    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                    //   (2) Other non-recoverable errors -> Show a failure message
                                    //   (3) Successful transaction -> Show confirmation or thank you message

                                    const errorDetail = orderData?.details?.[0];

                                    if (
                                        errorDetail?.issue ===
                                        "INSTRUMENT_DECLINED"
                                    ) {
                                        // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()
                                        // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/
                                        return actions.restart();
                                    } else if (errorDetail) {
                                        // (2) Other non-recoverable errors -> Show a failure message
                                        throw new Error(
                                            `${errorDetail.description} (${orderData.debug_id})`
                                        );
                                    } else {
                                        // (3) Successful transaction -> Show confirmation or thank you message
                                        // Or go to another URL:  actions.redirect('thank_you.html');
                                        const transaction =
                                            orderData.purchase_units[0].payments
                                                .captures[0];
                                        toast.success(
                                            `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`
                                        );
                                        // redirect trang thong bao thanh cong sau 3s
                                        // window.setTimeout(() => {
                                        //     navigate('/')
                                        // }, 3000)
                                        console.log(
                                            "Capture result",
                                            orderData,
                                            JSON.stringify(orderData, null, 2)
                                        );
                                    }
                                } catch (error) {
                                    console.error(error);
                                    toast.error(
                                        `Sorry, your transaction could not be processed...${error}`
                                    );
                                }
                            }}
                            onCancel={async (data, actions) => {
                                toast.warning("Cancelled  Transaction");
                            }}
                            onInit={async (data, actions) => {
                                setPaypalLoaded(true);
                            }}
                        />
                    </PayPalScriptProvider>
                    <ToastContainer />
                </div>
            </div>
        </>
    );
}
