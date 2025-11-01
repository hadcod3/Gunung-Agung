
import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { EventData } from '@/types';
import BackButton from './BackBtnBox';

interface EventContainerProps {
  event?: EventData;
  className?: string;
  isSingle: boolean;
}

const EventContainer: React.FC<EventContainerProps> = ({ event, className, isSingle = '' }) => {
    
  const defaultEvent: EventData = {
    id: 'hut80',
    title: 'HUT Ke-80 Republik Indonesia',
    subtitle: 'acara',
    description: 'Lapangan Way Balau pagi itu tak sekadar ramai, tapi penuh dengan semangat kebangsaan yang membara. Memperingati 80 tahun kemerdekaan Indonesia, kolaborasi megah warga RT 01, 04, dan 07 menciptakan sebuah gelaran yang tak terlupakan. Lapangan dihiasi dominasi warna merah, putih, dan emas, menyambut sebuah perayaan yang tak hanya melihat ke belakang, tetapi juga menyongsong masa depan.',
    mobileImage: 'https://00bvzmypxw.ufs.sh/f/yhgkbOulaztK9ytJwioOcovUB2AmbP5rphg6Ix1ud79GWiHZ',
    desktopImage: 'https://00bvzmypxw.ufs.sh/f/yhgkbOulaztKH1I6GJE4x9D3oTSdIEl5VkRUvYp6u0XtazA1',
    link: '/hut80',
    category: 'acara',
  };

  const currentEvent = event || defaultEvent;

  const imageStyles = "grayscale contrast-150 saturate-50 brightness-[75%] " +
    "-webkit-grayscale -webkit-contrast-150 -webkit-saturate-50 -webkit-brightness-75 " +
    "-moz-grayscale -moz-contrast-150 -moz-saturate-50 -moz-brightness-75 object-cover aspect-[10/4]";

  return (
    <div className={`overflow-hidden ${className}`}>
      <div className="relative">
        {isSingle && (
          <div className='absolute right-0 z-30 w-10 md:w-15 h-10 md:h-15 bg-primary'>
            <BackButton/>
          </div>
        )}
        {/* Mobile Image */}
        <Image
          src={currentEvent.mobileImage}
          alt={currentEvent.title}
          width={1000}
          height={1000}
          className={`block md:hidden ${imageStyles}'}`}
        />
        
        {/* Desktop Image */}
        <Image
          src={currentEvent.desktopImage}
          alt={currentEvent.title}
          width={2000}
          height={2000}
          className={`hidden md:block ${imageStyles}'}`}
        />
      </div>

      {/* Content */}
      <div className="w-full p-5 flex-col flex justify-between">
        <div>
          <h6 className="text-secondary uppercase font-semibold text-sm">
            {currentEvent.subtitle}
          </h6>
          <h1 className="font-bold text-xl md:text-3xl lg:text-4xl mb-3 leading-tight">
            {currentEvent.title}
          </h1>
          <p className="w-full line-clamp-4 opacity-60 text-accent/80 leading-relaxed">
            {currentEvent.description}
          </p>
          {!isSingle && (
            <Link 
              href={currentEvent.link} 
              className="flex items-center text-secondary font-semibold gap-2 mt-4 bg-accent w-fit py-2 px-6"
            >
              Baca Selanjutnya
              <ArrowUpRight size={18} className="opacity-80" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventContainer;