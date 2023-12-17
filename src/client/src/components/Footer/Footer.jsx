import styles from "./Footer.module.css";


function Footer({backGroundColor = '#000'}) {
    return (
        <>
            <div className={styles.footer} style={{backgroundColor: backGroundColor}}>
                <div className={styles.footerContent}>
                    <div className={styles.footerHelper}>
                        <a href="/" className={styles.footerHelperText}>
                            Question? Contact us.
                        </a>
                    </div>
                    <div className={styles.footerColumns}>
                        <div className={styles.column}>
                            <a href="">FAQ</a>
                            <a href="">Cookie Preferences</a>
                        </div>
                        <div className={styles.column}>
                            <a href="">Help Center</a>
                            <a href="">Corporate Information</a>
                        </div>
                        <div className={styles.column}>
                            <a href="">Terms of Use</a>
                        </div>
                        <div  className={styles.column}>
                            <a href="">Privacy</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Footer;
