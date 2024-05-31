// EventCard.tsx

import React from 'react';
import './style.scss';
import { getDayOfWeek,formatDate } from '../../services/dateHelper';
import { useNavigate } from 'react-router-dom';

interface EventCardProps {
    title: string;
    time: string;
    speakers: string[];
    location: string;
    attendeeCount: number;
    date: string;
    image: string;
    eventId:number
}

const EventCard: React.FC<EventCardProps> = (EventCardProps) => {
    return (
        <div className="card-row">
             <div className="timeline-dot"></div>
            <div className="card-date">
                <p>{formatDate(EventCardProps.date)}</p>
                <p>{getDayOfWeek(EventCardProps.date)}</p>
            </div>
            <div className="card-data" onClick={() =>  window.open('/event/' + EventCardProps.eventId, '_blank')}>
                <div className="event-info">
                    <p className="event-time">
                        {EventCardProps.time}
                    </p>
                    <p className="event-title">
                        {EventCardProps.title}
                    </p>
                    <p className="event-owner">
                        {EventCardProps.speakers.join(', ')}
                    </p>
                    <div className="event-location">
                        
                        <p>{EventCardProps.location}</p>
                    </div>
                    <div className="event-going">
                        <span>Going</span>
                    </div>
                </div>
                <div className="event-image">
                    <img src={`https://picsum.photos/200/300?random=${EventCardProps.eventId + 1}`} alt="" />
                </div>
            </div>
        </div>
    );
};
export default EventCard;
