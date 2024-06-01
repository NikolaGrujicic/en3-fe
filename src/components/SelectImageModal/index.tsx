import { FC } from "react";
import ReactModal from "react-modal";
import { FiUploadCloud } from "react-icons/fi";
import "./styles.scss";

interface SelectImageModalProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  setFile: (file: any) => void;
  images?: string[]; // Optional array of image URLs
}

const SelectImageModal: FC<SelectImageModalProps> = ({
  modalIsOpen,
  closeModal,
  setFile,
  images,
}) => {
  function closeModall() {
    closeModal();
  }

  const handleChange = (e: any) => {
    if (e.target.files[0]) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  };

  const selectImage = (image: string) => {
    setFile(image);
    closeModall();
  };

  return (
    <ReactModal
      isOpen={modalIsOpen}
      contentLabel="Minimal Modal Example"
      onRequestClose={closeModall}
      ariaHideApp={false}
      style={{
        overlay: {
          backgroundColor: "rgba(119, 119, 119, 0.5)",
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
          flexDirection: "column",
          height: "fit-content",
        },
      }}
    >
      {images ? (
        <div className="image-selection-container">
          {images.map((item, index) => (
            <div className="image-with-label" key={index}>
              <img
                src={item.src}
                alt={`Select art ${item.label}`}
                style={{ width: '100%' }} // Adjust width within the container
                onClick={() => selectImage(item.src)}
              />
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      ) : (
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
      )}
    </ReactModal>
  );
};

export default SelectImageModal;
