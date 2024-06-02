import { useState } from "react";
import SelectImageModal from "../../components/SelectImageModal";
import "./styles.scss";
import { useEventStore } from "../../store";

type EventStepProps = {
  setCurrentStep: any;
};

const EventStep = ({ setCurrentStep }: EventStepProps) => {
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [charityActive, setCharityActive] = useState<boolean>(false);
  const [binanceCharityActive, setBinanceCharityActive] =
    useState<boolean>(false);
  const [charrityAddress, setCharityAddress] = useState<string>("");
  const [file, setFile] = useState<any>();

  const eventDateEnd = useEventStore((state: any) => state.eventDateEnd);
  const eventName = useEventStore((state: any) => state.eventName);
  const location = useEventStore((state: any) => state.location);
  const description = useEventStore((state: any) => state.description);
  const capacity = useEventStore((state: any) => state.capacity);
  const pricePerNftTicket = useEventStore(
    (state: any) => state.pricePerNftTicket
  );
  const charityPercentage = useEventStore(
    (state: any) => state.charityPercentage
  );
  const charityWalletAddress = useEventStore(
    (state: any) => state.charityWalletAddress
  );

  const setEventName = useEventStore((state: any) => state.setEventName);
  const setEventDateStart = useEventStore(
    (state: any) => state.setEventDateStart
  );
  const setEventDateEnd = useEventStore((state: any) => state.setEventDateEnd);
  const setLocation = useEventStore((state: any) => state.setLocation);
  const setDescription = useEventStore((state: any) => state.setDescription);
  const setCapacity = useEventStore((state: any) => state.setCapacity);
  const setPricePerNftTicket = useEventStore(
    (state: any) => state.setPricePerNftTicket
  );
  const setCharityPercentage = useEventStore(
    (state: any) => state.setCharityPercentage
  );
  const setCharityWalletAddress = useEventStore(
    (state: any) => state.setCharityWalletAddress
  );

  const binanceCharityAddress = "0x8B99F3660622e21f2910ECCA7fBe51d654a1517D";

  console.log(eventDateEnd);

  const handleChange = (e: any) => {
    switch (e.target.name) {
      case "eventName":
        setEventName(e.target.value);
        break;
      case "startDate":
        setEventDateStart("" + e.target.value);
        break;
      case "endDate":
        setEventDateEnd("" + e.target.value);
        break;
      case "location":
        setLocation(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "capacity":
        setCapacity(e.target.value);
        break;
      case "nftTicketPrice":
        setPricePerNftTicket(e.target.value);
        break;
      case "percentageForCharity":
        setCharityPercentage(e.target.value);
        break;
      case "charityWalletAddress":
        setCharityWalletAddress(e.target.value);
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (
      e.target.eventName.value != "" &&
      e.target.startDate.value != "" &&
      e.target.endDate.value != "" &&
      e.target.location.value != "" &&
      e.target.description.value != "" &&
      e.target.capacity.value != "" &&
      e.target.nftTicketPrice.value != ""
    ) {
      setCurrentStep(1);
    } else {
      setError(true);
    }
  };

  return (
    <div className="step-container">
      <form onSubmit={onSubmit} className="create-event-section">
        <div className="left-side-container">
          <label className="label">Enter Event Name</label>
          <input
            type="text"
            name="eventName"
            placeholder="Event Name"
            className="input-text-style"
            value={eventName}
            onChange={handleChange}
          />
          <label className="label">Start date</label>
          <input
            name="startDate"
            type="date"
            className="input-date-style"
            onChange={handleChange}
          />
          <label className="label">End date</label>
          <input
            name="endDate"
            type="date"
            className="input-date-style"
            onChange={handleChange}
          />
          <label className="label">Location</label>
          <input
            name="location"
            type="text"
            placeholder="Add event location"
            className="input-text-style"
            value={location}
            onChange={handleChange}
          />
          <label className="label">Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Add event description"
            className="input-text-style"
            value={description}
            onChange={handleChange}
          />
        </div>

        <div className="right-side-container">
          <label className="label">Event capacity</label>
          <input
            name="capacity"
            type="number"
            className="input-number-style"
            placeholder={"0"}
            onChange={handleChange}
          />
          <label className="label">price per NFT ticket</label>
          <input
            name="nftTicketPrice"
            type="number"
            className="input-number-style"
            placeholder={"0"}
            onChange={handleChange}
          />
          <div className="charity-percentage">
            <label className="label">Donate to charity ?</label>
            <input
              name="charityActive"
              type="checkbox"
              onChange={() => setCharityActive(!charityActive)}
            />
          </div>
          {charityActive && (
            <div className="charity-container">
              <label className="label">
                Choose a percentage of each ticket that will go ta charity of
                your choosing or just donate to Binance Charity!
              </label>
              <div className="charity-percentage">
                <img
                  src="/img/binance-charity.png"
                  width={100}
                  height={100}
                  className="binance-charity-img"
                />
                <p>Choose Binance Charity ?</p>
                <input
                  name="charityActive"
                  type="checkbox"
                  onChange={() =>
                    setBinanceCharityActive(!binanceCharityActive)
                  }
                />
              </div>
              <div className="charity-percentage">
                <input
                  name="percentageForCharity"
                  type="number"
                  className="input-number-style"
                  placeholder={"0"}
                  onChange={handleChange}
                />
                <div>%</div>
              </div>
              <input
                type="text"
                name="charityWalletAddress"
                placeholder="Enter charity wallet address"
                className="input-text-style"
                onChange={handleChange}
                value={
                  binanceCharityActive
                    ? binanceCharityAddress
                    : charityWalletAddress
                }
              />
            </div>
          )}
          {error && (
            <label style={{ color: "red" }}>All fields are required</label>
          )}
          <button className="next-page-button" type="submit">
            Next Page
          </button>
        </div>
      </form>
      <SelectImageModal
        closeModal={closeModal}
        modalIsOpen={modalOpen}
        setFile={setFile}
      />
    </div>
  );
};

export default EventStep;
