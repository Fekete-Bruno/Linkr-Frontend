import * as React from "react";
import { Navigate } from "react-router-dom";
import Header from "../components/Header/Header";

function renderError() {
    localStorage.clear("token");
    return <Navigate to="/" />;
}

export default function PrivatePage({ children }) {

    const auth = JSON.parse(localStorage.getItem("token"));

    if (!auth) {
        return renderError();
    }

    return (
        <>
            <Header />
            <>
                {children}
            </>
        </>
    );
    
};