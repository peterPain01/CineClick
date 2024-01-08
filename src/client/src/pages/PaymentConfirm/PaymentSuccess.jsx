import React from "react";
import { useNavigate } from "react-router-dom";
import "./paymentS.css";
const Success = ({orderInfo}) => {
    const navigate = useNavigate()
    return (
        <div className="success-container">
            <div className="success-info-payments">
                <div className="success-action">
                    <img
                        src="/img/svg34arrowleft21274-mmu.svg"
                        alt="SVG34arrowleft21274"
                        className="success-svg34arrowleft2"
                        onClick={() =>  {navigate('/')}}
                        style={{cursor: "pointer"}}
                    />
                    <img
                        src="/img/deviceprinter1274-eya.svg"
                        alt="Deviceprinter1274"
                        className="success-deviceprinter"
                    />
                </div>
                <span className="success-text">
                    <span>Details</span>
                </span>
                <div className="success-group">
                    <div className="success-group-child">
                        <img
                            src="/img/monochromecheckcircle1274-ky74.svg"
                            alt="Monochromecheckcircle1274"
                            className="success-monochromecheckcircle"
                        />
                    </div>
                    <img
                        src="/img/outlineinterfacecross1274-i39l.svg"
                        alt="OutlineInterfaceCross1274"
                        className="success-outline-interface-cross"
                    />
                    <img
                        src="/img/outlineinterfacecross1274-p6t.svg"
                        alt="OutlineInterfaceCross1274"
                        className="success-outline-interface-cross1"
                    />
                    <img
                        src="/img/shapesshape1274-wx8u.svg"
                        alt="Shapesshape1274"
                        className="success-shapesshape"
                    />
                    <img
                        src="/img/shapesshape1274-o1pt.svg"
                        alt="Shapesshape1274"
                        className="success-shapesshape1"
                    />
                </div>
                <div className="success-info">
                    <span className="success-info-heading">
                        <span>Payment successful</span>
                    </span>
                    <span className="success-price">
                        <span>{orderInfo.purchase_units[0].amount.value} $</span>
                    </span>
                    <span className="success-status">
                        <span>Complete</span>
                    </span>
                    <img
                        src="/img/line11274-9y2t.svg"
                        alt="Line11274"
                        className="success-line1"
                    />
                    <div className="success-info-desc">
                        <span className="info-label">Created at:</span>
                        <span>{orderInfo.create_time}</span>
                        <span className="info-label">Name: </span>
                        <span>{orderInfo.payer.name.given_name + '' + orderInfo.payer.name.surname }</span>
                        <span className="info-label">Method:</span>
                        <span>Pay pal</span>
                        <span className="info-label">Email: </span>
                        <span>{orderInfo.payer.email_address}</span>
                        <span className="info-label">Transaction: </span>
                        <span>{orderInfo.id}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Success;
