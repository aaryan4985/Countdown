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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  useMediaQuery,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Add as AddIcon,
  Timer as TimerIcon,
  AccessTime as AccessTimeIcon,
  Description as DescriptionIcon,
  Event as EventIcon,
  Edit as EditIcon,
} from "@mui/icons-material";
import axios from "axios";
import { formatDistanceToNow, differenceInSeconds } from "date-fns";

function App() {
  const theme = useTheme();
  const [timers, setTimers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTimer, setCurrentTimer] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    targetDate: "",
    targetTime: "",
    description: "",
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
      showSnackbar("Failed to fetch timers", "error");
    }
  };

  const handleOpen = () => {
    setOpen(true);
    setEditMode(false);
    setFormData({
      title: "",
      targetDate: "",
      targetTime: "",
      description: "",
    });
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentTimer(null);
    setFormData({
      title: "",
      targetDate: "",
      targetTime: "",
      description: "",
    });
  };

  const handleEdit = (timer) => {
    const date = new Date(timer.targetDate);
    setCurrentTimer(timer);
    setFormData({
      title: timer.title,
      targetDate: date.toISOString().split("T")[0],
      targetTime: date.toTimeString().slice(0, 5),
      description: timer.description,
    });
    setEditMode(true);
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/timers/${id}`);
      setTimers(timers.filter((timer) => timer._id !== id));
      showSnackbar("Timer deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting timer:", error);
      showSnackbar("Failed to delete timer", "error");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const targetDateTime = new Date(
        `${formData.targetDate}T${formData.targetTime}`
      );
      const submitData = {
        ...formData,
        targetDate: targetDateTime.toISOString(),
      };

      if (editMode) {
        await axios.put(
          `http://localhost:5000/api/timers/${currentTimer._id}`,
          submitData
        );
        setTimers(
          timers.map((timer) =>
            timer._id === currentTimer._id ? { ...timer, ...submitData } : timer
          )
        );
        showSnackbar("Timer updated successfully", "success");
      } else {
        const response = await axios.post(
          "http://localhost:5000/api/timers",
          submitData
        );
        setTimers([...timers, response.data]);
        showSnackbar("Timer created successfully", "success");
      }
      handleClose();
    } catch (error) {
      console.error("Error saving timer:", error);
      showSnackbar("Failed to save timer", "error");
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const calculateTimeLeft = (targetDate) => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `radial-gradient(circle at top right, ${alpha(
          theme.palette.secondary.main,
          0.1
        )} 0%, transparent 50%),
                    radial-gradient(circle at bottom left, ${alpha(
                      theme.palette.primary.main,
                      0.1
                    )} 0%, transparent 50%)`,
        py: 8,
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
                mb: 8,
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: -16,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: 60,
                  height: 4,
                  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                  borderRadius: 2,
                },
              }}
            >
              Countdown Timer
            </Typography>

            <Zoom in timeout={1000}>
              <Paper
                elevation={0}
                sx={{
                  p: 5,
                  mb: 8,
                  borderRadius: 4,
                  background: alpha(theme.palette.background.paper, 0.8),
                  backdropFilter: "blur(20px)",
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                  boxShadow: `0 4px 6px -1px ${alpha(
                    theme.palette.primary.main,
                    0.1
                  )}, 0 2px 4px -1px ${alpha(
                    theme.palette.primary.main,
                    0.06
                  )}`,
                }}
              >
                <form onSubmit={handleSubmit}>
                  <Grid container spacing={4}>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Event Title"
                        name="title"
                        value={formData.title}
                        onChange={(e) =>
                          setFormData({ ...formData, title: e.target.value })
                        }
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <TimerIcon color="primary" sx={{ mr: 1.5 }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Target Date"
                        name="targetDate"
                        type="date"
                        value={formData.targetDate}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            targetDate: e.target.value,
                          })
                        }
                        required
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <EventIcon color="primary" sx={{ mr: 1.5 }} />
                          ),
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Target Time"
                        name="targetTime"
                        type="time"
                        value={formData.targetTime}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            targetTime: e.target.value,
                          })
                        }
                        required
                        variant="outlined"
                        InputLabelProps={{ shrink: true }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        label="Description"
                        name="description"
                        value={formData.description}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                        multiline
                        rows={3}
                        variant="outlined"
                        InputProps={{
                          startAdornment: (
                            <DescriptionIcon
                              color="primary"
                              sx={{ mr: 1.5, mt: 1.5 }}
                            />
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
                          py: 1.75,
                          borderRadius: 3,
                          textTransform: "none",
                          fontSize: "1.1rem",
                          background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                          "&:hover": {
                            background: `linear-gradient(135deg, ${theme.palette.secondary.dark} 0%, ${theme.palette.secondary.main} 100%)`,
                          },
                        }}
                      >
                        {editMode ? "Update" : "Create"} Timer
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Zoom>

            <List sx={{ mt: 4 }}>
              {timers.map((timer) => {
                const timeLeft = calculateTimeLeft(timer.targetDate);
                const isExpired = Object.values(timeLeft).every(
                  (value) => value === 0
                );

                return (
                  <Fade in timeout={500} key={timer._id}>
                    <Card
                      sx={{
                        mb: 4,
                        borderRadius: 4,
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                        background: alpha(theme.palette.background.paper, 0.8),
                        backdropFilter: "blur(20px)",
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.1
                        )}`,
                        "&:hover": {
                          transform: "translateY(-4px)",
                          boxShadow: `0 20px 25px -5px ${alpha(
                            theme.palette.primary.main,
                            0.1
                          )}, 0 10px 10px -5px ${alpha(
                            theme.palette.primary.main,
                            0.04
                          )}`,
                        },
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={3} alignItems="center">
                          <Grid item xs={12} sm={8}>
                            <Stack spacing={3}>
                              <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                  fontWeight: 600,
                                  color: theme.palette.text.primary,
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <TimerIcon color="primary" />
                                {timer.title}
                              </Typography>
                              <Typography
                                variant="h3"
                                sx={{
                                  fontWeight: 700,
                                  background: `linear-gradient(135deg, ${theme.palette.secondary.main} 0%, ${theme.palette.secondary.dark} 100%)`,
                                  backgroundClip: "text",
                                  WebkitBackgroundClip: "text",
                                  color: "transparent",
                                  mb: 1,
                                  letterSpacing: "-0.02em",
                                }}
                              >
                                {Object.entries(timeLeft).map(
                                  ([unit, value]) => (
                                    <span key={unit}>
                                      {value > 0 && (
                                        <>
                                          {value} {unit}
                                        </>
                                      )}
                                    </span>
                                  )
                                )}
                              </Typography>
                              {timer.description && (
                                <Typography
                                  variant="body1"
                                  color="text.secondary"
                                  sx={{
                                    mt: 1,
                                    lineHeight: 1.7,
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 1,
                                  }}
                                >
                                  <DescriptionIcon
                                    sx={{
                                      mt: 0.5,
                                      color: theme.palette.text.secondary,
                                    }}
                                  />
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
                            <Tooltip title="Edit Timer" placement="left">
                              <IconButton
                                onClick={() => handleEdit(timer)}
                                color="primary"
                                sx={{
                                  "&:hover": {
                                    backgroundColor: alpha(
                                      theme.palette.primary.main,
                                      0.1
                                    ),
                                  },
                                }}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete Timer" placement="left">
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
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Fade>
                );
              })}
            </List>
          </Box>
        </Fade>

        <Dialog
          open={open}
          onClose={handleClose}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Zoom}
        >
          <DialogTitle>{editMode ? "Edit Timer" : "Add New Timer"}</DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
                margin="normal"
                variant="outlined"
              />
              <TextField
                fullWidth
                label="Target Date"
                name="targetDate"
                type="date"
                value={formData.targetDate}
                onChange={(e) =>
                  setFormData({ ...formData, targetDate: e.target.value })
                }
                required
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Target Time"
                name="targetTime"
                type="time"
                value={formData.targetTime}
                onChange={(e) =>
                  setFormData({ ...formData, targetTime: e.target.value })
                }
                required
                margin="normal"
                variant="outlined"
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                margin="normal"
                variant="outlined"
                multiline
                rows={3}
              />
            </DialogContent>
            <DialogActions sx={{ px: 3, pb: 3 }}>
              <Button onClick={handleClose} color="inherit">
                Cancel
              </Button>
              <Button type="submit" variant="contained" sx={{ px: 3 }}>
                {editMode ? "Update" : "Create"}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSnackbar}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
}

export default App;
