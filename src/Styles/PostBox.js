import styled from "styled-components";

const PostBox = styled.div`
  width: 611px;
  height: 276px;
  padding: 20px;
  margin-bottom: 16px;
  display: flex;
  background: #171717;
  border-radius: 16px;
  font-family: "Lato";
  font-style: normal;
  color: #ffffff;

  h2,
  p {
    font-size: 20px;
    line-height: 23px;
    word-wrap: break-word;
  }

  p {
    opacity: 0.7;
    line-height: 2em;
  }

  span {
    font-size: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  .heart {
    font-size: 25px;
    color: #fff;
    margin-top: 20px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .left {
    align-items: center;
  }

  .right {
    padding-left: 20px;
  }

  .title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }

  .icons {
    width: 40px;
    transform: scale(1.5);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: auto 5px;
  }

  form {
    align-items: flex-start;
  }

  input {
    width: 100%;
    background-color: #ffffff;
    border-radius: 7px;
    color: #4c4c4c;
    border: none;
    font-family: Lato, sans-serif;
    font-size: 17px;
    line-height: 20px;
    word-wrap: break-word;
  }

  input:disabled {
    background-color: #171717;
    color: #b7b7b7;
    border: none;
  }

  input:focus {
    outline: 0;
  }
`;

export default PostBox;
