import { Link } from 'react-router-dom';
// IMPORT hooks and the new ArrowUp icon
import { useState, useEffect } from 'react';
import { Instagram, ChevronDown, ArrowUp } from 'lucide-react';
import mascotImage from '../assets/spider.png';
import dspLogo from '../assets/datoriki_logo_white.png';

import sejiens2024 from '../assets/sejiens2024.png';
import sejiens2023 from '../assets/sejiens2023.png';
import sejiens2022 from '../assets/sejiens2022.png';
import sejiens2021 from '../assets/sejiens2021.png';
import sejiens2020 from '../assets/sejiens2020.png';

const galleryYears = [
  { year: 2024, image: sejiens2024, href: 'https://www.instagram.com/p/C_some_link_to_2024_gallery' },
  { year: 2023, image: sejiens2023, href: null },
  { year: 2022, image: sejiens2022, href: null },
  { year: 2021, image: sejiens2021, href: null },
  { year: 2020, image: sejiens2020, href: null },
];

const socialLinks = [
  { name: 'Instagram', href: 'https://www.instagram.com/datoriki', icon: 'Instagram' },
  { name: 'TikTok', href: 'https://www.tiktok.com/@datoriki', icon: 'TikTok' },
];

const youtubeVideoId = 'OoLdJO9Zv60';

interface TikTokIconProps extends React.SVGProps<SVGSVGElement> {}

const TikTokIcon: React.FC<TikTokIconProps> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="-5 -5 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8.11a4.24 4.24 0 0 1-4.24-4.24V0H8.24v13.59a4.24 4.24 0 1 1-4.24-4.24"/>
  </svg>
);

const GalleryImage = ({ src, href }: { src: string; href?: string | null }) => {
  const ImageContent = (
    <div className="rounded-lg overflow-hidden group">
      <img
        src={src} 
        alt="Sējiens pasākuma bilde"
        className="w-full h-full object-cover "
      />
    </div>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {ImageContent}
      </a>
    );
  }

  return ImageContent;
};


// --- GALVENAIS LAPAS KOMPONENTS ---

