import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, CircularProgress } from '@mui/material';
import { AppDispatch, RootStore } from '../Stores/songStore';
import { loginUser } from '../Slices/authSlice ';


interface LoginModalProps {
  open: boolean;
  handleClose: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ open, handleClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state: RootStore) => state.auth);

  const [formData, setFormData] = useState({
    Id: 0, // Default value for Id
    UserName: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (_e: React.FormEvent) => {
    const result = await dispatch(loginUser({ ...formData, Id: 1 })); // Replace 1 with the appropriate Id value
    console.log('result', result);

    if (loginUser.fulfilled.match(result)) {
      handleClose();
      navigate('/personal-area');
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Login</DialogTitle>
      <DialogContent>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <TextField
          label="UserName"
          name="UserName"
          value={formData.UserName}
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : 'Login'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default LoginModal;
