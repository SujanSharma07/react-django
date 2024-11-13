import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container, Typography, Box, Grid } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
      <Box 
        sx={{
          padding: 4,
          borderRadius: '8px',
          boxShadow: 3,
          backgroundColor: '#f7f7f7',
          textAlign: 'center',
        }}
      >
        <Typography variant="h3" gutterBottom style={{ color: '#1F2959' }}>
          Welcome to the React File Upload App
        </Typography>
        <Typography variant="h5" paragraph>
          This application allows you to upload files, process them, and view their contents in a neat, organized way.
        </Typography>
        
        <Grid container justifyContent="center">
          <Grid item>
            <Link to="/upload" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  boxShadow: 2,
                  '&:hover': {
                    backgroundColor: '#4169E1',
                    boxShadow: 4,
                  },
                }}
              >
                Go to File Upload
              </Button>
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Home;
