import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail } from 'lucide-react';


import catImage from '/src/assets/kakis.png';
import spiderChillImage from '/src/assets/spiderchill.png';
import spiderAngryImage from '/src/assets/spiderangry.png';
import vineBoomSound from '/src/assets/vine-boom.mp3';



// FormField component
const FormField = ({ id, label, type = 'text', placeholder, children }: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  children?: React.ReactNode;
}) => {
  const commonInputStyles = "w-full bg-[#2a1c42] text-[#E0E0E0] border border-[#7D26C9]/50 rounded-md p-3 focus:ring-2 focus:ring-[#A1F82A] focus:border-[#A1F82A] outline-none transition-all duration-300 placeholder:text-[#E0E0E0]/40";
  
  return (
    <div>
      <label htmlFor={id} className="block mb-2 font-semibold text-[#E0E0E0]/80">
        {label}
      </label>
      {children ? (
        children
      ) : (
        <input
          type={type}
          id={id}
          name={id}
          className={commonInputStyles}
          placeholder={placeholder}
          required
        />
      )}
    </div>
  );
};


function PieteiktiesPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showSuccessContent, setShowSuccessContent] = useState(false);
  
  const [spiderClickCount, setSpiderClickCount] = useState(0);
  const [isShaking, setIsShaking] = useState(false);
  const [isAngry, setIsAngry] = useState(false);
  const [showCatBackground, setShowCatBackground] = useState(false);

  const [isShakingBackground, setIsShakingBackground] = useState(false);

  useEffect(() => {
    if (isSubmitted) {
      const timer = setTimeout(() => {
        setShowSuccessContent(true);
      }, 600); 
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  useEffect(() => {
    if (showCatBackground) {
      const audio = new Audio(vineBoomSound);
      audio.play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  }, [showCatBackground]);

  useEffect(() => {
    if (isShakingBackground) {
      const timer = setTimeout(() => {
        setIsShakingBackground(false);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [isShakingBackground]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzLbHd9MTNbfjMldo1d-EiJd5Y41VkuY7CiIGiMiEx0K79uNRdoZ_Xj3xYvfEi8hN7L/exec';
    const form = e.currentTarget;
    const formData = new FormData(form);
    const queryParams = new URLSearchParams(formData as any).toString();
    const fullUrl = `${GOOGLE_SCRIPT_URL}?${queryParams}`;
    try {
      await fetch(fullUrl, { method: 'GET', mode: 'no-cors' });
      setIsSubmitted(true);
      form.reset();
    } catch (error) {
      console.error('Kļūda, sūtot datus uz Google Scripts:', error);
      alert('Radās tīkla kļūda, sūtot pieteikumu. Lūdzu, mēģiniet vēlāk.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSpiderClick = () => {
    if (isShaking) return;
    const newClickCount = spiderClickCount + 1;
    setSpiderClickCount(newClickCount);
    if (newClickCount >= 5) setIsAngry(true);
    if (newClickCount >= 15) {
        setShowCatBackground(true);
        setIsShakingBackground(true);
    }
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 400); 
  };
  
  const commonInputStyles = "w-full bg-[#2a1c42] text-[#E0E0E0] border border-[#7D26C9]/50 rounded-md p-3 focus:ring-2 focus:ring-[#A1F82A] focus:border-[#A1F82A] outline-none transition-all duration-300 placeholder:text-[#E0E0E0]/40";

  return (
    // === MODIFIED DIV TO APPLY SHAKE CLASS CONDITIONALLY ===
    <div 
        className={`bg-[#1A0F2A] text-[#E0E0E0] font-sans min-h-screen py-8 px-4 sm:px-6 lg:px-8 overflow-hidden transition-all duration-1000 ${isShakingBackground ? 'aggressive-shake-animation' : ''}`}
        style={showCatBackground ? {
            backgroundImage: `url(${catImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
        } : {}}
    >
      <>
        <style>{`
          @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(8deg); }
            50% { transform: rotate(-8deg); }
            75% { transform: rotate(8deg); }
            100% { transform: rotate(0deg); }
          }
          .shake-animation {
            animation: shake 0.4s ease-in-out;
          }

          @keyframes aggressive-shake {
            0% { transform: translate(0, 0) rotate(0deg); }
            10% { transform: translate(-8px, -8px) rotate(-1deg); }
            20% { transform: translate(8px, 10px) rotate(1deg); }
            30% { transform: translate(-10px, 8px) rotate(0deg); }
            40% { transform: translate(8px, -8px) rotate(1deg); }
            50% { transform: translate(-8px, 10px) rotate(-1deg); }
            60% { transform: translate(10px, 8px) rotate(0deg); }
            70% { transform: translate(-8px, -8px) rotate(1deg); }
            80% { transform: translate(8px, -10px) rotate(-1deg); }
            90% { transform: translate(-10px, 8px) rotate(0deg); }
            100% { transform: translate(0, 0) rotate(0deg); }
          }
          .aggressive-shake-animation {
            animation: aggressive-shake 1s ease-in-out;
          }
        `}</style>

        <div 
          className={`fixed inset-0 bg-[#1A0F2A] z-50 flex items-center justify-center p-4 transition-opacity duration-700 ease-in-out ${isSubmitted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        >
          <div 
              className={`text-center transition-opacity duration-1000 ease-in ${showSuccessContent ? 'opacity-100' : 'opacity-0'}`}
          >
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#A1F82A]">
                  Esi veiksmīgi reģistrējies!
              </h2>
              <p className="mt-4 text-lg text-[#E0E0E0]/80">
                  Uz jūsu e-pastu ir nosūtīta apstiprinājuma ziņa.
              </p>
              <Link 
                  to="/"
                  className="mt-12 inline-flex items-center text-[#A1F82A] hover:text-white transition-colors duration-300 group"
              >
                  <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
                  <span className="font-semibold group-hover:underline">Atpakaļ uz sākumu</span>
              </Link>
          </div>
        </div>
        
        <div className={`w-full max-w-6xl mx-auto transition-opacity duration-700 ease-in-out ${isSubmitted ? 'opacity-0' : 'opacity-100'}`}>
          
          <div className="mb-8">
              <Link 
              to="/"
              className="inline-flex items-center text-[#A1F82A] hover:text-white transition-colors duration-300 group"
              >
              <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
              <span className="font-semibold group-hover:underline">Atpakaļ uz sākumu</span>
              </Link>
          </div>

          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
            
            <div className="w-full lg:w-3/5">
              <div className="bg-black/20 backdrop-blur-sm p-8 md:p-10 rounded-2xl shadow-2xl shadow-[#7D26C9]/20 border border-white/10">
                <div className="text-center mb-8">
                  <h1 className="text-2xl md:text-3xl font-extrabold text-[#A1F82A] tracking-tight">
                    Reģistrācija
                  </h1>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <FormField id="vards" label="Vārds" />
                    <FormField id="uzvards" label="Uzvārds" />
                  </div>
                  <FormField id="epasts" label="E-pasts" type="email" />
                  <FormField id="telefons" label="Telefona numurs" type="tel" />
                  <FormField id="tkrekla_izmers" label="T-krekla izmērs">
                    <select id="tkrekla_izmers" name="tkrekla_izmers" className={commonInputStyles} required defaultValue="">
                      <option value="" disabled>Izvēlies izmēru...</option>
                      <option value="S">S</option>
                      <option value="M">M</option>
                      <option value="L">L</option>
                      <option value="XL">XL</option>
                      <option value="XXL">XXL</option>
                    </select>
                  </FormField>
                  <FormField id="alergijas" label="Alerģijas vai uztura ierobežojumi (ja nav, atstāj tukšu)">
                    <textarea id="alergijas" name="alergijas" rows={3} className={commonInputStyles}></textarea>
                  </FormField>

                  <div className="flex items-center gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="whatsapp_grupa"
                      name="whatsapp_grupa"
                      value="Jā"
                      className="h-5 w-5 cursor-pointer rounded border-2 border-[#7D26C9]/50 bg-[#2a1c42] text-[#A1F82A] focus:ring-offset-0 focus:ring-2 focus:ring-[#A1F82A]"
                    />
                    <label htmlFor="whatsapp_grupa" className="text-[#E0E0E0]/80 cursor-pointer">
                      Vai vēlies lai tevi pievieno sējiena Whatsapp grupai?
                    </label>
                  </div>
                  
                  <div className="pt-4">
                    <button type="submit" disabled={isSubmitting} className="w-full bg-[#A1F82A] text-[#1A0F2A] font-bold py-3 px-6 rounded-lg text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#A1F82A]/40 focus:outline-none focus:ring-4 focus:ring-[#A1F82A]/50 disabled:bg-[#A1F82A]/50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none">
                      {isSubmitting ? 'Sūta...' : 'Sūtīt pieteikumu'}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="w-full lg:w-2/5 lg:pt-2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Pirms pieteikšanās</h2>
              <p className="text-[#E0E0E0]/70 mb-6">
                Pasākuma laikā tiks fotografēts un filmēts, iegūtie fotoattēli un videomateriāli var tikt izmantoti LU Eksakto zinātņu un tehnoloģiju fakultātes, Datorikas Studējošo pašpārvaldes, pasākuma atbalstītāju un sadarbības partneru sociālajos medijos, tīmekļa vietnēs un citviet sabiedrisko attiecību, reklāmas u.c. nolūkos.
              </p>
               <div className="mt-8 pt-6 border-t border-white/10">
                  <p className="text-[#E0E0E0]/70 mb-2">Jautājumu gadījumā:</p>
                  <a className="font-semibold text-[#A1F82A] flex items-center gap-2">
                      <Mail size={18} />
                      sejiens@datoriki.lv
                  </a>
              </div>
              <div className="mb-6 flex justify-center lg:justify-start">
                <img
                  src={isAngry ? spiderAngryImage : spiderChillImage}
                  alt="Clickable spider"
                  onClick={handleSpiderClick}
                  className={`w-44 h-44 cursor-pointer transition-transform duration-300 ${isShaking ? 'shake-animation' : ''}`}
                  title={isAngry ? "You made me angry!" : "Click me!"}
                />
              </div>
            </div>

          </div>
        </div>
      </>
    </div>
  );
}

export default PieteiktiesPage;