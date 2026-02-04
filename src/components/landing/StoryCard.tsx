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
        w-full 
        cursor-pointer
        transition-all 
        duration-500
        hover:-translate-y-2 /* O pergaminho flutua para cima */
        hover:scale-[1.02]   /* Aumenta levemente */
        group
      "
    >
      {/* Imagem do Pergaminho */}
      <Image
        src={imageSrc}
        alt={altText}
        width={400}
        height={600}
        className="
          w-full h-auto 
          drop-shadow-lg 
          /* AQUI ESTÁ A MUDANÇA: Brilho Azul Neon ao passar o mouse */
          group-hover:drop-shadow-[0_0_20px_rgba(0,240,255,0.5)]
          transition-all duration-500
        "
      />
    </Link>
  );
}