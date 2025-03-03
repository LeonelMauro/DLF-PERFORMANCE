import React, { useEffect, useState } from 'react';
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
} from '@mui/material';
import { useCart } from '../components/CartContext';

function ProductList() {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const { addToCart } = useCart();

  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    axios
      .get(`${BASE_URL}/product`)
      .then((response) => {
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

    axios
      .get(`${BASE_URL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error al cargar las categorías:', error));
  }, []);

  useEffect(() => {
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
    const initialIndexes = {};
    productList.forEach((product) => {
      initialIndexes[product.id] = 0;
    });
    setActiveImageIndex(initialIndexes);
  }, [productList]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '##2E2E2E', minHeight: '100vh', py: 4 }}>
      {categories.map((category) => (
        <Box key={category.id} sx={{ px: 3, pb: 6 }}>
          <Typography
            variant="h4"
            sx={{
              border: '2px solid #ccc', // Borde más marcado
              backgroundColor: 'rgba(255, 255, 255, 0.9)', // Fondo opaco
              boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)', // Sombra más definida
              textAlign: 'center',
              py: 2,
              px: 4,
              borderRadius: '12px',
              mb: 4,
            }}
          >
            {category.categoryName}
          </Typography>
          {/*Productos*/}
          <Grid container spacing={4}>
            {productList
              .filter((product) => product.categoryId === category.id)
              .map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card
                    sx={{
                      overflow: 'hidden',
                      borderRadius: '16px',
                      border: '2px solid #ccc',
                      backgroundColor: 'rgba(255, 255, 255, 0.9)',
                      boxShadow: '0 8px 20px rgba(0, 0, 0, 0.2)',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 12px 30px rgba(0, 0, 0, 0.3)',
                      },
                    }}
                  >
                    {product.photos.length > 0 ? (
                      <Box
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          height: 200,
                          '&:hover img': {
                            transform: 'scale(1.2)',
                          },
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={product.photos[activeImageIndex[product.id]]?.url || ''}
                          alt={product.name}
                          sx={{
                            height: '100%',
                            width: '100%',
                            objectFit: 'contain',
                            transition: 'transform 0.5s ease',
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
                      <Typography variant="h6" gutterBottom>
                        {product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Precio: ${product.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Código: {product.code}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Cantidad: {product.quantity}
                      </Typography>
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => addToCart(product)}
                        sx={{
                          px: 3,
                          borderRadius: '8px',
                          backgroundColor: '#007BFF',
                          '&:hover': { backgroundColor: '#0056b3' },
                        }}
                      >
                        Añadir al carrito
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}

export default ProductList;
