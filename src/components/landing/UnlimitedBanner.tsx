import Image from "next/image";
import Link from "next/link";

export function UnlimitedBanner() {
  return (
    <div className="w-full flex justify-center pb-8 px-4">
      {/* Link para Amazon */}
      <Link 
        href="https://amzn.to/45excLD" 
        target="_blank" 
        className="
          relative 
          cursor-pointer
          transition-transform 
          duration-300 
          hover:scale-[1.02] 
          /* Sombra sutil para destacar do fundo de pedra */
          drop-shadow-lg
        "
      >
        <Image
          src="/images/card-unlimited.png" 
          alt="Torne-se o Guardião dos Registros - Kindle Unlimited"
          /* TRUQUE VISUAL:
             O banner de cima tem width={900}.
             Colocamos este com width={800} para ele ficar sutilmente menor,
             criando uma 'pirâmide invertida' visualmente agradável.
          */
          width={500}
          height={150}
          className="rounded-lg opacity-90 hover:opacity-100 transition-opacity"
        />
      </Link>
    </div>
  );
}