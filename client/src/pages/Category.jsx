import React, { useState, useEffect } from 'react';
import { Box, TextField, Button, Typography, CircularProgress, Grid, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';
import axios from 'axios';

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = () => {
    setLoading(true);
    axios.get('http://localhost:3000/categories')
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al obtener las categorías:', error);
        setLoading(false);
      });
  };

  const handleAddCategory = () => {
    if (!categoryName.trim()) {
      alert('El nombre de la categoría no puede estar vacío.');
      return;
    }

    axios.post('http://localhost:3000/categories', { categoryName })
      .then(() => {
        setCategoryName('');
        fetchCategories();
      })
      .catch((error) => {
        console.error('Error al agregar la categoría:', error);
      });
  };

  const handleAddProduct = (categoryId) => {
    alert(`Agregar producto a la categoría con ID: ${categoryId}`);
    // Implementa aquí la funcionalidad para agregar productos.
  };

  const handleDeleteCategory = () => {
    if (!categoryToDelete) return;

    axios.delete(`http://localhost:3000/categories/${categoryToDelete}`)
      .then(() => {
        setDeleteDialogOpen(false);
        setCategoryToDelete(null);
        fetchCategories();
      })
      .catch((error) => {
        console.error('Error al eliminar la categoría:', error);
      });
  };

  const openDeleteDialog = (categoryId) => {
    setCategoryToDelete(categoryId);
    setDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogOpen(false);
    setCategoryToDelete(null);
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Sección para agregar categorías */}
      <Box sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: 1, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Agregar Nueva Categoría
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField
            label="Nueva Categoría"
            variant="outlined"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            fullWidth
          />
          <Button onClick={handleAddCategory} variant="contained" color="primary">
            Agregar
          </Button>
        </Box>
      </Box>

      {/* Sección para listar categorías */}
      <Box sx={{ p: 3, backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: 1 }}>
        <Grid container spacing={2}>
          {categories.map((cat) => (
            <React.Fragment key={cat.id}>
              <Grid item xs={8}>
                <Typography variant="h4" gutterBottom>{cat.categoryName}</Typography>
              </Grid>
              <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Button
                  component={Link}
                  to="/product"
                  variant="contained"
                  color="primary"
                  onClick={() => handleAddProduct(cat.id)}
                >
                  Agregar Producto
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => openDeleteDialog(cat.id)}
                >
                  Eliminar
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Box>

      {/* Diálogo de confirmación */}
      <Dialog open={deleteDialogOpen} onClose={closeDeleteDialog}>
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar esta categoría? Esta acción no se puede deshacer.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteCategory} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminCategories;
