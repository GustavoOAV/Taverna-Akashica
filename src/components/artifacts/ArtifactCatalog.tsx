"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaGem, FaLandmark, FaMagic, FaRing, FaSearch } from "react-icons/fa";

// IMPORTAÇÃO DOS DADOS
// Certifique-se que o arquivo artifactsData.ts está na mesma pasta
import { ARTIFACTS, type Artifact, type CategoryType } from "./artifactsData";

// --- SUB-COMPONENTES (UI ISOLADA) ---

/**
 * 1. BOTÃO DE CATEGORIA
 * Dica de Manutenção: Este botão usa um tamanho fixo (w/h) para garantir que
 * o grid fique alinhado mesmo se o texto for curto ou longo.
 * Estilo: Azul Neon quando ativo.
 */
const CategoryButton = ({ 
  id, label, icon, isActive, onClick 
}: { 
  id: CategoryType; 
  label: string; 
  icon: React.ReactNode; 
  isActive: boolean; 
  onClick: (id: CategoryType) => void;
}) => (
  <button
    onClick={() => onClick(id)}
    className={`
      flex flex-col items-center justify-center
      /* DIMENSÕES FIXAS (Mobile / Desktop) - Mexa aqui para alterar o tamanho dos botões */
      w-[85px] h-[60px] md:w-[110px] md:h-[80px]
      rounded border transition-all duration-300 font-cinzel text-[10px] md:text-sm uppercase tracking-wider
      
      /* LÓGICA DE CORES */
      ${isActive 
        /* Estado ATIVO: Azul Neon Brilhante */
        ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] font-bold scale-105" 
        /* Estado INATIVO: Fundo Escuro + Hover Azul */
        : "bg-black/40 text-stone-400 border-stone-700 hover:border-cyan-400 hover:text-cyan-400"
      }
    `}
  >
    <span className="text-sm md:text-base opacity-80">{icon}</span>
    <span>{label}</span>
  </button>
);

/**
 * 2. CARD DO ARTEFATO
 * Contém a lógica de imagem (com placeholder se falhar) e o botão de ação.
 */
const ArtifactCard = ({ item, onZoom }: { item: Artifact; onZoom: (src: string) => void }) => (
  <div className="flex flex-col bg-black/40 border border-stone-800 hover:border-akashic-gold rounded-lg transition-all duration-300 group hover:shadow-[0_0_25px_rgba(255,215,0,0.1)] overflow-hidden h-full">
    
    {/* ÁREA DA IMAGEM */}
    <div 
      className="relative w-full aspect-square bg-white flex items-center justify-center cursor-zoom-in overflow-hidden p-2 md:p-4"
      onClick={() => item.imageSrc && onZoom(item.imageSrc)}
    >
      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
        {item.imageSrc ? (
          <Image src={item.imageSrc} alt={item.title} fill className="object-contain drop-shadow-md" />
        ) : (
          /* Placeholder caso não tenha imagem */
          <div className="flex flex-col items-center justify-center w-full h-full text-gray-300 font-cinzel text-[10px] text-center opacity-60 gap-1">
             <FaGem className="text-xl" />
             <span>[Foto]</span>
          </div>
        )}
      </div>
    </div>

    {/* CONTEÚDO E BOTÃO */}
    <div className="flex-1 flex flex-col justify-between p-2 md:p-4 gap-2 bg-stone-950 border-t border-stone-800">
      
      {/* Título do Item */}
      <span className="font-cinzel font-bold text-center text-stone-200 text-[10px] md:text-sm group-hover:text-akashic-gold transition-colors duration-300 leading-tight line-clamp-3">
        {item.title}
      </span>

      {/* Botão de Ação (Amazon) */}
      <Link href={item.amazonLink} target="_blank" className="w-full">
        <button className="
          w-full py-1.5 md:py-2
          /* ESTADO NORMAL: Dourado (Tema Base) */
          bg-akashic-gold/10 border border-akashic-gold/50 
          text-akashic-gold font-cinzel font-bold text-[9px] md:text-[10px] uppercase tracking-wider 
          rounded-sm transition-all duration-300 
          
          /* HOVER: Azul Neon (Destaque Cyberpunk) */
          hover:bg-cyan-950/60 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
          
          active:scale-95 flex items-center justify-center gap-1
        ">
          <span>Obter</span> <span className="text-[9px]">↗</span>
        </button>
      </Link>
    </div>
  </div>
);

