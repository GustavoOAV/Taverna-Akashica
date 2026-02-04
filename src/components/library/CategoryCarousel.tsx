"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// --- ÁREA DE EDIÇÃO MANUAL ---
const CATEGORIES = [
 {
    id: "sup1",
    label: "Aparador Senhor dos Anéis",
    imageSrc: "https://m.media-amazon.com/images/I/51wF07Cw-oL._AC_SX425_.jpg", 
    amazonLink: "https://amzn.to/3YH7Bra",
  },
  {
    id: "sup2",
    label: "Bibliocanto Preto",
    imageSrc: "https://m.media-amazon.com/images/I/51RNL1Z5geL._AC_SX300_SY300_QL70_ML2_.jpg",
    amazonLink: "https://amzn.to/3LwwiUg",
  },
  {
    id: "sup3",
    label: "Decorativo Menina e Menino",
    imageSrc: "https://m.media-amazon.com/images/I/41mDQwS6ibL._AC_SL1000_.jpg",
    amazonLink: "https://amzn.to/49DfX8d",
  },
  {
    id: "sup4",
    label: "Aparador Batman",
    imageSrc: "https://m.media-amazon.com/images/I/510tm1px0SS._AC_SY300_SX300_QL70_ML2_.jpg",
    amazonLink: "https://amzn.to/4jLqnHw",
  },
  {
    id: "sup5",
    label: "Zelda: Escudo Link",
    imageSrc: "https://m.media-amazon.com/images/I/61gqJkgSnbL._AC_SX300_SY300_QL70_ML2_.jpg",
    amazonLink: "https://amzn.to/4sJnNpm",
  },
  {
    id: "sup6",
    label: "Samurai Espadachim",
    imageSrc: "https://m.media-amazon.com/images/I/51tnmGNApdL._AC_SY300_SX300_QL70_ML2_.jpg",
    amazonLink: "https://amzn.to/4qqqGKp",
  },
  {
    id: "sup7",
    label: "Aparador Dragon Ball Z",
    imageSrc: "https://m.media-amazon.com/images/I/41quXyg0pRL._AC_SL1000_.jpg",
    amazonLink: "https://amzn.to/4jGYtfH",
  },
  {
    id: "sup8",
    label: "Samurai Espadachim (Alt)",
    imageSrc: "https://m.media-amazon.com/images/I/51vF6fObHyL._AC_SY300_SX300_QL70_ML2_.jpg",
    amazonLink: "https://amzn.to/4sHh5Aj",
  },
  {
    id: "sup9",
    label: "Guerra Civil: Marvel",
    imageSrc: "https://m.media-amazon.com/images/I/51N6GbGagdL._AC_SL1200_.jpg",
    amazonLink: "https://amzn.to/4sXz1Hc",
  },
  {
    id: "sup10",
    label: "O Hobbit: Anões e Dragão",
    imageSrc: "https://m.media-amazon.com/images/I/61wCLg-lIUL._AC_SL1200_.jpg",
    amazonLink: "https://amzn.to/45gDb2x",
  },
  {
    id: "sup11",
    label: "Dragão Guardião do Tesouro",
    imageSrc: "https://m.media-amazon.com/images/I/61bWV2WMbWL._AC_SL1500_.jpg",
    amazonLink: "https://amzn.to/49UWW2d",
  },
  {
    id: "sup12",
    label: "Plataforma 9 ¾ Luminária",
    imageSrc: "https://m.media-amazon.com/images/I/61CTOCDGzEL._AC_SL1200_.jpg",
    amazonLink: "https://amzn.to/49Vz7Y6",
  },
];
// --- FIM DA ÁREA DE EDIÇÃO ---

