import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ShoppingCart, Star, Heart, ArrowLeft, Shield, Truck, CreditCard } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import Cart from "../components/Cart";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [selectedColor, setSelectedColor] = useState(0);
  const { isCartOpen, setIsCartOpen, addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("/products.json");
        if (!response.ok) {
          throw new Error('Error al cargar el producto');
        }
        const data = await response.json();
        const found = data.find(p => p.id === parseInt(id));
        if (!found) {
          throw new Error('Producto no encontrado');
        }
        setProduct(found);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  // Generar colores basados en la marca
  const getBrandColors = (brand) => {
    const colorMap = {
      'Apple': [
        { name: 'Grafito', color: '#1a1a1a' },
        { name: 'Oro Rosa', color: '#c9ada7' },
        { name: 'Azul Sierra', color: '#8ecae6' },
        { name: 'Rosa', color: '#ffb3ba' }
      ],
      'Samsung': [
        { name: 'Negro Fantasma', color: '#1a1a1a' },
        { name: 'Bronce', color: '#8b5a3c' },
        { name: 'Azul Místico', color: '#4a5c6a' },
        { name: 'Oro', color: '#d4af37' }
      ],
      'Xiaomi': [
        { name: 'Negro Medianoche', color: '#000000' },
        { name: 'Blanco Lunar', color: '#ffffff' },
        { name: 'Azul Océano', color: '#4a90e2' },
        { name: 'Verde Esmeralda', color: '#50c878' }
      ]
    };
    return colorMap[brand] || [
      { name: 'Negro', color: '#34495e' },
      { name: 'Gris', color: '#95a5a6' },
      { name: 'Azul', color: '#3498db' },
      { name: 'Rojo', color: '#e74c3c' }
    ];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Error: {error}</p>
          <Link 
            to="/" 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al inicio</span>
          </Link>
        </div>
      </div>
    );
  }

  const colors = getBrandColors(product.brand);
  const rating = (4.2 + Math.random() * 0.7).toFixed(1);
  const reviews = Math.floor(Math.random() * 2000) + 100;

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8 flex items-center justify-between">
          {/* Volver a productos */}
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a productos</span>
          </Link>
          <button 
          onClick={() => setIsCartOpen(true)} 
          className="relative inline-flex items-center0 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition">
            <ShoppingCart className="w-5 h-5" />
          </button>
          </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 p-8 lg:p-12">
            {/* Imagen del producto */}
            <div className="relative">
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 h-96 lg:h-full flex items-center justify-center relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="max-w-full max-h-full object-contain transition-transform duration-500 hover:scale-105"
                />
                
                {/* Botón de favoritos */}
                <button 
                  onClick={() => setIsLiked(!isLiked)}
                  className="absolute top-6 right-6 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-300"
                >
                  <Heart className={`w-6 h-6 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
            </div>

            {/* Información del producto */}
            <div className="flex flex-col justify-center">
              <div className="mb-4">
                <span className="text-sm font-semibold text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                  {product.brand}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`w-5 h-5 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-lg font-medium text-gray-700">{rating}</span>
                <span className="text-gray-500">({reviews} reseñas)</span>
              </div>

              {/* Precio */}
              <div className="mb-8">
                <span className="text-4xl font-bold text-gray-900">
                  ${product.price}
                </span>
                <span className="text-gray-500 ml-2">USD</span>
              </div>

              {/* Descripción */}
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Colores disponibles */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Colores disponibles</h3>
                <div className="flex space-x-3">
                  {colors.map((colorOption, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedColor(index)}
                      className={`relative w-12 h-12 rounded-full border-4 transition-all duration-300 ${
                        selectedColor === index 
                          ? 'border-blue-500 scale-110' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: colorOption.color }}
                      title={colorOption.name}
                    >
                      {selectedColor === index && (
                        <div className="absolute inset-2 rounded-full border-2 border-white"></div>
                      )}
                    </button>
                  ))}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Color seleccionado: {colors[selectedColor].name}
                </p>
              </div>

              {/* Botones de acción */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                onClick={() => {
                  addToCart(product);
                  setIsCartOpen(true);
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl">
                  <ShoppingCart className="w-6 h-6" />
                  <span>Agregar al carrito</span>
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-bold text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 flex items-center justify-center space-x-3">
                  <Heart className="w-6 h-6" />
                  <span>Guardar</span>
                </button>
              </div>

              {/* Características destacadas */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Truck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Envío gratis</p>
                    <p className="text-xs text-gray-500">En 24-48h</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">2 años garantía</p>
                    <p className="text-xs text-gray-500">Cobertura total</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <CreditCard className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 text-sm">Pago seguro</p>
                    <p className="text-xs text-gray-500">Múltiples métodos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de especificaciones */}
          <div className="border-t border-gray-200 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Especificaciones técnicas</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Marca</span>
                  <span className="text-gray-900">{product.brand}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Modelo</span>
                  <span className="text-gray-900">{product.title}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Precio</span>
                  <span className="text-gray-900 font-bold">${product.price}</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Disponibilidad</span>
                  <span className="text-green-600 font-medium">En stock</span>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Garantía</span>
                  <span className="text-gray-900">2 años</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Envío</span>
                  <span className="text-gray-900">Gratis</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Tiempo de entrega</span>
                  <span className="text-gray-900">24-48 horas</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-100">
                  <span className="font-medium text-gray-600">Colores</span>
                  <span className="text-gray-900">{colors.length} opciones</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sección de reseñas */}
          <div className="border-t border-gray-200 p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Reseñas de clientes</h2>
            
            {/* Resumen de calificaciones */}
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-1">{rating}</div>
                  <div className="flex items-center justify-center mb-1">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`w-4 h-4 ${i < Math.floor(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                      />
                    ))}
                  </div>
                  <div className="text-sm text-gray-500">{reviews} reseñas</div>
                </div>
                <div className="flex-1">
                  <div className="space-y-2">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center space-x-3">
                        <span className="text-sm text-gray-600 w-2">{stars}</span>
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-yellow-400 h-2 rounded-full" 
                            style={{ width: `${Math.random() * 80 + 10}%` }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500 w-8">{Math.floor(Math.random() * 50 + 10)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Reseñas individuales */}
            <div className="space-y-6">
              {[
                {
                  name: "María González",
                  rating: 5,
                  date: "Hace 2 días",
                  comment: "Excelente producto, llegó muy rápido y en perfectas condiciones. La calidad es excepcional."
                },
                {
                  name: "Carlos Rodríguez",
                  rating: 4,
                  date: "Hace 1 semana",
                  comment: "Muy buen smartphone, la batería dura todo el día y la cámara toma fotos increíbles."
                },
                {
                  name: "Ana Martínez",
                  rating: 5,
                  date: "Hace 2 semanas",
                  comment: "Superó mis expectativas. El diseño es elegante y el rendimiento es fluido en todas las aplicaciones."
                }
              ].map((review, index) => (
                <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                  <div className="flex items-start space-x-4">
                    <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
                      {review.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900">{review.name}</h4>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <div className="flex items-center space-x-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                          />
                        ))}
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
    
  );
}