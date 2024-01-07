import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Reckless Velvety Gerbil</title>
        <meta property="og:title" content="Reckless Velvety Gerbil" />
      </Helmet>
      <div className="home-info-payments">
        <img
          src="/external/svg34arrowleft21274-mmu.svg"
          alt="SVG34arrowleft21274"
          className="home-svg34arrowleft2"
        />
        <img
          src="/external/deviceprinter1274-eya.svg"
          alt="Deviceprinter1274"
          className="home-deviceprinter"
        />
        <span className="home-text">
          <span>Details</span>
        </span>
        <div className="home-group2">
          <div className="home-group1">
            <img
              src="/external/monochromecheckcircle1274-ky74.svg"
              alt="Monochromecheckcircle1274"
              className="home-monochromecheckcircle"
            />
          </div>
          <img
            src="/external/outlineinterfacecross1274-i39l.svg"
            alt="OutlineInterfaceCross1274"
            className="home-outline-interface-cross"
          />
          <img
            src="/external/outlineinterfacecross1274-p6t.svg"
            alt="OutlineInterfaceCross1274"
            className="home-outline-interface-cross1"
          />
          <img
            src="/external/shapesshape1274-wx8u.svg"
            alt="Shapesshape1274"
            className="home-shapesshape"
          />
          <img
            src="/external/shapesshape1274-o1pt.svg"
            alt="Shapesshape1274"
            className="home-shapesshape1"
          />
        </div>
        <span className="home-text02">
          <span>Payment successful</span>
        </span>
        <span className="home-text04">
          <span>123.456,89 $</span>
        </span>
        <span className="home-text06">
          <span>Complete</span>
        </span>
        <img
          src="/external/line11274-9y2t.svg"
          alt="Line11274"
          className="home-line1"
        />
        <img
          src="/external/line21274-ew2.svg"
          alt="Line21274"
          className="home-line2"
        />
        <span className="home-text08">
          <span>Created at :</span>
        </span>
        <span className="home-text10">
          <span>Name</span>
        </span>
        <span className="home-text12">
          <span>Method</span>
        </span>
        <span className="home-text14">
          <span>Amount</span>
        </span>
        <span className="home-text16">
          <span>Email</span>
        </span>
        <span className="home-text18">
          <span>xxxxxx</span>
        </span>
        <span className="home-text20">
          <span>09:50 am</span>
        </span>
        <span className="home-text22">
          <span>02-11-2021</span>
        </span>
        <span className="home-text24">
          <span>21000 Kg</span>
        </span>
        <span className="home-text26">
          <span>Banque Populaire</span>
        </span>
        <span className="home-text28">
          <span>31,500.00 Dhs</span>
        </span>
      </div>
    </div>
  )
}

export default Home
