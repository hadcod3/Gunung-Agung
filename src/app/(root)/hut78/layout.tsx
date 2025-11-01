'use client'
import EventContainer from '@/components/reusable/EventContainer';
import { defaultEvents } from '@/data/eventData';

interface Hut78LayoutProps {
  children: React.ReactNode;
}

export default function Hut78Layout({ children }: Hut78LayoutProps) {
  const hut78Event = defaultEvents[2];
  
  return (
    <div className='relative'>
      <EventContainer key="hut78" isSingle={true} event={hut78Event}/>
      {children}
    </div>
  )
}