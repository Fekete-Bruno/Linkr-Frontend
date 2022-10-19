import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useState, useContext } from "react";
import UserContext from "../../Contexts/UserContext";
import styled from "styled-components";
import Button from "../Buttons/Buttons";
import Input from "../Inputs/Input.js";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [img, setImg] = useState(null);
    const context = useContext(UserContext);
    const navigate = useNavigate();

    function handleForm(e) {
        e.preventDefault();

        if (email === '') {
            alert('E-mail cannot be empty');
        } else if (password === '') {
            alert('Password cannot be empty');
        } else if (name === '') {
            alert('Username cannot be empty');
        } else {
            const object = {
                email,
                password,
                name,
                img
            }
            console.log(object);
            console.log(context.BASE_URL);

            const post = axios.post(context.BASE_URL + '/signup', object);

            post.then((answer) => {
                alert('Conta criada com sucesso!');
                navigate('/');
            });

            post.catch((error) => {
                console.log(error);
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

                    <Button className="log">Sign Up</Button>
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