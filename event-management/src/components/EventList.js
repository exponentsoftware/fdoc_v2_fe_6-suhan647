import { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
import { Link } from 'react-router-dom';
import "../App.css";

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: '#f2f2f2',
  },
  paper: {
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#ffffff',
    maxWidth: '500px',
    width: '100%',
    height: '600px',
    overflow: 'auto',
    margin: '20px 0',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  listItem: {
    marginBottom: '10px',
    border: '1px solid #eeeeee',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: '18px',
    fontWeight: 'bold',
    margin: 0,
    color: '#555555',
  },
  link: {
    textDecoration: 'none',
  },
};

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events') 
      .then((response) => response.json())
      .then((data) => setEvents(data.events))
      .catch((error) => console.error('Error fetching events:', error));
  }, []);

  return (
    <div style={styles.container}>
      <Paper style={styles.paper}>
        <Typography variant="h4" style={styles.heading}>
          Event List
        </Typography>
        <List>
          {events.map((event) => (
            <Link to={`/details/${event.id}`} key={event.id} style={styles.link}>
              <ListItem style={styles.listItem}>
                <ListItemIcon>
                  <EventIcon />
                </ListItemIcon>
                <ListItemText>
                  <Typography variant="h5" style={styles.title}>
                    {event.title}
                  </Typography>
                  <Typography variant="body1" color="textSecondary">
                    {event.description}
                  </Typography>
                </ListItemText>
              </ListItem>
            </Link>
          ))}
        </List>
      </Paper>
    </div>
  );
};

export default EventList;
