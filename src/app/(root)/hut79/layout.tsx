'use client'
import EventContainer from '@/components/reusable/EventContainer';
import { defaultEvents } from '@/data/eventData';

interface Hut79LayoutProps {
  children: React.ReactNode;
}

export default function Hut79Layout({ children }: Hut79LayoutProps) {
  const hut79Event = defaultEvents[1];
  
  return (
    <div className='relative'>
      <EventContainer key="hut79" isSingle={true} event={hut79Event}/>
      {children}
    </div>
  )
}