export function CategoryCarousel() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Ajustado para o novo tamanho do card
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* MODAL ZOOM */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-3xl h-[70vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full bg-white rounded-lg p-2">
                <Image src={selectedImage} alt="Zoom" fill className="object-contain" />
            </div>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white text-4xl hover:text-akashic-gold">&times;</button>
          </div>
        </div>
      )}

      {/* CONTEÚDO */}
      <div className="w-full max-w-[95%] mx-auto relative z-10 group/carousel">
        
        {/* Título da Seção */}
        <div className="flex items-center gap-4 mb-6 px-4">
          <div className="h-[2px] flex-1 bg-gradient-to-r from-transparent to-akashic-gold/50"></div>
          <h3 className="font-cinzel text-akashic-gold text-2xl md:text-3xl uppercase tracking-widest text-center font-bold drop-shadow-md">
            Suportes para Livros
          </h3>
          <div className="h-[2px] flex-1 bg-gradient-to-l from-transparent to-akashic-gold/50"></div>
        </div>

        <div className="flex items-center justify-center gap-2">
          
          {/* SETA ESQUERDA */}
          <button 
            type="button"
            aria-label="Scroll left"
            title="Scroll left"
            onClick={() => scroll('left')}
            className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full border border-akashic-gold/50 text-akashic-gold bg-black/80 hover:bg-akashic-gold hover:text-black transition-all duration-300 hover:scale-110 cursor-pointer z-20"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* ÁREA DE SCROLL */}
          <div 
            ref={scrollRef}
            className="flex-1 flex overflow-x-auto py-4 px-2 gap-4 items-stretch no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {CATEGORIES.map((cat) => (
              <div
                key={cat.id}
                className="
                  snap-center relative shrink-0
                  w-[240px] md:w-[240px] h-[340px] 
                  flex flex-col 
                  bg-[#151412] 
                  border border-stone-700 hover:border-akashic-gold 
                  rounded-lg transition-all duration-300 group
                  hover:shadow-[0_0_20px_rgba(255,215,0,0.15)]
                  overflow-hidden
                "
              >
                {/* --- ÁREA DA IMAGEM --- */}
                <div 
                  className="
                    relative w-full h-[220px] 
                    flex items-center justify-center cursor-zoom-in overflow-hidden
                    bg-[#ffff] 
                    border-b-4 border-black/20
                  "
                  onClick={() => setSelectedImage(cat.imageSrc)}
                >
                  {/* Sombra interna para parecer um nicho */}
                  <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-10 pointer-events-none"></div>

                  <div className="relative w-[90%] h-[90%] transition-transform duration-500 group-hover:scale-110">
                    <Image
                      src={cat.imageSrc}
                      alt={cat.label}
                      fill 
                      className="
                        object-contain 
                        mix-blend-multiply 
                        contrast-125
                      "
                    />
                  </div>
                </div>

                {/* --- CONTEÚDO (Texto e Botão) --- */}
                <div className="
                    flex-1 
                    flex flex-col 
                    p-3
                    bg-gradient-to-b from-stone-900 to-black
                ">
                  
                  {/* Título do Produto */}
                  <span className="
                    flex-1 flex items-center justify-center
                    font-cinzel font-bold text-center text-stone-200 text-sm md:text-base
                    group-hover:text-akashic-gold transition-colors duration-300
                    leading-tight line-clamp-2
                  ">
                    {cat.label}
                  </span>

                  {/* Botão com Efeito Azul Neon */}
                  <Link href={cat.amazonLink} target="_blank" className="w-full mt-2">
                    <button className="
                      w-full py-2
                      /* Estado Normal (Dourado Discreto) */
                      bg-akashic-gold/10 border border-akashic-gold/50 
                      text-akashic-gold font-cinzel font-bold text-xs uppercase tracking-wider 
                      rounded-sm
                      transition-all duration-300 
                      
                      /* --- HOVER AZUL NEON (Novo) --- */
                      hover:bg-cyan-950/60
                      hover:border-cyan-400
                      hover:text-cyan-400
                      hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                      
                      active:scale-95 
                      flex items-center justify-center gap-1
                    ">
                      <span>Obter</span> <span className="text-[10px]">↗</span>
                    </button>
                  </Link>

                </div>
              </div>
            ))}
            
            <div className="w-1 shrink-0"></div>
          </div>

          {/* SETA DIREITA */}
          <button 
            type="button"
            aria-label="Scroll right"
            onClick={() => scroll('right')}
            className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full border border-akashic-gold/50 text-akashic-gold bg-black/80 hover:bg-akashic-gold hover:text-black transition-all duration-300 hover:scale-110 cursor-pointer z-20"
          >
            <FaChevronRight size={20} />
          </button>

        </div>
      </div>
    </>
  );
}