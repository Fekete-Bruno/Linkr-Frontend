import axios from "axios";
import { useNavigate, Link, json } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";
import Input from "../Inputs/Input.js";
import UserAuthorization from "../../Common/userAuthorization.js";
import { ThreeCircles } from "react-loader-spinner";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const navigate = useNavigate();

  UserAuthorization("/timeline");

  function handleForm(e) {
    e.preventDefault();

    setDisabled(true);

    if (email === "") {
      alert("Enter your e-mail");
      setDisabled(false);
    } else if (password === "") {
      alert("Enter your password");
      setDisabled(false);
    } else {
      const body = {
        email,
        password,
      };

      const post = axios.post(
        process.env.REACT_APP_API_BASE_URL + "/signin",
        body
      );

      post.then((answer) => {
        console.log(answer.data);
        localStorage.setItem(
          "token",
          JSON.stringify({ token: answer.data.token })
        );
        localStorage.setItem("img", answer.data.img);
        localStorage.setItem("linkr-userId", answer.data.id);
        localStorage.setItem("loggedName", answer.data.name);
        navigate("/timeline");
      });

      post.catch((error) => {
        setDisabled(false);
        alert("Erro! E-mail ou senha inválidos/inexistentes");
      });
    }
  }

  return (
    <Page>
      <SideBar>
        <h1>linkr</h1>
        <h2>
          save, share and discover
          <br />
          the best links on the web
        </h2>
      </SideBar>

      <ContainerForm>
        <Form onSubmit={handleForm}>
          <Input
            className="log"
            type="email"
            id="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            required
          ></Input>
          <Input
            className="log"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            required
          ></Input>

          <button className="log" disabled={disabled}>
            {disabled ? <ThreeCircles color="white" height={50} /> : "Log In"}
          </button>
          <Link to={"/signup"}>
            <h1>First time? Create an account!</h1>
          </Link>
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
    font-family: "Passion One";
    font-style: normal;
    font-weight: 700;
    font-size: 106px;
    line-height: 117px;
    letter-spacing: 0.05em;
    color: #ffffff;
    margin: 200px 0px 0px 144px;
  }

  h2 {
    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 43px;
    line-height: 64px;
    color: #ffffff;
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
      letter-spacing: 0em;
    }

    h2 {
      font-size: 23px;
      margin: 0px;
      line-height: 120%;
      letter-spacing: 0em;
    }
  }
`;

const ContainerForm = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;

  h1 {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
    text-decoration-line: underline;
    color: #ffffff;
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
    background: #1877f2;
    border-radius: 6px;
    border: none;

    font-family: "Oswald";
    font-style: normal;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    color: #ffffff;
    //color: ${(props) => (props.disabled ? `#000000` : `#FFFFFF`)}
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;
