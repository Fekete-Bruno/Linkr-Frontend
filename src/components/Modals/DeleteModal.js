import styled from "styled-components";

export default function DeleteModal({ closeModal, confirmDelete }) {
  return (
    <ModalWrapper>
      <div>
        Are you sure you want <br />
        to delete this post?
        <div className="buttons">
          <button className="cancel" onClick={closeModal}>
            No, go back
          </button>
          <button className="confirm" onClick={confirmDelete}>
            Yes, delete it
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
}

const ModalWrapper = styled.body`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 4;

  div {
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
    padding-top: 28px;
  }

  div .buttons {
    display: flex;
    flex-direction: row;
    width: 295px;
    justify-content: space-between;
  }

  .confirm {
    background-color: #1877f2;
    color: #ffffff;
    width: 134px;
    height: 37px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
  }

  .cancel {
    background-color: #ffffff;
    color: #1877f2;
    width: 134px;
    height: 37px;
    font-family: Lato, sans-serif;
    font-weight: 700;
    font-size: 18px;
    line-height: 22px;
    border-radius: 5px;
    border: none;
  }
`;
