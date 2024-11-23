import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import React from 'react';

interface Props {
  modal: React.MouseEventHandler<HTMLButtonElement>;
}

const NavBar: React.FC<Props> = ({modal}) => {

  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      <Box sx={{mb: 5, boxShadow: 10 }}>
        <AppBar sx={{ bgcolor: "darkviolet"}} position="static">
          <Toolbar sx={{justifyContent: "space-between"}}>
            <Typography
              color="inherit"
              to="/"
              variant="h5"
              component={NavLink}
              sx={{ textDecoration: "none", fontSize: "18px" }}
            >
              Finance Tracker
            </Typography>
            <Box>
              <Button color="inherit" to="/categories" component={NavLink}>
                Categories
              </Button>
              <Button type="button" color="inherit" onClick={modal}>
                Add
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;
