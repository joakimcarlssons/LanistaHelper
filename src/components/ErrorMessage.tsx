import React, { useEffect } from "react";

const ErrorMessage = ({ message, display, errorId }) => {
    useEffect(() => {
        let obj = document.getElementById(errorId);
        if (obj) obj.innerHTML = message;
    }, [message])

    return <p className={display ? "ErrorMessage" : "hide ErrorMessage"} id={errorId}>
        {message}
    </p>
}

export default ErrorMessage;