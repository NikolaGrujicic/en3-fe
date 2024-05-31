import { useState } from "react";
import SelectImageModal from "../../components/SelectImageModal";
import "./styles.scss";

const CreateEvent = () => {
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<any>();

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const onSubmit = (e: any) => {
    e.preventDefault();
    console.log(e.target.eventName.value);
    console.log(e.target.startDate.value);
    console.log(e.target.endDate.value);
    console.log(e.target.location.value);
    console.log(e.target.description.value);
    console.log(e.target.capacity.value);
  };
  return (
    <div className="create-event-container">
      <div className="image-section">
        <img src="/img/nft-image.png" width={280} height={280} alt="image" />
        <button
          className="select-nft-button"
          onClick={() => setIsModalOpen(true)}
        >
          Select NFT
        </button>
      </div>
      <form onSubmit={onSubmit} className="create-event-section">
        <label className="label">Enter Event Name</label>
        <input
          type="text"
          name="eventName"
          placeholder="Event Name"
          className="input-text-style"
        />
        <label className="label">Start date</label>
        <input name="startDate" type="date" className="input-date-style" />
        <label className="label">End date</label>
        <input name="endDate" type="date" className="input-date-style" />
        <label className="label">Location</label>
        <input
          name="location"
          type="text"
          placeholder="Add event location"
          className="input-text-style"
        />
        <label className="label">Description</label>
        <textarea
          name="description"
          rows={4}
          placeholder="Add event description"
          className="input-text-style"
        />
        <label className="label">Event capacity</label>
        <input
          name="capacity"
          type="number"
          className="input-number-style"
          placeholder={"0"}
        />
        <button className="submit-button" type="submit">
          Create Event
        </button>
      </form>
      <SelectImageModal
        closeModal={closeModal}
        modalIsOpen={modalOpen}
        setFile={setFile}
      />
    </div>
  );
};

export default CreateEvent;
