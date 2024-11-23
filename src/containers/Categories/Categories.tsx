import { Box, Button, Container, FormControl, InputLabel, Modal, NativeSelect, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { types } from '../../constants.ts';
import { ITypes } from '../../types';
import { useAppDispatch } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import { fetchPostCategories } from '../store/thunks/allThuks.ts';

const initialForm = {
  type: "",
  name: "",
};

const CATEGORIES_LIST = types;

const Categories = () => {

  const [form, setForm] = useState<ITypes>({ ...initialForm });
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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();



  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await dispatch(fetchPostCategories({...form}));
      navigate("/admin/dishes");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Container maxWidth="xl">
      <Modal
        onClose={closeModal}
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Category
          </Typography>
          <form onSubmit={submitForm}>
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
                    name="type"
                    aria-selected={true}
                    value={form.type}
                    onChange={onChangeField}
                  >
                    {CATEGORIES_LIST.map((type) => (
                      <option key={type.id} value={type.id}>{type.type}</option>
                    ))}
                  </NativeSelect>
                </FormControl>
              </Box>
              <TextField
                sx={{me: 'auto', width: '80%'}}
                name="name"
                id="outlined-basic"
                label="Name"
                value={form.name}
                onChange={onChangeField}
                variant="outlined"
              />
              <Box
                className="d-flex justify-content-between w-25"
              >
                <Button
                  type="submit"
                  sx={{width: '5%'}}
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
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </form>
        </Box>
      </Modal>
        <div className="d-flex justify-content-between align-items-center flex-wrap">
        <Typography
          sx={{color: "darkviolet"}}
          variant="h4"
        >
          Categories
        </Typography>
        <Button sx={{border: 1, borderColor: "darkviolet", color: "darkviolet" }} onClick={openModal}>
          Add
        </Button>
      </div>
    </Container>

  );
};

export default Categories;