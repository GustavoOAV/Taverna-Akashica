"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FaGem, FaLandmark, FaMagic, FaRing, FaSearch } from "react-icons/fa";

// --- TIPOS ---
type CategoryType = "todos" | "decoracao" | "estatuas" | "amuletos";

// --- LISTA DE ARTEFATOS ---
// OBS: Deixei o campo imageSrc vazio ("") na maioria. 
// Você precisa colar o link da imagem da Amazon (botão direito na foto -> Copiar endereço da imagem)
const ARTIFACTS = [
  // --- DECORAÇÃO MÍSTICA ---
  {
    id: "d1",
    title: "Pirâmide Energética em Cobre De Vidro (Kit 3)",
    imageSrc: "https://m.media-amazon.com/images/I/51SY0dwsfpL._AC_SL1000_.jpg", 
    amazonLink: "https://amzn.to/3NmSOj2",
    category: "decoracao",
  },
  {
    id: "d2",
    title: "Pyramid Ogan Crystal Energy Tower",
    imageSrc: "https://m.media-amazon.com/images/I/51jxHltjaoS._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/49XgEKL",
    category: "decoracao",
  },
  {
    id: "d3",
    title: "Molde de Silicone Pirâmide (Artesanato)",
    imageSrc: "https://m.media-amazon.com/images/I/61G-LeJInpL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/45PNk6r",
    category: "decoracao",
  },
  {
    id: "d4",
    title: "Estatueta de Pirâmide de Cristal",
    imageSrc: "https://m.media-amazon.com/images/I/61OTLgYXITL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3NpdNBC",
    category: "decoracao",
  },
  {
    id: "d5",
    title: "Luminária LED Bola de Cristal 3D (Base Madeira)",
    imageSrc: "https://m.media-amazon.com/images/I/712WKEpj9VL._AC_SX342_SY445_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4sDQ5BT",
    category: "decoracao",
  },
  {
    id: "d6",
    title: "Globo Terrestre Decorativo Base Metálica",
    imageSrc: "https://m.media-amazon.com/images/I/61XkgiARFCL._AC_SL1000_.jpg", 
    amazonLink: "https://amzn.to/4r1GlzP",
    category: "decoracao",
  },
  {
    id: "d7",
    title: "Pêndulo Cinético",
    imageSrc: "https://m.media-amazon.com/images/I/51yXDr2czUL._AC_SL1200_.jpg", 
    amazonLink: "https://amzn.to/4sJgqOW",
    category: "decoracao",
  },
  {
    id: "d8",
    title: "Suporte de Vela Giratório Dourado",
    imageSrc: "https://m.media-amazon.com/images/I/51ksONz5MoL._AC_SL1080_.jpg", 
    amazonLink: "https://amzn.to/3ZddfRQ",
    category: "decoracao",
  },
  {
    id: "d9",
    title: "Ampulheta Torre Eiffel",
    imageSrc: "https://m.media-amazon.com/images/I/61GwGQPwCKL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3YGVx9i",
    category: "decoracao",
  },
  {
    id: "d10",
    title: "Escultura Pêndulo de Newton",
    imageSrc: "https://m.media-amazon.com/images/I/61G1v++BDwL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4qiW8tX",
    category: "decoracao",
  },
  {
    id: "d11",
    title: "Luminária Bola de Cristal 3D",
    imageSrc: "https://m.media-amazon.com/images/I/61Fx5mWHN4L._AC_SX342_SY445_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4pESidi",
    category: "decoracao",
  },
  {
    id: "d12",
    title: "Kit 2 Abajur Lua Cheia",
    imageSrc: "https://m.media-amazon.com/images/I/5141JV9ubBL._AC_SX342_SY445_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4jKwn39",
    category: "decoracao",
  },
  {
    id: "d13",
    title: "Fonte Estátua de Dragão de Jardim",
    imageSrc: "https://m.media-amazon.com/images/I/71EDz2DawXL._AC_SL1002_.jpg", 
    amazonLink: "https://amzn.to/4sCuOZ7",
    category: "decoracao",
  },
  {
    id: "d14",
    title: "Torre Eiffel Decorativa",
    imageSrc: "https://m.media-amazon.com/images/I/512tHDTFJyL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3LK7aJE",
    category: "decoracao",
  },
  {
    id: "d15",
    title: "Casa de João de Barro Decorativa",
    imageSrc: "https://m.media-amazon.com/images/I/41k9btxFZCL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/45egR9S",
    category: "decoracao",
  },
  {
    id: "d16",
    title: "Balança Decorativa da Justiça Dourada",
    imageSrc: "https://m.media-amazon.com/images/I/41VWyzJ8mrL._SX342_SY445_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4jESPuy",
    category: "decoracao",
  },

  // --- ESTÁTUAS & ÍDOLOS ---
  {
    id: "s1",
    title: "Estátua Decorativa da Justiça",
    imageSrc: "https://m.media-amazon.com/images/I/61ysTuJ4OiL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4jSbnrl",
    category: "estatuas",
  },
  {
    id: "s2",
    title: "Estátua Elefante da Sorte Feng Shui",
    imageSrc: "https://m.media-amazon.com/images/I/81oURGNO9HL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4bkJrdF",
    category: "estatuas",
  },
  {
    id: "s3",
    title: "Estátua Elefante Riqueza Sorte",
    imageSrc: "https://m.media-amazon.com/images/I/71mvrcDYMKL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4qVYLlp",
    category: "estatuas",
  },
  {
    id: "s4",
    title: "Escultura Sucellus Deus Celta",
    imageSrc: "https://m.media-amazon.com/images/I/61a2veFNAfL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4qURodO",
    category: "estatuas",
  },
  {
    id: "s5",
    title: "Escultura Leopardo Dourado",
    imageSrc: "https://m.media-amazon.com/images/I/71X+JXh5MKL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3NNP9us",
    category: "estatuas",
  },
  {
    id: "s6",
    title: "Escultura Decorativa de Águia",
    imageSrc: "https://m.media-amazon.com/images/I/71mbRd0YpEL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3LONPHc",
    category: "estatuas",
  },
  {
    id: "s7",
    title: "Estatueta Gato Bruxo Wicca",
    imageSrc: "https://m.media-amazon.com/images/I/61-uahf2JmL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/45Hd3Ow",
    category: "estatuas",
  },
  {
    id: "s8",
    title: "Olho De Hórus Egito",
    imageSrc: "https://m.media-amazon.com/images/I/71TLzS0t3oL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3LK86xE",
    category: "estatuas",
  },
  {
    id: "s9",
    title: "Estátua Afrodite",
    imageSrc: "https://m.media-amazon.com/images/I/61F8Ng6bloL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/49FWQdN",
    category: "estatuas",
  },
  {
    id: "s10",
    title: "Estátua da Águia Dourada",
    imageSrc: "https://m.media-amazon.com/images/I/819D4jTA6iL._AC_SL1500_.jpg", 
    amazonLink: "https://amzn.to/3NLSUR7",
    category: "estatuas",
  },
  {
    id: "s11",
    title: "Divino Espírito Santo",
    imageSrc: "https://m.media-amazon.com/images/I/71EHJbNJYtL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4qkTmEp",
    category: "estatuas",
  },
  {
    id: "s12",
    title: "Valquiria A Guerreira Nórdica",
    imageSrc: "https://m.media-amazon.com/images/I/71enOF1+4KL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4qpBmsM",
    category: "estatuas",
  },
  {
    id: "s13",
    title: "Ulisses e Cão Argos (Odisseia)",
    imageSrc: "https://m.media-amazon.com/images/I/51xFr8zEA6L._AC_SX466_.jpg", 
    amazonLink: "https://amzn.to/3LCtbKq",
    category: "estatuas",
  },
  {
    id: "s14",
    title: "Mago Merlin De Monte Moore",
    imageSrc: "https://m.media-amazon.com/images/I/71Of3+nxHVL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/49Y36yI",
    category: "estatuas",
  },
  {
    id: "s15",
    title: "Cronos O Deus Do Tempo",
    imageSrc: "https://m.media-amazon.com/images/I/618YQcJ9HOL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4jFDNVj",
    category: "estatuas",
  },
  {
    id: "s16",
    title: "Coruja Mágica Da Sabedoria",
    imageSrc: "https://m.media-amazon.com/images/I/710YAX4wSVL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/49pO98w",
    category: "estatuas",
  },
  {
    id: "s17",
    title: "Alexandre O Grande",
    imageSrc: "https://m.media-amazon.com/images/I/61wShpXE7PL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/45cavrv",
    category: "estatuas",
  },
  {
    id: "s18",
    title: "Estátua Da Justiça Themis",
    imageSrc: "https://m.media-amazon.com/images/I/51J2Lplk-VL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/3NpkHH2",
    category: "estatuas",
  },
  {
    id: "s19",
    title: "Nike A Deusa Grega Da Vitória",
    imageSrc: "https://m.media-amazon.com/images/I/51DfLfWjsrL._AC_SX300_SY300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4jShwnp",
    category: "estatuas",
  },
  {
    id: "s20",
    title: "Zeus O Senhor Do Universo",
    imageSrc: "https://m.media-amazon.com/images/I/61rahUMLlaL._AC_SY300_SX300_QL70_ML2_.jpg", 
    amazonLink: "https://amzn.to/4bH5Stk",
    category: "estatuas",
  },

  // --- AMULETOS & JOIAS ---
  {
    id: "j1",
    title: "Corrente Masculina Estrela de Davi",
    imageSrc: "https://m.media-amazon.com/images/I/515Q36A0lWL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4bzDUzG",
    category: "amuletos",
  },
  {
    id: "j2",
    title: "Amuleto Masculino Ouroboros",
    imageSrc: "https://m.media-amazon.com/images/I/41qu3pG0e-L._AC_SX342_.jpg", 
    amazonLink: "https://amzn.to/49FsGqX",
    category: "amuletos",
  },
  {
    id: "j3",
    title: "Colar Viking Lança de Odin",
    imageSrc: "https://m.media-amazon.com/images/I/51wIqN3mtBL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/3YDxmbR",
    category: "amuletos",
  },
  {
    id: "j4",
    title: "Colar Proteção Eterna São Bento",
    imageSrc: "https://m.media-amazon.com/images/I/51Wk6Z4i4-L._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4pEYsKE",
    category: "amuletos",
  },
  {
    id: "j5",
    title: "Amuleto Jade Natural Taiji",
    imageSrc: "https://m.media-amazon.com/images/I/61WDF0Wsx0L._AC_SY445_.jpg", 
    amazonLink: "https://amzn.to/49yXo52",
    category: "amuletos",
  },
  {
    id: "j6",
    title: "Pingente São Miguel Arcanjo",
    imageSrc: "https://m.media-amazon.com/images/I/51e0BdfTE1L._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4sDXQaZ",
    category: "amuletos",
  },
  {
    id: "j7",
    title: "Pingente Obsidiana Negra Hexagonal",
    imageSrc: "https://m.media-amazon.com/images/I/41YFd73zvgL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4sJgRbX",
    category: "amuletos",
  },
  {
    id: "j8",
    title: "Conjunto Pulseiras Divine Charm",
    imageSrc: "https://m.media-amazon.com/images/I/61JoH-EjLlL._AC_SX522_.jpg", 
    amazonLink: "https://amzn.to/4qWtFtY",
    category: "amuletos",
  },
  {
    id: "j9",
    title: "Colar Martelo de Thor Mjölnir",
    imageSrc: "https://m.media-amazon.com/images/I/51FKiAJ40KL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4bytpg2",
    category: "amuletos",
  },
  {
    id: "j10",
    title: "Colar Feminino Santíssima Trindade",
    imageSrc: "https://m.media-amazon.com/images/I/31cKuKGMjcL._AC_SX342_.jpg", 
    amazonLink: "https://amzn.to/3Lwa6cS",
    category: "amuletos",
  },
  {
    id: "j11",
    title: "Medalhão Selo dos 7 Arcanjos",
    imageSrc: "https://m.media-amazon.com/images/I/41SC0x-IGvL._AC_SX342_.jpg", 
    amazonLink: "https://amzn.to/4qwCcUI",
    category: "amuletos",
  },
  {
    id: "j12",
    title: "Colar Mapa da Fortuna Obsidiana",
    imageSrc: "https://m.media-amazon.com/images/I/61+zPO1W+UL._AC_SX522_.jpg", 
    amazonLink: "https://amzn.to/4sE8TRz",
    category: "amuletos",
  },
  {
    id: "j13",
    title: "Colar Obsidiana Power Wolf",
    imageSrc: "https://m.media-amazon.com/images/I/51Ixeok0M0L._AC_SX425_.jpg", 
    amazonLink: "https://amzn.to/49W8qCF",
    category: "amuletos",
  },
  {
    id: "j14",
    title: "Bracelete Nórdico Valknut",
    imageSrc: "https://m.media-amazon.com/images/I/31TE8hC3WHL._AC_SX679_.jpg", 
    amazonLink: "https://amzn.to/45gKXJL",
    category: "amuletos",
  },
  {
    id: "j15",
    title: "Pulseira Lobo Wolf Energy",
    imageSrc: "https://m.media-amazon.com/images/I/41HFlDqoXlL._AC_SX466_.jpg", 
    amazonLink: "https://amzn.to/49E1VD4",
    category: "amuletos",
  },
  {
    id: "j16",
    title: "Corrente com Pingente de São Bento",
    imageSrc: "https://m.media-amazon.com/images/I/51-Ji2pZnOL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/49Y4Dos",
    category: "amuletos",
  },
  {
    id: "j17",
    title: "Pulseira Pedras Naturais Olho de Tigre",
    imageSrc: "https://m.media-amazon.com/images/I/31zBaRPsyVL._AC_.jpg", 
    amazonLink: "https://amzn.to/4bytJvg",
    category: "amuletos",
  },
  {
    id: "j18",
    title: "Medalhão Efésios Armor of God",
    imageSrc: "https://m.media-amazon.com/images/I/513c5PPNo7L._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/3ZjZcde",
    category: "amuletos",
  },
  {
    id: "j19",
    title: "Kit Pulseiras King Panther",
    imageSrc: "https://m.media-amazon.com/images/I/417F8vRN-dL._AC_SX342_.jpg", 
    amazonLink: "https://amzn.to/4r1pxJb",
    category: "amuletos",
  },
  {
    id: "j20",
    title: "Colar Triquetra em Aço",
    imageSrc: "https://m.media-amazon.com/images/I/51D7w-gLjyL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/3Nf7dOb",
    category: "amuletos",
  },
  {
    id: "j21",
    title: "Colar Insígnia do Guerreiro",
    imageSrc: "https://m.media-amazon.com/images/I/51GopiLoS+L._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4jIm8w9",
    category: "amuletos",
  },
  {
    id: "j22",
    title: "Conjunto Complementar",
    imageSrc: "https://m.media-amazon.com/images/I/41ukBo7GgZL._AC_SX342_.jpg", 
    amazonLink: "https://amzn.to/4jR9nQg",
    category: "amuletos",
  },
  {
    id: "j23",
    title: "Bracelete Viking Iron Heart",
    imageSrc: "https://m.media-amazon.com/images/I/41D1tGjWLgL._AC_SX522_.jpg", 
    amazonLink: "https://amzn.to/3Nlluc1",
    category: "amuletos",
  },
  {
    id: "j24",
    title: "Anel de Gato Ajustável Sweet Dreams",
    imageSrc: "https://m.media-amazon.com/images/I/51NvooxBL0L._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/3NL5b8q",
    category: "amuletos",
  },
  {
    id: "j25",
    title: "Colar Masculino Tritão",
    imageSrc: "https://m.media-amazon.com/images/I/413xg3MlkZL._AC_SX342_.jpg", 
    amazonLink: "https://amzn.to/3LJcv3X",
    category: "amuletos",
  },
  {
    id: "j26",
    title: "Pingente São Jorge Moeda Antiga",
    imageSrc: "https://m.media-amazon.com/images/I/614S+hOKfwL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4pCQfqb",
    category: "amuletos",
  },
  {
    id: "j27",
    title: "Pingente Leão de Juda Moeda Antiga",
    imageSrc: "https://m.media-amazon.com/images/I/61hsqrWEMiL._AC_SX385_.jpg", 
    amazonLink: "https://amzn.to/4qTs1ce",
    category: "amuletos",
  },
];

