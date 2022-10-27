import { ModalWrapper, Background, Box } from "../../Styles/ModalStyles.js";
import { ThreeCircles } from "react-loader-spinner";

export default function RepostModal({
  closeModal,
  confirmRepost,
  repostDisable,
}) {
  return (
    <ModalWrapper>
      <Background />
      <Box>
        Do you want to re-post <br />
        this link?
        <div className="buttons">
          {repostDisable ? (
            <ThreeCircles color="white" height={30} />
          ) : (
            <>
              <button className="cancel" onClick={closeModal}>
                No, cancel
              </button>
              <button
                className="confirm"
                onClick={confirmRepost}
                disabled={repostDisable}
              >
                Yes, share!
              </button>
            </>
          )}
        </div>
      </Box>
    </ModalWrapper>
  );
}
