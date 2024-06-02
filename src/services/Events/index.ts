import axios from "axios";
import { Addressable } from "ethers";

type EventProps = {
  name: string;
  eventDateStart: number;
  eventDateEnd: number;
  location: string;
  description: string;
  capacity: number;
  pricePerNftTicket: number;
  charityPercentage: number;
  charityWalletAddress: string;
  contractAddr: string | Addressable;
  image: string;
};

const apiUrl = import.meta.env.VITE_API_URL;

export const getEvents = async () => {
  const response = await axios.get(`${apiUrl}/events`);
  return response.data;
};

export const getMyEvents = async () => {
  const sessionToken = localStorage.getItem("session-token");

  if (!sessionToken) {
    throw new Error("No session token found in localStorage.");
  }
  const response = await axios.get(`${apiUrl}/my-events`, {
    headers: { Authorization: `${sessionToken}` },
  });
  return response.data;
};

// description,
// contractAddr,
// name,
// startDate,
// endDate,
// location,
// capacity,
// price,
// donationAddr,
// donatationPercentage,
// image,

export const createEvent = async ({
  name,
  eventDateStart,
  eventDateEnd,
  location,
  description,
  capacity,
  pricePerNftTicket,
  charityPercentage,
  charityWalletAddress,
  contractAddr,
  image,
}: EventProps) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const sessionToken = localStorage.getItem("session-token");

    if (!sessionToken) {
      throw new Error("No session token found in localStorage.");
    }

    //   description,
    //     contractAddr,
    //     name,
    //     startDate,
    //     endDate,
    //     location,
    //     capacity,
    //     price,
    //     donationAddr,
    //     donatationPercentage,
    //     image,

    const res = await axios.post(
      `${apiUrl}/create-event`,
      {
        description: description,
        name: name,
        location: location,
        capacity: capacity,
        endDate: eventDateEnd,
        startDate: eventDateStart,
        pricePerNftTicket: pricePerNftTicket,
        charityPercentage: charityPercentage,
        charityWalletAddress: charityWalletAddress,
        contractAddr: contractAddr,
        image: image,
      },
      {
        headers: { Authorization: `${sessionToken}` },
      }
    );

    console.log(res);
    return res;

    console.log("Response:", res.data);
  } catch (error) {
    console.error(
      "Error generating image:",
      error.response?.data || error.message
    );
  }
};
