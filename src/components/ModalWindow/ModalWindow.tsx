import { Box, Button, FormControl, InputLabel, Modal, NativeSelect, TextField, Typography } from '@mui/material';
import React from 'react';
import { types } from '../../constants.ts';

const CATEGORIES_LIST = types;

interface IModalWindowProps {
  type: string;
  name: string;
  onClose?: () => void;
  onOpen?: () => void;
  onChange: () => void;
  obj: object;
  open: boolean;
}

const ModalWindow: React.FC<IModalWindowProps> = ({type, name, onClose, onChange, obj, open}) => {

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
    <Modal
      onClose={onClose}
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {obj ? "Edit Category" : "Add New Category"}
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
              value={name}
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
                {obj ? "Edit" : "Save"}
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