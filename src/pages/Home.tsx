import React, { useEffect } from "react";
import { useState } from "react";
import EventHomeCard from "../components/EventHomeCard";
import { getEvents } from "../services/Events";

const Home:React.FC = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const events =  await getEvents();
     setEvents(events.events)   
    }
  fetchEvents();
    
  }, [])
  return (
    <div>
        {events && events.map((event: any) => <EventHomeCard key={event.id} {...event} />)}
    </div>
  );
};

export default Home;