function MainPage() {
  const [latestYear, ...olderYears] = galleryYears;

  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []); 


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };


  return (
    // The main container now just has the solid base color.
    <div className="bg-[#1A0F2A] text-[#E0E0E0] font-sans min-h-screen">
      
      {/* 1. Hero Section  */}
      <header className="h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0F2A] via-[#1A0F2A] to-[#AA86B5]/10 z-0"></div>
        
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={mascotImage}
            alt="Sējiens Mascot"
            className="h-48 w-auto mb-6 animate-float"
          />
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#A1F82A] tracking-tight text-shadow-glow">
            Sējiens 2025
          </h1>
          <p className="mt-4 text-lg md:text-xl text-[#E0E0E0]/90 max-w-2xl">
            Tavs neaizmirstamākais studiju saliedējošais pasākums
          </p>
          <Link
            to="/pieteikties"
            className="mt-8 inline-block bg-[#A1F82A] text-[#1A0F2A] font-bold py-3 px-8 rounded-lg text-base uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#A1F82A]/40"
          >
            Pieteikties
          </Link>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <ChevronDown
            className="h-12 w-12 text-[#A1F82A] animate-bounce"
            strokeWidth={1.5}
          />
        </div>
      </header>

      <div className="relative z-0 bg-gradient-to-tr from-[#1A0F2A] via-[#1A0F2A] to-[#AA86B5]/10">
        <main className="px-6 md:px-10">
          {/* 2. Description Section */}
          <section id="about" className="max-w-4xl mx-auto py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[#A1F82A] mb-8 text-center">
              Kas ir Sējiens?
            </h2>
            <p className="text-base md:text-lg text-[#E0E0E0]/90 mb-6 leading-relaxed">
              Sējiens — trīs dienu piedzīvojums, kur tu iepazīsi savus kursabiedrus, sapratīsi, kas tā tāda universitāte ir un, protams, labi pavadīsi laiku.
            </p>
            <blockquote className="border-l-4 border-[#7D26C9] pl-6 py-4 my-6 bg-black/20 rounded-r-lg">
              <p className="text-base md:text-lg italic text-[#E0E0E0]">
                "Šis ir pasākums pirmkārt studentiem, no studentiem. Sējiens ir Datorikas fakultātes sirdī lolota tradīcija, kura notiek katru gadu, jo mēs zinām, cik svarīgs ir pirmais iespaids."
              </p>
            </blockquote>
          </section>

          {/* 3. YouTube Section */}
          <section id="video" className="max-w-4xl mx-auto py-12 md:py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-[#A1F82A] mb-8">
              Kas notiek Sējienā?
            </h2>
            <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg shadow-[#7D26C9]/30">
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>

          {/* 4. Gallery Section */}
          <section id="gallery" className="max-w-4xl mx-auto py-16 md:py-24">
            <h2 className="text-3xl md:text-4xl font-bold text-[#A1F82A] mb-10 text-center">
              Iepriekšējo gadu atskats
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div className="lg:col-span-2">
                <h3 className="text-2xl font-bold text-[#E0E0E0] mb-4">Sējiens {latestYear.year}</h3>
                <GalleryImage src={latestYear.image}  />
              </div>
              {olderYears.map((item) => (
                <div key={item.year}>
                  <h3 className="text-xl font-bold text-[#E0E0E0] mb-3">Sējiens {item.year}</h3>
                  <GalleryImage src={item.image} />
                </div>
              ))}
            </div>
          </section>

          {/* 5. Follow Us Section */}
          <section id="socials" className="py-12 text-center">
              <div className="max-w-2xl mx-auto px-4">
                  <h2 className="text-3xl md:text-4xl font-bold text-[#A1F82A] mb-4">Nepalaid garām jaunumus!</h2>
                  <p className="text-[#E0E0E0]/80 mb-8 max-w-lg mx-auto">
                      Seko mums sociālajos tīklos!
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                      {socialLinks.map((link) => (
                          <a
                              key={link.name}
                              href={link.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex w-full sm:w-auto justify-center items-center gap-3 rounded-lg bg-[#A1F82A] px-6 py-3 text-lg font-bold text-[#1A0F2A] transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#A1F82A]/30"
                          >
                              {link.icon === 'Instagram' && <Instagram size={28} />}
                              {link.icon === 'TikTok' && <TikTokIcon width="28" height="28" />}
                              <span>{link.name}</span>
                          </a>
                      ))}
                  </div>
              </div>
          </section>
        </main>

        {/* 6. Footer Section */}
        <footer className="bg-black/30 py-8 border-t border-[#7F4A88]/50">
          <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
            
            <div>
              <p className="text-sm font-semibold text-[#E0E0E0]">
                LU Eksakto zinātņu un tehnoloğiju fakultātes Datorikas Studējošo pašpārvalde
                <span className="block text-sm text-[#E0E0E0]/60 my-1">
                  sejiens@datoriki.lv
                </span>
              </p>
            </div>

            <img 
              src={dspLogo} 
              alt="Datorikas Studentu Pašpārvaldes logo" 
              className="h-20 mx-32 w-auto flex-shrink-0" 
            />

          </div>
        </footer>
      </div> 

      <button
        onClick={scrollToTop}
        className={`fixed bottom-8 right-8 z-50 p-3 rounded-full bg-[#A1F82A] text-[#1A0F2A] shadow-lg transition-opacity duration-300 hover:scale-110
          ${showBackToTop ? 'opacity-100' : 'opacity-0 pointer-events-none'}`
        }
        aria-label="Atgriezties augšā"
      >
        <ArrowUp className="h-6 w-6" />
      </button>

    </div>
  );
}

export default MainPage;