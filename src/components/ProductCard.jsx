import { useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star, Heart } from 'lucide-react';

export default function ProductCard({ product, className = "" }) {
  const [isLiked, setIsLiked] = useState(false);
  
  // Generar rating aleatorio para productos reales (puedes quitar esto si tienes ratings reales)
  const rating = (4.2 + Math.random() * 0.7).toFixed(1);
  const reviews = Math.floor(Math.random() * 2000) + 100;
  
  // Generar colores basados en la marca
  const getBrandColors = (brand) => {
    const colorMap = {
      'Apple': ['#1a1a1a', '#c9ada7', '#8ecae6', '#ffb3ba'],
      'Samsung': ['#1a1a1a', '#8b5a3c', '#4a5c6a', '#d4af37'],
      'Xiaomi': ['#000000', '#ffffff', '#4a90e2', '#50c878'],
      'Motorola': ['#2c3e50', '#3498db', '#e74c3c', '#f39c12'],
      'OPPO': ['#000000', '#ffffff', '#9b59b6', '#2ecc71'],
      'Ryzer': ['#e74c3c', '#34495e', '#f39c12', '#9b59b6'],
      'Aureox': ['#3498db', '#2ecc71', '#e67e22', '#8e44ad']
    };
    return colorMap[brand] || ['#34495e', '#95a5a6', '#3498db', '#e74c3c'];
  };

  return (
    <div className={`group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100 hover:border-gray-200 ${className}`}>
      {/* Botón de favoritos */}
      <button 
        onClick={() => setIsLiked(!isLiked)}
        className="absolute top-4 right-4 z-10 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
      </button>

      {/* Imagen del producto */}
      <Link to={`/product/${product.id}`}>
        <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-6 overflow-hidden cursor-pointer">
          <img 
            src={product.image} 
            alt={product.title}
            className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
          />
          
          {/* Overlay con colores disponibles */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {getBrandColors(product.brand).map((color, index) => (
              <div 
                key={index}
                className="w-4 h-4 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        </div>
      </Link>

      {/* Contenido */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
            {product.brand}
          </span>
          <div className="flex items-center space-x-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium text-gray-700">{rating}</span>
            <span className="text-xs text-gray-500">({reviews})</span>
          </div>
        </div>

        <Link to={`/product/${product.id}`}>
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors cursor-pointer">
            {product.title}
          </h3>
        </Link>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {product.description}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">
              ${product.price}
            </span>
          </div>
          
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 shadow-lg hover:shadow-xl">
            <ShoppingCart className="w-4 h-4" />
            <span>Comprar</span>
          </button>
        </div>
      </div>

      {/* Efecto hover adicional */}
      <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-400 rounded-2xl pointer-events-none transition-all duration-300"></div>
    </div>
  );
}