// EventCard.tsx

import React from 'react';
import './style.scss';
import { getDayOfWeek, formatDate } from '../../services/dateHelper';
import { Event } from '../../interfaces';


const EventCard: React.FC<Event> = (EventCardProps) => {
    const apiUrl = import.meta.env.VITE_API_URL;

    return (
        <div className="card-row">
             <div className="timeline-dot"></div>
            <div className="card-date">
                <p>{formatDate(EventCardProps.start_date)}</p>
                <p>{getDayOfWeek(EventCardProps.start_date)}</p>
            </div>
            <div className="card-data" onClick={() =>  window.open(`/events/${EventCardProps.id}`, '_blank')}>
                <div className="event-info">
                    <p className="event-time">
                        {EventCardProps.start_date}
                    </p>
                    <p className="event-title">
                        {EventCardProps.name}
                    </p>
                    {/* <p className="event-owner">
                        {EventCardProps.speakers.join(', ')}
                    </p> */}
                    <div className="event-location">
                        
                        <p>{EventCardProps.location}</p>
                    </div>
                    <div className="event-going">
                        <span>Going</span>
                    </div>
                </div>
                <div className="event-image">
                    <img src={apiUrl + `/images/${EventCardProps.image}`} alt="" />
                </div>
            </div>
        </div>
    );
};
export default EventCard;
