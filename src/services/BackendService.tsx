import axios from "axios";

type EventProps = {
  eventName: string;
  eventDateStart: string;
  eventDateEnd: string;
  location: string;
  description: string;
  capacity: number;
  pricePerNftTicket: number;
  charityPercentage: number;
  charityWalletAddress: string;
};

export const generateImageAi = async ({
  eventName,
  eventDateStart,
  eventDateEnd,
  location,
  description,
  capacity,
  pricePerNftTicket,
  charityPercentage,
  charityWalletAddress,
}: EventProps) => {
  try {
    const apiUrl = import.meta.env.VITE_API_URL;
    const sessionToken = localStorage.getItem("session-token");

    if (!sessionToken) {
      throw new Error("No session token found in localStorage.");
    }

    const res = await axios.post(
      `${apiUrl}/generate-image`,
      {
        description: description,
        name: eventName,
        location: location,
        capacity: capacity,
        eventDateEnd: eventDateEnd,
        eventDateStart: eventDateStart,
        pricePerNftTicket: pricePerNftTicket,
        charityPercentage: charityPercentage,
        charityWalletAddress: charityWalletAddress,
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
