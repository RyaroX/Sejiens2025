import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

// FormField komponents paliek nemainīgs.
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

  // Efekts, kas parāda paziņojuma tekstu ar aizturi pēc tam, kad fons ir parādījies
  useEffect(() => {
    if (isSubmitted) {
      // Sākam teksta fade-in animāciju pēc tam, kad fons ir pabeidzis savu animāciju
      const timer = setTimeout(() => {
        setShowSuccessContent(true);
      }, 600); // Aizture (piem., 700ms fona fade + 100ms buferis)
      return () => clearTimeout(timer);
    }
  }, [isSubmitted]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);

    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwDuTv5I2F76DjoS50pgsdwadl9Em9z7HIx1JfXwp7V5RKPQKvzzgb0f8-VW0qvyPM/exec';

    const form = e.currentTarget;
    const formData = new FormData(form);
    
    const queryParams = new URLSearchParams(formData as any).toString();
    const fullUrl = `${GOOGLE_SCRIPT_URL}?${queryParams}`;

    try {
      await fetch(fullUrl, {
        method: 'GET',
        mode: 'no-cors',
      });
      setIsSubmitted(true);
      form.reset();
      
    } catch (error) {
      console.error('Kļūda, sūtot datus uz Google Scripts:', error);
      alert('Radās kļūda, sūtot pieteikumu. Lūdzu, mēģiniet vēlāk vai sazinieties ar mums tieši.');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const commonInputStyles = "w-full bg-[#2a1c42] text-[#E0E0E0] border border-[#7D26C9]/50 rounded-md p-3 focus:ring-2 focus:ring-[#A1F82A] focus:border-[#A1F82A] outline-none transition-all duration-300 placeholder:text-[#E0E0E0]/40";

  return (
    <div className="bg-[#1A0F2A] text-[#E0E0E0] font-sans min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
      {/* Veiksmīgas reģistrācijas ekrāns, kas pārklāj visu lapu */}
      <div 
        className={`fixed inset-0 bg-[#1A0F2A] z-50 flex items-center justify-center p-4 transition-opacity duration-700 ease-in-out ${isSubmitted ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      >
        <div 
          className={`text-center transition-opacity duration-1000 ease-in ${showSuccessContent ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-[#A1F82A]">
            Veiksmīgi reģistrēts!
          </h2>
          <p className="mt-4 text-lg text-[#E0E0E0]/80">
            Paldies! Tuvākajā laikā ar Jums sazināsimies.
          </p>
        </div>
      </div>
      
      {/* Formas konteiners, kam tiks piemērota fade-out animācija */}
      <div 
        className={`relative w-full max-w-2xl transition-opacity duration-700 ease-in-out ${isSubmitted ? 'opacity-0' : 'opacity-100'}`}
      >
        <Link 
          to="/"
          className="absolute -top-12 left-0 flex items-center text-[#A1F82A] hover:text-white transition-colors duration-300 group"
        >
          <ArrowLeft size={20} className="mr-2 transition-transform group-hover:-translate-x-1" />
          <span className="font-semibold group-hover:underline">Atpakaļ uz sākumu</span>
        </Link>
        
        <div className="bg-black/20 p-8 md:p-12 rounded-2xl shadow-2xl shadow-[#7D26C9]/20 border border-white/10">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#A1F82A] tracking-tight">
              Reģistrācija
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField id="vards" label="Vārds" />
              <FormField id="uzvards" label="Uzvārds"  />
            </div>

            <FormField id="epasts" label="E-pasts"/>

            <FormField id="telefons" label="Telefona numurs"  />

            <FormField id="tkrekla_izmers" label="T-krekla izmērs">
              <select
                id="tkrekla_izmers"
                name="tkrekla_izmers"
                className={commonInputStyles}
                required
                defaultValue=""
              >
                <option value="" disabled>Izvēlies izmēru...</option>
                <option value="S">S</option>
                <option value="M">M</option>
                <option value="L">L</option>
                <option value="XL">XL</option>
                <option value="XXL">XXL</option>
              </select>
            </FormField>

            <FormField id="alergijas" label="Alerģijas vai uztura ierobežojumi (ja nav, atstāj tukšu)">
              <textarea
                id="alergijas"
                name="alergijas"
                rows={4}
                className={commonInputStyles}
              ></textarea>
            </FormField>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#A1F82A] text-[#1A0F2A] font-bold py-4 px-8 rounded-lg text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#A1F82A]/40 focus:outline-none focus:ring-4 focus:ring-[#A1F82A]/50 disabled:bg-[#A1F82A]/50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:shadow-none"
              >
                {isSubmitting ? 'Sūta...' : 'Sūtīt pieteikumu'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default PieteiktiesPage;