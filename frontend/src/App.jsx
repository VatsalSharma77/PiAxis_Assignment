import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
  Paper,
  CircularProgress,
  Alert,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AutoFixHighIcon from "@mui/icons-material/AutoFixHigh";
import LayersIcon from "@mui/icons-material/Layers";
import TuneIcon from "@mui/icons-material/Tune";

import {
  getDetails,
  searchDetails,
  suggestDetails,
} from "./api/api";

function App() {
  const [details, setDetails] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [suggestion, setSuggestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    host_element: "",
    adjacent_element: "",
    exposure: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await getDetails();
        setDetails(response.data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to load details. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await searchDetails(searchText);
      setDetails(response.data);
    } catch (error) {
      console.error("Search error:", error);
      setError("Search failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSuggest = async () => {
    if (!formData.host_element || !formData.adjacent_element || !formData.exposure) {
      setError("Please fill in all fields before suggesting.");
      return;
    }

    try {
      setSuggestLoading(true);
      setError(null);
      const response = await suggestDetails(
        formData.host_element,
        formData.adjacent_element,
        formData.exposure
      );

      if (response.status === "success" && response.data) {
        setSuggestion(response.data);
      } else {
        setError("No matching detail found.");
        setSuggestion(null);
      }
    } catch (error) {
      console.error("Suggest error:", error);
      setError("Failed to get suggestion. Please try again.");
      setSuggestion(null);
    } finally {
      setSuggestLoading(false);
    }
  };

  const handleClearSearch = async () => {
    setSearchText("");
    try {
      setLoading(true);
      setError(null);
      const response = await getDetails();
      setDetails(response.data);
    } catch (error) {
      console.error("Error:", error);
      setError("Failed to load details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        minHeight: "100vh",
        py: 6,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        {/* Header Section */}
        <Box
          sx={{
            mb: 6,
            textAlign: "center",
            animation: "fadeInDown 0.8s ease-out",
            "@keyframes fadeInDown": {
              from: { opacity: 0, transform: "translateY(-30px)" },
              to: { opacity: 1, transform: "translateY(0)" },
            },
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", mb: 2 }}>
            <LayersIcon sx={{ fontSize: 48, color: "#60a5fa", mr: 2 }} />
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                letterSpacing: "-0.02em",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Detail Management
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            sx={{
              color: "#94a3b8",
              fontWeight: 400,
              letterSpacing: "0.05em",
              fontFamily: "'Inter', sans-serif",
            }}
          >
            Smart construction detail search and AI-powered recommendations
          </Typography>
        </Box>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            onClose={() => setError(null)}
            sx={{
              mb: 4,
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(239, 68, 68, 0.2)",
              color: "#fca5a5",
              borderRadius: 2,
              animation: "slideIn 0.3s ease-out",
              "@keyframes slideIn": {
                from: { opacity: 0, transform: "translateY(-10px)" },
                to: { opacity: 1, transform: "translateY(0)" },
              },
            }}
          >
            {error}
          </Alert>
        )}

        <Grid container spacing={4}>
          {/* Search Section */}
          <Grid
            item
            xs={12}
            md={7}
            sx={{
              animation: "fadeInLeft 0.8s ease-out",
              "@keyframes fadeInLeft": {
                from: { opacity: 0, transform: "translateX(-30px)" },
                to: { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            <Card
              sx={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(20px)",
                borderRadius: 3,
                border: "1px solid rgba(148, 163, 184, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 48px rgba(96, 165, 250, 0.2)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <SearchIcon sx={{ color: "#60a5fa", mr: 1.5, fontSize: 28 }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#e2e8f0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Search Details
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                  <TextField
                    fullWidth
                    label="Search by title, tags, description"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: "rgba(15, 23, 42, 0.6)",
                        color: "#e2e8f0",
                        borderRadius: 2,
                        "& fieldset": {
                          borderColor: "rgba(148, 163, 184, 0.2)",
                        },
                        "&:hover fieldset": {
                          borderColor: "rgba(96, 165, 250, 0.5)",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#60a5fa",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#94a3b8",
                      },
                      "& .MuiInputLabel-root.Mui-focused": {
                        color: "#60a5fa",
                      },
                    }}
                  />
                  <Button
                    variant="contained"
                    startIcon={<SearchIcon />}
                    onClick={handleSearch}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                      color: "#fff",
                      px: 3,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 600,
                      boxShadow: "0 4px 14px rgba(59, 130, 246, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(59, 130, 246, 0.5)",
                      },
                      "&:disabled": {
                        background: "rgba(100, 116, 139, 0.3)",
                      },
                    }}
                  >
                    Search
                  </Button>
                  {searchText && (
                    <Button
                      variant="outlined"
                      onClick={handleClearSearch}
                      sx={{
                        borderColor: "rgba(148, 163, 184, 0.3)",
                        color: "#94a3b8",
                        borderRadius: 2,
                        textTransform: "none",
                        fontWeight: 600,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#60a5fa",
                          color: "#60a5fa",
                          backgroundColor: "rgba(96, 165, 250, 0.1)",
                        },
                      }}
                    >
                      Clear
                    </Button>
                  )}
                </Box>

                <Paper
                  variant="outlined"
                  sx={{
                    p: 3,
                    minHeight: 300,
                    maxHeight: 500,
                    overflowY: "auto",
                    backgroundColor: "rgba(15, 23, 42, 0.4)",
                    borderRadius: 2,
                    border: "1px solid rgba(148, 163, 184, 0.1)",
                    "&::-webkit-scrollbar": {
                      width: "8px",
                    },
                    "&::-webkit-scrollbar-track": {
                      background: "rgba(15, 23, 42, 0.3)",
                      borderRadius: "4px",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      background: "rgba(96, 165, 250, 0.3)",
                      borderRadius: "4px",
                      "&:hover": {
                        background: "rgba(96, 165, 250, 0.5)",
                      },
                    },
                  }}
                >
                  {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
                      <CircularProgress sx={{ color: "#60a5fa" }} />
                    </Box>
                  ) : details.length === 0 ? (
                    <Box sx={{ textAlign: "center", py: 8 }}>
                      <SearchIcon sx={{ fontSize: 64, color: "rgba(148, 163, 184, 0.3)", mb: 2 }} />
                      <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                        No details found. Try a different search term.
                      </Typography>
                    </Box>
                  ) : (
                    details.map((item, index) => (
                      <Box
                        key={item.id || index}
                        sx={{
                          mb: 2,
                          pb: 2,
                          borderBottom:
                            index < details.length - 1
                              ? "1px solid rgba(148, 163, 184, 0.1)"
                              : "none",
                          transition: "all 0.3s ease",
                          borderRadius: 1,
                          p: 2,
                          "&:hover": {
                            backgroundColor: "rgba(96, 165, 250, 0.05)",
                            transform: "translateX(4px)",
                          },
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 700,
                            color: "#60a5fa",
                            fontSize: "1.1rem",
                            mb: 1,
                            fontFamily: "'Poppins', sans-serif",
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#cbd5e1",
                            mb: 1.5,
                            lineHeight: 1.6,
                          }}
                        >
                          {item.description}
                        </Typography>
                        <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                          <Chip
                            label={item.category}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(139, 92, 246, 0.2)",
                              color: "#c4b5fd",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              border: "1px solid rgba(139, 92, 246, 0.3)",
                            }}
                          />
                          <Chip
                            label={item.tags}
                            size="small"
                            sx={{
                              backgroundColor: "rgba(59, 130, 246, 0.2)",
                              color: "#93c5fd",
                              fontSize: "0.75rem",
                              fontWeight: 600,
                              border: "1px solid rgba(59, 130, 246, 0.3)",
                            }}
                          />
                        </Box>
                      </Box>
                    ))
                  )}
                </Paper>
              </CardContent>
            </Card>
          </Grid>

          {/* Suggest Section */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              animation: "fadeInRight 0.8s ease-out",
              "@keyframes fadeInRight": {
                from: { opacity: 0, transform: "translateX(30px)" },
                to: { opacity: 1, transform: "translateX(0)" },
              },
            }}
          >
            <Card
              sx={{
                background: "rgba(30, 41, 59, 0.8)",
                backdropFilter: "blur(20px)",
                borderRadius: 3,
                border: "1px solid rgba(148, 163, 184, 0.1)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
                transition: "all 0.3s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 48px rgba(139, 92, 246, 0.2)",
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <AutoFixHighIcon sx={{ color: "#a78bfa", mr: 1.5, fontSize: 28 }} />
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 700,
                      color: "#e2e8f0",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    Detail Suggestion
                  </Typography>
                </Box>

                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                 
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <FormControl
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(15, 23, 42, 0.6)",
                          color: "#e2e8f0",
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: "rgba(148, 163, 184, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(167, 139, 250, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#a78bfa",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#94a3b8",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#a78bfa",
                        },
                        "& .MuiSelect-icon": {
                          color: "#94a3b8",
                        },
                      }}
                    >
                      <InputLabel>Host Element</InputLabel>
                      <Select
                        value={formData.host_element}
                        label="Host Element"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            host_element: e.target.value,
                          })
                        }
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "rgba(30, 41, 59, 0.95)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              "& .MuiMenuItem-root": {
                                color: "#e2e8f0",
                                "&:hover": {
                                  backgroundColor: "rgba(167, 139, 250, 0.2)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(167, 139, 250, 0.3)",
                                  "&:hover": {
                                    backgroundColor: "rgba(167, 139, 250, 0.4)",
                                  },
                                },
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value="External Wall">External Wall</MenuItem>
                        <MenuItem value="Internal Wall">Internal Wall</MenuItem>
                        <MenuItem value="Window">Window</MenuItem>
                      </Select>
                    </FormControl>
                    {formData.host_element && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setFormData({ ...formData, host_element: "" })}
                        sx={{
                          mt: 1,
                          minWidth: "auto",
                          px: 2,
                          borderColor: "rgba(148, 163, 184, 0.3)",
                          color: "#94a3b8",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#a78bfa",
                            color: "#a78bfa",
                            backgroundColor: "rgba(167, 139, 250, 0.1)",
                          },
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </Box>

                  {/* Adjacent Element */}
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <FormControl
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(15, 23, 42, 0.6)",
                          color: "#e2e8f0",
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: "rgba(148, 163, 184, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(167, 139, 250, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#a78bfa",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#94a3b8",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#a78bfa",
                        },
                        "& .MuiSelect-icon": {
                          color: "#94a3b8",
                        },
                      }}
                    >
                      <InputLabel>Adjacent Element</InputLabel>
                      <Select
                        value={formData.adjacent_element}
                        label="Adjacent Element"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            adjacent_element: e.target.value,
                          })
                        }
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "rgba(30, 41, 59, 0.95)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              "& .MuiMenuItem-root": {
                                color: "#e2e8f0",
                                "&:hover": {
                                  backgroundColor: "rgba(167, 139, 250, 0.2)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(167, 139, 250, 0.3)",
                                  "&:hover": {
                                    backgroundColor: "rgba(167, 139, 250, 0.4)",
                                  },
                                },
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value="Slab">Slab</MenuItem>
                        <MenuItem value="Floor">Floor</MenuItem>
                        <MenuItem value="External Wall">External Wall</MenuItem>
                      </Select>
                    </FormControl>
                    {formData.adjacent_element && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setFormData({ ...formData, adjacent_element: "" })}
                        sx={{
                          mt: 1,
                          minWidth: "auto",
                          px: 2,
                          borderColor: "rgba(148, 163, 184, 0.3)",
                          color: "#94a3b8",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#a78bfa",
                            color: "#a78bfa",
                            backgroundColor: "rgba(167, 139, 250, 0.1)",
                          },
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </Box>

                 
                  <Box sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <FormControl
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          backgroundColor: "rgba(15, 23, 42, 0.6)",
                          color: "#e2e8f0",
                          borderRadius: 2,
                          "& fieldset": {
                            borderColor: "rgba(148, 163, 184, 0.2)",
                          },
                          "&:hover fieldset": {
                            borderColor: "rgba(167, 139, 250, 0.5)",
                          },
                          "&.Mui-focused fieldset": {
                            borderColor: "#a78bfa",
                          },
                        },
                        "& .MuiInputLabel-root": {
                          color: "#94a3b8",
                        },
                        "& .MuiInputLabel-root.Mui-focused": {
                          color: "#a78bfa",
                        },
                        "& .MuiSelect-icon": {
                          color: "#94a3b8",
                        },
                      }}
                    >
                      <InputLabel>Exposure</InputLabel>
                      <Select
                        value={formData.exposure}
                        label="Exposure"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            exposure: e.target.value,
                          })
                        }
                        MenuProps={{
                          PaperProps: {
                            sx: {
                              backgroundColor: "rgba(30, 41, 59, 0.95)",
                              backdropFilter: "blur(10px)",
                              border: "1px solid rgba(148, 163, 184, 0.2)",
                              "& .MuiMenuItem-root": {
                                color: "#e2e8f0",
                                "&:hover": {
                                  backgroundColor: "rgba(167, 139, 250, 0.2)",
                                },
                                "&.Mui-selected": {
                                  backgroundColor: "rgba(167, 139, 250, 0.3)",
                                  "&:hover": {
                                    backgroundColor: "rgba(167, 139, 250, 0.4)",
                                  },
                                },
                              },
                            },
                          },
                        }}
                      >
                        <MenuItem value="External">External</MenuItem>
                        <MenuItem value="Internal">Internal</MenuItem>
                      </Select>
                    </FormControl>
                    {formData.exposure && (
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => setFormData({ ...formData, exposure: "" })}
                        sx={{
                          mt: 1,
                          minWidth: "auto",
                          px: 2,
                          borderColor: "rgba(148, 163, 184, 0.3)",
                          color: "#94a3b8",
                          borderRadius: 2,
                          textTransform: "none",
                          fontWeight: 600,
                          transition: "all 0.3s ease",
                          "&:hover": {
                            borderColor: "#a78bfa",
                            color: "#a78bfa",
                            backgroundColor: "rgba(167, 139, 250, 0.1)",
                          },
                        }}
                      >
                        Clear
                      </Button>
                    )}
                  </Box>

                  <Button
                    variant="contained"
                    startIcon={<AutoFixHighIcon />}
                    onClick={handleSuggest}
                    disabled={loading}
                    sx={{
                      background: "linear-gradient(135deg, #8b5cf6 0%, #a78bfa 100%)",
                      color: "#fff",
                      py: 1.5,
                      borderRadius: 2,
                      textTransform: "none",
                      fontWeight: 700,
                      fontSize: "1rem",
                      boxShadow: "0 4px 14px rgba(139, 92, 246, 0.4)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        background: "linear-gradient(135deg, #7c3aed 0%, #8b5cf6 100%)",
                        transform: "translateY(-2px)",
                        boxShadow: "0 6px 20px rgba(139, 92, 246, 0.5)",
                      },
                      "&:disabled": {
                        background: "rgba(100, 116, 139, 0.3)",
                      },
                    }}
                  >
                    Get Detail Suggestion
                  </Button>

                  <Paper
                    variant="outlined"
                    sx={{
                      p: 3,
                      minHeight: 180,
                      backgroundColor: "rgba(15, 23, 42, 0.4)",
                      borderRadius: 2,
                      border: "1px solid rgba(148, 163, 184, 0.1)",
                    }}
                  >
                    
                    {suggestLoading ? (
                      <Box sx={{ display: "flex", justifyContent: "center", py: 6 }}>
                        <CircularProgress sx={{ color: "#a78bfa" }} />
                      </Box>
                    ) : suggestion ? (
                      <>
                        {suggestion.message ? (
                          <Box sx={{ textAlign: "center", py: 4 }}>
                            <TuneIcon sx={{ fontSize: 48, color: "rgba(148, 163, 184, 0.3)", mb: 2 }} />
                            <Typography sx={{ color: "#94a3b8" }}>{suggestion.message}</Typography>
                          </Box>
                        ) : (
                          <Box
                            sx={{
                              animation: "fadeIn 0.5s ease-out",
                              "@keyframes fadeIn": {
                                from: { opacity: 0 },
                                to: { opacity: 1 },
                              },
                            }}
                          >
                            <Typography
                              sx={{
                                fontWeight: 700,
                                color: "#a78bfa",
                                fontSize: "1.2rem",
                                mb: 2,
                                fontFamily: "'Poppins', sans-serif",
                              }}
                            >
                              {suggestion.title}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: "#cbd5e1",
                                mb: 2,
                                lineHeight: 1.7,
                              }}
                            >
                              {suggestion.description}
                            </Typography>
                            {suggestion.explanation && (
                              <Box
                                sx={{
                                  mt: 3,
                                  p: 2,
                                  backgroundColor: "rgba(167, 139, 250, 0.1)",
                                  borderRadius: 2,
                                  border: "1px solid rgba(167, 139, 250, 0.2)",
                                }}
                              >
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: "#c4b5fd",
                                    fontStyle: "italic",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  <strong style={{ color: "#a78bfa" }}>AI Insight:</strong>{" "}
                                  {suggestion.explanation}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        )}
                      </>
                    ) : (
                      <Box sx={{ textAlign: "center", py: 6 }}>
                        <TuneIcon sx={{ fontSize: 48, color: "rgba(148, 163, 184, 0.3)", mb: 2 }} />
                        <Typography sx={{ color: "#64748b", fontSize: "0.95rem" }}>
                          Configure parameters above and click "Get AI Suggestion"
                        </Typography>
                      </Box>
                    )}
                  </Paper>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      {/* Add Google Fonts */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700;800&family=Inter:wght@400;600&display=swap');
        `}
      </style>
    </Box>
  );
}

export default App;