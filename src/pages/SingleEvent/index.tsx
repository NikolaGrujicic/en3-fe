import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsData } from "../../config/const";
import { Event } from '../../interfaces';
import './index.scss'
import { getDayOfWeek, formatDate } from '../../services/dateHelper';

const SingleEvent: React.FC = () => {
    let { eventId } = useParams()

    //mimic api call or getter from state to find the event based on eventId

    const getEventById = (eventId: string | undefined) => {
        return eventsData.find(event => event.id === eventId)
    }
    const [event, setEvent] = useState<Event | null>(null);

    const [eventDay , setEventDay] = useState('');
    const [eventMonth , setEventMonth] = useState('');

    useEffect(() => {
        const event = getEventById(eventId);
        setEvent(event ?? null);
        if (event) {
            const [month, day] = formatDate(event.date).split(' ');
            setEventDay(day);
            setEventMonth(month);
        }
    }, [])

    return ({ event }) ? (
        <div className="single-event-wrapper">
            <div className="single-event">
                <div className="column-left">
                    <div className="image section-margin-bottom">
                        <img src={`https://picsum.photos/330/330?random=${Math.floor(Math.random() * 20) + 1}`} alt="" />
                    </div>
                    <div className="hosted-by section-margin-bottom">
                        <span className="title">Hosted by</span>
                        <div className="white-underline"></div>
                        {
                            event?.speakers.map(speaker => (
                                <div className="hosted-by-row">
                                    <img src={`https://picsum.photos/330/330?random=${Math.floor(Math.random() * 20) + 1}`} alt="" />
                                    <span>{speaker}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="going section-margin-bottom">
                        <span className="title">{event?.attendeeCount} Going</span>
                        <div className="white-underline"></div>
                        <span className="attendees-list">Carlo Nicolosi, Bruno BEN SAID and 28 others</span>
                    </div>
                    <div className="cta section-margin-bottom">
                        <span>Contact the Host</span>
                        <span>Report Event</span>

                    </div>
                </div>
                <div className="column-right">
                    <div className="featured-in-loaction-cta section-margin-bottom">

                    </div>
                    <div className="main-info section-margin-bottom">
                        <h2 className="title section-margin-bottom">
                            {event?.title}
                        </h2>
                        <div className="time-box section-margin-bottom">
                            <div className="icon-calendar">
                                <div className="month">{eventMonth}</div>
                                <div className="day">{eventDay}</div>
                            </div>
                            <div className="text">
                                <div className="title">
                                    {event?.date &&
                                    `${getDayOfWeek(event?.date)}, ${formatDate(event?.date)}`
                                    }
                                </div>
                                <div className="desc">6:00 PM - 8:30 PM GMT+2</div>
                            </div>
                        </div>
                        <div className="location-box section-margin-bottom">
                            <div className="icon-location">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"><path d="M2 6.854C2 11.02 7.04 15 8 15s6-3.98 6-8.146C14 3.621 11.314 1 8 1S2 3.62 2 6.854Z"></path><path d="M9.5 6.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path></g></svg>
                            </div>
                            <div className="text">
                                <div className="title">
                                    Via Privata Turro, 6
                                </div>
                                <div className="desc">{event?.location}</div>
                            </div>
                        </div>
                    </div>
                    <div className="attending-infosection-margin-bottom">

                    </div>
                    <div className="description section-margin-bottom">
                        <span>About</span>
                        <div className="white-underline section-margin-bottom"></div>
                        <p><strong>{event?.title}</strong></p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione distinctio nemo aspernatur expedita, natus delectus. Et maiores quod hic rem tenetur adipisci. Distinctio officia error aliquam optio libero pariatur perspiciatis.</p>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione distinctio nemo aspernatur expedita, natus delectus. Et maiores quod hic rem tenetur adipisci. Distinctio officia error aliquam optio libero pariatur perspiciatis.</p>

                    </div>
                    <div className="location section-margin-bottom">
                        <span>Location</span>
                        <div className="white-underline section-margin-bottom"></div>
                        <p><strong>Via Privata Turro, 6</strong></p>
                        <p>20127 Milano MI, Italy <br/>@ Teiacare</p>
                        <div className="map">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    ) : (
        <div>
            <h1>No event found</h1>
        </div>
    )
};

export default SingleEvent;