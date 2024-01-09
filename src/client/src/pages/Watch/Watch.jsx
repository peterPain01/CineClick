import { Link, useParams } from "react-router-dom";
import styles from "./Watch.module.css";
import { useEffect, useRef, useState } from "react";
import request from "../../modules/request";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeftLong, faStar } from "@fortawesome/free-solid-svg-icons";
import Loading from "../../components/Loading";

const play = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon-nfplayerPause ltr-4z3qvp e1svuwfo1" data-name="Pause" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M4.5 3C4.22386 3 4 3.22386 4 3.5V20.5C4 20.7761 4.22386 21 4.5 21H9.5C9.77614 21 10 20.7761 10 20.5V3.5C10 3.22386 9.77614 3 9.5 3H4.5ZM14.5 3C14.2239 3 14 3.22386 14 3.5V20.5C14 20.7761 14.2239 21 14.5 21H19.5C19.7761 21 20 20.7761 20 20.5V3.5C20 3.22386 19.7761 3 19.5 3H14.5Z" fill="#fff"></path></svg>`;
const pause = `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="svg-icon-nfplayerPlay ltr-4z3qvp e1svuwfo1" data-name="Play" aria-hidden="true"> <path d="M5 2.69127C5 1.93067 5.81547 1.44851 6.48192 1.81506L23.4069 11.1238C24.0977 11.5037 24.0977 12.4963 23.4069 12.8762L6.48192 22.1849C5.81546 22.5515 5 22.0693 5 21.3087V2.69127Z" fill="#fff" ></path></svg>`;
const sound = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
</svg>`;
const mute = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clip-rule="evenodd" />
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
</svg>`;

const speed =
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none"  stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="ltr-4z3qvp e1svuwfo1" data-name="InternetSpeed" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.0569 6.27006C15.1546 2.20629 8.84535 2.20629 4.94312 6.27006C1.01896 10.3567 1.01896 16.9985 4.94312 21.0852L3.50053 22.4704C-1.16684 17.6098 -1.16684 9.7454 3.50053 4.88481C8.18984 0.0013696 15.8102 0.0013696 20.4995 4.88481C25.1668 9.7454 25.1668 17.6098 20.4995 22.4704L19.0569 21.0852C22.981 16.9985 22.981 10.3567 19.0569 6.27006ZM15 14.0001C15 15.6569 13.6569 17.0001 12 17.0001C10.3431 17.0001 9 15.6569 9 14.0001C9 12.3432 10.3431 11.0001 12 11.0001C12.4632 11.0001 12.9018 11.105 13.2934 11.2924L16.2929 8.29296L17.7071 9.70717L14.7076 12.7067C14.895 13.0983 15 13.5369 15 14.0001Z" fill="#fff"  stroke="#fff"></path></svg>';
const backwardIcon =
    '<svg  width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" class="ltr-4z3qvp e1svuwfo1" data-name="Back10" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M11.0198 2.04817C13.3222 1.8214 15.6321 2.39998 17.5557 3.68532C19.4794 4.97066 20.8978 6.88324 21.5694 9.09717C22.241 11.3111 22.1242 13.6894 21.2388 15.8269C20.3534 17.9643 18.7543 19.7286 16.714 20.8192C14.6736 21.9098 12.3182 22.2592 10.0491 21.8079C7.77999 21.3565 5.73759 20.1323 4.26989 18.3439C2.80219 16.5555 2 14.3136 2 12L0 12C-2.74181e-06 14.7763 0.962627 17.4666 2.72387 19.6127C4.48511 21.7588 6.93599 23.2278 9.65891 23.7694C12.3818 24.3111 15.2083 23.8918 17.6568 22.5831C20.1052 21.2744 22.0241 19.1572 23.0866 16.5922C24.149 14.0273 24.2892 11.1733 23.4833 8.51661C22.6774 5.85989 20.9752 3.56479 18.6668 2.02238C16.3585 0.479973 13.5867 -0.214321 10.8238 0.0578004C8.71195 0.265799 6.70517 1.02858 5 2.2532V1H3V5C3 5.55228 3.44772 6 4 6H8V4H5.99999C7.45608 2.90793 9.19066 2.22833 11.0198 2.04817ZM2 4V7H5V9H1C0.447715 9 0 8.55228 0 8V4H2ZM14.125 16C13.5466 16 13.0389 15.8586 12.6018 15.5758C12.1713 15.2865 11.8385 14.8815 11.6031 14.3609C11.3677 13.8338 11.25 13.2135 11.25 12.5C11.25 11.7929 11.3677 11.1758 11.6031 10.6488C11.8385 10.1217 12.1713 9.71671 12.6018 9.43388C13.0389 9.14463 13.5466 9 14.125 9C14.7034 9 15.2077 9.14463 15.6382 9.43388C16.0753 9.71671 16.4116 10.1217 16.6469 10.6488C16.8823 11.1758 17 11.7929 17 12.5C17 13.2135 16.8823 13.8338 16.6469 14.3609C16.4116 14.8815 16.0753 15.2865 15.6382 15.5758C15.2077 15.8586 14.7034 16 14.125 16ZM14.125 14.6501C14.5151 14.6501 14.8211 14.4637 15.043 14.0909C15.2649 13.7117 15.3759 13.1814 15.3759 12.5C15.3759 11.8186 15.2649 11.2916 15.043 10.9187C14.8211 10.5395 14.5151 10.3499 14.125 10.3499C13.7349 10.3499 13.4289 10.5395 13.207 10.9187C12.9851 11.2916 12.8741 11.8186 12.8741 12.5C12.8741 13.1814 12.9851 13.7117 13.207 14.0909C13.4289 14.4637 13.7349 14.6501 14.125 14.6501ZM8.60395 15.8554V10.7163L7 11.1405V9.81956L10.1978 9.01928V15.8554H8.60395Z" fill="#fff" stroke="#fff"></path></svg>';
const forwardIcon =
    '<svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="ltr-4z3qvp e1svuwfo1" data-name="Forward10" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M6.4443 3.68532C8.36795 2.39998 10.6778 1.8214 12.9802 2.04817C14.8093 2.22833 16.5439 2.90793 18 4H16V6H20C20.5523 6 21 5.55229 21 5V1H19V2.2532C17.2948 1.02859 15.2881 0.2658 13.1762 0.057802C10.4133 -0.214319 7.64154 0.479975 5.33316 2.02238C3.02478 3.56479 1.32262 5.85989 0.516718 8.51661C-0.289188 11.1733 -0.148981 14.0273 0.913451 16.5922C1.97588 19.1572 3.8948 21.2744 6.34325 22.5831C8.79169 23.8918 11.6182 24.3111 14.3411 23.7694C17.064 23.2278 19.5149 21.7588 21.2761 19.6127C23.0374 17.4666 24 14.7763 24 12L22 12C22 14.3136 21.1978 16.5555 19.7301 18.3439C18.2624 20.1323 16.22 21.3565 13.9509 21.8079C11.6818 22.2592 9.32641 21.9098 7.28604 20.8192C5.24567 19.7286 3.64657 17.9643 2.76121 15.8269C1.87585 13.6894 1.75901 11.3111 2.4306 9.09718C3.10219 6.88324 4.52065 4.97067 6.4443 3.68532ZM22 4V7H19V9H23C23.5523 9 24 8.55229 24 8V4H22ZM12.6018 15.5758C13.0389 15.8586 13.5466 16 14.125 16C14.7034 16 15.2078 15.8586 15.6382 15.5758C16.0753 15.2865 16.4116 14.8815 16.6469 14.3609C16.8823 13.8338 17 13.2135 17 12.5C17 11.7929 16.8823 11.1759 16.6469 10.6488C16.4116 10.1217 16.0753 9.71671 15.6382 9.43389C15.2078 9.14463 14.7034 9 14.125 9C13.5466 9 13.0389 9.14463 12.6018 9.43389C12.1713 9.71671 11.8385 10.1217 11.6031 10.6488C11.3677 11.1759 11.25 11.7929 11.25 12.5C11.25 13.2135 11.3677 13.8338 11.6031 14.3609C11.8385 14.8815 12.1713 15.2865 12.6018 15.5758ZM15.043 14.0909C14.8211 14.4637 14.5151 14.6501 14.125 14.6501C13.7349 14.6501 13.429 14.4637 13.207 14.0909C12.9851 13.7117 12.8741 13.1814 12.8741 12.5C12.8741 11.8186 12.9851 11.2916 13.207 10.9187C13.429 10.5395 13.7349 10.3499 14.125 10.3499C14.5151 10.3499 14.8211 10.5395 15.043 10.9187C15.2649 11.2916 15.3759 11.8186 15.3759 12.5C15.3759 13.1814 15.2649 13.7117 15.043 14.0909ZM8.60395 10.7163V15.8554H10.1978V9.01929L7 9.81956V11.1405L8.60395 10.7163Z" fill="#fff" stroke="#fff"></path></svg>';

// TODO Active playBackRate

export default function Watch() {
    const navigate = useNavigate()
    //TODO Use movie id get from url that to fetch video from server
    const { id, name: movieName } = useParams();
    const [activeRate, setActiveRate] = useState("1.0");
    const [isFullScreen, setFullScreen] = useState(false);
    const [showControl, setShowControl] = useState(true);
    const controlTimeout = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    let playButton = useRef(null);
    let video = useRef(null);
    let timeline = useRef(null);
    let soundButton = useRef(null);
    let fullscreenButton = useRef(null);
    let videoContainer = useRef(null);
    let controlContainer = useRef(null);
    let speedButton = useRef(null);
    let forward = useRef(null);
    let backward = useRef(null);

    const [can_watch, set_can_watch] = useState(false);
    useEffect(() => {
        if (playButton.current) playButton.current.innerHTML = play;
        if (soundButton.current)
            soundButton.current.innerHTML = video.current.muted ? mute : sound;
        if (speedButton.current) speedButton.current.innerHTML = speed;
        if (backward.current) backward.current.innerHTML = backwardIcon;
        if (forward.current) forward.current.innerHTML = forwardIcon;
    }, [showControl, can_watch]);

    useEffect(() => {
        // Call API here /watch/idMovie
        request.get(`viewer/can-watch?mv_id=${id}`, (res) => {
            window.setTimeout(() => {
                setIsLoading(false)
                set_can_watch(res.data);
            }, 500);
        });
    }, []);

    useEffect(() => {
        if (!can_watch) return;
        var hls = new Hls({
            xhrSetup: function (xhr, url) {
                xhr.withCredentials = true; // do send cookies
            },
        });
        try {
            hls.loadSource(
                `http://localhost:13123/viewer/watch/${id}/part.m3u8`
            );
            hls.on(Hls.Events.ERROR, function (event, data) {
                var errorType = data.type;
                var errorDetails = data.details;
                var errorFatal = data.fatal;
                switch (errorType) {
                    case Hls.ErrorTypes.NETWORK_ERROR:
                        if (data?.response?.code === 401) {
                            const [cookies, setCookie, removeCookie] =
                                useCookies(["login"]);
                            removeCookie("login");
                            window.open("/login", "_self");
                        }
                        break;
                    default:
                        console.log(errorType);
                        break;
                }
            });
            hls.attachMedia(video.current);
            hls.on(Hls.Events.MANIFEST_PARSED, function () {
                video.current.play();
                handleClickSoundButton();
            });
        } catch (err) {
            console.log(err);
        }
    }, [can_watch, video.current, isLoading]);

    function handlePlayBtn() {
        if (video.current.paused) {
            video.current.play();
            videoContainer.current.classList.add("playing");
            controlContainer.current.style.opacity = 0;
            playButton.current.innerHTML = play;
        } else {
            video.current.pause();
            videoContainer.current.classList.remove("playing");
            controlContainer.current.style.opacity = 1;
            playButton.current.innerHTML = pause;
        }
    }

    function handleVideoMouseMove() {
        if (isFullScreen) {
            if (controlTimeout.current !== null) {
                clearTimeout(controlTimeout.current);
            }
            setShowControl(true);
            controlTimeout.current = setTimeout(() => {
                setShowControl(false);
                controlTimeout.current = null;
            }, 2000);
        }
    }

    function handleVidEnded() {
        playButton.current.innerHTML = play;
    }
    function handleTimeUpdate() {
        if (!timeline.current) return;
        const percentagePosition =
            (100 * video.current.currentTime) / video.current.duration;
        timeline.current.style.backgroundSize = `${percentagePosition}% 100%`;
        timeline.current.value = percentagePosition;
    }

    function handleChangeTimeLine() {
        const time = (timeline.current.value * video.current.duration) / 100;
        video.current.currentTime = time;
    }

    function handleClickSoundButton() {
        video.current.muted = !video.current.muted;
        soundButton.current.innerHTML = video.current.muted ? mute : sound;
    }

    function handleClickFullScreen() {
        if (!isFullScreen) {
            if (videoContainer.current.requestFullscreen) {
                videoContainer.current.requestFullscreen();
            } else if (videoContainer.current.webkitRequestFullscreen) {
                /* Safari */
                videoContainer.current.webkitRequestFullscreen();
            } else if (videoContainer.current.msRequestFullscreen) {
                /* IE11 */
                videoContainer.current.msRequestFullscreen();
            }
            video.current.style.width = "100%";
            setShowControl(false);
            setFullScreen(true);
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                /* Safari */
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                /* IE11 */
                document.msExitFullscreen();
            }
            video.current.style.width = "100%";
            setShowControl(true);
            setFullScreen(false);
        }
    }

    function handleBackward() {
        video.current.currentTime = video.current.currentTime - 10;
    }

    function handleForward() {
        video.current.currentTime = video.current.currentTime + 10;
    }

    function handlePlayBackRate(e) {
        if (e.currentTarget.id) {
            video.current.playbackRate = e.currentTarget.id;
            setActiveRate(e.currentTarget.id);
        } else {
            console.log("err", e.currentTarget.id);
        }
    }

    function handleBacktoHomePage(){
        navigate('/')
    }
    if (isLoading) {
        return <Loading />;
    }
    return (
        <>
            {can_watch ? (
                <div
                    onMouseEnter={() => {
                        if (controlContainer.current)
                            controlContainer.current.style.opacity = 1;
                    }}
                    className={styles.videoPlayer}
                    ref={videoContainer}
                >
                    {!isFullScreen || showControl ? (
                        <span
                            style={{
                                position: "absolute",
                                bottom: "10px",
                                fontSize: "20px",
                                left: "50%",
                                transform: "translateX(-50%)",
                                color: "#f00",
                            }}
                        >
                            {movieName}
                        </span>
                    ) : null}
                     {!isFullScreen || showControl ? (
                    <div className={styles.headControl}>
                        <FontAwesomeIcon icon={faArrowLeftLong} size="2xl" className={styles.headControl_back} onClick={handleBacktoHomePage}/>
                        <FontAwesomeIcon icon={faStar} size="2xl" className={styles.headControl_flag}/>
                    </div>
                      ) : null}
                    <video
                        style={
                            isFullScreen && !showControl
                                ? { cursor: "none" }
                                : {}
                        }
                        onMouseMove={handleVideoMouseMove}
                        onTimeUpdate={handleTimeUpdate}
                        ref={video}
                        src="/testing.mp4"
                        className={styles.video}
                        muted
                        onEnded={handleVidEnded}
                    ></video>
                    {!isFullScreen || showControl ? (
                        <div className={styles.controls} ref={controlContainer}>
                            <button
                                ref={playButton}
                                onClick={() => handlePlayBtn()}
                                className={
                                    styles.playButton +
                                    " " +
                                    styles.controlButton
                                }
                            ></button>
                            <button
                                className={
                                    styles.controlButton +
                                    " " +
                                    styles.backwardButton
                                }
                                ref={backward}
                                onClick={handleBackward}
                            >
                                Backward
                            </button>
                            <button
                                className={
                                    styles.controlButton +
                                    " " +
                                    styles.forwardButton
                                }
                                ref={forward}
                                onClick={handleForward}
                            >
                                Forward
                            </button>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                ref={timeline}
                                style={{ cursor: "pointer" }}
                                className={styles.timeline}
                                value={"0"}
                                onChange={handleChangeTimeLine}
                            />
                            <div className={styles.speedContainer}>
                                <div className={styles.speedOption}>
                                    <div
                                        className={
                                            styles.OptionItem +
                                            (activeRate === "0.25"
                                                ? " " + styles.OptionItemActive
                                                : "")
                                        }
                                        onClick={(e) => handlePlayBackRate(e)}
                                        id="0.25"
                                    >
                                        <span>0.25x</span>
                                        <button></button>
                                    </div>
                                    <div
                                        className={
                                            styles.OptionItem +
                                            (activeRate === "0.5"
                                                ? " " + styles.OptionItemActive
                                                : "")
                                        }
                                        id="0.5"
                                        onClick={(e) => handlePlayBackRate(e)}
                                    >
                                        <span>0.5x</span>
                                        <button></button>
                                    </div>
                                    <div
                                        className={
                                            styles.OptionItem +
                                            (activeRate === "1.0"
                                                ? " " + styles.OptionItemActive
                                                : "")
                                        }
                                        id="1.0"
                                        onClick={(e) => handlePlayBackRate(e)}
                                    >
                                        <span>1x</span>
                                        <button></button>
                                    </div>
                                    <div
                                        className={
                                            styles.OptionItem +
                                            (activeRate === "1.25"
                                                ? " " + styles.OptionItemActive
                                                : "")
                                        }
                                        id="1.25"
                                        onClick={(e) => handlePlayBackRate(e)}
                                    >
                                        <span>1.25x</span>
                                        <button></button>
                                    </div>
                                    <div
                                        className={
                                            styles.OptionItem +
                                            (activeRate === "1.5"
                                                ? " " + styles.OptionItemActive
                                                : "")
                                        }
                                        id="1.5"
                                        onClick={(e) => handlePlayBackRate(e)}
                                    >
                                        <span>1.5x</span>
                                        <button></button>
                                    </div>
                                    <div
                                        className={
                                            styles.OptionItem +
                                            (activeRate === "1.75"
                                                ? " " + styles.OptionItemActive
                                                : "")
                                        }
                                        id="1.75"
                                        onClick={(e) => handlePlayBackRate(e)}
                                    >
                                        <span>1.75x</span>
                                        <button></button>
                                    </div>
                                </div>
                                <button
                                    className={
                                        styles.controlButton +
                                        " " +
                                        styles.speedButton
                                    }
                                    ref={speedButton}
                                ></button>
                            </div>
                            <button
                                ref={soundButton}
                                onClick={handleClickSoundButton}
                                className={
                                    styles.soundButton +
                                    " " +
                                    styles.controlButton
                                }
                            ></button>
                            <button
                                ref={fullscreenButton}
                                onClick={handleClickFullScreen}
                                className={
                                    styles.controlButton +
                                    " " +
                                    styles.fullscreenButton
                                }
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                    />
                                </svg>
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : (
                <div className={styles.upgrade_box}>
                    <h1 style={{ marginBottom: "50px" }}>
                        To watch this movie, please upgrade to premium
                    </h1>
                    <Link
                        style={{ color: "white", textDecoration: "underline" }}
                        to="/UpgradePlan"
                    >
                        Go to upgrade
                    </Link>
                </div>
            )}
        </>
    );
}
