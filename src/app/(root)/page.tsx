'use client'
import Image from "next/image";
import { IoLogoTiktok, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import { ArrowUpRight } from 'lucide-react';
import Link from "next/link";
import SponsorshipSection from "@/components/reusable/SponsorshipSection";
// import PhotoGallerySection from "@/components/reusable/GalleryImport";
import {Card, CardHeader, CardBody, CardFooter, Divider, Skeleton, Button} from "@heroui/react";
import SponsorshipSkeleton from "@/components/reusable/SponsorshipSkeleton";
import PhotoGallerySection from "@/components/reusable/GalleryImport";

export default function Home() {

  return (
    <div>
      <section className="flex max-w-screen overflow-x-hidden ">
        <div className="relative flex flex-col w-16 sm:w-[30%] max-h-screen">
          <Image 
            src={"/images/primary_logo.png"}
            alt="primary_logo"
            width={500}
            height={500}
            className="w-full bg-secondary"
          />
          <div className="w-full h-full flex flex-col justify-between bg-accent p-2 sm:p-7">
            <nav>
              {/* <ul className="font-semibold text-2xl leading-9 text-primary">
                <li>
                  <a href="">Acara</a>
                </li>
                <li>
                  <a href="">Galeri</a>
                </li>
                <li>
                  <a href="">Tentang</a>
                </li>
                <li>
                  <a href="">Kontak</a>
                </li>
              </ul> */}
            </nav>
            <ul className="">
              <li className="flex flex-col sm:flex-row gap-3 items-center">
                <Link href="https://www.tiktok.com/@_gunungagung"><IoLogoTiktok className="text-secondary" size={32}/></Link>
                <Link href="https://www.instagram.com/_gunungagung"><IoLogoInstagram className="text-secondary" size={32}/></Link>
                <Link href="https://www.youtube.com/@_gunungagung"><IoLogoYoutube className="text-secondary" size={32}/></Link>
              </li>
              <li className="hidden sm:block font-bold pt-2 text-primary">@_gunungagung</li>
            </ul>
          </div>
        </div>
        
          
        <div className="relative h-screen w-full">
          <Image
            src={"/images/scratch_bg.png"}
            alt="hero_img"
            width={1000}
            height={1000}
            className="absolute w-screen h-screen opacity-10 object-cover"
          />
          <div className="relative flex flex-col h-full justify-between p-10">
            <div className="relative w-full flex justify-between">
              <div>
                <h1 className="font-extrabold text-4xl sm:text-7xl md:text-8xl uppercase leading-none sm:leading-[80px] mb-5">gunung<br/>agung</h1>
                <h1 className="text-xl lg:text-2xl xl:text-3xl font-semibold text-wrap capitalize">
                  membangun<span className="font-bold text-secondary"> kolaborasi,</span><br/>
                  bukan<span className="font-bold text-secondary"> kompetisi.</span>
                </h1>
              </div>
              <Image
                src={"/icons/up-left-arrow_red.png"}
                alt="arrow"
                width={1000}
                height={1000}
                className="hidden lg:block max-w-[100px] max-h-[100px] -rotate-90"
              />
            </div>
            <div className="flex justify-between items-end">
              <h1 className="font-bold text-5xl leading-[40px]">01<br/><span className="text-secondary">04</span><br/>07</h1>
              <Image
                src={"/images/hero_img_sc.png"}
                alt="hero_img"
                width={1000}
                height={1000}
                className="hidden sm:block max-w-[500px] w-[80%]"
              />
            </div>
          </div>
        </div>
      </section>
      
      <SponsorshipSection />

      <section className="h-full relative flex flex-col w-full bg-primary">
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
              <div className="w-full p-5 flex-col flex justify-between">
                <div>
                  <h6 className="text-secondary uppercase font-semibold">acara</h6>
                  <h1 className="font-bold text-xl md:text-4xl mb-3">HUT Ke-80 Republik Indonesia</h1>
                  <p className="w-full line-clamp-4 opacity-60">Lapangan Way Balau pagi itu tak sekadar ramai, tapi penuh dengan semangat kebangsaan yang membara. Memperingati 80 tahun kemerdekaan Indonesia, kolaborasi megah warga RT 01, 04, dan 07 menciptakan sebuah gelaran yang tak terlupakan. Lapangan dihiasi dominasi warna merah, putih, dan emas, menyambut sebuah perayaan yang tak hanya melihat ke belakang, tetapi juga menyongsong masa depan.</p>
                  <Link href="/hut80" className="flex items-center gap-2 underline">Baca Selanjutnya<ArrowUpRight size={18} className="opacity-80"/></Link>
                </div>
                <div className="flex gap-5">
                  <button className="bg-accent py-2 px-6 mt-5 font-semibold text-secondary">Galeri</button>
                </div>
              </div>
          </div>
          <div>
              <Image
                src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKrPJfUgxWDoVcGZrYS7mCxUL3A50budRjyP2N"}
                alt="primary_logo"
                width={1000}
                height={1000}
                className="block md:hidden grayscale contrast-150 saturate-50 brightness-[75%] 
    -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
    -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4]"
              />
              <Image
                src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKe4HYtQin0WwEj2PSGAFqYU6V4ofvBIXxdhOk"}
                alt="primary_logo"
                width={2000}
                height={2000}
                className="hidden md:block grayscale contrast-150 saturate-50 brightness-[75%] 
    -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
    -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4]"
              />
              <div className="w-full p-5 flex-col flex justify-between">
                <div>
                  <h6 className="text-secondary uppercase font-semibold">acara</h6>
                  <h1 className="font-bold text-xl md:text-4xl mb-3">HUT Ke-79 Republik Indonesia</h1>
                  <p className="w-full line-clamp-4 opacity-60">Setelah melewati tahun-tahun penuh tantangan, semangat kemerdekaan tahun ini terasa begitu spesial. Kolaborasi hangat warga RT 01, 04, dan 07 di Lapangan Way Balau menjadi bukti nyata kebersamaan dan kekuatan gotong royong. Lapangan yang asri dihiasi dengan ornamen bambu dan anyaman janur, mencerminkan kearifan lokal dan ketahanan bangsa.</p>
                  <Link href="/" className="flex items-center gap-2 underline">Baca Selanjutnya<ArrowUpRight size={18} className="opacity-80"/></Link>
                </div>
                <div className="flex gap-5">
                  <button className="bg-accent py-2 px-6 mt-5 font-semibold text-secondary">Galeri</button>
                </div>
              </div>
          </div>
          <div>
              <Image
                src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKaJT3wHbVFk0iIe21HNJTDBq7OwLt5nzoZM8l"}
                alt="primary_logo"
                width={1000}
                height={1000}
                className="block md:hidden grayscale contrast-150 saturate-50 brightness-[75%] 
    -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
    -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4] object-top"
              />
              <Image
                src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKYK5QFhDrmZ2DFleI3Tp4Js1tyYPXUOdf5QbV"}
                alt="primary_logo"
                width={2000}
                height={2000}
                className="hidden md:block grayscale contrast-150 saturate-50 brightness-[75%] 
    -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
    -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4] object-top"
              />
              <div className="w-full p-5 flex-col flex justify-between">
                <div>
                  <h6 className="text-secondary uppercase font-semibold">acara</h6>
                  <h1 className="font-bold text-xl md:text-4xl mb-3">HUT Ke-78 Republik Indonesia</h1>
                  <p className="w-full line-clamp-4 opacity-60">Di usia ke-78 Republik Indonesia, semangatnya masih terasa segar dan penuh energi. Kolaborasi seru antara RT 01, 04, dan 07 di Lapangan Way Balau berhasil menciptakan sebuah festival warga yang meriah. Lapangan dipenuhi dengan stand-stand kreatif, dari bazar kuliner hingga pameran hasil kerajinan tangan warga, menunjukkan jiwa wirausaha dan bakat yang tersembunyi.</p>
                  <Link href="/" className="flex items-center gap-2 underline">Baca Selanjutnya<ArrowUpRight size={18} className="opacity-80"/></Link>
                </div>
                <div className="flex gap-5">
                  <button className="bg-accent py-2 px-6 mt-5 font-semibold text-secondary">Galeri</button>
                </div>
              </div>
          </div>
          <div>
              <Image
                src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKGooepZH6pu3nyNWE42PHBZitqSlRgsXa1khD"}
                alt="primary_logo"
                width={1000}
                height={1000}
                className="block md:hidden grayscale contrast-150 saturate-50 brightness-[75%] 
    -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
    -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4]"
              />
              <Image
                src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKNLbK6KYek7SoAUEm4t1pPnM0X8CadVbwJTrg"}
                alt="primary_logo"
                width={2000}
                height={2000}
                className="hidden md:block grayscale contrast-150 saturate-50 brightness-[75%] 
    -webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75
    -moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4] "
              />
              <div className="w-full p-5 flex-col flex justify-between">
                <div>
                  <h6 className="text-secondary uppercase font-semibold">acara</h6>
                  <h1 className="font-bold text-xl md:text-4xl mb-3">HUT Ke-77 Republik Indonesia</h1>
                  <p className="w-full line-clamp-4 opacity-60">Tahun ini, Lapangan Way Balau kembali hidup. Setelah sekian lama terpisah oleh jarak dan kekhawatiran, peringatan HUT RI ke-77 menjadi momen bersejarah bagi kolaborasi RT 01, 04, dan 07. Ini adalah pesta reuni warga yang penuh suka cita dan haru. Dekorasi sederhana namun penuh makna, dengan bendera merah putih berkibar di setiap sudut, menjadi penyambut hangat bagi semua warga yang rindu kebersamaan.</p>
                  <Link href="/" className="flex items-center gap-2 underline">Baca Selanjutnya<ArrowUpRight size={18} className="opacity-80"/></Link>
                </div>
                <div className="flex gap-5">
                  <button className="bg-accent py-2 px-6 mt-5 font-semibold text-secondary">Galeri</button>
                </div>
              </div>
          </div>
      </section>

      <section className="min-h-screen p-5 py-10 flex-center">
        <div className="max-w-96 text-lg italic text-center">
          <p className="text-accent">&quot;bila kaum muda yang telah belajar di sekolah dan menganggap dirinya terlalu tinggi dan pintar untuk melebur dengan masyarakat yang bekerja dengan cangkul dan hanya memiliki cita-cita sederhana, maka lebih baik pendidikan itu tidak diberikan sama sekali.&quot;</p>
          <h1 className="text-secondary font-semibold">~ Tan Malaka ~</h1>
        </div>
      </section>

      <PhotoGallerySection />
      
    </div>
  );
}