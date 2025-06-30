import { Link } from 'react-router-dom'
import { Instagram } from 'lucide-react'
import mascotImage from '../assets/spider.png';

import sejiens2024 from '../assets/sejiens2024.png';
import sejiens2023 from '../assets/sejiens2023.png';
import sejiens2022 from '../assets/sejiens2022.png';
import sejiens2021 from '../assets/sejiens2021.png';
import sejiens2020 from '../assets/sejiens2020.png';

const GalleryImage = ({ src, href }: { src: string; href?: string | null }) => {
  const ImageContent = (
    <div className="rounded-lg overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#7D26C9]/30">
      <img
        src={src} 
        alt="Sējiens pasākuma bilde"
        className="w-full h-auto transition-transform duration-300"
      />
    </div>
  );

  if (!href) {
    return ImageContent;
  }

  const isExternal = href.startsWith('http');

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {ImageContent}
      </a>
    );
  } else {
    return (
      <Link to={href}>
        {ImageContent}
      </Link>
    );
  }
};

function MainPage() {
  const galleryYears = [
    { year: 2024, image: sejiens2024, url: 'https://photos.google.com/share/AF1QipPQH6UGAuCqCRK98_e7Q7p_qvLnXwFiogYtnGw9rOnMW3gqOYbxMW5mKy-lJB0ekw?key=UHpGN05XbloyV0N4Q3MyWVdjazBjeU9uWkpVRjZn' },
    { year: 2023, image: sejiens2023, url: 'https://photos.google.com/share/AF1QipMV2ETPrnjjQU09iA8XbyBFjwSdYP9t5DeY5z224OrcqjyW9jqIKIUXw6k7OiYRWQ?key=VjBsaFpacmItSnpMM09QS2pCQkt2azNtcW1wUDl3' },
    { year: 2022, image: sejiens2022, url: 'https://failiem.lv/u/6tra527v4' },
    { year: 2021, image: sejiens2021, url: '/404' }, 
    { year: 2020, image: sejiens2020, url: '/404' }, 
  ];

  return (
    <div className="bg-[#1A0F2A] text-[#E0E0E0] font-sans min-h-screen">
      {/* 1. Hero Section */}
      <header className="h-screen flex flex-col items-center justify-center text-center p-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1A0F2A] via-[#1A0F2A] to-[#AA86B5]/30 opacity-50"></div>
        <div className="relative z-10 flex flex-col items-center">
          <img
            src={mascotImage}
            alt="Sējiens Mascot"
            className="h-52 w-auto mb-6 animate-float"
          />
          {/* Replaced text-electric-lime */}
          <h1 className="text-6xl md:text-7xl font-extrabold text-[#A1F82A] tracking-tight text-shadow-glow">
            Sējiens 2025
          </h1>
          {/* Replaced text-off-white */}
          <p className="mt-4 text-xl md:text-xl text-[#E0E0E0]/90 max-w-2xl">
            Tavs neaizmirstamākais studiju saliedējošais pasākums
          </p>
          <Link
            to="/pieteikties"
            // Replaced bg-electric-lime, text-deep-purple, hover:shadow-electric-lime
            className="mt-10 inline-block bg-[#A1F82A] text-[#1A0F2A] font-bold py-3 px-8 rounded-lg text-lg uppercase tracking-wider transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#A1F82A]/40"
          >
            Pieteikties
          </Link>
        </div>
      </header>
      
      {/* --- The rest of your component remains the same --- */}

      <main className="px-6 md:px-10">
        {/* 2. Description Section */}
        <section id="about" className="max-w-4xl mx-auto py-20 md:py-28">
          <h2 className="text-4xl md:text-4xl font-bold text-[#A1F82A] mb-10 text-center">
            Kas ir Sējiens?
          </h2>
          <p className="text-lg text-[#E0E0E0]/90 mb-8 leading-relaxed">
            Sējiens — trīs dienu piedzīvojums, kur tu iepazīsi savus kursabiedrus, sapratīsi, kas tā tāda universitāte ir un, protams, labi pavadīsi laiku.
          </p>
          <blockquote className="border-l-4 border-[#7D26C9] pl-6 py-4 my-8 bg-black/20 rounded-r-lg">
            <p className="text-lg italic text-[#E0E0E0]">
              "Šis ir pasākums pirmkārt studentiem, no studentiem. Sējiens ir Datorikas fakultātes sirdī lolota tradīcija, kura notiek katru gadu, jo mēs zinām, cik svarīgs ir pirmais iespaids."
            </p>
          </blockquote>
        </section>

        {/* 3. YouTube Section */}
        <section id="video" className="max-w-4xl mx-auto py-12 text-center">
          <h2 className="text-4xl md:text-4xl font-bold text-[#A1F82A] mb-10">
            Kas notiek Sējienā?
          </h2>
          <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-lg shadow-[#7D26C9]/30">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube.com/embed/OoLdJO9Zv60"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        {/* 4. Gallery Section */}
        <section id="gallery" className="max-w-6xl mx-auto py-20 md:py-28">
          <h2 className="text-4xl md:text-4xl font-bold text-[#A1F82A] mb-12 text-center">
            Iepriekšējo gadu atskats
          </h2>
          <div className="space-y-16">
            {galleryYears.map((item) => (
              <div key={item.year}>
                <h3 className="ml-30 text-3xl font-bold text-[#E0E0E0] mb-6 text-left">
                  Sējiens {item.year}
                </h3>
                <div className="max-w-4xl mx-auto">
                  {/* Pass the src and href props to the GalleryImage component */}
                  <GalleryImage src={item.image} href={item.url} />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 5. Footer Section */}
      <footer className="bg-black/30 py-8 mt-20 border-t border-[#7F4A88]/50">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left">
          <div className="mb-4 sm:mb-0">
            <p className="text-m font-bold text-[#E0E0E0]">LU Eksakto zinātņu un tehnoloğiju fakultātes Datorikas Studentu pašpārvalde</p>
            <p className="text-sm text-[#E0E0E0]/70">Seko mums!</p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://www.instagram.com/datoriki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#A1F82A] hover:text-white transition-colors duration-300 group"
            >
              <Instagram size={28} />
              <span className="ml-2 font-semibold group-hover:underline">@datoriki</span>
            </a>
            <a
              href="https://www.tiktok.com/@datoriki"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center text-[#A1F82A] hover:text-white transition-colors duration-300 group"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="-5 -5 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8.11a4.24 4.24 0 0 1-4.24-4.24V0H8.24v13.59a4.24 4.24 0 1 1-4.24-4.24"/>
              </svg>
              <span className="ml-2 font-semibold group-hover:underline">@datoriki</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MainPage;