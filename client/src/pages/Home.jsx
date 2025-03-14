import axios from 'axios'
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Box, Typography, Grid, CardContent, Card, CardActionArea, CardMedia } from '@mui/material';
import empresa1 from '../assets/img/empresa1.jpeg';
import empresa2 from '../assets/img/empresa2.jpeg';
import logo from '../assets/img/logo.jpeg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [productList, setProductList] = useState([]);
  const navigate = useNavigate();

  const BASE_URL = 'http://localhost:3000';

  useEffect(() => {
    axios.get(`${BASE_URL}/categories`)
      .then((response) => setCategories(response.data))
      .catch((error) => console.error('Error al cargar las categorías:', error));

    axios.get(`${BASE_URL}/product`)
      .then((response) => {
        const updatedProducts = response.data.map((product) => ({
          ...product,
          photos: product.photos.map((photo) => ({
            ...photo,
            url: `${BASE_URL}${photo.url.replace('./', '/')}`,
          })),
        }));
        setProductList(updatedProducts);
      })
      .catch((error) => console.error('Error al cargar los productos:', error));
  }, []);

  // Seleccionar 3 productos aleatorios para la sección de ofertas
  const randomProducts = [...productList].sort(() => Math.random() - 0.5).slice(0, 3);

  const images = [empresa1, empresa2, logo];

  return (
    <Box sx={{ backgroundColor: '#f5f5f5', minHeight: '100vh', padding: 4 }}>
      
      {/* Carrusel de imágenes */}
      <Box sx={{ width: '100%', height: '350px', marginBottom: 4, overflow: 'hidden' }}>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={50}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 3000 }}
          navigation
          pagination={{ clickable: true }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <Box
                component="img"
                src={image}
                alt={`Slide ${index}`}
                sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Sección de ofertas */}
      <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Ofertas Especiales
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center', marginBottom: 4 }}>
        {randomProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.id}>
            <Card sx={{ overflow: 'hidden', position: 'relative' }}>
              {product.photos.length > 0 ? (
                <CardMedia
                  component="img"
                  image={product.photos[0]?.url || ''}
                  alt={product.name}
                  sx={{ height: 200, objectFit: 'contain' }}
                />
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
              <CardContent sx={{ textAlign: 'center' }}>
                <Typography variant="h5">{product.name}</Typography>
                <Typography variant="h6" color="primary">
                  ${product.price}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Sección de categorías */}
      <Typography variant="h2" sx={{ textAlign: 'center', marginBottom: 2 }}>
        Categorías
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ textAlign: 'center', marginBottom: 3 }}>
        Explora nuestras categorías principales
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: 'center' }}>
        {categories.map((cat) => (
          <Grid item xs={12} sm={6} md={4} key={cat.id}>
            <Card>
              <CardActionArea
                onClick={() => navigate(`/products?categoryId=${cat.id}`)}
                sx={{
                  padding: 2,
                  textAlign: 'center',
                  backgroundColor: categoryId === cat.id ? '#f0f0f0' : 'white',
                  '&:hover': {
                    backgroundColor: '#e0e0e0',
                  },
                }}
              >
                <CardContent>
                  <Typography variant="h4">{cat.categoryName}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Box>
  );
};

export default Home;
