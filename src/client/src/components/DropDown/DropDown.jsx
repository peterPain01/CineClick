import styles from "./DropDown.module.css";
import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp } from "@fortawesome/free-solid-svg-icons";

function DropDown({ title = "", minWidth = "140px", contentList = [] }) {
    const [showChoice, isShowChoice] = useState(false);
    const [selectedChoice, setSelectedChoice] = useState(title);

    const dropDownStyles = {
        minWidth: minWidth,
    };
    const choiceDropDown = useRef(null);

    function showChoiceBox() {
        isShowChoice(!showChoice);
        if (showChoice) choiceDropDown.current.style.display = "flex";
        else choiceDropDown.current.style.display = "none";
    }

    function handleSelectedChoice(e) {
        setSelectedChoice(e.target.innerHTML);
    }
    return (
        <div
            style={dropDownStyles}
            className={styles.choiceDropdown}
            onClick={showChoiceBox}
        >
            <span>{selectedChoice}</span>
            <i>
                <FontAwesomeIcon
                    icon={faCaretUp}
                    rotation={180}
                    style={{ color: "#ffffff" }}
                />
            </i>
            <div className={styles.dropDownContent} ref={choiceDropDown}>
                {contentList
                    ? contentList.map((content, index) => {
                          return (
                              <a
                                  onClick={(e) => handleSelectedChoice(e)}
                                  key={index}
                                  className={styles.contentItem}
                              >
                                  {content}
                              </a>
                          );
                      })
                    : ""}
            </div>
        </div>
    );
}

export default DropDown;
