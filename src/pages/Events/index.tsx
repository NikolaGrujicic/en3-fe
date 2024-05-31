import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/index';
import './style.scss';
import { eventsData } from '../../config/const';
interface Event {
  title: string;
  time: string;
  speakers: string[];
  location: string;
  attendeeCount: number;
  date: string;
  image: string;
}
const Events: React.FC = () => {


  const [eventTimePeriod, serEventTimePeriod] = React.useState('future');


  useEffect(() => {
    setViewEvents(filterEvents(eventTimePeriod));
  },[eventTimePeriod])                  

  const [events, setEvents] = useState<Event[]>(eventsData);
  const [viewEvents, setViewEvents] = useState<Event[] | null>(null);
  const filterEvents = (eventType:string): Event[] => {
    const currentDate = new Date();
    
    if (eventType === 'past') {
        return events.filter(event => new Date(event.date) < currentDate);
    } else {
        return events.filter(event => new Date(event.date) >= currentDate);
    }
};
 

  return (
    <div className="events-wrapper">
      <div className="events-content">
        <div className="events-header">
          <h2>Events</h2>
          <div className="tabs">
            <button
              className={eventTimePeriod === 'future' ? 'active' : ''}
              onClick={() => serEventTimePeriod('future')}
            >
              Future
            </button>
            <button
              className={eventTimePeriod === 'past' ? 'active' : ''}
              onClick={() => serEventTimePeriod('past')}
            >
              Past
            </button>
          </div>
        </div>
        <div className="events-data">
        <div className="card-timeline"></div>
          {viewEvents && viewEvents.map((event,index) => 
          <>
          <div className="timeline-dot"></div>
          <EventCard {...event} eventId={index} />
          </>
          )}
      
        </div>
      </div>
    </div>
  );
};

export default Events;
