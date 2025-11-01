'use client'
import Image from "next/image";
import { IoLogoTiktok, IoLogoInstagram, IoLogoYoutube } from "react-icons/io5";
import Link from "next/link";
import SponsorshipSection from "@/components/reusable/SponsorshipSection";
import PhotoGallerySection from "@/components/reusable/GalleryImport";
import EventsGrid from "@/components/reusable/EventGrid";

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
      
      <SponsorshipSection type={"partner"}/>
      <SponsorshipSection type={"sponsor"}/>

      <section className="h-full relative flex flex-col w-full bg-primary">
        <EventsGrid />
      </section>

      <section className="min-h-screen p-5 py-10 flex-center">
        <div className="max-w-96 text-lg italic text-center">
          <p className="text-accent">&quot;bila kaum muda yang telah belajar di sekolah dan menganggap dirinya terlalu tinggi dan pintar untuk melebur dengan masyarakat yang bekerja dengan cangkul dan hanya memiliki cita-cita sederhana, maka lebih baik pendidikan itu tidak diberikan sama sekali.&quot;</p>
          <h1 className="text-secondary font-semibold">~ Tan Malaka ~</h1>
        </div>
      </section>

      {/* <PhotoGallerySection /> */}
      
    </div>
  );
}