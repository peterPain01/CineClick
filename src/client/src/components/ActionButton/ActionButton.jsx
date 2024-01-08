import styles from "./ActionButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function ActionButton({
    icon = null,
    desc = "",
    handleCloseState,
    handleOpenState,
    type = "rect",
    bgc = "transparent",
    color = "#000",
    text = "",
    paddingTopBot = "10px",
    paddingLeftRight = "8px",
    minWidth = "40px",
    gap = "0px",
    border = '1px solid #bebebe',
    marginLeft = '0px',
    click_event = () => {},
}) {
    const typeStyles = {
        rect: "6px",
        circle: "50%",
    };
    function handleClick() {
        click_event();
        if (handleCloseState) handleCloseState(false);
        if (handleOpenState) handleOpenState(true);
    }

    const styleButton = {
        borderRadius: typeStyles[type],
        backgroundColor: bgc,
        color,
        minWidth,
        padding: `${paddingTopBot} ${paddingLeftRight}`,
        gap,
        border, 
        marginLeft, 
    };
    return (
        <>
            <div className={styles.action}>
                <button
                    style={styleButton}
                    onClick={handleClick}
                    className={styles.button}
                >
                    {icon && <i className={styles.iconButton}>{icon}</i>}
                    {text && <span className={styles.textButton}>{text}</span>}
                </button>
                {desc ? (
                    <div className={styles.desc}>
                        <span>{desc}</span>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </>
    );
}

export default ActionButton;
