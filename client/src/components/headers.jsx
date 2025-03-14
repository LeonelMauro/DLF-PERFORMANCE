import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import {
  InputBase,
  Box,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography as MuiTypography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import logo from '../assets/img/LogoNegocio.jpeg';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import ShoppingCart from '@mui/icons-material/ShoppingCart';
import SearchIcon from '@mui/icons-material/Search';
import { useCart } from './CartContext';

const Header = () => {
  const { cart, removeFromCart } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleCart = () => setCartOpen(!cartOpen);

  return (
    <>
      {/* Header principal */}
      <AppBar
  position="fixed"
  sx={{
    bgcolor: 'black',
    transition: 'all 0.3s ease-in-out',
    height: scrolled ? '60px' : '100px',
    justifyContent: 'center',
    boxShadow: scrolled ? 3 : 0,
  }}
>
  <Toolbar sx={{ position: 'relative', justifyContent: 'center' }}>
    {/* Buscador */}
    <Box
      sx={{
        position: 'absolute',
        left: 16,
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'white',
        borderRadius: 1,
        px: 1,
        boxShadow:1,
      }}
    >
      <InputBase
        placeholder="¿Qué estás buscando?"
        sx={{
          flex: 1,
          px: 1,
          fontSize: '16px',
        }}
      />
      <IconButton>
        <SearchIcon />
      </IconButton>
    </Box>

    {/* Logo */}
    <Button component={Link} to="/" sx={{ p: 0 }}>
      <Box
        component="img"
        src={logo}
        alt="Logo de la empresa"
        sx={{ height: scrolled ? 60 : 100, width: scrolled ? 90 : 150 }}
      />
    </Button>

    {/* Íconos a la derecha */}
    <Box sx={{ position: 'absolute', right: 16, display: 'flex', alignItems: 'center' }}>
      <IconButton color="inherit" component={Link} to="/login">
        <PermIdentityIcon fontSize="large" />
      </IconButton>
      <IconButton color="inherit" onClick={toggleCart}>
        <Badge badgeContent={cart.length} color="secondary">
          <ShoppingCart fontSize="large" />
        </Badge>
      </IconButton>
    </Box>
  </Toolbar>
</AppBar>


      {/* Navbar inferior */}
      <AppBar
        position="fixed"
        sx={{
          top: scrolled ? '60px' : '100px',
          bgcolor: 'white',
          color: 'black',
          boxShadow: 1,
          transition: 'top 0.3s ease-in-out',
        }}
      >
        <Toolbar sx={{ justifyContent: 'center' }}>
        <Button
            component={Link}
            to="/"
            sx={{
              mx: 3,
              color: 'black',
              fontWeight: 'bold',
              top: scrolled ,
              fontSize: '1rem', // Aumenta el tamaño de la letra
              textTransform: 'uppercase',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Inicio
          </Button>
        <Button
            component={Link}
            to="/products"
            sx={{
              mx: 3,
              color: 'black',
              fontWeight: 'bold',
              top: scrolled ,
              fontSize: '1rem', // Aumenta el tamaño de la letra
              textTransform: 'uppercase',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Productos
          </Button>
          <Button
            component={Link}
            to="historia"
            sx={{
              mx: 3,
              color: 'black',
              fontWeight: 'bold',
              top: scrolled ,
              fontSize: '1rem', // Aumenta el tamaño de la letra
              textTransform: 'uppercase',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Nosotros
          </Button>
          <Button
            component={Link}
            to="/services"
            sx={{
              mx: 3,
              color: 'black',
              fontWeight: 'bold',
              top: scrolled ,
              fontSize: '1rem', // Aumenta el tamaño de la letra
              textTransform: 'uppercase',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Servicios
          </Button>
          <Button
            component={Link}
            to="/category"
            sx={{
              mx: 3,
              color: 'black',
              fontWeight: 'bold',
              top: scrolled ,
              fontSize: '1rem', // Aumenta el tamaño de la letra
              textTransform: 'uppercase',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Categorías
          </Button>
          <Button
            component={Link}
            to="/contacts"
            sx={{
              mx: 3,
              color: 'black',
              fontWeight: 'bold',
              top: scrolled ,
              fontSize: '1rem', // Aumenta el tamaño de la letra
              textTransform: 'uppercase',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            Contactos
          </Button>
        </Toolbar>
      </AppBar>

      {/* Drawer para el carrito */}
      <Drawer anchor="right" open={cartOpen} onClose={toggleCart}>
        <Box sx={{ width: 300, p: 2 }}>
          <MuiTypography variant="h6" sx={{ mb: 2 }}>
            Carrito de compras
          </MuiTypography>
          {cart.length > 0 ? (
            <List>
              {cart.map((product, index) => (
                <ListItem key={index} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <ListItemText primary={product.name} secondary={`Precio: $${product.price}`} />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    onClick={() => removeFromCart(index)}
                  >
                    Eliminar
                  </Button>
                </ListItem>
              ))}
              {cart.length > 0 && (
              <Button
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
                component={Link}
                to="/factura"
              >
                Generar Factura
              </Button>
            )}
            </List>
          ) : (
            <MuiTypography>No hay productos en el carrito.</MuiTypography>
          )}
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
