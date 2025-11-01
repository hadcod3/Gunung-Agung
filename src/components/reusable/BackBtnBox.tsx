"use client"
import { ArrowUpLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const BackButton = () => {
  const router = useRouter();

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push('/');
    }
  };

  return (
    <div className='absolute flex flex-col right-0 z-30 w-10 md:w-15 h-20 md:h-30 bg-primary'>
      <button 
        onClick={handleBack}
        className="w-full h-full flex-center "
      >
        <Image 
          src={"/images/primary_logo.png"}
          alt="primary_logo"
          width={50}
          height={50}
          className="w-full bg-secondary p-1"
        />
      </button>
      <button 
        onClick={() => router.push('/')}
        className="w-full h-full flex-center "
      >
        <ArrowUpLeft color='red' size={30}/>
      </button>
    </div>
  );
};

export default BackButton;