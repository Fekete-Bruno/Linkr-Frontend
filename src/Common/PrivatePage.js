import * as React from "react";
import { Navigate } from "react-router-dom";

function renderError() {
    localStorage.clear("linkr");
    return <Navigate to="/" />;
}

export default function PrivatePage({ children }) {

    const auth = JSON.parse(localStorage.getItem("linkr"));

    if (!auth) {
        return renderError();
    }

    return (
        <>
            {children}
        </>
    );
    
};