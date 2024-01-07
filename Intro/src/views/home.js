import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Functional Heavy Goose</title>
        <meta property="og:title" content="Functional Heavy Goose" />
      </Helmet>
      <div className="home-login">
        <img src = "/external/bg.png" alt="image11254" className="home-image1" />
        <img
          src="/external/logo.png"
          alt="cineclickhighresolutionlogotransparent121254"
          className="home-cineclickhighresolutionlogotransparent12"
        />
        <button className="home-button">
          <img
            src="/external/icon1254-35wj.svg"
            alt="Icon1254"
            className="home-icon"
          />
          <span className="home-text">
            <span>Get Started</span>
          </span>
        </button>
        <button className="home-button1">
          <span className="home-text02">
            <span>Sign in</span>
          </span>
        </button>
        <div className="home-username">
          <span className="home-text04">
            <span>Email Address</span>
          </span>
        </div>
        <span className="home-text06">
          <span>Unlimited movies, TV shows, and more</span>
        </span>
        <span className="home-text08">
          <span>Enjoy on your TV</span>
        </span>
        <span className="home-text10">
          <span>Watch anywhere. Cancel anytime.</span>
        </span>
        <span className="home-text12">
          <span>
            <span>Watch on Smart TVs, Playstation, Xbox,</span>
            <br></br>
            <span>Chromecast, Apple TV, Blu-ray players, and more.</span>
          </span>
        </span>
        <span className="home-text17">
          <span>Watch everywhere</span>
        </span>
        <span className="home-text19">
          <span>
            <span>Stream unlimited movies and TV shows on your phone,</span>
            <br></br>
            <span> tablet, laptop, and TV.</span>
          </span>
        </span>
        <span className="home-text24">
          <span>
            Ready to watch? Enter your email to create or restart your
            membership.
          </span>
        </span>
        <img src alt="Rectangle5121258" className="home-rectangle512" />
        <img src alt="Rectangle5141258" className="home-rectangle514" />
        <img src alt="Rectangle5131258" className="home-rectangle513" />
        <div className="home-container1">
          <div className="home-sub-container">
            <span className="home-text26">
              <span>Home</span>
            </span>
            <div className="home-links-container">
              <span className="home-text28">
                <span>Categories</span>
              </span>
              <span className="home-text30">
                <span>Devices</span>
              </span>
              <span className="home-text32">
                <span>Pricing</span>
              </span>
              <span className="home-text34">
                <span>FAQ</span>
              </span>
            </div>
          </div>
          <div className="home-sub-container1">
            <span className="home-text36">
              <span>Movies</span>
            </span>
            <div className="home-links-container1">
              <span className="home-text38">
                <span>Gernes</span>
              </span>
              <span className="home-text40">
                <span>Trending</span>
              </span>
              <span className="home-text42">
                <span>New Release</span>
              </span>
              <span className="home-text44">
                <span>Popular</span>
              </span>
            </div>
          </div>
          <div className="home-sub-container2">
            <span className="home-text46">
              <span>Shows</span>
            </span>
            <div className="home-links-container2">
              <span className="home-text48">
                <span>Gernes</span>
              </span>
              <span className="home-text50">
                <span>Trending</span>
              </span>
              <span className="home-text52">
                <span>New Release</span>
              </span>
              <span className="home-text54">
                <span>Popular</span>
              </span>
            </div>
          </div>
          <div className="home-sub-container3">
            <span className="home-text56">
              <span>Support</span>
            </span>
            <span className="home-text58">
              <span>Contact Us</span>
            </span>
          </div>
          <div className="home-sub-container4">
            <span className="home-text60">
              <span>Subscription</span>
            </span>
            <div className="home-links-container3">
              <span className="home-text62">
                <span>Plans</span>
              </span>
              <span className="home-text64">
                <span>Features</span>
              </span>
            </div>
          </div>
          <div className="home-links-container4">
            <span className="home-text66">
              <span>Connect With Us</span>
            </span>
            <button className="home-buttons-container">
              <button className="home-button2">
                <img
                  src="/external/icon1258-oj1w.svg"
                  alt="Icon1258"
                  className="home-icon1"
                />
              </button>
              <button className="home-button3">
                <img
                  src="/external/icon1258-4a7g.svg"
                  alt="Icon1258"
                  className="home-icon2"
                />
              </button>
              <button className="home-button4">
                <img
                  src="/external/icon1258-oqx7.svg"
                  alt="Icon1258"
                  className="home-icon3"
                />
              </button>
            </button>
          </div>
        </div>
        <div className="home-container2">
          <img
            src="/external/line1258-21u.svg"
            alt="Line1258"
            className="home-line"
          />
          <div className="home-container3">
            <span className="home-text68">
              <span>@2023 trituenhantao, All Rights Reserved</span>
            </span>
            <button className="home-buttons-container1">
              <span className="home-text70">
                <span>Terms of Use</span>
              </span>
              <img
                src="/external/line1258-7njo.svg"
                alt="Line1258"
                className="home-line1"
              />
              <span className="home-text72">
                <span>Privacy Policy</span>
              </span>
              <img
                src="/external/line1258-w7uo.svg"
                alt="Line1258"
                className="home-line2"
              />
              <span className="home-text74">
                <span>Cookie Policy</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
