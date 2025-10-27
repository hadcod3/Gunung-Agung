// components/SponsorshipSection.tsx
import { defaultSponsors } from '@/data/defaultSponsor';
import { Sponsor } from '@/types';
import React, { useState, useEffect } from 'react';
import SponsorshipSkeleton from './SponsorshipSkeleton';
import { Card, CardBody } from '@heroui/card';

const SponsorshipSection: React.FC = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch sponsors - this could be from an API or use defaults
  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        
        // In a real app, you might fetch from an API:
        // const response = await fetch('/api/sponsors');
        // const data = await response.json();
        // setSponsors(data);
        
        // For now, using default values with a delay to simulate API call
        setTimeout(() => {
          setSponsors(defaultSponsors);
          setLoading(false);
        }, 500);
        
      } catch (error) {
        console.error('Error fetching sponsors:', error);
        // Fallback to default sponsors
        setSponsors(defaultSponsors);
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  if (loading) {
    return (
      <section className="py-4">
        <div className="text-center py-4">
            <h1 className="text-2xl font-medium text-secondary">Sponsorship</h1>
        </div>
        <div className="flex justify-center gap-10 flex-center flex-wrap p-5">
            <SponsorshipSkeleton/>
            <SponsorshipSkeleton/>
            <SponsorshipSkeleton/>
            <SponsorshipSkeleton/>
        </div>
      </section>
    );
  }

  return (
    <section className="py-4">
      <div className="text-center py-4">
        <h1 className="text-2xl font-medium text-secondary">Sponsorship</h1>
      </div>
      <div>
        <ul className="gap-10 flex-center flex-wrap p-5">
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="text-center flex flex-col">
              <h1 className="font-bold capitalize text-3xl">{sponsor.name}</h1>
              <p className="capitalize text-md text-secondary opacity-80">{sponsor.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SponsorshipSection;