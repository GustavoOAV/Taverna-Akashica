import Image from "next/image";
import Link from "next/link";

export function KindleBanner() {
  return (
    <div className="w-full flex justify-center py-4 px-4">
      <Link 
        href="https://amzn.to/45ryfrG" 
        target="_blank" 
        className="
          relative 
          cursor-pointer
          transition-transform 
          duration-300 
          hover:scale-[1.02] /* Apenas um zoom leve, padrão de botões */
        "
      >
        <Image
          src="/images/hero-cardk.png"
          alt="Ferramentas do Iniciado - Adquirir Kindle"
          width={900}
          height={400}
          className="rounded-lg drop-shadow-xl"
        />
      </Link>
    </div>
  );
}