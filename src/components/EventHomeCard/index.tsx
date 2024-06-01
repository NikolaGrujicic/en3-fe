import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Event } from '../../interfaces';
import { Container, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
const EventHomeCard: React.FC<Event> = (Event) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    
    return (
        <Container maxWidth="lg"> {/* Define Container */}
            <Grid container spacing={3}> {/* Define Grid container */}
                <Grid item xs={12} sm={6} md={4} lg={3}>
                    <Card sx={{ maxWidth: 375 }} >
                        <CardMedia
                            sx={{ height: 240 }}
                            image={apiUrl + '/images/' + Event.image}
                            title=""
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {Event.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {Event.start_date}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {Event.description}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" >Share</Button>
                            <Button size="small" > <Link to={`/events/${Event.id}`} state={Event}>Learn More</Link></Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
}

export default EventHomeCard;