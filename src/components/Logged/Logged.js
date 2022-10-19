import styled from "styled-components";
import Header from "../Header/Header";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Logged() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token || token === null) {
            navigate('/');
        }
    }, []);


    return (
        <Page>
            <Header />
        </Page>
    );
}

const Page = styled.div``;