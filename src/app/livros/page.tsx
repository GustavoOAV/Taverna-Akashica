import { Footer } from "@/components/layout/Footer";
import { BookCatalog } from "@/components/library/BookCatalog";
import { CategoryCarousel } from "@/components/library/CategoryCarousel";
import Image from "next/image";
import Link from "next/link";

export default function LivrosPage() {
  return (
    <div className="min-h-screen flex flex-col relative bg-akashic-stone">
      {/* 1. O FUNDO ABSOLUTO (A Parede Fixa) */}
      {/* Ele fica parado (fixed) ocupando a tela toda, independente do tamanho do conteúdo */}
      <div
        className="
          fixed inset-0 
          w-full h-full 
          bg-[url('/images/bg-wall.png')] 
          bg-cover bg-center bg-no-repeat 
          z-0
        "
      />

      {/* 2. CONTEÚDO DA PÁGINA (Fica por cima do fundo) */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* SEÇÃO DO CÉU (Hero) - Tem seu próprio fundo que cobre a parede no topo */}
        <section className="w-full h-[250px] md:h-[400px] bg-[url('/images/bg-stars.png')] bg-cover bg-center bg-no-repeat flex flex-col items-center relative shadow-xl">
          <div className="absolute top-6 left-6 z-50">
            <Link
              href="/"
              className="text-akashic-gold font-cinzel text-sm md:text-base hover:text-cyan-400 transition-colors flex items-center gap-2 opacity-80 hover:opacity-100"
            >
              ← Voltar ao Início
            </Link>
          </div>
          <div className="absolute bottom-0 translate-y-[10%] left-1/2 -translate-x-1/2 w-full max-w-[90%] md:max-w-3xl flex justify-center z-30">
            <Image
              src="/images/main-logo.png"
              alt="Taverna Akashica"
              width={800}
              height={600}
              priority
              className="drop-shadow-[0_0_35px_rgba(0,240,255,0.6)] object-contain"
            />
          </div>
        </section>

        {/* SEÇÃO PRINCIPAL (Transparente, pois o fundo fixo já está atrás) */}
        <section className="w-full flex-1 flex flex-col items-center pt-24 md:pt-36 pb-20 border-t-2 border-akashic-gold shadow-[0_-4px_25px_rgba(255,215,0,0.5)]">
          {/* TÍTULO PRINCIPAL */}
          <div className="text-center mb-2 px-4 relative">
            <h1 className="font-cinzel text-4xl md:text-6xl font-bold uppercase tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#bf9b30] to-[#8a6e2f] drop-shadow-[0_4px_3px_rgba(0,0,0,0.8)]">
              Biblioteca dos Antigos
            </h1>
            <div className="h-[2px] w-32 md:w-64 bg-gradient-to-r from-transparent via-akashic-gold to-transparent mx-auto mt-4 opacity-70"></div>
          </div>

          {/* Carrossel de Aparadores */}
          <CategoryCarousel />

          {/* Divisória Sutil */}
          <div className="w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-stone-700 to-transparent my-12"></div>

          {/* --- O GRANDE CATÁLOGO DE LIVROS --- */}
          <BookCatalog />
        </section>

        <Footer />
      </div>
    </div>
  );
}
