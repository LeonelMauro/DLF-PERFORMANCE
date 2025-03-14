import React from 'react';
import { useCart } from '../components/CartContext';
import { Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Factura = () => {
  const { cart, clearCart } = useCart(false);
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const handleConfirmarPedido = async () => {
    const facturaData = {
      productos: cart.map(({ id, name, price, quantity,code }) => ({
        id,
        nombre: name,
        precio: price,
        cantidad: quantity,
        Total: price * quantity,
        code,
      })),
      total,
    };

    try {
      const response = await fetch('http://localhost:3000/factura', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(facturaData),
      });

      if (response.ok) {
        // Obtener el archivo como un blob
        const blob = await response.blob()
        // Crear un enlace temporal para descargar el archivo
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'DLF-factura.pdf';  // Nombre del archivo PDF
        link.click();  // Forzar la descarga del archivo PDF
        clearCart();
        navigate('/'); // Redirige a la página de inicio
      } else {
        alert('Error al generar la factura');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>Factura</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Cantidad</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cart.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.code}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price}</TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Typography variant="h6" sx={{ mt: 2 }}>Total: ${total}</Typography>
      <Button variant="contained" color="success" sx={{ mt: 2 }} onClick={handleConfirmarPedido}>
        Confirmar Pedido
      </Button>
    </Box>
  );
};

export default Factura;
