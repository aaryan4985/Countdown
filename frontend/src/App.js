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
  Fade,
  Zoom,
  useTheme,
  alpha,
  Card,
  CardContent,
  Divider,
  Chip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Timer as TimerIcon,
} from "@mui/icons-material";
import axios from "axios";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";

function App() {
  const theme = useTheme();
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

  const getTimeRemaining = (targetDate) => {
    const now = new Date();
    const target = new Date(targetDate);
    const seconds = differenceInSeconds(target, now);

    if (seconds <= 0) return "Time's up!";

    const days = Math.floor(seconds / (24 * 60 * 60));
    const hours = Math.floor((seconds % (24 * 60 * 60)) / (60 * 60));
    const minutes = Math.floor((seconds % (60 * 60)) / 60);
    const remainingSeconds = seconds % 60;

    return `${days}d ${hours}h ${minutes}m ${remainingSeconds}s`;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, ${alpha(
          theme.palette.primary.main,
          0.1
        )} 0%, ${alpha(theme.palette.secondary.main, 0.1)} 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="md">
        <Fade in timeout={1000}>
          <Box>
            <Typography
              variant="h2"
              component="h1"
              gutterBottom
              align="center"
              sx={{
                fontWeight: "bold",
                color: theme.palette.primary.main,
                textShadow: `2px 2px 4px ${alpha(
                  theme.palette.primary.main,
                  0.2
                )}`,
                mb: 4,
              }}
            >
              Countdown Timer
            </Typography>

            <Zoom in timeout={1000}>
              <Paper
                elevation={3}
                sx={{
                  p: 4,
                  mb: 4,
                  borderRadius: 2,
                  background: alpha(theme.palette.background.paper, 0.9),
                  backdropFilter: "blur(10px)",
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Event Title"
                        name="title"
                        value={newTimer.title}
                        onChange={handleInputChange}
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <TimerIcon color="primary" sx={{ mr: 1 }} />
                          ),
                        }}
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
                        variant="outlined"
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
                        variant="outlined"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        fullWidth
                        size="large"
                        startIcon={<AddIcon />}
                        sx={{
                          py: 1.5,
                          borderRadius: 2,
                          textTransform: "none",
                          fontSize: "1.1rem",
                        }}
                      >
                        Add Timer
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Zoom>

            <List sx={{ mt: 4 }}>
              {timers.map((timer, index) => (
                <Fade
                  in
                  timeout={500}
                  key={timer._id}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <Card
                    sx={{
                      mb: 2,
                      borderRadius: 2,
                      transition: "transform 0.2s",
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: theme.shadows[4],
                      },
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item xs={12} sm={8}>
                          <Typography variant="h6" component="div" gutterBottom>
                            {timer.title}
                          </Typography>
                          <Typography
                            variant="h4"
                            color="primary"
                            sx={{
                              fontWeight: "bold",
                              mb: 1,
                            }}
                          >
                            {getTimeRemaining(timer.targetDate)}
                          </Typography>
                          {timer.description && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              {timer.description}
                            </Typography>
                          )}
                          <Chip
                            label={formatDistanceToNow(
                              new Date(timer.targetDate),
                              { addSuffix: true }
                            )}
                            size="small"
                            color="secondary"
                            sx={{ mt: 1 }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                          <IconButton
                            onClick={() => handleDelete(timer._id)}
                            color="error"
                            sx={{
                              "&:hover": {
                                backgroundColor: alpha(
                                  theme.palette.error.main,
                                  0.1
                                ),
                              },
                            }}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Fade>
              ))}
            </List>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
}

export default App;
