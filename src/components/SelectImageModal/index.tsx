import { FC } from "react";
import ReactModal from "react-modal";
import { FiUploadCloud } from "react-icons/fi";
import "./styles.scss";

interface SelectImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  setFile: any;
}

const SelectImageModal: FC<SelectImageModalProps> = ({
  modalIsOpen,
  closeModal,
  setFile,
}) => {
  function closeModall() {
    closeModal();
  }

  const handleChange = (e: any) => {
    console.log(e.target.file.value);
    setFile(URL.createObjectURL(e.target.files[0]));
  };

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
      <div className="modal-container">
        <form className="form-container">
          <label htmlFor="fileId" className="label-container label-main">
            <h2 className="label-text-color">Upload File</h2>
            <FiUploadCloud className="upload-icon" />
            <p className="label-select">Must not be more than 100kb</p>
          </label>
          <input
            className="select-input"
            name="file"
            type="file"
            onChange={handleChange}
            id="fileId"
          />
        </form>
      </div>
    </ReactModal>
  );
};

export default SelectImageModal;
