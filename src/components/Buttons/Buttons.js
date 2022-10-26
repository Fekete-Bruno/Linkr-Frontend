import React from "react";
import styled from "styled-components";

export default function Button({
  children,
  className = "",
  width = "429px",
  height = "65px",
  onClick,
}) {
  return (
    <Wraped
      className={className}
      width={width}
      height={height}
      onClick={onClick}
    >
      {children}
    </Wraped>
  );
}

const Wraped = styled.button`
  background-color: #1877f2;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  text-align: center;
  margin: 3px;
  border: none;

  &.log {
    width: 430px;
    height: 65px;
    font-family: Oswald, sans-serif;
    font-weight: 700;
    font-size: 27px;
    line-height: 40px;
    border-radius: 6px;
  }

  &.post, &.follow {
    width: 112px;
    height: 31px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    border-radius: 5px;
  }

  &.confirm {
    width: 134;
    height: 37px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
  }

  &.cancel {
    background-color: #ffffff;
    color: #1877f2;
    width: 134;
    height: 37px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
  }

  &.unfollow {
    width: 112px;
    height: 31px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 14px;
    line-height: 17px;
    border-radius: 5px;
    color: #1877F2;
    background-color: #ffffff;
  }

  &:hover{
    cursor: pointer;
    opacity: 0.9;
  }

  &:active{
    transform: scale(0.98);
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
  }

  @media (max-width: 400px) {
    &.log {
      width: 330px;
      height: 55px;
      font-size: 22px;
      line-height: 33px;
    }
 
    &.post {
      height: 22px;
      font-size: 13px;
      line-height: 16px;
    }
  }
`;
