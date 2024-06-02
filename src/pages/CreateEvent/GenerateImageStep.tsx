import React, { useEffect, useState } from "react";
import SelectImageModal from "../../components/SelectImageModal";
import "./styles.scss";
import { Button } from "@mui/material";
import { generateImageAi } from "../../services/BackendService";
import { useEventStore } from "../../store";
import { createEvent } from "../../services/Events";
import { ethers } from "ethers";
import { abi } from "../../consts/sc-abi";
import { bytecode } from "../../consts/bytecode";
import EventCreatedModal from "../../components/EventCreatedModal";

// Import images directly
import artFrankdegods from "./art_frankdegods.jpg";
import artFrontera from "./art_frontera.jpg";
import artYugalabs from "./art_yugalabs.jpg";

type GenerateImageStepProps = {
  setCurrentStep: any;
};

const GenerateImageStep = ({ setCurrentStep }: GenerateImageStepProps) => {
  const [modalOpen, setIsModalOpen] = useState<boolean>(false);
  const [eventCreatedModalOpen, setEventCreatedModalOpen] =
    useState<boolean>(false);
  const [file, setFile] = useState<any>();
  const [imageUrlAi, setImageUrlAi] = useState("");
  const [artistModalImages, setArtistModalImages] = useState<
    { src: string; label: string }[]
  >([
    { src: artFrankdegods, label: "Frank DeGods" },
    { src: artFrontera, label: "Frontera" },
    { src: artYugalabs, label: "Yuga Labs" },
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

  const closeEventCreatedModal = () => {
    setEventCreatedModalOpen(false);
  };

  const deployContract = async () => {
    try {
      // setDeploying(true);

      // Connect to MetaMask
      if (!window.ethereum) throw new Error("MetaMask not installed");
      await window.ethereum.enable();
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create contract instance
      const factory = new ethers.ContractFactory(abi, bytecode, signer);
      const contract = await factory.deploy();
      // Wait for contract to be deployed
      const status = await contract.waitForDeployment();
      console.log("contract addresss", contract.target);
      // setContractAddress(contract.target);
      setTimeout(async () => {
        const contractInstance = new ethers.Contract(
          contract.target,
          abi,
          signer
        );
        const cost = ethers.parseUnits("0.01", "ether");

        const res = await createEvent({
          description,
          contractAddr: contract.target,
          name: eventName,
          eventDateStart: new Date(eventDateStart).getTime(),
          eventDateEnd: new Date(eventDateEnd).getTime(),
          location: location,
          capacity: capacity,
          pricePerNftTicket: pricePerNftTicket,
          charityWalletAddress: "0x142f9DE19A405a1E8B6b71811414110b33998b88",
          charityPercentage: 50,
          image: imageUrlAi,
        });
        debugger;
        const result = await contractInstance.createNFTCollection(
          eventName,
          "LMAO",
          res?.data,
          5,
          cost,
          "0x142f9DE19A405a1E8B6b71811414110b33998b88",
          50
        );
        console.log("result", result);
        setEventCreatedModalOpen(true);
        // POST  /create-event
        // Needs header: authentication: JWT
        /*{
          description, 
          contractAddr
          name, 
          startDate, 
          endDate, 
          location, 
          capacity,
          price,
          donationAddr,
          donatationPercentage,
          image
        }*/

        // setTimeout(async () => {
        //   const result = await contractInstance.mintNFT(ethers.toBigInt(0), {
        //     value: ethers.parseEther("0.01"),
        //   });
        //   console.log("attytytttsadtytydastytydstysdaty", result);
        // }, 10000);
      }, 20000);
    } catch (error) {
      console.error("Error deploying contract:", error);
    } finally {
      // setDeploying(false);
    }
  };

  useEffect(() => {
    setImageUrlAi(imageUrlAi);
  }, [imageUrlAi]);

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
            onClick={openArtistModal}
          >
            Choose Artist
          </Button>
        </div>
      </div>
      <div className="generate-image-step-buttons">
        <button className="next-page-button" onClick={() => setCurrentStep(0)}>
          Previous Page
        </button>
        <button
          className="next-page-button"
          type="submit"
          onClick={() => deployContract()}
        >
          Generate event page
        </button>
      </div>
      <SelectImageModal
        closeModal={closeModal}
        modalIsOpen={modalOpen}
        setFile={setFile}
        images={artistModalImages} // Pass artist images to the modal
      />
      <EventCreatedModal
        closeModal={closeEventCreatedModal}
        modalIsOpen={eventCreatedModalOpen}
      />
    </div>
  );
};

export default GenerateImageStep;
