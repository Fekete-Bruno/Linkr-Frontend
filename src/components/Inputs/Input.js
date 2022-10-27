import React from "react";
import styled from "styled-components";

export default function Input({
  className = "",
  height = "65px",
  placeholder,
  type,
  name,
  value,
  onChange,
}) {
  return (
    <Wrapper
      className={className}
      height={height}
      placeholder={placeholder}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
    ></Wrapper>
  );
}

const Wrapper = styled.input`
  height: ${(props) => props.height};

  &.log {
    width: 430px;
    background: #ffffff;
    border: none;
    border-radius: 6px;
    margin: 6px auto;
    padding: 12px 18px;
    font-family: Oswald, sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    ::placeholder {
      font-family: Oswald, sans-serif;
      font-weight: 700;
      font-size: 27px;
      color: #9f9f9f;
    }
  }

  &.post {
    width: 500px;
    background: #efefef;
    border-radius: 5px;
    padding: 6px 18px;
    font-family: Lato, sans-serif;
    font-weight: 300;
    font-size: 15px;
    line-height: 18px;
    ::placeholder {
      font-family: Lato, sans-serif;
      font-weight: 300;
      font-size: 15px;
      color: #949494;
    }
  }
`;
