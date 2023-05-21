import { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemIcon, ListItemText, Box } from '@mui/material';
import { Link } from 'react-router-dom';
import "../App.css";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import AddEventModal from './AddEventModal';



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
    display: 'flex',
    justifyContent: 'space-between',
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editEvent, setEditEvent] = useState(null);

  
    useEffect(() => {
        fetch('/api/events')
          .then((response) => response.json())
          .then((data) => {
            setEvents(data.events);
          })
          .catch((error) => console.error('Error fetching events:', error));
      }, [editEvent]);
  
    const handleAddEvent = (newEvent) => {
      if (editEvent) {
        fetch(`/api/events/${editEvent.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
        })
          .then((response) => response.json())
          .then((data) => {
            setEvents((prevEvents) => prevEvents.map((event) => (event.id === data.id ? data : event)));
            setIsModalOpen(false);
            setEditEvent(null);
          })
          .catch((error) => console.error('Error updating event:', error));
      } else {
        fetch('/api/events', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newEvent),
        })
          .then((response) => response.json())
          .then((data) => {
            setEvents((prevEvents) => [...prevEvents, data]);
            setIsModalOpen(false);
          })
          .catch((error) => console.error('Error adding event:', error));
      }
    };
  
    const handleDeleteEvent = (eventId) => {
      fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      })
        .then(() => {
          setEvents((prevEvents) => prevEvents.filter((event) => event.id !== eventId));
        })
        .catch((error) => console.error('Error deleting event:', error));
    };
  
    const handleEditEvent = (event) => {
      setEditEvent(event);
      setIsModalOpen(true);
    };
    return (
      <div style={styles.container}>
        <Paper style={styles.paper}>
          <Typography variant="h4" style={styles.heading}>
            Event List
          </Typography>
          <Box sx={{ display: 'flex', margin: '20px' }}>
            <Button variant="contained" startIcon={<AddIcon />} onClick={() => setIsModalOpen(true)}>
              Add Event
            </Button>
          </Box>
          <List>
            {events.map((event) => (
              <ListItem style={styles.listItem} key={event.id}>
                <Link to={`/details/${event.id}`} style={styles.link}>
                  <ListItemText>
                    <Typography variant="h5" style={styles.title}>
                      {event.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {event.description}
                    </Typography>
                  </ListItemText>
                </Link>
                <div>
                  <ListItemIcon>
                    <EditIcon sx={{ cursor: 'pointer' }} onClick={() => handleEditEvent(event)} />
                  </ListItemIcon>
                  <ListItemIcon>
                  <DeleteIcon sx={{ cursor: 'pointer' }} onClick={() => handleDeleteEvent(event.id)} />
                  </ListItemIcon>
                </div> 
              </ListItem>
            ))}
          </List>
        </Paper>
        <AddEventModal
          open={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditEvent(null);
          }}
          onSubmit={handleAddEvent}
          editEvent={editEvent}
        />
      </div>
    );
  };
  
  export default EventList;