/**
 * 3. MODAL DE ZOOM
 * Exibe a imagem em tela cheia ao clicar.
 */
const ZoomModal = ({ src, onClose }: { src: string; onClose: () => void }) => (
  <div 
    className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
    onClick={onClose}
  >
    <div className="relative w-full max-w-md h-[70vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
      <div className="relative w-full h-full bg-white rounded p-1 shadow-2xl">
        <Image src={src} alt="Zoom" fill className="object-contain" />
      </div>
      <button onClick={onClose} className="absolute -top-12 right-0 text-white text-4xl hover:text-akashic-gold">&times;</button>
    </div>
  </div>
);


// --- COMPONENTE PRINCIPAL ---
export function ArtifactCatalog() {
  // ESTADOS
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("todos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // LÓGICA DE FILTRO (Memoized para performance)
  // O React só recalcula essa lista se o termo de busca ou categoria mudar.
  const filteredArtifacts = useMemo(() => {
    return ARTIFACTS.filter((item) => {
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  // Configuração das Categorias (Ícones e Labels)
  const categories = [
    { id: "todos", label: "Tudo", icon: <FaSearch className="mb-1" /> },
    { id: "decoracao", label: "Decor", icon: <FaMagic className="mb-1" /> },
    { id: "estatuas", label: "Estátuas", icon: <FaLandmark className="mb-1" /> },
    { id: "amuletos", label: "Amuletos", icon: <FaRing className="mb-1" /> },
  ] as const;

  return (
    // CONTAINER PRINCIPAL
    // w-full no mobile, max-w-[95%] no desktop para manter alinhamento
    <div className="w-full md:max-w-[95%] mx-auto pb-20 relative z-10 px-4 md:px-0">
      
      {/* Renderiza o modal apenas se houver imagem selecionada */}
      {selectedImage && <ZoomModal src={selectedImage} onClose={() => setSelectedImage(null)} />}

      {/* --- CABEÇALHO DA SEÇÃO --- */}
      <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
        
        {/* Título (Dourado) */}
        <div className="relative py-4 md:py-6 mb-4 flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-radial-gradient(ellipse_at_center,_rgba(255,215,0,0.15)_0%,_transparent_70%) blur-xl pointer-events-none"></div>
          <h3 className="relative z-10 font-cinzel font-bold text-xl md:text-3xl text-akashic-gold uppercase tracking-[0.2em] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Arsenal Místico
          </h3>
        </div>

        {/* Filtros de Categoria */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full max-w-3xl">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              id={cat.id as CategoryType}
              label={cat.label}
              icon={cat.icon}
              isActive={activeCategory === cat.id}
              onClick={setActiveCategory}
            />
          ))}
        </div>

        {/* Barra de Busca (Dourada) */}
        <div className="relative w-full max-w-md group">
          <div className="absolute inset-0 bg-akashic-gold/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative flex items-center bg-black/80 border border-stone-600 rounded-full px-4 py-1.5 md:px-5 md:py-2 shadow-inner focus-within:border-akashic-gold transition-all duration-300">
            <FaSearch className="text-stone-500 w-3 h-3 md:w-4 md:h-4 mr-3 group-focus-within:text-akashic-gold transition-colors" />
            <input 
              type="text" 
              placeholder="Buscar..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-stone-200 placeholder-stone-600 font-cinzel text-xs md:text-base"
            />
          </div>
        </div>
      </div>

      {/* --- GRADE DE PRODUTOS --- */}
      {filteredArtifacts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 animate-fadeIn">
          {filteredArtifacts.map((item) => (
            <ArtifactCard 
              key={item.id} 
              item={item} 
              onZoom={setSelectedImage} 
            />
          ))}
        </div>
      ) : (
        /* Estado Vazio (Nenhum item encontrado) */
        <div className="text-center py-20 bg-black/20 rounded-lg border border-dashed border-stone-800">
          <FaGem className="w-12 h-12 text-stone-600 mx-auto mb-4" />
          <p className="font-cinzel text-stone-500 text-xl">Nada encontrado.</p>
          <button 
            onClick={() => {setActiveCategory('todos'); setSearchTerm('');}}
            className="mt-4 text-akashic-gold underline text-sm hover:text-white"
          >
            Limpar filtros
          </button>
        </div>
      )}
    </div>
  );
}