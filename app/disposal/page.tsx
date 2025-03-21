import {
    Box,
    Typography,
    Paper,
    Button,
    Grid,
    Card,
    CardContent,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
  } from "@mui/material"
  import { LocationOn, Notifications, ArrowBack, Info } from "@mui/icons-material"
  import Link from "next/link"
  
  export default function DisposalPage() {
    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <Button component={Link} href="/" startIcon={<ArrowBack />} variant="text" sx={{ mr: 2 }}>
            Back to Dashboard
          </Button>
          <Typography variant="h4" component="h1">
            Medication Disposal
          </Typography>
        </Box>
  
        <Typography variant="body1" paragraph>
          Learn how to safely dispose of unused or expired medications to protect your family, community, and environment.
        </Typography>
  
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Safe Disposal Guidelines
              </Typography>
  
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                Pills & Tablets
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Mix medications with unpalatable substances like dirt, cat litter, or used coffee grounds" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Place the mixture in a sealed container to prevent leakage" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Remove or black out all personal information on prescription labels" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Dispose of the container in your household trash" />
                </ListItem>
              </List>
  
              <Divider sx={{ my: 2 }} />
  
              <Typography variant="subtitle1" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                Liquids
              </Typography>
              <List dense>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Keep medication in its original container" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Add a non-toxic solid substance like salt, flour, or charcoal" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Secure the lid and place tape around it" />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Info fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Place the container inside a non-leaking container like a plastic bag" />
                </ListItem>
              </List>
            </Paper>
          </Grid>
  
          <Grid item xs={12} md={5}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <LocationOn sx={{ fontSize: 60, color: "primary.main" }} />
                  <Typography variant="h6" align="center">
                    Find Disposal Locations
                  </Typography>
                  <Typography variant="body2" align="center">
                    Locate authorized collection sites near you, including pharmacies, hospitals, and law enforcement
                    facilities.
                  </Typography>
                  <Button variant="contained" fullWidth startIcon={<LocationOn />}>
                    Find Nearby Locations
                  </Button>
                </Box>
              </CardContent>
            </Card>
  
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  <Notifications sx={{ fontSize: 60, color: "primary.main" }} />
                  <Typography variant="h6" align="center">
                    Disposal Reminders
                  </Typography>
                  <Typography variant="body2" align="center">
                    Set up reminders to check for expired medications every 6 months.
                  </Typography>
                  <Button variant="outlined" fullWidth startIcon={<Notifications />}>
                    Enable Reminders
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    )
  }
  