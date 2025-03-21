import axios from 'axios';
import {
  Box,
  Typography,
  CircularProgress,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { useEffect, useState } from 'react';

function ListProduct() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const [deleteDialogProduct, setDeleteDialogProduct] = useState(false);
  const [editDialogProduct, setEditDialogProduct] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);
  const [productToDelete, setProductToDelete] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    // Cargar productos
    axios
      .get(`${BASE_URL}/product`)
      .then((response) => {
        console.log('Productos cargados:', response.data); // Verifica si stockId existe en los productos
        const updatedProducts = response.data.map((product) => ({
          ...product,
          photos: product.photos.map((photo) => ({
            ...photo,
            url: `${BASE_URL}${photo.url.replace('./', '/')}`,
          })),
        }));
        setProductList(updatedProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error al cargar los productos:', error);
        setLoading(false);
      });

    // Cargar categorías
    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error al cargar las categorías:', error));
  }, []);

  useEffect(() => {
    // Configurar intervalos para cambiar imágenes automáticamente
    const intervals = productList.map((product) =>
      setInterval(() => {
        setActiveImageIndex((prevState) => ({
          ...prevState,
          [product.id]: ((prevState[product.id] || 0) + 1) % product.photos.length,
        }));
      }, 5000)
    );

    return () => intervals.forEach((interval) => clearInterval(interval));
  }, [productList]);

  useEffect(() => {
    // Inicializar índices de imágenes activas
    const initialIndexes = {};
    productList.forEach((product) => {
      initialIndexes[product.id] = 0;
    });
    setActiveImageIndex(initialIndexes);
  }, [productList]);

  const handleEditProduct = () => {
    if (!productToEdit) return;
    
    axios
      .put(`${BASE_URL}/product/${productToEdit.id}`, {
        name: productToEdit.name,
        price: productToEdit.price,
        code: productToEdit.code,
        quantity: productToEdit.quantity,
        categoryId: categoryId || productToEdit.categoryId,
      })
      .then(() => {
        setProductList((prev) =>
          prev.map((product) =>
            product.id === productToEdit.id
              ? { ...product, ...productToEdit, categoryId: categoryId || product.categoryId }
              : product
          )
        );
        setEditDialogProduct(false);
        setProductToEdit(null);
        setCategoryId('');
      })
      .catch((error) => {
        console.error('Error al actualizar producto:', error.response?.data || error.message);
      });
  };

  const openEditProduct = (product) => {
    setProductToEdit(product);
    setCategoryId(product.categoryId || '');
    setEditDialogProduct(true);
  };

  const closeEditDialog = () => {
    setEditDialogProduct(false);
    setProductToEdit(null);
    setCategoryId('');
  };

  const openDeleteDialog = (product) => {
    setProductToDelete(product);
    setDeleteDialogProduct(true);
  };

  const closeDeleteDialog = () => {
    setDeleteDialogProduct(false);
    setProductToDelete(null);
  };

  const handleDeleteProduct = () => {
    if (!productToDelete) return;

    axios
      .delete(`${BASE_URL}/product/${productToDelete.id}`)
      .then(() => {
        setProductList((prev) => prev.filter((product) => product.id !== productToDelete.id));
        closeDeleteDialog();
      })
      .catch((error) => {
        console.error('Error al eliminar el producto:', error);
        closeDeleteDialog();
      });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Box
              sx={{
                p: 3,
                backgroundColor: '#ffffff',
                textAlign: 'center',
                borderRadius: '8px',
                boxShadow: 1,
                mb: 4,
              }}>
        <Typography variant="h4"> Listas de Producto</Typography>
      </Box>
      <Grid container spacing={3}>
        {productList.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ overflow: 'hidden', position: 'relative' }}>
              {product.photos.length > 0 ? (
                <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                  <CardMedia
                    component="img"
                    image={product.photos[activeImageIndex[product.id]]?.url || ''}
                    alt={product.name}
                    sx={{
                      height: '100%',
                      width: '100%',
                      objectFit: 'contain',
                      transition: 'all 0.5s ease',
                    }}
                  />
                </Box>
              ) : (
                <CardMedia
                  component="div"
                  sx={{
                    height: 200,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#e0e0e0',
                    color: '#757575',
                  }}
                >
                  Sin imagen
                </CardMedia>
              )}
              <CardContent>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="body2">Precio: ${product.price}</Typography>
                <Typography variant="body2">Código: {product.code}</Typography>
                <Typography variant="body2">Cantidad: {product.quantity}</Typography>
                <Typography variant="body2">
                  Categoría: {product.category?.categoryName || 'Sin categoría'}
                </Typography>
                <Typography variant="body2">
                  Creado el: {new Date(product.createAt).toLocaleDateString()}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => openEditProduct(product)}
                >
                  Modificar
                </Button>
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => openDeleteDialog(product)}
                >
                  Eliminar
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Diálogo para editar */}
      <Dialog open={editDialogProduct} onClose={closeEditDialog}>
        <DialogTitle>Modificar Producto</DialogTitle>
        <DialogContent>
          <TextField
            label="Nombre"
            fullWidth
            margin="normal"
            value={productToEdit?.name || ''}
            onChange={(e) =>
              setProductToEdit((prev) => ({ ...prev, name: e.target.value }))
            }
          />
          <TextField
            label="Precio"
            type="number"
            fullWidth
            margin="normal"
            value={productToEdit?.price || ''}
            onChange={(e) =>
              setProductToEdit((prev) => ({ ...prev, price: e.target.value }))
            }
          />
          <TextField
            label="Código"
            fullWidth
            margin="normal"
            value={productToEdit?.code || ''}
            onChange={(e) =>
              setProductToEdit((prev) => ({ ...prev, code: e.target.value }))
            }
          />
          <TextField
            label="Cantidad"
            type="number"
            fullWidth
            margin="normal"
            value={productToEdit?.quantity || ''}
            onChange={(e) =>
              setProductToEdit((prev) => ({ ...prev, quantity: e.target.value }))
            }
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="category-select-label">Categoría</InputLabel>
            <Select
              labelId="category-select-label"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              label="Categoría"
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.id}>
                  {category.categoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEditDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditProduct} color="primary">
            Guardar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Diálogo para eliminar */}
      <Dialog open={deleteDialogProduct} onClose={closeDeleteDialog}>
        <DialogTitle>Eliminar Producto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ¿Estás seguro de que deseas eliminar el producto "{productToDelete?.name}"? 
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteProduct} color="error">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ListProduct;
