"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { FaBookOpen, FaCrown, FaEye, FaHourglassHalf, FaSearch } from "react-icons/fa";

// IMPORTAÇÃO DOS DADOS DOS LIVROS 
import { BOOKS, type Book, type CategoryType, type LanguageType } from "./bookData";

// --- SUB-COMPONENTES (MANTENHA ELES AQUI) ---

// 1. Botão de Categoria
const CategoryButton = ({ 
  id, label, icon, isActive, onClick 
}: { 
  id: CategoryType | "todos"; // Ajuste leve de tipo
  label: string; 
  icon: React.ReactNode; 
  isActive: boolean; 
  onClick: (id: CategoryType | "todos") => void;
}) => (
  <button
    onClick={() => onClick(id)}
    className={`
      flex flex-col items-center justify-center
      w-[85px] h-[60px] md:w-[110px] md:h-[80px]
      rounded border transition-all duration-300 font-cinzel text-[10px] md:text-sm uppercase tracking-wider
      ${isActive 
        ? "bg-cyan-400 text-black border-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)] font-bold scale-105" 
        : "bg-black/40 text-stone-400 border-stone-700 hover:border-cyan-400 hover:text-cyan-400"
      }
    `}
  >
    <span className="text-sm md:text-base opacity-80">{icon}</span>
    <span>{label}</span>
  </button>
);

// 2. Card do Livro
const BookCard = ({ book, onZoom }: { book: Book; onZoom: (src: string) => void }) => (
  <div className="flex flex-col bg-black/40 border border-stone-800 hover:border-akashic-gold rounded-lg transition-all duration-300 group hover:shadow-[0_0_25px_rgba(255,215,0,0.1)] overflow-hidden h-full">
    
    <div 
      className="relative w-full aspect-[2/3] bg-white flex items-center justify-center cursor-zoom-in overflow-hidden p-4"
      onClick={() => book.imageSrc && onZoom(book.imageSrc)}
    >
      <div className={`absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-bold rounded border bg-white/90 shadow-sm z-10 ${book.language === 'en' ? 'text-blue-700 border-blue-200' : 'text-green-700 border-green-200'}`}>
        {book.language === 'en' ? 'EN' : 'PT'}
      </div>

      <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
        {book.imageSrc ? (
          <Image src={book.imageSrc} alt={book.title} fill className="object-contain drop-shadow-md" />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-300 font-cinzel text-xs text-center">[Capa Pendente]</div>
        )}
      </div>
    </div>

    <div className="flex-1 flex flex-col justify-between p-2 md:p-4 gap-2 bg-stone-950 border-t border-stone-800">
      <span className="flex-1 flex items-center justify-center font-cinzel font-bold text-center text-stone-300 text-[10px] md:text-sm group-hover:text-akashic-gold transition-colors duration-300 leading-tight line-clamp-3">
        {book.title}
      </span>
      
      <Link href={book.amazonLink} target="_blank" className="w-full">
        <button className="
          w-full py-1.5 md:py-2
          bg-akashic-gold/10 border border-akashic-gold/50 
          text-akashic-gold font-cinzel font-bold text-[9px] md:text-[10px] uppercase tracking-wider 
          rounded-sm transition-all duration-300 
          hover:bg-cyan-950/60 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
          active:scale-95 flex items-center justify-center gap-1
        ">
          <span>Obter</span> <span className="text-[9px]">↗</span>
        </button>
      </Link>
    </div>
  </div>
);

// 3. Modal de Zoom
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
export function BookCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType | "todos">("todos");
  const [activeLanguage, setActiveLanguage] = useState<LanguageType | "todos">("todos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Lógica memorizada (Agora usando o BOOKS importado)
  const filteredBooks = useMemo(() => {
    return BOOKS.filter((book) => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = activeCategory === "todos" || book.category === activeCategory;
      const matchesLanguage = activeLanguage === "todos" || book.language === activeLanguage;
      return matchesSearch && matchesCategory && matchesLanguage;
    });
  }, [searchTerm, activeCategory, activeLanguage]);

  const handleClearFilters = () => {
    setActiveCategory('todos');
    setActiveLanguage('todos');
    setSearchTerm('');
  };

  const categories = [
    { id: "todos", label: "Tudo", icon: <FaSearch className="mb-1" /> },
    { id: "historia", label: "História", icon: <FaCrown className="mb-1" /> },
    { id: "eras", label: "Eras", icon: <FaHourglassHalf className="mb-1" /> },
    { id: "sabedoria", label: "Oculto", icon: <FaEye className="mb-1" /> },
  ] as const;

  return (
    <div className="w-full md:max-w-[95%] mx-auto pb-20 relative z-10 px-4 md:px-0">
      
      {selectedImage && <ZoomModal src={selectedImage} onClose={() => setSelectedImage(null)} />}

      <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
        
        <div className="relative py-4 md:py-6 mb-4 flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-radial-gradient(ellipse_at_center,_rgba(255,215,0,0.15)_0%,_transparent_70%) blur-xl pointer-events-none"></div>
          <h3 className="relative z-10 font-cinzel font-bold text-xl md:text-3xl text-akashic-gold uppercase tracking-[0.2em] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Catálogo dos Tomos
          </h3>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full max-w-3xl">
          {categories.map((cat) => (
            <CategoryButton
              key={cat.id}
              id={cat.id}
              label={cat.label}
              icon={cat.icon}
              isActive={activeCategory === cat.id}
              onClick={setActiveCategory}
            />
          ))}
        </div>

        <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl items-center justify-center">
            
            <div className="flex items-center gap-2 p-1 bg-black/60 border border-stone-700 rounded h-[42px]">
                {(['todos', 'pt', 'en'] as const).map((lang) => (
                    <button
                        key={lang}
                        onClick={() => setActiveLanguage(lang)}
                        className={`
                            px-3 h-full rounded text-[10px] md:text-xs font-cinzel font-bold uppercase transition-all
                            ${activeLanguage === lang 
                                ? "bg-stone-700 text-white shadow-inner" 
                                : "text-stone-500 hover:text-white"
                            }
                        `}
                    >
                        {lang === 'todos' ? 'Todos' : lang.toUpperCase()}
                    </button>
                ))}
            </div>

            <div className="relative flex-1 w-full group">
              <div className="absolute inset-0 bg-akashic-gold/10 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-black/80 border border-stone-600 rounded px-4 py-2 shadow-inner focus-within:border-akashic-gold transition-all duration-300 h-[42px]">
                  <FaSearch className="text-stone-500 w-3 h-3 md:w-4 md:h-4 mr-3 group-focus-within:text-akashic-gold transition-colors" />
                  <input 
                    type="text" 
                    placeholder="Buscar livro..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-transparent border-none outline-none text-stone-200 placeholder-stone-600 font-cinzel text-xs md:text-sm"
                  />
              </div>
            </div>
        </div>
      </div>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 animate-fadeIn">
          {filteredBooks.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onZoom={setSelectedImage} 
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-black/20 rounded-lg border border-dashed border-stone-800">
          <FaBookOpen className="w-12 h-12 text-stone-600 mx-auto mb-4" />
          <p className="font-cinzel text-stone-500 text-xl">Nenhum registro encontrado.</p>
          <button 
            onClick={handleClearFilters}
            className="mt-4 text-akashic-gold underline text-sm hover:text-white"
          >
            Limpar filtros
          </button>
        </div>
      )}

    </div>
  );
}