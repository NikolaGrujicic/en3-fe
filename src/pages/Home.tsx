import React, { useEffect } from "react";
import { useState } from "react";
import EventHomeCard from "../components/EventHomeCard";
import { getEvents } from "../services/Events";
import { Container, Grid, Typography } from "@mui/material";
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
     <Typography variant="h4" color="white" sx={{ margin:'10px auto',width: 'fit-content'  }}>
       FIND YOUR NEXT ENTRY!
      </Typography>
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      
     <Grid container spacing={3}>
      {events &&events.map((event:any) => (
        <Grid item key={event?.id} xs={12} sm={6} md={3} lg={3}>
          <EventHomeCard {...event} />
        </Grid>
      ))}
    </Grid>
    </Container>
    </div>
  );
};

export default Home;