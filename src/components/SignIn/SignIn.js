import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../Contexts/UserContext"
import styled from "styled-components";
import Button from "../Buttons/Buttons";
import Input from "../Inputs/Input.js";

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const context = useContext(UserContext);
    localStorage.removeItem("token");
    localStorage.removeItem("img");

    function handleForm(e) {
        e.preventDefault();

        if (email === '') {
            alert('Enter your e-mail');
        } else if (password === '') {
            alert('Enter your password');
        } else {
            const body = {
                email,
                password
            }

            const post = axios.post(context.BASE_URL + '/signin', body);

            post.then((answer) => {
                localStorage.setItem("token", answer.data.token);
                localStorage.setItem("img", answer.data.img);
                navigate('/logged');
            });

            post.catch((error) => {
                alert('Erro! E-mail ou senha inválidos/inexistentes');
            });
        }
    }

    return (
        <Page>
            <SideBar>
                <h1>linkr</h1>
                <h2>save, share and discover<br />
                    the best links on the web</h2>
            </SideBar>

            <ContainerForm>
                <Form onSubmit={handleForm}>
                    <Input className="log" type="email" id="email" placeholder="E-mail" value={email} onChange={(e) => { setEmail(e.target.value) }} required></Input>
                    <Input className="log" type="password" id="password" placeholder="Password" value={password} onChange={(e) => { setPassword(e.target.value) }} required></Input>

                    <Button className="log">Log In</Button>
                    <Link to={'/signup'}><h1>First time? Create an account!</h1></Link>
                </Form>
            </ContainerForm>
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    margin-top: -80px;
    height: 100vh;
`;

const SideBar = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    //height: 1024px;
    background: #151515;
    box-shadow: 4px 0px 4px rgba(0, 0, 0, 0.25);

    h1 {
        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        margin: 200px 0px 0px 144px;
    }

    h2 {
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;
        margin-left: 144px;
    }
`;

const ContainerForm = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60%;

    h1 {
            font-family: 'Lato';
            font-style: normal;
            font-weight: 400;
            font-size: 20px;
            line-height: 24px;
            text-decoration-line: underline;
            color: #FFFFFF;
            margin-top: 14px;
        }
`;

const Form = styled.form`
    
`;