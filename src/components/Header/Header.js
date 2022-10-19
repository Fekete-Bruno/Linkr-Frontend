import React from "react";
import styled from "styled-components";

export default function Header() {
  return (
    <Wraped>
      <div>
        <h1>Linkr</h1>
        <img src="" alt=".." />
      </div>
    </Wraped>
  );
}

const Wraped = styled.header`
  width: 100%;
  background-color: #151515;
  color: #ffffff;
  height: 72px;
  position: fixed;
  top: 0;
  z-index: 1;
  h1 {
    font-family: "Passion One";
    font-weight: 700;
    font-size: 49px;
    line-height: 54px;
    letter-spacing: 0.05em;
    padding: 10px 28px;
  }
  div {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    text-align: center;
    margin: 0 15px 0 15px;
  }
  img {
    background-color: #ffffff;
    border-radius: 50%;
    font-size: 32px;
  }
`;
