import React, { useState } from 'react';
import { Check, X, Mail } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Por favor ingresa tu email');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Por favor ingresa un email válido');
      return;
    }

    setIsSubmitting(true);

    // Simular envío a API
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setEmail('');
      
      // Resetear mensaje de éxito después de 5 segundos
      setTimeout(() => {
        setIsSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <footer className="bg-gray-900 relative overflow-hidden">
      {/* Efectos de fondo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-32 h-32 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>

      <section className="py-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-white mb-4">
            ¿No quieres perderte nuestras ofertas?
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Suscríbete y recibe las mejores promociones directamente en tu email
          </p>
          
          <form onSubmit={handleSubmit} className="max-w-lg mx-auto">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email aquí..."
                  className="w-full pl-12 pr-4 py-4 rounded-2xl border-0 focus:ring-4 focus:ring-blue-500/30 focus:outline-none text-lg"
                  disabled={isSubmitting || isSuccess}
                />
              </div>
              <button
                type="submit"
                className={`px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center justify-center min-w-[180px] ${
                  isSubmitting 
                    ? 'bg-blue-700 text-white' 
                    : isSuccess 
                      ? 'bg-green-600 text-white' 
                      : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800'
                }`}
                disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Procesando...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    ¡Gracias!
                  </>
                ) : (
                  'Suscribirse'
                )}
              </button>
            </div>
            
            {error && (
              <div className="mt-4 flex items-center justify-center text-red-400">
                <X className="w-5 h-5 mr-2" />
                <span>{error}</span>
              </div>
            )}
            
            {isSuccess && (
              <div className="mt-6 p-4 bg-green-900/30 rounded-lg border border-green-600 text-green-200 animate-fade-in">
                <p>¡Te has suscrito exitosamente! Pronto recibirás nuestras mejores ofertas.</p>
              </div>
            )}
          </form>
        </div>
        
        <div className="lg:relative flex justify-center lg:justify-end lg:top-10 mt-10">
          <p className="text-white text-sm text-end mt-5 mr-5">
            Desarrollado por{' '}
            <a 
              href="https://github.com/NicolasJuri" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="underline hover:text-blue-300 transition-colors"
            >
              Nicolas Ismael Juri
            </a>
          </p>
        </div>
      </section>
    </footer>
  );
};

export default Footer;