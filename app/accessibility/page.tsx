import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    TextField,
    FormControlLabel,
    Checkbox,
    FormGroup,
    MenuItem,
    Select,
    InputLabel,
    FormControl,
  } from "@mui/material"
  import { AccessibilityNew, DirectionsCar, Map, Feedback, ArrowBack } from "@mui/icons-material"
  import Link from "next/link"
  
  export default function AccessibilityPage() {
    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button component={Link} href="/" startIcon={<ArrowBack />} variant="text" sx={{ mr: 2 }}>
            Back to Dashboard
          </Button>
          <Typography variant="h4" component="h1">
            Accessibility & Curbside Pickup
          </Typography>
        </Box>
  
        <Typography variant="body1" paragraph>
          We're committed to making medication pickup accessible for everyone. Request curbside pickup or additional
          assistance.
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <DirectionsCar sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="h6">Schedule Curbside Pickup</Typography>
              </Box>
  
              <Box component="form" sx={{ mb: 3 }}>
                <TextField label="Prescription Number" fullWidth margin="normal" required />
  
                <TextField
                  label="Vehicle Description"
                  fullWidth
                  margin="normal"
                  placeholder="Make, model, color"
                  required
                />
  
                <FormControl fullWidth margin="normal" required>
                  <InputLabel id="pickup-time-label">Preferred Pickup Time</InputLabel>
                  <Select labelId="pickup-time-label" label="Preferred Pickup Time" defaultValue="">
                    <MenuItem value="">Select a time</MenuItem>
                    <MenuItem value="morning">Morning (9am - 12pm)</MenuItem>
                    <MenuItem value="afternoon">Afternoon (12pm - 5pm)</MenuItem>
                    <MenuItem value="evening">Evening (5pm - 9pm)</MenuItem>
                  </Select>
                </FormControl>
  
                <TextField label="Special Instructions" fullWidth margin="normal" multiline rows={3} />
  
                <Button variant="contained" fullWidth sx={{ mt: 2 }}>
                  Schedule Pickup
                </Button>
              </Box>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={6}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <AccessibilityNew sx={{ fontSize: 60, color: "primary.main" }} />
                  <Typography variant="h6" align="center">
                    Request Assistance
                  </Typography>
                  <Typography variant="body2" align="center" paragraph>
                    Need additional help? Our staff can assist with mobility challenges or other accessibility needs.
                  </Typography>
  
                  <FormGroup sx={{ width: "100%" }}>
                    <FormControlLabel control={<Checkbox />} label="Mobility assistance" />
                    <FormControlLabel control={<Checkbox />} label="Help carrying medications" />
                    <FormControlLabel control={<Checkbox />} label="Medication consultation" />
                  </FormGroup>
  
                  <Button variant="outlined" fullWidth>
                    Request Assistance
                  </Button>
                </Box>
              </CardContent>
            </Card>
  
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                      <Map sx={{ fontSize: 40, color: "primary.main" }} />
                      <Typography variant="h6" align="center">
                        Accessibility Map
                      </Typography>
                      <Button variant="text" size="small">
                        View Map
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                      <Feedback sx={{ fontSize: 40, color: "primary.main" }} />
                      <Typography variant="h6" align="center">
                        Feedback
                      </Typography>
                      <Button variant="text" size="small">
                        Share Feedback
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    )
  }
  