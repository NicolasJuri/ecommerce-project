import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Zap, Shield, Truck, CreditCard, ChevronRight, Search, ShoppingCart, User, ArrowRight } from 'lucide-react';
import Cart from "../components/Cart";
import { useCart } from "../context/CartContext";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import Footer from "../components/Footer";
import BannerSale from "../components/BannerSale";

export default function Home() {
  const navigate = useNavigate();
  const { products, loading, error } = useProducts();
  const [featuredPhones, setFeaturedPhones] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { isCartOpen, setIsCartOpen } = useCart();



  useEffect(() => {
    if (products.length > 0) {
      setFeaturedPhones(products.slice(0, 6));
    }
  }, [products]);


  // Filtrar productos por búsqueda
  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Obtener marcas únicas de los productos reales
  const uniqueBrands = [...new Set(products.map(product => product.brand))];
  
  const getBrandGradient = (brand) => {
    const gradients = {
      'Apple': 'from-gray-700 to-black',
      'Samsung': 'from-blue-600 to-blue-800', 
      'Xiaomi': 'from-orange-500 to-red-600',
      'Motorola': 'from-blue-500 to-purple-600',
      'OPPO': 'from-green-500 to-teal-600',
      'Ryzer': 'from-red-500 to-pink-600',
      'Aureox': 'from-purple-500 to-indigo-600'
    };
    return gradients[brand] || 'from-gray-500 to-gray-700';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-xl text-gray-600">Cargando productos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <p className="text-xl text-red-500 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  const features = [
    { icon: Truck, title: "Envío Gratis", description: "En pedidos mayores a $500" },
    { icon: Shield, title: "Garantía Extendida", description: "2 años de protección" },
    { icon: CreditCard, title: "Pagos Seguros", description: "Múltiples métodos de pago" },
    { icon: Zap, title: "Entrega Rápida", description: "24-48 horas en tu ciudad" }
  ];

  return (
    <>
    <div className="bg-gray-50 min-h-screen">
      <Helmet>
        <title>Quantum Mobiles</title>
        <meta name="description" content="Quantum Mobiles es una tienda de celulares que ofrece los mejores precios y calidad." />
      </Helmet>
      <button 
        onClick={() => setIsCartOpen(true)} 
        className="fixed top-4 right-[80px] z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <ShoppingCart className="w-5 h-5" />
      </button>
      <button 
        onClick={() => navigate('/login')} 
        className="fixed top-4 right-4 z-50 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg hover:bg-blue-700 transition"
      >
        <User className="w-5 h-5" />
      </button>
      <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 py-20 sm:py-28">
          <div className="text-center">
            <h1 className="text-[60px] sm:text-6xl lg:text-7xl mb-6 leading-tight text-white">
                Quantum Mobiles
            </h1>
              <p className="text-[20px] text-white mb-10">
                Tecnología que avanza <span className="underline">contigo</span>
              </p>
  

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button   onClick={() => {
    document.getElementById('oferta').scrollIntoView({ 
      behavior: 'smooth' 
    });
  }} className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 hover:text-blue-900 transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center space-x-2">
                <span>Ver Ofertas</span>
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Características destacadas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 w-16 h-16 mx-auto rounded-2xl flex items-center justify-center mb-4 group-hover:from-blue-600 group-hover:to-blue-700 transition-all duration-300">
                  <feature.icon className="w-8 h-8 text-blue-600 group-hover:text-white transition-colors duration-300" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Productos Destacados */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Productos Destacados
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Únicos, <span className="text-[#2563eb] font-bold">como vos</span>
            </p>
          </div>

          {/* Barra de búsqueda */}
          <div className="max-w-lg mx-auto mb-8">
            <div className="relative">
              <Search 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" 
              />
              <input
                type="text"
                placeholder="Busca tu smartphone ideal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl border-0 shadow-xl text-lg
                     focus:ring-4 focus:ring-blue-500/30 focus:outline-none"
              />
            </div>
          </div>

          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(searchTerm ? filteredProducts : featuredPhones).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Mensaje de no resultados */}
          {searchTerm && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-600 mb-4">
                No encontramos productos que coincidan con “{searchTerm}”
              </p>
              <button 
                onClick={() => setSearchTerm('')}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                Ver todos los productos
              </button>
            </div>
          )}
          <button 
            onClick={() => navigate('/products')} 
            className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors mt-10 flex items-center justify-center"
          >
            Ver más <ArrowRight className="ml-2 w-4 h-4" />
          </button>
        </div>
      </section>


      {/* Marcas */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Explora por Marca</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {uniqueBrands.slice(0, 8).map((brand, index) => (
              <div key={index} className={`bg-gradient-to-br ${getBrandGradient(brand)} rounded-2xl p-8 text-center hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl`}>
                <div className="bg-white rounded-xl w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl font-bold text-gray-700">{brand.charAt(0)}</span>
                </div>
                <h3 className="font-bold text-white text-lg">{brand}</h3>
                <p className="text-white/80 text-sm mt-1">
                  {products.filter(p => p.brand === brand).length} productos
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Banner de Oferta */}
      <section className="py-16 px-4" id="oferta">
        <BannerSale />
      </section>


      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
    <Footer />
    </>
  );
  
}