export function ArtifactCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState<CategoryType>("todos");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredArtifacts = ARTIFACTS.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === "todos" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    // CORREÇÃO: w-full no mobile (para ocupar tudo) + px-4 (para dar margem igual dos dois lados)
    // No Desktop (md), ele volta a usar o max-w-[95%]
    <div className="w-full md:max-w-[95%] mx-auto pb-20 relative z-10 px-4 md:px-0">
      
      {/* MODAL DE ZOOM */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative w-full max-w-md h-[70vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full bg-white rounded p-1 shadow-2xl">
                <Image src={selectedImage} alt="Zoom" fill className="object-contain" />
            </div>
            <button onClick={() => setSelectedImage(null)} className="absolute -top-12 right-0 text-white text-4xl hover:text-akashic-gold">&times;</button>
          </div>
        </div>
      )}

      {/* --- CABEÇALHO --- */}
      <div className="flex flex-col items-center justify-center mb-8 md:mb-12">
        
        {/* TÍTULO */}
        <div className="relative py-4 md:py-6 mb-4 flex items-center justify-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-radial-gradient(ellipse_at_center,_rgba(255,215,0,0.15)_0%,_transparent_70%) blur-xl pointer-events-none"></div>
          <h3 className="relative z-10 font-cinzel font-bold text-xl md:text-3xl text-akashic-gold uppercase tracking-[0.2em] text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Arsenal Místico
          </h3>
        </div>

        {/* --- BOTÕES DE CATEGORIA --- */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6 w-full max-w-3xl">
          {[
            { id: "todos", label: "Tudo", icon: <FaSearch className="mb-1" /> },
            { id: "decoracao", label: "Decor", icon: <FaMagic className="mb-1" /> },
            { id: "estatuas", label: "Estátuas", icon: <FaLandmark className="mb-1" /> },
            { id: "amuletos", label: "Amuletos", icon: <FaRing className="mb-1" /> },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as CategoryType)}
              className={`
                flex flex-col items-center justify-center
                px-2 py-2 rounded min-w-[70px] md:min-w-[80px]
                border transition-all duration-300 font-cinzel text-[10px] md:text-sm uppercase tracking-wider
                ${activeCategory === cat.id 
                  ? "bg-akashic-gold text-black border-akashic-gold shadow-[0_0_15px_rgba(255,215,0,0.4)] font-bold scale-105" 
                  : "bg-black/40 text-stone-400 border-stone-700 hover:border-akashic-gold hover:text-akashic-gold"
                }
              `}
            >
              <span className="text-sm md:text-base opacity-80">{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* BARRA DE BUSCA */}
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

      {/* --- GRID DE ARTEFATOS --- */}
      {/* grid-cols-2 garante 2 itens por linha no celular */}
      {filteredArtifacts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6 animate-fadeIn">
          {filteredArtifacts.map((item) => (
            <div
              key={item.id}
              className="
                flex flex-col 
                bg-black/40 
                border border-stone-800 hover:border-akashic-gold 
                rounded-lg transition-all duration-300 group
                hover:shadow-[0_0_25px_rgba(255,215,0,0.1)]
                overflow-hidden
                h-full
              "
            >
              {/* ÁREA DA IMAGEM */}
              <div 
                className="relative w-full aspect-square bg-white flex items-center justify-center cursor-zoom-in overflow-hidden p-2 md:p-4"
                onClick={() => item.imageSrc && setSelectedImage(item.imageSrc)}
              >
                <div className="relative w-full h-full transition-transform duration-500 group-hover:scale-105">
                  {item.imageSrc ? (
                    <Image src={item.imageSrc} alt={item.title} fill className="object-contain drop-shadow-md" />
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full h-full text-gray-300 font-cinzel text-[10px] text-center opacity-60 gap-1">
                       <FaGem className="text-xl" />
                       <span>[Foto]</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTEÚDO */}
              <div className="flex-1 flex flex-col justify-between p-2 md:p-4 gap-2 bg-stone-950 border-t border-stone-800">
                
                {/* Título pequeno no mobile (text-[10px]) */}
                <span className="font-cinzel font-bold text-center text-stone-200 text-[10px] md:text-sm group-hover:text-akashic-gold transition-colors duration-300 leading-tight line-clamp-3">
                  {item.title}
                </span>

                <Link href={item.amazonLink} target="_blank" className="w-full">
                  <button className="
                    w-full py-1.5 md:py-2
                    bg-akashic-gold/10 border border-akashic-gold/50 
                    text-akashic-gold font-cinzel font-bold text-[9px] md:text-[10px] uppercase tracking-wider 
                    rounded-sm
                    transition-all duration-300 
                    hover:bg-cyan-950/60 hover:border-cyan-400 hover:text-cyan-400 hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]
                    active:scale-95 
                    flex items-center justify-center gap-1
                  ">
                    <span>Obter</span> <span className="text-[9px]">↗</span>
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
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