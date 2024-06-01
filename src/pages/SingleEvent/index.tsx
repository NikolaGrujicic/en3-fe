import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { eventsData } from "../../config/const";
import { Event } from '../../interfaces';
import './index.scss'
import { getDayOfWeek, formatDate } from '../../services/dateHelper';
import { useLocation } from 'react-router-dom';

const SingleEvent: React.FC = () => {
    const navLocation = useLocation();
    

    const {
        start_date,
        name,
        description,
        id,
        image,
        capacity,
        location:eventLocation} = navLocation.state;
    
    const apiUrl = import.meta.env.VITE_API_URL;

    const [eventDay , setEventDay] = useState('');
    const [eventMonth , setEventMonth] = useState('');
    useEffect(() => {
        const [month, day] = formatDate(start_date).split(' ');
    setEventDay(day);
    setEventMonth(month);
      
    },[])
    return (
        <div className="single-event-wrapper">
            <div className="single-event">
                <div className="column-left">
                    <div className="image section-margin-bottom">
                        <img src={apiUrl + '/images/' + image} alt="" />
                    </div>
                    <div className="hosted-by section-margin-bottom">
                        <span className="title">Hosted by</span>
                        <div className="white-underline"></div>
                        {/* {
                            event?.speakers.map(speaker => (
                                <div className="hosted-by-row">
                                    <img src={`https://picsum.photos/330/330?random=${Math.floor(Math.random() * 20) + 1}`} alt="" />
                                    <span>{speaker}</span>
                                </div>
                            ))
                        } */}
                    </div>
                    <div className="going section-margin-bottom">
                        <span className="title">{capacity} Going</span>
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
                            {name}
                        </h2>
                        <div className="time-box section-margin-bottom">
                            <div className="icon-calendar">
                                <div className="month">{eventMonth}</div>
                                <div className="day">{eventDay}</div>
                            </div>
                            <div className="text">
                                <div className="title">
                                  
                                    {getDayOfWeek(start_date)}, {formatDate(start_date)}
                                    
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
                                   {eventLocation}
                                </div>
                                <div className="desc">{eventLocation}</div>
                            </div>
                        </div>
                    </div>
                    <div className="attending-infosection-margin-bottom">

                    </div>
                    <div className="description section-margin-bottom">
                        <span>About</span>
                        <div className="white-underline section-margin-bottom"></div>
                        <p><strong>{name}</strong></p>
                        <p>{description}</p>
                        

                    </div>
                    <div className="location section-margin-bottom">
                        <span>Location</span>
                        <div className="white-underline section-margin-bottom"></div>
                        {/* <p><strong>Via Privata Turro, 6</strong></p> */}
                        <p>{eventLocation} <br/></p>
                        <div className="map">

                        </div>
                    </div>

                </div>
            </div>
        </div>
    ) 
};

export default SingleEvent;