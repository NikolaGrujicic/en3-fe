import { FC } from "react";
import ReactModal from "react-modal";
import "./styles.scss";

interface SelectImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
}

const EventCreatedModal: FC<SelectImageModalProps> = ({
  modalIsOpen,
  closeModal,
}) => {
  function closeModall() {
    closeModal();
  }

  return (
    <ReactModal
      isOpen={modalIsOpen}
      contentLabel="Minimal Modal Example"
      onRequestClose={closeModall}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(119, 119, 119, 0.05)",
        },
        content: {
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: "448px",
          overflow: "hidden",
          borderRadius: "16px",
          backgroundColor: "white",
          padding: "40px",
          textAlign: "left",
          verticalAlign: "middle",
          display: "flex",
          height: "fit-content",
        },
      }}
    >
      <div className="event-created-modal">
        <h1>Congratulations, you have succesfully created your event!</h1>
      </div>
    </ReactModal>
  );
};

export default EventCreatedModal;
