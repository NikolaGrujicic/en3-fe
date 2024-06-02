// EventCard.tsx

import "./style.scss";
import { getDayOfWeek, formatDate } from "../../services/dateHelper";
import { Event } from "../../interfaces";

type Props = {
  event: Event;
  eventTimePeriod: any;
};

const EventCard = ({ event, eventTimePeriod }: Props) => {
  const apiUrl = import.meta.env.VITE_API_URL;

  return (
    <div className="card-row">
      <div className="timeline-dot"></div>
      <div className="card-date">
        <p>{formatDate(event.start_date)}</p>
        <p>{getDayOfWeek(event.start_date)}</p>
      </div>
      <div
        className="card-data"
        onClick={() => window.open(`/events/${event.id}`, "_blank")}
      >
        <div className="event-info">
          <p className="event-time">{event.start_date}</p>
          <p className="event-title">{event.name}</p>
          {/* <p className="event-owner">
                        {EventCardProps.speakers.join(', ')}
                    </p> */}
          <div className="event-location">
            <p>{event.location}</p>
          </div>
          <div
            className={`event-pill ${
              eventTimePeriod === "past" ? "event-attended" : "event-going"
            }`}
          >
            <span>Going</span>
          </div>
        </div>
        <div className="event-image">
          <img src={apiUrl + `/images/${event.image}`} alt="" />
        </div>
      </div>
    </div>
  );
};
export default EventCard;
