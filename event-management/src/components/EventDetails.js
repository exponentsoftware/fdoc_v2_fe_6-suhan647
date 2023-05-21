import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router';

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
    margin: '20px',
  },
  heading: {
    marginBottom: '20px',
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333333',
  },
  listItem: {
    marginBottom: '20px',
    border: '1px solid #eeeeee',
    borderRadius: '4px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  title: {
    display:'flex',
    justifyContent:'center',
    fontSize: '18px',
    fontWeight: 'bold',
    margin: '0',
    color: 'green',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '20px',
  },
  detailItem: {
    marginBottom: '10px',
    textAlign: 'center',
    color: '#777777',
    display: 'flex',
    alignItems: 'center',
  },
  detailLabel: {
    marginRight: '8px',
    color: '#888888',
  },
  detailText: {
    color: '#555555',
  },
  description: {
    color: '#555555',
    textAlign: 'center',
  },
};

const EventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState(null);
    
    useEffect(() => {
      fetch(`/api/events/${id}`)
        .then(response => response.json())
        .then(data => {
            console.log(data); // Log the fetched event data
            setEvent(data);
          });
    }, [id]);
  
    if (!event) {
      return null; // Render loading indicator or handle the case when the event is not found
    }

    // console.log("e",event.event.title);
  
    return (
      <div style={styles.container}>
        <Paper style={styles.paper}>
          <Typography variant="h4" style={styles.heading}>
            Event Details
          </Typography>
          <List>
            <ListItem style={styles.listItem}>
              <ListItemText>
                <Typography variant="h5" style={styles.title}>
                  {event.event.title}
                </Typography>
                <div style={styles.details}>
                  <div style={styles.detailItem}>
                    <Typography variant="body1" style={styles.detailLabel}>
                      Date:
                    </Typography>
                    <Typography variant="body1" style={styles.detailText}>
                      {event.event.date}
                    </Typography>
                  </div>
                  <div style={styles.detailItem}>
                    <Typography variant="body1" style={styles.detailLabel}>
                      Time:
                    </Typography>
                    <Typography variant="body1" style={styles.detailText}>
                      {event.event.time}
                    </Typography>
                  </div>
                  <div style={styles.detailItem}>
                    <Typography variant="body1" style={styles.detailLabel}>
                      Location:
                    </Typography>
                    <Typography variant="body1" style={styles.detailText}>
                      {event.event.location}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body1" style={styles.description}>
                  {event.event.description}
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        </Paper>
      </div>
    );
  };
  
  export default EventDetails;