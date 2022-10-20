import styled from "styled-components";
import { useNavigate } from "react-router-dom";

export default function PageNotFound () {

    const navigate = useNavigate();

    return (
        <ErrorBox>
            <h1>404</h1>
            <p>Linkr not found </p>
            <a onClick={() => navigate("/logged")}>
                click here to go to a real Linkr
            </a>
        </ErrorBox>
    )
};

const ErrorBox = styled.div`
    height: 80vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    font-family: 'Oswald';
    font-style: normal;
    color: #FFFFFF;

    h1{
        font-weight: 700;
        font-size: 20em;
    }

    p{
        font-weight: 400;
        font-size: 4em;
        line-height: 1.5em;
    }

    a {
        font-size: 1.5em;
        font-family: 'Lato';
        font-style: normal;
        text-decoration: underline;
        cursor: pointer;
        opacity: .7;

        :hover {
            opacity: 1;
        }

        :active {
            transform: scale(0.98);
            box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
        }
    }

`