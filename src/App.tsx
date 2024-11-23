import NavBar from './components/NavBar/NavBar.tsx';
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Modal,
  NativeSelect,
  TextField,
  Typography
} from '@mui/material';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Categories from './containers/Categories/Categories.tsx';


const App = () => {


  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid darkviolet',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    color: 'darkviolet',
  };

 return (
  <>
    <NavBar modal={openModal}/>
    <Modal
      onClose={closeModal}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add Expense/Income
        </Typography>
        <form>
          <Box
            sx={{
              py: 3,
              display: 'grid',
              gap: 2,
              flexWrap: 'wrap',
              width: '100%',
            }}
          >
            <Box sx={{maxWidth: '80%'}}>
              <FormControl fullWidth>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                  Type
                </InputLabel>
                <NativeSelect
                  required
                  name="page"
                  aria-selected={true}
                >
                  <option></option>

                </NativeSelect>
              </FormControl>
            </Box>
            <TextField
              sx={{me: 'auto', width: '80%'}}
              name="title"
              id="outlined-basic"
              label="Category"
              variant="outlined"
            />
            <TextField
              sx={{me: 'auto', width: '80%'}}
              name="content"
              id="outlined-multiline-static"
              label="Amount"
              multiline
              rows={4}
            />
            <Box
              className="d-flex justify-content-end"
            >
              <Button
                type="submit"
                sx={{me: 'auto', width: '5%'}}
                color="inherit"
                variant="outlined"
              >
                Save
              </Button>
              <Button
                type="button"
                sx={{width: '5%'}}
                color="inherit"
                variant="outlined"
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Modal>

    <Routes>
      <Route path="/categories" element={<Categories/>} />
    </Routes>
  </>);
};

export default App;
