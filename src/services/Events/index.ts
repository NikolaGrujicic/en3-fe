import axios from "axios";


export const getEvents = async () => {
    const response = await axios.get("http://10.118.103.99:3000/events");
    return response.data;
}