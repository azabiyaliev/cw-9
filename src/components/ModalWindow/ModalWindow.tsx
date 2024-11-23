import { Box, Button, FormControl, InputLabel, Modal, NativeSelect, TextField, Typography } from '@mui/material';
import React from 'react';
import {useLocation} from "react-router-dom";
import {ICategory} from "../../types";

interface IModalWindowProps {
  type: string;
  name: string;
  amount?: number;
  onClose?: () => void;
  onOpen?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => void;
  obj: object;
  arr: ICategory[]
  open: boolean;
}

const ModalWindow: React.FC<IModalWindowProps> = ({type, name, onClose, onChange, obj, open, arr, amount}) => {

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
  const location = useLocation();
  console.log(location.pathname);

  return (
    <Modal
      onClose={onClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {location.pathname !== "/" ? "Add Expense/Income" : (obj ? "Edit Category" : "Add New Category")}
        </Typography>
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
                  value={type}
                  onChange={onChange}
                >
                  {arr.map((type) => (
                    <option key={type.id} value={type.id}>{type.type}</option>
                  ))}
                </NativeSelect>
              </FormControl>
              <FormControl fullWidth>
                <NativeSelect
                    required
                    name="name"
                    aria-selected={true}
                    value={name}
                    onChange={onChange}
                >
                  {arr.map((type) => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </NativeSelect>
              </FormControl>
            </Box>
            <TextField
                sx={{me: 'auto', width: '80%'}}
                name="amount"
                type="number"
                id="outlined-basic"
                label="Amount"
                value={amount}
                onChange={onChange}
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
                {location.pathname !== "/" ? "Save" : (obj ? "Edit" : "Save")}
              </Button>
              <Button
                type="button"
                sx={{width: '5%'}}
                color="inherit"
                variant="outlined"
                onClick={onClose}
              >
                Cancel
              </Button>
            </Box>
          </Box>
      </Box>
    </Modal>
  );
};

export default ModalWindow;