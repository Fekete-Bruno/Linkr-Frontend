import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Inputs/Input.js";
import UserAuthorization from "../../Common/userAuthorization.js";
import { ThreeCircles } from "react-loader-spinner";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState(null);
    const [disabled, setDisabled] = useState(false);
    const navigate = useNavigate();

    UserAuthorization('/timeline');

    function handleForm(e) {
        e.preventDefault();

        setDisabled(true);

        if (email === '') {
            alert('E-mail cannot be empty');
            setDisabled(false);
        } else if (password === '') {
            alert('Password cannot be empty');
            setDisabled(false);
        } else if (name === '') {
            alert('Username cannot be empty');
            setDisabled(false);
        } else {
            const object = {
                email,
                password,
                name,
                img
            }

            const post = axios.post(process.env.REACT_APP_API_BASE_URL + '/signup', object);

            post.then((answer) => {
                alert('Conta criada com sucesso!');
                navigate('/');
            });

            post.catch((error) => {
                console.log(error);
                setDisabled(false);
                if (error.response.data === 'This e-mail already exists') {
                    alert('This e-mail already exists');
                } else {
                    alert('All fields must be filled correctly');
                }
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
                    <Input className="log" type="text" id="username" placeholder="Username" value={name} onChange={(e) => { setName(e.target.value) }} required></Input>
                    <Input className="log" type="text" id="img" placeholder="Picture url" value={img} onChange={(e) => { setImg(e.target.value) }}></Input>

                    <button className="log" disabled={disabled}>{disabled?<ThreeCircles color="white" height={50}/>:'Sign Up'}</button>
                    <Link to={'/'}><h1>Switch back to log in</h1></Link>
                </Form>
            </ContainerForm>
        </Page>
    );
}

const Page = styled.div`
    display: flex;
    margin-top: -80px;
    height: 100vh;

    @media (max-width: 600px) {
        flex-direction: column;
        align-items: center;
        width: 100%;
        //margin-left: -50px;
    }
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

    @media (max-width: 600px) {
        justify-content: center;
        align-items: center;
        height: 200px;
        width: 100%;

        h1 {
            font-size: 76px;
            margin: 0px;
            line-height: 100%;
            letter-spacing: 0.0em;
        }

        h2 {
            font-size: 23px;
            margin: 0px;
            line-height: 120%;
            letter-spacing: 0.0em;
        }
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
    
    @media (max-width: 600px) {
        margin-top: 24px;
    }
`;

const Form = styled.form`
    button {
        width: 429px;
        height: 65px;
        left: 956px;
        top: 473px;
        background: #1877F2;
        border-radius: 6px;
        border: none;

        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 27px;
        line-height: 40px;
        color: #FFFFFF;
        //color: ${props => props.disabled ? `#000000` : `#FFFFFF`}

        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }
`;