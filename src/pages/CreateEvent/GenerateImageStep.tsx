import React, { useState } from "react";
import SelectImageModal from "../../components/SelectImageModal";
import "./styles.scss";
import { Button } from "@mui/material";
import { generateImageAi } from "../../services/BackendService";
import { useEventStore } from "../../store";

// Import images directly
import artFrankdegods from './art_frankdegods.jpg';
import artFrontera from './art_frontera.jpg';
import artYugalabs from './art_yugalabs.jpg';

type GenerateImageStepProps = {
  setCurrentStep: any;
};

const GenerateImageStep = ({ setCurrentStep }: GenerateImageStepProps) => {
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [imageUrlAi, setImageUrlAi] = useState("");
  const [artistModalImages, setArtistModalImages] = useState<{ src: string; label: string }[]>([
    { src: artFrankdegods, label: "Frank DeGods" },
    { src: artFrontera, label: "Frontera" },
    { src: artYugalabs, label: "Yuga Labs" }
  ]); // Initialized with imported images and labels

  const eventName = useEventStore((state: any) => state.eventName);
  const location = useEventStore((state: any) => state.location);
  const eventDateStart = useEventStore((state: any) => state.eventDateStart);
  const eventDateEnd = useEventStore((state: any) => state.eventDateEnd);
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

  const callGenerateImageAi = async () => {
    const res = await generateImageAi({
      eventName,
      eventDateStart,
      eventDateEnd,
      location,
      description,
      capacity,
      pricePerNftTicket,
      charityPercentage,
      charityWalletAddress,
    });

    if (res?.status === 200) {
      setImageUrlAi(res.data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openArtistModal = () => {
    setIsModalOpen(true);
  };

  return (
    <div className="create-event-container">
      <div className="image-section">
        <div className="image-container">
          <img
            src={
              imageUrlAi !== ""
                ? `${import.meta.env.VITE_API_URL}/images/${imageUrlAi}`
                : "/img/nft-image.png"
            }
            width={280}
            height={280}
            alt="image"
          />
        </div>
        <div className="generate-image-buttons">
          <Button
            variant="outlined"
            size="large"
            className="select-nft-button"
            onClick={() => setIsModalOpen(true)}
          >
            Upload NFT
          </Button>
          <Button
            variant="outlined"
            size="large"
            className="select-nft-button"
            onClick={() => callGenerateImageAi()}
          >
            Generate NFT with AI
          </Button>
          <Button 
            variant="outlined" 
            size="large" 
            className="select-nft-button"
            onClick={openArtistModal}>
            Choose Artist
          </Button>
        </div>
      </div>
      <div className="generate-image-step-buttons">
        <button className="next-page-button" onClick={() => setCurrentStep(0)}>
          Previous Page
        </button>
        <button className="next-page-button" type="submit">
          Generate event page
        </button>
      </div>
      <SelectImageModal
        closeModal={closeModal}
        modalIsOpen={modalOpen}
        setFile={setFile}
        images={artistModalImages} // Pass artist images to the modal
      />
    </div>
  );
};

export default GenerateImageStep;
