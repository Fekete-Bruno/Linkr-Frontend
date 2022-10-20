import React from "react";
import Button from "./components/Buttons/Buttons.js";
import Header from "./components/Header/Header.js";
import Input from "./components/Inputs/Input.js";
import GlobalStyles from "./Styles/GlobalStyles.js";

export default function App() {
  return (
    <>
      <GlobalStyles />
      <Header />
      <Input className="log" placeholder="Login Input"></Input>
      <Input className="post" height="30px" placeholder="Post Input"></Input>
      <Input
        className="post"
        height="66px"
        placeholder="Post Input large"
      ></Input>
      <Button className="log">Login Button</Button>
      <Button className="post">Post Button</Button>
      <Button className="cancel">Cancel Button</Button>
      <Button className="confirm">Confirm Button</Button>
    </>
  );
}
