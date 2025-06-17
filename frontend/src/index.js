import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import App from "./App";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1a1a1a",
      light: "#2d2d2d",
      dark: "#000000",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#6B7280",
      light: "#9CA3AF",
      dark: "#4B5563",
      contrastText: "#ffffff",
    },
    background: {
      default: "#ffffff",
      paper: "#ffffff",
    },
    text: {
      primary: "#1a1a1a",
      secondary: "#6B7280",
    },
    error: {
      main: "#DC2626",
      light: "#EF4444",
      dark: "#B91C1C",
    },
    success: {
      main: "#059669",
      light: "#10B981",
      dark: "#047857",
    },
    grey: {
      50: "#F9FAFB",
      100: "#F3F4F6",
      200: "#E5E7EB",
      300: "#D1D5DB",
      400: "#9CA3AF",
      500: "#6B7280",
      600: "#4B5563",
      700: "#374151",
      800: "#1F2937",
      900: "#111827",
    },
  },
  typography: {
    fontFamily:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "2.5rem",
    },
    h2: {
      fontWeight: 700,
      letterSpacing: "-0.02em",
      fontSize: "2rem",
    },
    h3: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      fontSize: "1.5rem",
    },
    h4: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      fontSize: "1.25rem",
    },
    h5: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      fontSize: "1.125rem",
    },
    h6: {
      fontWeight: 600,
      letterSpacing: "-0.02em",
      fontSize: "1rem",
    },
    button: {
      fontWeight: 500,
      letterSpacing: "0.01em",
      fontSize: "0.875rem",
    },
    subtitle1: {
      fontWeight: 500,
      letterSpacing: "0.01em",
      fontSize: "0.875rem",
    },
    body1: {
      letterSpacing: "0.01em",
      fontSize: "0.875rem",
      lineHeight: 1.6,
    },
    body2: {
      letterSpacing: "0.01em",
      fontSize: "0.75rem",
      lineHeight: 1.6,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 6,
          padding: "8px 16px",
          fontSize: "0.875rem",
          boxShadow: "none",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow: "none",
            backgroundColor: "#F3F4F6",
          },
        },
        contained: {
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#2d2d2d",
          },
        },
        outlined: {
          borderColor: "#E5E7EB",
          "&:hover": {
            borderColor: "#D1D5DB",
            backgroundColor: "#F9FAFB",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow:
            "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            borderRadius: 6,
            transition: "all 0.2s ease-in-out",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#D1D5DB",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#1a1a1a",
              borderWidth: "1px",
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          fontWeight: 500,
          height: 24,
          "& .MuiChip-label": {
            padding: "0 8px",
          },
        },
        outlined: {
          borderColor: "#E5E7EB",
          "&:hover": {
            backgroundColor: "#F9FAFB",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#F3F4F6",
          },
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: "#1F2937",
          borderRadius: 4,
          padding: "6px 8px",
          fontSize: "0.75rem",
        },
      },
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
);
