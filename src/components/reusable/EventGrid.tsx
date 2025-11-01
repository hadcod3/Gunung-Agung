
import { defaultEvents } from '@/data/eventData';
import { EventData } from '@/types';
import EventContainer from './EventContainer';

interface EventsGridProps {
  events?: EventData[];
  className?: string;
}

const EventsGrid: React.FC<EventsGridProps> = ({ 
  events = defaultEvents, 
  className = '',
}) => {

  return (
    <div className={`grid gap-6 ${className}`}>
      {events.map((event) => (
        <EventContainer 
          key={event.id} 
          event={event}
          isSingle={false}
        />
      ))}
    </div>
  );
};

export default EventsGrid;