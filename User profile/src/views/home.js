import React from 'react'

import { Helmet } from 'react-helmet'

import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Cute Shoddy Lark</title>
        <meta property="og:title" content="Cute Shoddy Lark" />
      </Helmet>
      <div className="home-support-page-desktop">
        <div className="home-footer">
          <div className="home-container01">
            <div className="home-sub-container">
              <span className="home-text">
                <span>Home</span>
              </span>
              <div className="home-links-container">
                <span className="home-text002">
                  <span>Categories</span>
                </span>
                <span className="home-text004">
                  <span>Devices</span>
                </span>
                <span className="home-text006">
                  <span>Pricing</span>
                </span>
                <span className="home-text008">
                  <span>FAQ</span>
                </span>
              </div>
            </div>
            <div className="home-sub-container1">
              <span className="home-text010">
                <span>Movies</span>
              </span>
              <div className="home-links-container1">
                <span className="home-text012">
                  <span>Gernes</span>
                </span>
                <span className="home-text014">
                  <span>Trending</span>
                </span>
                <span className="home-text016">
                  <span>New Release</span>
                </span>
                <span className="home-text018">
                  <span>Popular</span>
                </span>
              </div>
            </div>
            <div className="home-sub-container2">
              <span className="home-text020">
                <span>Shows</span>
              </span>
              <div className="home-links-container2">
                <span className="home-text022">
                  <span>Gernes</span>
                </span>
                <span className="home-text024">
                  <span>Trending</span>
                </span>
                <span className="home-text026">
                  <span>New Release</span>
                </span>
                <span className="home-text028">
                  <span>Popular</span>
                </span>
              </div>
            </div>
            <div className="home-sub-container3">
              <span className="home-text030">
                <span>Support</span>
              </span>
              <span className="home-text032">
                <span>Contact Us</span>
              </span>
            </div>
            <div className="home-sub-container4">
              <span className="home-text034">
                <span>Subscription</span>
              </span>
              <div className="home-links-container3">
                <span className="home-text036">
                  <span>Plans</span>
                </span>
                <span className="home-text038">
                  <span>Features</span>
                </span>
              </div>
            </div>
            <div className="home-links-container4">
              <span className="home-text040">
                <span>Connect With Us</span>
              </span>
              <button className="home-buttons-container">
                <button className="home-button">
                  <img
                    src="/external/icon1162-4iq.svg"
                    alt="Icon1162"
                    className="home-icon"
                  />
                </button>
                <button className="home-button1">
                  <img
                    src="/external/icon1162-lkac.svg"
                    alt="Icon1162"
                    className="home-icon1"
                  />
                </button>
                <button className="home-button2">
                  <img
                    src="/external/icon1162-pdn8.svg"
                    alt="Icon1162"
                    className="home-icon2"
                  />
                </button>
              </button>
            </div>
          </div>
          <div className="home-container02">
            <img
              src="/external/line1162-swtf.svg"
              alt="Line1162"
              className="home-line"
            />
            <div className="home-container03">
              <span className="home-text042">
                <span>@2023 trituenhantao, All Rights Reserved</span>
              </span>
              <button className="home-buttons-container1">
                <span className="home-text044">
                  <span>Terms of Use</span>
                </span>
                <img
                  src="/external/line1162-bbvy.svg"
                  alt="Line1162"
                  className="home-line1"
                />
                <span className="home-text046">
                  <span>Privacy Policy</span>
                </span>
                <img
                  src="/external/line1162-c7in.svg"
                  alt="Line1162"
                  className="home-line2"
                />
                <span className="home-text048">
                  <span>Cookie Policy</span>
                </span>
              </button>
            </div>
          </div>
        </div>
        <div className="home-navbar">
          <div className="home-logo">
            <img
              src = "/external/logo.png"
              alt="cineclickhighresolutionlogotransparent111209"
              className="home-cineclickhighresolutionlogotransparent11"
            />
          </div>
          <button className="home-buttons-container2">
            <img
              src="/external/icon1209-eurg.svg"
              alt="Icon1209"
              className="home-icon3"
            />
            <img
              src="/external/icon1209-fc1s.svg"
              alt="Icon1209"
              className="home-icon4"
            />
          </button>
          <button className="home-buttons-container3">
            <button className="home-button3">
              <span className="home-text050">
                <span>Home</span>
              </span>
            </button>
            <span className="home-text052">
              <span>Movies &amp; Shows</span>
            </span>
            <button className="home-button4">
              <span className="home-text054">
                <span>User</span>
              </span>
            </button>
            <span className="home-text056">
              <span>Subscriptions</span>
            </span>
          </button>
        </div>
        <div className="home-frame14">
          <div className="home-container04">
            <div className="home-text-container">
              <span className="home-text058">
                <span>User Profile</span>
              </span>
            </div>
            <button className="home-button5">
              <span className="home-text060">
                <span>Change</span>
              </span>
            </button>
          </div>
          <div className="home-container05">
            <div className="home-sub-container5">
              <div className="home-text-container01">
                <span className="home-text062">
                  <span>
                    Hello tuongpross
                    <span
                      dangerouslySetInnerHTML={{
                        __html: ' ',
                      }}
                    />
                  </span>
                </span>
              </div>
              <img src = "/external/bg.png" alt="Image1162" className="home-image" />
            </div>
            <div className="home-form">
              <div className="home-container06">
                <span className="home-text064">
                  <span>Full name</span>
                </span>
                <input
                  type="text"
                  placeholder="Trần Thái Toàn"
                  className="home-input-field"
                />
              </div>
              <div className="home-container07">
                <span className="home-text066">
                  <span>Birthdate</span>
                </span>
                <input
                  type="text"
                  placeholder="01/01/2003"
                  className="home-input-field1"
                />
              </div>
              <div className="home-items-container">
                <div className="home-container08">
                  <span className="home-text068">
                    <span>Phone Number</span>
                  </span>
                  <div className="home-input-feild">
                    <div className="home-container09">
                      <img src = "/external/bg.png" alt="Image1163" className="home-image1" />
                      <img
                        src="/external/icon1163-itu.svg"
                        alt="Icon1163"
                        className="home-icon5"
                      />
                    </div>
                    <div className="home-container10">
                      <span className="home-text070">
                        <span>0981986673</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="home-container11">
                <span className="home-text072">
                  <span>Email</span>
                </span>
                <input
                  type="text"
                  placeholder="tcgphat21@clc.fitus.edu.vn"
                  className="home-input-field2"
                />
              </div>
            </div>
          </div>
          <div className="home-settings">
            <div className="home-container12">
              <div className="home-text-container02">
                <span className="home-text074">
                  <span>Settings</span>
                </span>
              </div>
            </div>
            <div className="home-container13">
              <div className="home-items-container1">
                <div className="home-faq-item">
                  <div className="home-text-container03">
                    <span className="home-text076">
                      <span>01</span>
                    </span>
                  </div>
                  <span className="home-text078">
                    <span>Privacy settings</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-8na.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright"
                  />
                </div>
                <img
                  src="/external/line1162-k9du.svg"
                  alt="Line1162"
                  className="home-line3"
                />
                <div className="home-faq-item1">
                  <div className="home-text-container04">
                    <span className="home-text080">
                      <span>02</span>
                    </span>
                  </div>
                  <span className="home-text082">
                    <span>Language</span>
                  </span>
                  <div className="home-icon6">
                    <img
                      src="/external/heroiconssolidarrowlongright1213-7drp.svg"
                      alt="heroiconssolidarrowlongright1213"
                      className="home-heroiconssolidarrowlongright1"
                    />
                  </div>
                </div>
                <img
                  src="/external/line1162-3gn6.svg"
                  alt="Line1162"
                  className="home-line4"
                />
                <div className="home-faq-item2">
                  <div className="home-text-container05">
                    <span className="home-text084">
                      <span>03</span>
                    </span>
                  </div>
                  <span className="home-text086">
                    <span>Playback Settings</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-zhqk.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright2"
                  />
                </div>
                <img
                  src="/external/line1162-htja.svg"
                  alt="Line1162"
                  className="home-line5"
                />
                <div className="home-faq-item3">
                  <div className="home-text-container06">
                    <span className="home-text088">
                      <span>04</span>
                    </span>
                  </div>
                  <span className="home-text090">
                    <span>Notification Settings</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-zmp.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright3"
                  />
                </div>
              </div>
              <div className="home-items-container2">
                <div className="home-faq-item4">
                  <div className="home-text-container07">
                    <span className="home-text092">
                      <span>05</span>
                    </span>
                  </div>
                  <span className="home-text094">
                    <span>Content Management</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-hk2m.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright4"
                  />
                </div>
                <img
                  src="/external/line1162-w74i.svg"
                  alt="Line1162"
                  className="home-line6"
                />
                <div className="home-faq-item5">
                  <div className="home-text-container08">
                    <span className="home-text096">
                      <span>06</span>
                    </span>
                  </div>
                  <span className="home-text098">
                    <span>Payment Method</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-3wmk.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright5"
                  />
                </div>
                <img
                  src="/external/line1162-3uei.svg"
                  alt="Line1162"
                  className="home-line7"
                />
                <div className="home-faq-item6">
                  <div className="home-text-container09">
                    <span className="home-text100">
                      <span>07</span>
                    </span>
                  </div>
                  <span className="home-text102">
                    <span>Personalization Preferences</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-faiu.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright6"
                  />
                </div>
                <img
                  src="/external/line1162-5sgd.svg"
                  alt="Line1162"
                  className="home-line8"
                />
                <div className="home-faq-item7">
                  <div className="home-text-container10">
                    <span className="home-text104">
                      <span>08</span>
                    </span>
                  </div>
                  <span className="home-text106">
                    <span>Help &amp; Support</span>
                  </span>
                  <img
                    src="/external/heroiconssolidarrowlongright1213-qvw5v.svg"
                    alt="heroiconssolidarrowlongright1213"
                    className="home-heroiconssolidarrowlongright7"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
