import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Event } from '../../interfaces';
import { Link } from 'react-router-dom';
import { useEffect,useState } from 'react';
import { formatDate,getDateDetails } from '../../services/dateHelper';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
const EventHomeCard: React.FC<Event> = (Event) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    const [eventDay , setEventDay] = useState('');
    const [eventMonth , setEventMonth] = useState('');
    const [eventTime , setEventTime] = useState('');
    useEffect(() => {
        const [month, day] = formatDate(Event.start_date).split(' ');
    setEventDay(day);
    setEventMonth(month);
    const {time:startTime,timezone} = getDateDetails(Event.start_date);
    setEventTime(`${startTime} ${timezone}`);
      
    },[])

    const limitString = (str:string, limit:number) => {
        return str.length > limit ? `${str.substring(0, limit)}...` : str;
      };
    return (
                    <Card sx={{ maxWidth: 375,height:450,display:'flex',flexDirection:'column',justifyContent:'space-evenly' }} >
                        <CardMedia
                            sx={{ height: 240, backgroundPosition: 'center top' }}
                            image={apiUrl + '/images/' + Event.image}
                            title=""
                        />
                        <CardContent sx={{height:'40%',display:'flex',flexDirection:'column',justifyContent:'start'}}>
                            <Typography gutterBottom variant="h6" component="div" sx={{height:'33%',wordBreak:'break-word',lineHeight:'1.2',overflow:'hidden'}}>
                            {limitString(Event.name, 50)}
                            </Typography>
                            <Typography variant="body2" color="black" paddingBottom={1} sx={{height:'33%',fontSize:'14px' }}>
                               {`${eventDay} ${eventMonth} at ${eventTime}` }                               
                            </Typography>
                            
                            <Typography variant="body2" color="text.secondary" sx={{fontSize:'14px',height:'33%'}} >
                                {limitString(Event.description, 100)}
                            </Typography>
                        </CardContent>
                        <CardActions>
                           
                            <AwesomeButton type="primary" style={{width:'100%'}}><Link to={`/events/${Event.id}`} state={Event}>View Event Details</Link></AwesomeButton>
                           
                        </CardActions>
                    </Card>

    );
}

export default EventHomeCard;