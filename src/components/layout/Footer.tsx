import Link from "next/link";
import { FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import { SiKuaishou } from "react-icons/si";

export function Footer() {
  return (
    <footer className="w-full relative z-50 py-6 border-t border-akashic-gold/20 bg-black/80 backdrop-blur-sm mt-auto">
      
      {/* Container Flex para alinhar tudo em uma linha */}
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center gap-6">
        
        {/* 1. ÍCONES SOCIAIS (Tema do Site: Dourado e Ciano) */}
        <div className="flex gap-4">
          
          {/* TIKTOK */}
          <Link href="https://www.tiktok.com/@taverna_akashica" target="_blank">
            <div className="p-2 rounded-full border border-akashic-gold/50 hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300 hover:scale-110 group">
              <FaTiktok className="w-5 h-5 text-akashic-gold group-hover:text-cyan-400 transition-colors" />
            </div>
          </Link>

          {/* INSTAGRAM */}
          <Link href="https://www.instagram.com/taverna.akashica/" target="_blank">
            <div className="p-2 rounded-full border border-akashic-gold/50 hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300 hover:scale-110 group">
              <FaInstagram className="w-5 h-5 text-akashic-gold group-hover:text-cyan-400 transition-colors" />
            </div>
          </Link>

          {/* YOUTUBE */}
          <Link href="https://www.youtube.com/@TavernaAkashica" target="_blank">
            <div className="p-2 rounded-full border border-akashic-gold/50 hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300 hover:scale-110 group">
              <FaYoutube className="w-5 h-5 text-akashic-gold group-hover:text-cyan-400 transition-colors" />
            </div>
          </Link>

          {/* KWAI */}
          <Link href="https://k.kwai.com/u/@taverna.akashica/HaSDsEC9" target="_blank">
            <div className="p-2 rounded-full border border-akashic-gold/50 hover:border-cyan-400 hover:bg-cyan-900/20 transition-all duration-300 hover:scale-110 group">
              <SiKuaishou className="w-5 h-5 text-akashic-gold group-hover:text-cyan-400 transition-colors" />
            </div>
          </Link>

        </div>

        {/* 2. TEXTO DE AVISO (Em linha com os ícones) */}
        <p className="font-cinzel text-sm md:text-base text-stone-400 text-center md:text-left">
          O conhecimento aqui contido requer discernimento. Explore por sua conta e risco.
        </p>

      </div>
    </footer>
  );
}