import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography
} from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';
import ModalWindow from '../ModalWindow/ModalWindow.tsx';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { ICategory, ITypes } from '../../types';
import { categories } from '../../containers/Categories/categoriesSlice.ts';
import React, { useEffect, useState } from 'react';
import { fetchGetCategories } from '../../containers/store/thunks/allThuks.ts';

const initialForm = {
  type: "",
  name: "",
  amount: 0
};


const NavBar = () => {
  const location = useLocation();
  console.log(location.pathname);
  const dispatch = useAppDispatch();
  const categoriesShow: ICategory[] = Object.values(useAppSelector(categories));
  const [form, setForm] = useState<ITypes>({ ...initialForm });


  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  console.log(categoriesShow);

  useEffect(() => {
    dispatch(fetchGetCategories());

  },[dispatch]);

  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log(form);

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
              <Button type="button" color="inherit" onClick={openModal}>
                Add
              </Button>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      {categoriesShow.map(category => (
        <ModalWindow type={form.type} name={form.name} key={category.id} open={open} onClose={closeModal} onOpen={openModal} obj={category} onChange={onChangeField} arr={categoriesShow}/>
      ))}
    </>
  );
};
//type, name, onClose, onChange, obj, open
export default NavBar;
