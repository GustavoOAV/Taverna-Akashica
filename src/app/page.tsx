import { KindleBanner } from "@/components/landing/KindleBanner";
import { ScrollCard } from "@/components/landing/StoryCard";
import { UnlimitedBanner } from "@/components/landing/UnlimitedBanner";
import { Footer } from "@/components/layout/Footer";
import Image from "next/image";

// Configuração dos Pergaminhos
const SCROLLS = [
  {
    id: 1,
    src: "/images/banner1.png",
    alt: "A Doutrina dos Mestres",
    link: "https://pay.kirvano.com/55db13f4-ac4b-42bd-9921-64194fca86b7",
  },
  {
    id: 2,
    src: "/images/banner2.png",
    alt: "Artefatos e Proteção",
    link: "/artefatos",
  },
  {
    id: 3,
    src: "/images/banner3.png",
    alt: "Expansão da Consciência",
    link: "/livros",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-akashic-stone overflow-x-hidden">
      
      {/* 1. SEÇÃO DO CÉU */}
      <section className="w-full h-[180px] md:h-[400px] bg-[url('/images/bg-stars.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center relative z-20">
        <div className="absolute bottom-0 translate-y-[10%] md:translate-y-[10%] left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-3xl flex justify-center z-30">
          <Image
            src="/images/main-logo.png"
            alt="Taverna Akashica"
            width={800}
            height={600}
            priority
            className="drop-shadow-[0_0_35px_rgba(0,240,255,0.6)] object-contain transform hover:scale-105 transition-transform duration-700 ease-in-out cursor-pointer"
          />
        </div>
      </section>

      {/* 2. SEÇÃO DA PAREDE */}
      <section className="w-full flex-1 bg-[url('/images/bg-wall.png')] bg-cover bg-center border-t-2 border-akashic-gold shadow-[0_-4px_25px_rgba(255,215,0,0.5)] flex flex-col items-center pt-0 md:pt-26 relative z-10 pb-20">
        
        {/* Banners Principais */}
        <KindleBanner />
        <UnlimitedBanner />

        {/* Divisória Decorativa com Texto */}
        <div className="mt-12 mb-8 flex items-center justify-center gap-3 md:gap-6 opacity-90 w-full px-4">
          {/* Linha Esquerda */}
          <div className="h-[1px] w-8 md:w-16 bg-akashic-gold shadow-[0_0_5px_#ffd700] shrink-0"></div>

          {/* Texto Estilizado */}
          <h2 className="text-akashic-gold font-cinzel font-bold text-lg md:text-2xl text-center tracking-[0.15em] uppercase drop-shadow-md">
            Registros Mais Acessados Nesta Era
          </h2>

          {/* Linha Direita */}
          <div className="h-[1px] w-8 md:w-16 bg-akashic-gold shadow-[0_0_5px_#ffd700] shrink-0"></div>
        </div>

        {/* O GRID DE PERGAMINHOS (IMAGENS) */}
        <div
          className="
            w-full max-w-7xl px-4
            flex 
            flex-wrap       
            lg:flex-nowrap  
            justify-center  
            items-center    
            gap-3 md:gap-6
          "
        >
          {SCROLLS.map((scroll) => (
            <ScrollCard
              key={scroll.id}
              imageSrc={scroll.src}
              altText={scroll.alt}
              linkUrl={scroll.link}
            />
          ))}
        </div>
      </section>

      {/* 3. RODAPÉ */}
      <Footer />
    </div>
  );
}