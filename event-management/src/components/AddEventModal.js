import React, { useState } from 'react';
import { Modal, TextField, Button, Box, Typography } from '@mui/material';

const styles = {
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    width: '90%',
    maxWidth: '400px',
    padding: '20px',
    borderRadius: '4px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '20px',
  },
};

const AddEventModal = ({ open, onClose, onSubmit }) => {
    const [formValues, setFormValues] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
      });
    
      const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    
      const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit(formValues);
        setFormValues({
          title: '',
          date: '',
          time: '',
          location: '',
          description: '',
        });
      };
  return (
    <Modal open={open} onClose={onClose} style={styles.modalContainer}>
    <div style={styles.modalContent}>
      <Typography variant="h4" style={styles.title}>
        Add Event
      </Typography>
      <form style={styles.form} onSubmit={handleSubmit}>
          <TextField
            name="title"
            label="Title"
            variant="outlined"
            size="small"
            value={formValues.title}
            onChange={handleFormChange}
            required
          />
          <TextField
            name="date"
            // label="Date"
            type="date"
            variant="outlined"
            size="small"
            value={formValues.date}
            onChange={handleFormChange}
            required
          />
          <TextField
            name="time"
            // label="Time"
            type="time"
            variant="outlined"
            size="small"
            value={formValues.time}
            onChange={handleFormChange}
            required
          />
          <TextField
            name="location"
            label="Location"
            variant="outlined"
            size="small"
            value={formValues.location}
            onChange={handleFormChange}
            required
          />
          <TextField
            name="description"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            size="small"
            value={formValues.description}
            onChange={handleFormChange}
            required
          />
         <Box style={styles.buttonContainer}>
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          </Box>
        </form>
      </div>
    </Modal>
  );
};

export default AddEventModal;
