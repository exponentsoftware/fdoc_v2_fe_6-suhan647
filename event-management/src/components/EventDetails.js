import React, { useState } from 'react';
import dummyevents from './dummyevents.json';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import EventIcon from '@mui/icons-material/Event';
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
  const event = dummyevents.events;
  const eventId = parseInt(id);
  const data = event.filter((e) => e.id === eventId);

  return (
    <div style={styles.container}>
      <Paper style={styles.paper}>
        <Typography variant="h4" style={styles.heading}>
          Event Details
        </Typography>
        {data.map((event) => (
          <List key={event.id}>
            <ListItem style={styles.listItem}>
              {/* <ListItemIcon>
                <EventIcon color="primary" />
              </ListItemIcon> */}
              <ListItemText>
                <Typography variant="h5" style={styles.title}>
                  {event.title}
                </Typography>
                <div style={styles.details}>
                  <div style={styles.detailItem}>
                    <Typography variant="body1" style={styles.detailLabel}>
                      Date:
                    </Typography>
                    <Typography variant="body1" style={styles.detailText}>
                      {event.date}
                    </Typography>
                  </div>
                  <div style={styles.detailItem}>
                    <Typography variant="body1" style={styles.detailLabel}>
                      Time:
                    </Typography>
                    <Typography variant="body1" style={styles.detailText}>
                      {event.time}
                    </Typography>
                  </div>
                  <div style={styles.detailItem}>
                    <Typography variant="body1" style={styles.detailLabel}>
                      Location:
                    </Typography>
                    <Typography variant="body1" style={styles.detailText}>
                      {event.location}
                    </Typography>
                  </div>
                </div>
                <Typography variant="body1" style={styles.description}>
                  {event.description}
                </Typography>
              </ListItemText>
            </ListItem>
          </List>
        ))}
      </Paper>
    </div>
  );
};

export default EventDetails;
