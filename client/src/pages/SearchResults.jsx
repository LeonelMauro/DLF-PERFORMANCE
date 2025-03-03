import React from 'react';
import { useLocation } from 'react-router-dom';

const SearchResults = () => {
  const location = useLocation();
  const { filteredProducts, filteredCategories } = location.state || { filteredProducts: [], filteredCategories: [] };

  return (
    <div>
      <h2>Resultados de la búsqueda</h2>
      
      {filteredCategories.length > 0 && (
        <>
          <h3>Categorías</h3>
          <ul>
            {filteredCategories.map((category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </>
      )}

      {filteredProducts.length > 0 && (
        <>
          <h3>Productos</h3>
          <ul>
            {filteredProducts.map((product) => (
              <li key={product.id}>{product.name} - ${product.price}</li>
            ))}
          </ul>
        </>
      )}

      {filteredProducts.length === 0 && filteredCategories.length === 0 && <p>No se encontraron resultados.</p>}
    </div>
  );
};

export default SearchResults;
