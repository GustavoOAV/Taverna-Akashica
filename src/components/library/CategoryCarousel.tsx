"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// IMPORTAÇÃO DOS DADOS
import { CAROUSEL_ITEMS, type CarouselItem } from "./carouselData";

// --- SUB-COMPONENTES (UI Isolada) ---

/**
 * 1. CARD DO CARROSSEL
 * Representa um único item deslizável.
 */
const CarouselCard = ({ item, onZoom }: { item: CarouselItem; onZoom: (src: string) => void }) => (
  <div
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
      onClick={() => onZoom(item.imageSrc)}
    >
      {/* Sombra interna para parecer um nicho */}
      <div className="absolute inset-0 shadow-[inset_0_0_20px_rgba(0,0,0,0.6)] z-10 pointer-events-none"></div>

      <div className="relative w-[90%] h-[90%] transition-transform duration-500 group-hover:scale-110">
        <Image
          src={item.imageSrc}
          alt={item.label}
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
        {item.label}
      </span>

      {/* Botão com Efeito Azul Neon */}
      <Link href={item.amazonLink} target="_blank" className="w-full mt-2">
        <button className="
          w-full py-2
          /* Estado Normal (Dourado Discreto) */
          bg-akashic-gold/10 border border-akashic-gold/50 
          text-akashic-gold font-cinzel font-bold text-xs uppercase tracking-wider 
          rounded-sm
          transition-all duration-300 
          
          /* --- HOVER AZUL NEON --- */
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
);

/**
 * 2. MODAL DE ZOOM
 * Exibe a imagem ampliada.
 */
const ZoomModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
  <div 
    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
    onClick={onClose}
  >
    <div className="relative w-full max-w-3xl h-[70vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <div className="relative w-full h-full bg-white rounded-lg p-2">
        <Image src={src} alt="Zoom" fill className="object-contain" />
      </div>
      <button onClick={onClose} className="absolute -top-12 right-0 text-white text-4xl hover:text-akashic-gold">&times;</button>
    </div>
  </div>
);


// --- COMPONENTE PRINCIPAL ---
export function CategoryCarousel() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lógica de Scroll Horizontal
  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 280; // Largura do card + margem aproximada
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {/* MODAL ZOOM */}
      {selectedImage && <ZoomModal src={selectedImage} onClose={() => setSelectedImage(null)} />}

      {/* CONTEÚDO PRINCIPAL */}
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
            onClick={() => scroll('left')}
            className="hidden md:flex shrink-0 w-10 h-10 items-center justify-center rounded-full border border-akashic-gold/50 text-akashic-gold bg-black/80 hover:bg-akashic-gold hover:text-black transition-all duration-300 hover:scale-110 cursor-pointer z-20"
          >
            <FaChevronLeft size={20} />
          </button>

          {/* ÁREA DE SCROLL (CARROSSEL) */}
          <div 
            ref={scrollRef}
            className="flex-1 flex overflow-x-auto py-4 px-2 gap-4 items-stretch no-scrollbar scroll-smooth snap-x snap-mandatory"
          >
            {CAROUSEL_ITEMS.map((item) => (
              <CarouselCard 
                key={item.id} 
                item={item} 
                onZoom={setSelectedImage} 
              />
            ))}
            
            {/* Espaçador final para garantir scroll completo no mobile */}
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