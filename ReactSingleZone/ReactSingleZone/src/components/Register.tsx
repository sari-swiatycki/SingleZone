import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material';
import { AppDispatch, RootStore } from '../Stores/songStore';
import { registerUser } from '../Slices/authSlice ';

interface RegisterModalProps {
  open: boolean;
  handleClose: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootStore) => state.auth);

  const [formData, setFormData] = useState({
    UserName: '',
    email: '',
    password: '',
    roleName: '', // הוספת השדה החדש
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await dispatch(registerUser(formData));
    console.log("result",result);
    
    if (registerUser.fulfilled.match(result)) {
      handleClose();
      navigate('/personal-area');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Register</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          label="Username"
          name="UserName"
          value={formData.UserName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Role Name"
          name="roleName"
          value={formData.roleName}
          onChange={handleChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Register'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RegisterModal;
