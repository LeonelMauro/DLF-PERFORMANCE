import React from 'react';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';

const CategoryCard = ({ category }) => {
  return (
    <Card>
      {/* Renderiza la imagen */}
      <CardMedia
        component="img"
        height="140"
        image={category.img}  // Usa la imagen pasada como propiedad
        alt={category.name}
      />
      <CardContent>
        <Typography variant="h6">{category.name}</Typography>
      </CardContent>
    </Card>
  );
};

export default CategoryCard;
