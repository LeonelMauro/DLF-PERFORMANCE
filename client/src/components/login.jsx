import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (data) => {
    try {
      const response = await axios.post("http://localhost:3000/user/login", {
        email: data.email,
        password: data.password,
      });
      const { accessToken } = response.data;

      localStorage.setItem("accessToken", accessToken);
      console.log("Usuario logueado exitosamente");
      navigate("/category");
    } catch (err) {
      setError("Correo electrónico o contraseña incorrectos");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f0f0f0",
      }}
    >
      <Box
        sx={{
          border: "2px solid red",
          borderRadius: 2,
          p: 3,
          backgroundColor: "#1A1A1A",
          width: "320px",
          boxShadow: "10px 10px 20px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "white",
            textAlign: "center",
            mb: 2,
          }}
        >
          {<AccountCircleIcon />}
        </Typography>
        {error && (
          <Typography
            sx={{
              color: "red",
              textAlign: "center",
              mb: 2,
            }}
          >
            {error}
          </Typography>
        )}
        <Box component="form" onSubmit={handleSubmit(handleLogin)} noValidate>
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email", {
              required: "El correo es requerido",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "El formato del correo no es válido",
              },
            })}
            error={!!errors.email}
            helperText={errors.email?.message}
            inputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("password", {
              required: "El campo es requerido",
              maxLength: {
                value: 10,
                message: "La contraseña no debe superar los 10 caracteres, ni menos de 6",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
            inputProps={{
              style: { color: "white" },
            }}
            InputLabelProps={{
              style: { color: "#ccc" },
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "red",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "red",
                },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handlePasswordVisibility}>
                    {showPassword ? <VisibilityOff sx={{ color: "white" }} /> : <Visibility sx={{ color: "white" }} />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            variant="outlined"
            color="error"
            type="submit"
            fullWidth
            sx={{ mt: 2 }}
          >
            Login
          </Button>
          <Button
            component={Link}
            to="/register"
            variant="outlined"
            color="error"
            fullWidth
            sx={{ mt: 2 }}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
