import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

function App() {
  const [timers, setTimers] = useState([]);
  const [newTimer, setNewTimer] = useState({
    title: "",
    targetDate: "",
    description: "",
  });

  useEffect(() => {
    fetchTimers();
    const interval = setInterval(fetchTimers, 1000);
    return () => clearInterval(interval);
  }, []);

  const fetchTimers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/timers");
      setTimers(response.data);
    } catch (error) {
      console.error("Error fetching timers:", error);
    }
  };

  const handleInputChange = (e) => {
    setNewTimer({
      ...newTimer,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/timers", newTimer);
      setNewTimer({ title: "", targetDate: "", description: "" });
      fetchTimers();
    } catch (error) {
      console.error("Error creating timer:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/timers/${id}`);
      fetchTimers();
    } catch (error) {
      console.error("Error deleting timer:", error);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Countdown Timer
        </Typography>

        <Paper sx={{ p: 3, mb: 3 }}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Event Title"
                  name="title"
                  value={newTimer.title}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Target Date"
                  name="targetDate"
                  type="datetime-local"
                  value={newTimer.targetDate}
                  onChange={handleInputChange}
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Description"
                  name="description"
                  value={newTimer.description}
                  onChange={handleInputChange}
                  multiline
                  rows={2}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Add Timer
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>

        <List>
          {timers.map((timer) => (
            <Paper key={timer._id} sx={{ mb: 2 }}>
              <ListItem>
                <ListItemText
                  primary={timer.title}
                  secondary={
                    <>
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.primary"
                      >
                        {formatDistanceToNow(new Date(timer.targetDate), {
                          addSuffix: true,
                        })}
                      </Typography>
                      {timer.description && (
                        <Typography component="p" variant="body2">
                          {timer.description}
                        </Typography>
                      )}
                    </>
                  }
                />
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => handleDelete(timer._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default App;
