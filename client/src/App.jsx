import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Headers from './components/headers';
import Register from './components/register';
import Login from './components/login';
import Home from './pages/Home';
import AdminCategories from './pages/Category';
import Products from './pages/Products';
import ListProduct from './pages/ListProducts';
import ProductList from './pages/ProductsList';
import SearchResults from './pages/SearchResults';
import CompanyHistory from './components/CompanyHistory';
import Factura from './pages/Factura';
import './fonts.css'; // Asegúrate de que esta hoja de estilos cargue correctamente

// Crear un tema personalizado con "regular italic 400"
const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
    allVariants: {
      fontStyle: 'italic', // Configuración general
      fontWeight: 300, // Configuración general
    },
    body1: {
      fontStyle: 'italic', // Solo afecta a body1
      fontWeight: 800, // Solo afecta a body1
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{  minHeight: '100vh' }}>
        <BrowserRouter>
          <Headers />
          {/* Agrega un contenedor para compensar el header */}
          <div style={{ marginTop: '120px', padding: '20px' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/category" element={<AdminCategories />} />
              <Route path="/product" element={<Products />} />
              <Route path="/productsCrud" element={<ListProduct />} />
              <Route path="/products" element={<ProductList />} />
              <Route path="/historia" element={<CompanyHistory />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/factura" element={<Factura />} />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
