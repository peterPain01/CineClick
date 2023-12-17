import { useState } from "react";
import styles from "./Watch.module.css";

function watch() {
    const [videoSrc, setVideoSrc] = useState("/img/trailer.mp4");
    return (
        <div>
            <video className={styles.video} src={videoSrc} controls></video>
        </div>
    );
}

export default watch;
