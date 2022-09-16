import React from "react";
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <>
            <h1>Page Not Found</h1>
            <Link to="/">Go back</Link>
        </>
    );
}

export default NotFound;