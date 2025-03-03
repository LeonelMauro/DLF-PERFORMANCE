// Register.jsx
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createUser } from '../api/user'; 
export default function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [successMessage, setSuccessMessage] = useState(''); // Estado para el mensaje de éxito

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createUser(formData);
    console.log(response)
    if (response) {
      setSuccessMessage('Usuario creado exitosamente.'); // Muestra el mensaje de éxito
      setFormData({ name: '', email: '', password: '' }); // Limpia el formulario
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#fff',
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          p: 4,
          borderRadius: 2,
          backgroundColor: '#1A1A1A',
          boxShadow: '30px 30px 30px rgba(0, 0, 0, 0.5)',
          width: '300px',
        }}
        noValidate
        autoComplete="off"
      >
        <Typography variant="h5" sx={{ color: '#fff', mb: 2 }}>
          Register
        </Typography>
        {successMessage && (
          <Typography variant="body2" sx={{ color: 'green', mb: 2 }}>
            {successMessage}
          </Typography>
        )}
        <TextField
          label="Nombre"
          name="name"
          fullWidth
          margin="normal"
          value={formData.name}
          onChange={handleChange}
          inputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Email"
          name="email"
          fullWidth
          margin="normal"
          value={formData.email}
          onChange={handleChange}
          inputProps={{ style: { color: 'white' } }}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          fullWidth
          margin="normal"
          value={formData.password}
          onChange={handleChange}
          inputProps={{ style: { color: 'white' } }}
        />
        <Button variant="outlined" color="error" type="submit" sx={{ mt: 2 }}>
          Register
        </Button>
      </Box>
    </Box>
  );
}
