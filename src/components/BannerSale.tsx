import { useNavigate } from "react-router-dom";
import cellphone from "../../public/images/oppo-terrain-rosa.png";
import cellphone2 from "../../public/images/plegabyte-rojo.png";
import cellphone3 from "../../public/images/infinix-x9-combo.png";
import { useState } from "react";

export default function BannerSale() {
  const navigate = useNavigate();
  const [currentBanner, setCurrentBanner] = useState(0);

  return (
    <>
    {/* Banner de Oferta */}
<section className="py-16 px-4" id="oferta">
  <div className="max-w-7xl mx-auto">
    <div className="relative">
      {/* Contenedor de banners */}
      <div className="overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentBanner * 100}%)` }}>
          {/* Banner 1 */}
          <div className="w-full flex-shrink-0">
            <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center p-8 lg:p-12">
                <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    ¡Oferta Especial!
                  </h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Hasta 40% de descuento en modelos seleccionados. Aprovecha esta oportunidad única.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300" onClick={() => navigate('/products')}>
                      Ver Todos
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="bg-white/20 backdrop-blur-sm w-80 h-80 rounded-2xl flex items-center justify-center">
                      <img 
                        src={cellphone} 
                        alt="Oferta especial" 
                        className="w-48 h-60 object-cover"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 bg-red-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      40%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="w-full flex-shrink-0">
            <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center p-8 lg:p-12">
                <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    ¡Nuevo Modelo!
                  </h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Recien lanzado, con descuento especial.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-purple-600 transition-all duration-300" onClick={() => navigate('/products')}>
                      Ver más
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="bg-white/20 backdrop-blur-sm w-80 h-80 rounded-2xl flex items-center justify-center">
                      <img 
                        src={cellphone2} 
                        alt="Nuevos modelos" 
                        className="w-48 h-60 object-cover"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 bg-pink-500 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                      30%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Banner 3 */}
          <div className="w-full flex-shrink-0">
            <div className="bg-gradient-to-r from-green-500 via-teal-500 to-emerald-500 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex flex-col lg:flex-row items-center p-8 lg:p-12">
                <div className="lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-4">
                    ¡Super Combo!
                  </h3>
                  <p className="text-xl text-white/90 mb-6 leading-relaxed">
                    Combo de 2 productos con descuento especial.
                  </p>
                  <p className="text-[10px] text-white/90 mb-6 lg:mt-[-20px] leading-relaxed">
                    * El porcentaje de descuento se toma en cuenta si se comprasen los productos por separado.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <button className="border-2 border-white text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white hover:text-emerald-600 transition-all duration-300" onClick={() => navigate('/products')}>
                      Ver más
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 flex justify-center">
                  <div className="relative">
                    <div className="bg-white/20 backdrop-blur-sm w-80 h-80 rounded-2xl flex items-center justify-center">
                      <img 
                        src={cellphone3} 
                        alt="super combo" 
                        className="w-full h-full"
                      />
                    </div>
                    <div className="absolute -top-4 -right-4 bg-emerald-400 text-white text-2xl font-bold w-16 h-16 rounded-full flex items-center justify-center shadow-xl animate-pulse">
                     30%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Indicadores */}
      <div className="flex justify-center mt-6 space-x-2">
        {[0, 1, 2].map((index) => (
          <button
            key={index}
            onClick={() => setCurrentBanner(index)}
            className={`w-3 h-3 rounded-full ${currentBanner === index ? 'bg-blue-600' : 'bg-gray-300'}`}
            aria-label={`Ir a banner ${index + 1}`}
          />
        ))}
      </div>
        </div>
      </div>
    </section>
    </>
  );
}