import React, { useEffect, useState } from "react";
import "./MessageBox.css";
import PropTypes from "prop-types";

const MessageBox = ({ resetTrigger , mode = 'good', content= "There is no message", timer = false, duration = 10000}) => {
    const validModes = ["good", "info", "error", 'warning'];
    mode = validModes.includes(mode) ? mode : "good";

    const [isVisible, setIsVisible] = useState(true);
    useEffect(() => {
        let timeout;
        if (timer) {
               timeout = setTimeout(() => {
                setIsVisible(false);
            }, duration);
        }
        return () => {
            if(timeout){
                clearTimeout(timeout)
            }
        };
    }, [resetTrigger, timer, duration]);

    return <>
                {isVisible && (
                    <div 
                        className={`message-box ${mode}`}
                        role = "alert"
                        aria-live = "assertive"
                        aria-atomic = "true"
                        >
                            {content}
                    </div>
                )}
            </>
};

MessageBox.propTypes = {
    resetTrigger: PropTypes.any.isRequired,
    mode: PropTypes.oneOf(["good", "info", "error", 'warning']),
    content: PropTypes.string,
    timer: PropTypes.bool,
    duration: PropTypes.number
};

export default MessageBox;
