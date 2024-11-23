import { Box, Button, Container, FormControl, InputLabel, Modal, NativeSelect, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { types } from '../../constants.ts';
import { ICategory, ITypes } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { useNavigate } from 'react-router-dom';
import {
  fetchDeleteCategory,
  fetchGetCategories,
  fetchPostCategories,
  fetchPutCategory
} from '../store/thunks/allThuks.ts';
import { categories, clearModal, editCategory, pickedCategory } from './categoriesSlice.ts';

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

  const categoriesShow: ICategory[] = Object.values(useAppSelector(categories));
  const pickCategories = useAppSelector(pickedCategory);

  useEffect(() => {
    dispatch(fetchGetCategories());
    if(pickCategories && pickCategories.id) {
      setForm(pickCategories);
    } else {
      setForm(initialForm);
    }
  }, [dispatch, pickCategories]);

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
      if(pickCategories) {
        await dispatch(fetchPutCategory({id: pickCategories.id, edits: {...form}}));
        await dispatch(fetchGetCategories());
        closeModal();
      } else {
        await dispatch(fetchPostCategories({...form}));
        await dispatch(fetchGetCategories());
        closeModal();
        navigate("/categories");
      }

    } catch (e) {
      console.log(e);
    }
  };

  const edit = async (category: ICategory) => {
    openModal();
    console.log(category.id);
    dispatch(editCategory(category));
  };

  const add = async () => {
    openModal();
    dispatch(clearModal());
  };

  const del = async (id: string) => {
    await dispatch(fetchDeleteCategory(id));
    await dispatch(fetchGetCategories());
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
        <Button sx={{border: 1, borderColor: "darkviolet", color: "darkviolet"}} onClick={add}>
          Add
        </Button>
      </div>

      <div className="w-75 mx-auto mt-5">
        {categoriesShow.map((category) => (
          <Box
            sx={{color: "darkviolet", border: 1, borderColor: "darkviolet", borderRadius: 2}}
            key={category.id}
            className="shadow-sm mb-2 d-flex align-items-center p-4"
          >
            <Typography
              sx={{color: "darkviolet"}}
              variant="h6"
              className="ms-3 align-self-center"
            >
              {category.name}
            </Typography>
            <Typography
              sx={{color: "darkviolet"}}
              variant="h6"
              className="ms-auto align-self-center"
            >
              {category.type}
            </Typography>
            <Button sx={{borderColor: 'darkviolet', color: 'darkviolet'}} onClick={() => edit(category)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="48px" height="48px">
                <linearGradient id="0O0q6J4HBgQKyT39nvTa~a" x1="46.807" x2="46.807" y1="9.849" y2="24.215"
                                gradientUnits="userSpaceOnUse" spreadMethod="reflect">
                  <stop offset="0" stopColor="#6dc7ff"/>
                  <stop offset="1" stopColor="#e6abff"/>
                </linearGradient>
                <path fill="url(#0O0q6J4HBgQKyT39nvTa~a)"
                      d="M49.482,24.392l-9.874-9.874l4.232-4.232c0.39-0.39,1.021-0.39,1.411,0l8.464,8.464 c0.39,0.39,0.39,1.021,0,1.411L49.482,24.392z"/>
                <linearGradient id="0O0q6J4HBgQKyT39nvTa~b" x1="32" x2="32" y1="8.084" y2="55.83"
                                gradientUnits="userSpaceOnUse" spreadMethod="reflect">
                  <stop offset="0" stopColor="#1a6dff"/>
                  <stop offset="1" stopColor="#c822ff"/>
                </linearGradient>
                <path fill="url(#0O0q6J4HBgQKyT39nvTa~b)"
                      d="M50.697,25.999l4.428-4.428c1.167-1.167,1.167-3.065,0-4.232l-8.464-8.464 c-1.167-1.167-3.065-1.167-4.232,0l-4.428,4.428c-0.664-0.175-1.4-0.011-1.92,0.509l-1.411,1.411c-0.52,0.52-0.684,1.256-0.509,1.92 L11.198,40.106l-0.508,0.508l-0.2,0.2l-2.373,9.967c-0.343,1.442,0.078,2.928,1.126,3.976s2.534,1.469,3.976,1.125l9.967-2.373 l0.2-0.2l0.508-0.508l22.964-22.964c0.664,0.175,1.4,0.011,1.92-0.509l1.411-1.411C50.708,27.399,50.872,26.663,50.697,25.999z M47.367,27.92L36.081,16.634l1.411-1.411l11.285,11.285L47.367,27.92z M23.46,50.414c-0.28-1.063-0.682-2.077-1.198-3.034 l20.872-20.872l2.116,2.116L23.46,50.414z M14.916,53.428c-0.12-1.074-0.58-2.115-1.405-2.939c-0.825-0.825-1.865-1.285-2.939-1.405 l0.698-2.931c1.649,0.266,3.173,1.036,4.357,2.22c1.184,1.184,1.954,2.709,2.22,4.357L14.916,53.428z M17.038,46.962 c-1.447-1.447-3.301-2.396-5.306-2.75l0.463-1.943c2.382,0.441,4.533,1.562,6.254,3.282s2.841,3.872,3.282,6.254l-1.943,0.463 C19.433,50.263,18.485,48.409,17.038,46.962z M19.859,44.141c-0.477-0.477-0.987-0.907-1.517-1.304l20.561-20.561l2.821,2.821 L21.163,45.658C20.766,45.128,20.336,44.618,19.859,44.141z M16.62,41.738c-0.957-0.516-1.971-0.918-3.034-1.198l21.79-21.79 l2.116,2.116L16.62,41.738z M43.84,10.286c0.389-0.389,1.022-0.389,1.411,0l8.464,8.464c0.389,0.389,0.389,1.022,0,1.411 l-4.232,4.232l-9.874-9.874L43.84,10.286z"/>
              </svg>
            </Button>
            <Button sx={{borderColor: 'darkviolet', color: 'darkviolet'}} onClick={() => del(category.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="48px" height="48px">
                <linearGradient id="i9gMV8RPRiXBVRoCh9BlCa" x1="24" x2="24" y1="16.026" y2="18.015"
                                gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#912fbd"/>
                  <stop offset="1%" stopColor="#9332bf"/>
                </linearGradient>
                <path fill="url(#i9gMV8RPRiXBVRoCh9BlCa)"
                      d="M41,18H7c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h34c0.552,0,1,0.448,1,1v0	C42,17.552,41.552,18,41,18z"/>
                <linearGradient id="i9gMV8RPRiXBVRoCh9BlCb" x1="24" x2="24" y1="42.885" y2="10.323"
                                gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#912fbd"/>
                  <stop offset="1%" stopColor="#9332bf"/>
                </linearGradient>
                <path fill="url(#i9gMV8RPRiXBVRoCh9BlCb)"
                      d="M39,11v30c0,1.105-0.895,2-2,2H11c-1.105,0-2-0.895-2-2V11H39z"/>
                <linearGradient id="i9gMV8RPRiXBVRoCh9BlCc" x1="24" x2="24" y1="7.171" y2="14.301"
                                gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#c965eb"/>
                  <stop offset="1" stopColor="#c767e5"/>
                </linearGradient>
                <path fill="url(#i9gMV8RPRiXBVRoCh9BlCc)" d="M8,11v-1c0-1.657,1.343-3,3-3h26c1.657,0,3,1.343,3,3v1H8z"/>
                <linearGradient id="i9gMV8RPRiXBVRoCh9BlCd" x1="24" x2="24" y1="4.04" y2="7.022"
                                gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#ae4cd5"/>
                  <stop offset="1" stopColor="#ac4ad5"/>
                </linearGradient>
                <path fill="url(#i9gMV8RPRiXBVRoCh9BlCd)"
                      d="M28,4h-8c-1.105,0-2,0.895-2,2v1h12V6C30,4.895,29.105,4,28,4z"/>
                <linearGradient id="i9gMV8RPRiXBVRoCh9BlCe" x1="15" x2="33" y1="27" y2="27"
                                gradientUnits="userSpaceOnUse">
                  <stop offset="0" stopColor="#ae4cd5"/>
                  <stop offset="1" stopColor="#ac4ad5"/>
                </linearGradient>
                <rect width="18" height="32" x="15" y="11" fill="url(#i9gMV8RPRiXBVRoCh9BlCe)"/>
              </svg>
            </Button>
          </Box>
        ))}
      </div>

    </Container>

  );
};

export default Categories;