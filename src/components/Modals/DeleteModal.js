import { ThreeCircles } from "react-loader-spinner";
import { ModalWrapper, Background, Box } from "../../Styles/ModalStyles.js";

export default function DeleteModal({
  closeModal,
  confirmDelete,
  delDisabled,
}) {
  return (
    <ModalWrapper>
      <Background />
      <Box>
        Are you sure you want <br />
        to delete this post?
        <div className="buttons">
          {delDisabled ? (
            <ThreeCircles color="white" height={30} />
          ) : (
            <>
              <button className="cancel" onClick={closeModal}>
                No, go back
              </button>
              <button
                className="confirm"
                onClick={confirmDelete}
                disabled={delDisabled}
              >
                Yes, delete it
              </button>
            </>
          )}
        </div>
      </Box>
    </ModalWrapper>
  );
}
