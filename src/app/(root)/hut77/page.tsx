'use client'
import { Card } from "@heroui/card";
import {Skeleton} from "@heroui/skeleton";
import Image from 'next/image'

const Page = () => {
  return (
    <>
        <div>
            <Image
              src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKGooepZH6pu3nyNWE42PHBZitqSlRgsXa1khD"}
              alt="primary_logo"
              width={1000}
              height={1000}
              className="block md:hidden w-full grayscale contrast-150 saturate-50 brightness-[75%] object-cover aspect-[10/4]"
            />
            <Image
              src={"https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKNLbK6KYek7SoAUEm4t1pPnM0X8CadVbwJTrg"}
              alt="primary_logo"
              width={2000}
              height={2000}
              className="hidden md:block w-full grayscale contrast-150 saturate-50 brightness-[75%] object-cover aspect-[10/4] "
            />
            <div className="w-full p-5 flex-col flex justify-between border-b border-zinc-500">
              <div>
                <h6 className="text-secondary uppercase font-semibold">acara</h6>
                <h1 className="font-bold text-xl md:text-4xl mb-3">HUT Ke-77 Republik Indonesia</h1>
                <p className="w-full line-clamp-4 opacity-60">Tahun ini, Lapangan Way Balau kembali hidup. Setelah sekian lama terpisah oleh jarak dan kekhawatiran, peringatan HUT RI ke-77 menjadi momen bersejarah bagi kolaborasi RT 01, 04, dan 07. Ini adalah pesta reuni warga yang penuh suka cita dan haru. Dekorasi sederhana namun penuh makna, dengan bendera merah putih berkibar di setiap sudut, menjadi penyambut hangat bagi semua warga yang rindu kebersamaan.</p>
              </div>
            </div>
            <div className='py-10 flex-center flex-col'>
                <div className="text-center mb-4">
                    <h1 className="text-2xl font-mediumgi text-secondary">Galeri</h1>
                </div>
                <div className='relative flex-center flex-col min-h-screen'>
  
                  <Card className="w-52 border border-accent rounded-none">
                    <Skeleton className="border border-accent">
                      <div className="h-24 bg-primary" />
                    </Skeleton>
                    {/* <div className="space-y-3">
                      <Skeleton className="w-3/5 rounded-lg">
                        <div className="h-3 w-3/5 rounded-lg bg-primary" />
                      </Skeleton>
                      <Skeleton className="w-4/5 rounded-lg">
                        <div className="h-3 w-4/5 rounded-lg bg-primary" />
                      </Skeleton>
                      <Skeleton className="w-2/5 rounded-lg">
                        <div className="h-3 w-2/5 rounded-lg bg-primary" />
                      </Skeleton>
                    </div> */}
                  </Card>

                    <p>Segera Hadir</p>
                </div>
            </div>
        </div>
    </>
  )
}

export default Page