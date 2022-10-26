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

  z-index: 1;

  @media (max-width: 600px) {
    width: 100vw;
    border-radius: 0;
  }

  h2,
  p {
    word-wrap: break-word;
  }

  h2 {
    margin-bottom: 10px;
    font-size: 22px;
    font-weight: 600;
    cursor: pointer;
  }

  p {
    font-size: 20px;
    line-height: 23px;
    opacity: 0.7;
  }

  span {
    font-size: 15px;
  }

  div {
    display: flex;
    flex-direction: column;
  }

  .left {
    width: 8%;
    align-items: center;
  }

  .right {
    width: 90%;
    padding-left: 20px;
    position: relative;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
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
    cursor: pointer;

    position: absolute;
    top: 0;
    right: 0;
  }

  form {
    align-items: flex-start;
    height: 20px;
    margin-bottom: 5px;
    margin-top: 8px;
  }

  input {
    width: 100%;
    padding: 8px;
    background-color: #ffffff;
    border-radius: 7px;
    color: #4c4c4c;
    border: none;
    font-family: Lato, sans-serif;
    font-size: 20px;
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
