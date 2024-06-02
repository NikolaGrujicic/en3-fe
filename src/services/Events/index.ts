import axios from "axios";


const apiUrl = import.meta.env.VITE_API_URL;

export const getEvents = async () => {
    const response = await axios.get(`${apiUrl}/events`);
    return response.data;
}

export const getMyEvents = async () => {
    const sessionToken = localStorage.getItem("session-token");

    if (!sessionToken) {
      throw new Error("No session token found in localStorage.");
    }
    const response = await axios.get(`${apiUrl}/my-events`,
    {
      headers: { Authorization: `${sessionToken}` },
    });
    return response.data;
}