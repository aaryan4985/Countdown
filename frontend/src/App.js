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
  Stack,
  Tooltip,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Timer as TimerIcon,
  AccessTime as AccessTimeIcon,
  Description as DescriptionIcon,
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
          0.05
        )} 0%, ${alpha(theme.palette.secondary.main, 0.05)} 100%)`,
        py: 6,
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
                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                mb: 6,
              }}
            >
              Countdown Timer
            </Typography>

            <Zoom in timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  mb: 6,
                  borderRadius: 4,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
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
                        InputProps={{
                          startAdornment: (
                            <AccessTimeIcon color="primary" sx={{ mr: 1 }} />
                          ),
                        }}
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
                        InputProps={{
                          startAdornment: (
                            <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                          ),
                        }}
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
                          borderRadius: 3,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
                          },
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
                      mb: 3,
                      borderRadius: 4,
                      transition: "all 0.3s ease-in-out",
                      background: alpha(theme.palette.background.paper, 0.8),
                      backdropFilter: "blur(20px)",
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                      "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: `0 12px 24px -8px ${alpha(
                          theme.palette.primary.main,
                          0.2
                        )}`,
                      },
                    }}
                  >
                    <CardContent>
                      <Grid container spacing={3} alignItems="center">
                        <Grid item xs={12} sm={8}>
                          <Stack spacing={2}>
                            <Typography
                              variant="h5"
                              component="div"
                              sx={{
                                fontWeight: 600,
                                color: theme.palette.text.primary,
                              }}
                            >
                              {timer.title}
                            </Typography>
                            <Typography
                              variant="h4"
                              sx={{
                                fontWeight: 700,
                                background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                backgroundClip: "text",
                                WebkitBackgroundClip: "text",
                                color: "transparent",
                                mb: 1,
                              }}
                            >
                              {getTimeRemaining(timer.targetDate)}
                            </Typography>
                            {timer.description && (
                              <Typography
                                variant="body1"
                                color="text.secondary"
                                sx={{
                                  mt: 1,
                                  lineHeight: 1.6,
                                }}
                              >
                                {timer.description}
                              </Typography>
                            )}
                            <Stack direction="row" spacing={1}>
                              <Chip
                                icon={<AccessTimeIcon />}
                                label={formatDistanceToNow(
                                  new Date(timer.targetDate),
                                  { addSuffix: true }
                                )}
                                size="small"
                                color="primary"
                                variant="outlined"
                              />
                            </Stack>
                          </Stack>
                        </Grid>
                        <Grid item xs={12} sm={4} sx={{ textAlign: "right" }}>
                          <Tooltip title="Delete Timer">
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
                          </Tooltip>
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
