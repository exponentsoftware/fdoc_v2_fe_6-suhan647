import React, { useEffect, useState } from 'react';
import { Paper, Typography, List, ListItem, ListItemText, Container, Grid, Box } from '@mui/material';
import { useParams } from 'react-router';
import { styled } from '@mui/system';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '4px',
  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  backgroundColor: '#ffffff',
}));

const StyledHeading = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  fontSize: '2rem',
  fontWeight: 'bold',
  textAlign: 'center',
  color: '#333333',
}));

const StyledTitle = styled(Typography)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  fontSize: '1.5rem',
  fontWeight: 'bold',
  margin: '0',
  color: 'green',
}));

const StyledDetailLabel = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  marginTop:'30px',
  color: '#888888',
}));

const StyledDetailText = styled(Typography)(({ theme }) => ({
  color: '#555555',
}));

const StyledDescription = styled(Typography)(({ theme }) => ({
  color: '#555555',
  textAlign: 'center',
  marginTop:'30px',
}));

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetch(`/api/events/${id}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEvent(data);
      });
  }, [id]);

  if (!event) {
    return <h1>Loading .....</h1>; 
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f2f2f2',
      }}
    >
      <Container maxWidth="md">
        <StyledPaper>
          <StyledHeading variant="h2">
            Event Details
          </StyledHeading>
          <List>
            <ListItem>
              <ListItemText>
                <StyledTitle variant="h4">
                  {event.event.title}
                </StyledTitle>
                <Grid container spacing={4}>
                  <Grid item xs={12} sm={4}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <StyledDetailLabel variant="body1">
                      <b>  Date:</b>
                      </StyledDetailLabel>
                      <StyledDetailText variant="body1">
                        {event.event.date}
                      </StyledDetailText>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <StyledDetailLabel variant="body1">
                       <b> Time:</b>
                      </StyledDetailLabel>
                      <StyledDetailText variant="body1">
                        {event.event.time}
                      </StyledDetailText>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <StyledDetailLabel variant="body1">
                        <b>Location:</b>
                      </StyledDetailLabel>
                      <StyledDetailText variant="body1">
                        {event.event.location}
                      </StyledDetailText>
                    </div>
                  </Grid>
                </Grid>
                <StyledDescription variant="body1">
                  {event.event.description}
                </StyledDescription>
              </ListItemText>
            </ListItem>
          </List>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default EventDetails;
