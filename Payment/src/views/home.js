import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Raw Dimpled Cobra</title>
        <meta property="og:title" content="Raw Dimpled Cobra" />
      </Helmet>
      <div className="home-card">
        <img
          src="/external/rectangle51277-k9n9.svg"
          alt="Rectangle51277"
          className="home-rectangle5"
        />
        <div className="home-google-pay">
          <div className="home-logo">
            <img
              src="/external/vectori1277-4btq.svg"
              alt="VectorI1277"
              className="home-vector"
            />
            <img
              src="/external/vectori1277-6yan.svg"
              alt="VectorI1277"
              className="home-vector01"
            />
            <img
              src="/external/vectori1277-8ja.svg"
              alt="VectorI1277"
              className="home-vector02"
            />
            <img
              src="/external/vectori1277-js1r.svg"
              alt="VectorI1277"
              className="home-vector03"
            />
            <img
              src="/external/vectori1277-nhkt.svg"
              alt="VectorI1277"
              className="home-vector04"
            />
            <img
              src="/external/vectori1277-udyl.svg"
              alt="VectorI1277"
              className="home-vector05"
            />
            <img
              src="/external/vectori1277-tuuc.svg"
              alt="VectorI1277"
              className="home-vector06"
            />
          </div>
        </div>
        <div className="home-pay-pal">
          <span className="home-text">
            <span>Debit or credit card</span>
          </span>
          <div className="home-logo1"></div>
        </div>
        <div className="home-pay-pal1">
          <span className="home-text02">
            <span>Buy with</span>
          </span>
          <div className="home-logo2">
            <img
              src="/external/vectori1277-mk6g.svg"
              alt="VectorI1277"
              className="home-vector07"
            />
            <img
              src="/external/vectori1277-fa5o.svg"
              alt="VectorI1277"
              className="home-vector08"
            />
            <img
              src="/external/vectori1277-3ijh.svg"
              alt="VectorI1277"
              className="home-vector09"
            />
            <img
              src="/external/vectori1277-aq6g.svg"
              alt="VectorI1277"
              className="home-vector10"
            />
            <img
              src="/external/vectori1277-wdb.svg"
              alt="VectorI1277"
              className="home-vector11"
            />
            <img
              src="/external/vectori1277-m67n.svg"
              alt="VectorI1277"
              className="home-vector12"
            />
            <img
              src="/external/vectori1277-fur.svg"
              alt="VectorI1277"
              className="home-vector13"
            />
            <img
              src="/external/vectori1277-akj5.svg"
              alt="VectorI1277"
              className="home-vector14"
            />
            <img
              src="/external/vectori1277-ntel.svg"
              alt="VectorI1277"
              className="home-vector15"
            />
            <img
              src="/external/vectori1277-4v9.svg"
              alt="VectorI1277"
              className="home-vector16"
            />
          </div>
        </div>
        <div className="home-products">
          <span className="home-text04">
            <span className="home-text05">
              Total Payable
              <span
                dangerouslySetInnerHTML={{
                  __html: ' ',
                }}
              />
            </span>
            <span>: ₹ 399</span>
          </span>
          <span className="home-text07">
            <span>Your order summary</span>
          </span>
          <span className="home-text09">
            <span>dURATION</span>
          </span>
          <span className="home-text11">
            <span>pRICE</span>
          </span>
          <span className="home-text13">
            <span>DEVICE</span>
          </span>
          <span className="home-text15">
            <span>QUALITY</span>
          </span>
          <span className="home-text17">
            <span>rESOLUTION</span>
          </span>
          <span className="home-text19">
            <span>480p</span>
          </span>
          <span className="home-text21">
            <span>Good</span>
          </span>
          <span className="home-text23">
            <span>Phone, tablet</span>
          </span>
          <span className="home-text25">
            <span>70000</span>
          </span>
          <span className="home-text27">
            <span>1 month</span>
          </span>
          <span className="home-text29">
            <span>2 Items</span>
          </span>
        </div>
        <span className="home-text31">Confirm Payment</span>
      </div>
    </div>
  )
}

export default Home
