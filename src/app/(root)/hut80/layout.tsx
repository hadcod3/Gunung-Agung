'use client'
import Image from 'next/image'

interface Hut80LayoutProps {
  children: React.ReactNode
}

export default function Hut80Layout({ children }: Hut80LayoutProps) {
  return (
    <>
      <div>
        <Image
          src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztK9ytJwioOcovUB2AmbP5rphg6Ix1ud79GWiHZ"}
          alt="primary_logo"
          width={1000}
          height={1000}
          className="block md:hidden grayscale contrast-150 saturate-50 brightness-[75%] 
            -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
            -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4]"
        />
        <Image
          src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKH1I6GJE4x9D3oTSdIEl5VkRUvYp6u0XtazA1"}
          alt="primary_logo"
          width={2000}
          height={2000}
          className="hidden md:block grayscale contrast-150 saturate-50 brightness-[75%] 
            -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
            -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4]"
        />
        <div className="w-full p-4 flex-col flex justify-between border-b border-accent/20">
          <div>
            <h6 className="text-secondary uppercase font-semibold">acara</h6>
            <h1 className="font-bold text-xl md:text-4xl mb-3">HUT Ke-80 Republik Indonesia</h1>
            <p className="w-full line-clamp-4 opacity-60">Lapangan Way Balau pagi itu tak sekadar ramai, tapi penuh dengan semangat kebangsaan yang membara. Memperingati 80 tahun kemerdekaan Indonesia, kolaborasi megah warga RT 01, 04, dan 07 menciptakan sebuah gelaran yang tak terlupakan. Lapangan dihiasi dominasi warna merah, putih, dan emas, menyambut sebuah perayaan yang tak hanya melihat ke belakang, tetapi juga menyongsong masa depan.</p>
          </div>
        </div>
        {children}
      </div>
    </>
  )
}