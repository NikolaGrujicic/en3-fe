import React, { useEffect, useState } from 'react';
import EventCard from '../../components/EventCard/index';
import './style.scss';
import { eventsData } from '../../config/const';
import { Event } from '../../interfaces';
import { getMyEvents } from '../../services/Events';

const Events: React.FC =  () => {

const [eventTimePeriod, serEventTimePeriod] = React.useState('future');

  useEffect(() => {
    setViewEvents(filterEvents(eventTimePeriod));
  }, [eventTimePeriod])

  useEffect(() => {
    console.log(getMyEvents());
  },[])
  const [events, setEvents] = useState<Event[]>(eventsData);
  const [viewEvents, setViewEvents] = useState<Event[] | null>(null);
  const filterEvents = (eventType: string): Event[] => {
    const currentDate = new Date();

    const sortedEvents = events.slice().sort((a, b) => new Date(a.start_date) - new Date(b.start_date));

    // Filter events based on event type
    if (eventType === 'past') {
      return sortedEvents.filter(event => new Date(event.start_date) < currentDate);
    } else {
      return sortedEvents.filter(event => new Date(event.start_date) >= currentDate);
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
          {viewEvents && viewEvents.length > 0 ? (
            viewEvents.map((event, index) =>
              
                <EventCard {...event} key={index}/>
              
            )) :
            <div className="no-event">
              <p>No events found</p>
            </div>
          }

        </div>
      </div>
    </div>
  );
};

export default Events;
