'use client'
import EventContainer from '@/components/reusable/EventContainer';
import { defaultEvents } from '@/data/eventData';

interface Hut77LayoutProps {
  children: React.ReactNode;
}

export default function Hut77Layout({ children }: Hut77LayoutProps) {
  const hut77Event = defaultEvents[3];
  
  return (
    <div className='relative'>
      <EventContainer key="hut77" isSingle={true} event={hut77Event}/>
      {children}
    </div>
  )
}