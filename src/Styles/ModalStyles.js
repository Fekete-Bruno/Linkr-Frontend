import styled from "styled-components";

const ModalWrapper = styled.body`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
`;

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgba(255, 255, 255, 0.8);
  z-index: 3;

  position: fixed;
  top: 0;
`;

const Box = styled.div`
  background-color: #333333;
  width: 597px;
  height: 262px;
  border-radius: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Lato";
  font-weight: 700;
  font-size: 34px;
  line-height: 41px;
  text-align: center;
  color: #ffffff;
  z-index: 4;

  position: absolute;
  top: 20vh;

  @media (max-width: 600px) {
    width: 100vw;
    border-radius: 0;
  }

  div .buttons {
    width: 295px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .confirm,
  .cancel {
    width: 134px;
    height: 37px;
    margin-top: 25px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
    cursor: pointer;

    :active {
      transform: scale(0.98);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.15);
    }
  }

  .confirm {
    background-color: #1877f2;
    color: #ffffff;
    margin-left: 25px;
  }

  .cancel {
    background-color: #ffffff;
    color: #1877f2;
  }
`;

export { ModalWrapper, Background, Box };
