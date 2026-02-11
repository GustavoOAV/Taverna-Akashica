import Image from "next/image";
import Link from "next/link";

interface ScrollCardProps {
  imageSrc: string;
  altText: string;
  linkUrl: string;
}

export function ScrollCard({ imageSrc, altText, linkUrl }: ScrollCardProps) {
  return (
    <Link 
      href={linkUrl}
      className="
        block 
        relative 
        cursor-pointer
        group

        /* --- PADRONIZAÇÃO DE TAMANHO (Igual ao Carrossel e Catálogos) --- */
        w-[200px] h-[300px]       /* Mobile */
        md:w-[260px] md:h-[390px] /* Desktop */
        /* --------------------------------------------------------------- */

        transition-all 
        duration-500
        hover:-translate-y-2 /* O pergaminho flutua para cima */
        hover:scale-[1.02]   /* Aumenta levemente */
      "
    >
      {/* Imagem do Pergaminho */}
      <Image
        src={imageSrc}
        alt={altText}
        fill /* Usa fill para preencher o tamanho fixo definido acima */
        className="
          object-contain /* Garante que o pergaminho inteiro apareça sem cortar */
          drop-shadow-lg 
          
          /* Brilho Azul Neon ao passar o mouse */
          group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.6)]
          transition-all duration-500
        "
        sizes="(max-width: 768px) 200px, 260px"
      />
    </Link>
  );
}