import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  TextField,
  Typography,
  Button,
  IconButton,
  Tooltip,
  Stack,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const FormProducts = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');

  // Cargar las categorías desde el backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3000/categories');
        console.log('Categorías obtenidas:', response.data);
        setCategories(response.data); // Actualizar categorías desde la respuesta
      } catch (error) {
        console.error('Error al obtener categorías:', error);
      }
    };

    fetchCategories();
  }, []);

  // Manejar la selección de archivos
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    const newFiles = files.map((file) => {
      const preview = URL.createObjectURL(file);
      return { file, preview };
    });

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
  };

  // Manejar la eliminación de archivos seleccionados
  const handleRemoveFile = (index) => {
    const removedFile = selectedFiles[index];
    URL.revokeObjectURL(removedFile.preview);
    setSelectedFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  // Manejar el envío del formulario
  const onSubmit = async (data) => {
    const formData = new FormData();

    // Convertir valores numéricos y agregar al FormData
    formData.append('name', data.name);
    formData.append('price', Number(data.price)); // Convertir a número
    formData.append('code', data.code);
    formData.append('quantity', Number(data.quantity)); // Convertir a número

    // Solo agregar categoryId si existe
    if (categoryId) {
      formData.append('categoryId', categoryId);
    }

    // Agregar las imágenes seleccionadas
    selectedFiles.forEach((fileObj) => {
      formData.append('photos', fileObj.file);
    });

    try {
      const response = await axios.post('http://localhost:3000/product', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      alert('Producto creado exitosamente');
      setSelectedFiles([]); // Limpiar imágenes seleccionadas
      setCategoryId(''); // Resetear la categoría seleccionada
    } catch (error) {
      console.error('Error al crear el producto:', error.response?.data || error.message);
      alert('Error al crear el producto');
    }
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      {/* Título */}
      <Box
        sx={{
          p: 3,
          backgroundColor: '#ffffff',
          textAlign: 'center',
          borderRadius: '8px',
          boxShadow: 1,
          mb: 4,
        }}
      >
        <Typography variant="h4">Producto</Typography>
      </Box>

      {/* Formulario */}
      <Box
        sx={{
          p: 3,
          backgroundColor: '#ffffff',
          textAlign: 'center',
          borderRadius: '4px',
          boxShadow: 1,
          mb: 8,
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Nombre del Producto */}
          <TextField
            label="Nombre del Producto"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('name', { required: 'El campo es requerido' })}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          {/* Precio */}
          <TextField
            label="Precio"
            variant="outlined"
            fullWidth
            margin="normal"
            type="number"
            inputProps={{
              style: { appearance: 'none', MozAppearance: 'textfield' },
              step: 0.01, // Permitir valores decimales
            }}
            {...register('price', { required: 'El campo es requerido' })}
            error={!!errors.price}
            helperText={errors.price?.message}
          />
          {/* Código */}
          <TextField
            label="Código"
            variant="outlined"
            fullWidth
            margin="normal"
            {...register('code')}
          />
          {/* Cantidad */}
          <TextField
            label="Cantidad"
            type="number"
            variant="outlined"
            fullWidth
            margin="normal"
            inputProps={{
              style: { appearance: 'none', MozAppearance: 'textfield' },
              min: 1, // Asegurar valores mayores a 0
            }}
            {...register('quantity', {
              required: 'El campo es requerido',
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || 'Debe ser un número válido',
            })}
            error={!!errors.quantity}
            helperText={errors.quantity?.message}
          />
          {/* Seleccionar Categoría */}
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

          {/* Adjuntar Imágenes */}
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 2, mb: 2 }}>
            <Tooltip title="Adjuntar imágenes">
              <IconButton component="label">
                <AttachFileIcon />
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </IconButton>
            </Tooltip>
            <Typography variant="body2">
              {selectedFiles.length > 0
                ? `${selectedFiles.length} imágenes seleccionadas`
                : 'No hay imágenes seleccionadas'}
            </Typography>
          </Stack>

          {/* Vista previa de Imágenes */}
          <Box sx={{ mt: 2, display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            {selectedFiles.map((file, index) => (
              <Box
                key={index}
                sx={{
                  position: 'relative',
                  width: 100,
                  height: 100,
                  borderRadius: '8px',
                  overflow: 'hidden',
                  boxShadow: 1,
                }}
              >
                <Avatar
                  src={file.preview}
                  alt={`Imagen ${index + 1}`}
                  sx={{ width: '100%', height: '100%' }}
                  variant="rounded"
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFile(index)}
                  sx={{
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>

          {/* Botón para Enviar el Formulario */}
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3 }} >
            Crear Producto
          </Button>
        </form>
      </Box>
    </Box>
  );
};

export default FormProducts;
