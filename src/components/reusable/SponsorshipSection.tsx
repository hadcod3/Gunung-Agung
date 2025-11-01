
import { defaultPartners, defaultSponsors } from '@/data/defaultSponsor';
import { Partner, Sponsor } from '@/types';
import React, { useState, useEffect } from 'react';
import SponsorshipSkeleton from './SponsorshipSkeleton';

type Props = {
  type: "sponsor" | "partner"
}

const SponsorshipSection: React.FC<Props> = ({type}) => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch sponsors - this could be from an API or use defaults
  useEffect(() => {
    const fetchData = async () => {
        try {
        setLoading(true);
        setError(null);

        if (type === 'sponsor') {
          // Fetch sponsors data
          // In a real app, you might fetch from an API:
          // const response = await fetch('/api/sponsors');
          // const data = await response.json();
          // setSponsors(data);
          
          // For now, using default values with a delay to simulate API call
          setTimeout(() => {
            setSponsors(defaultSponsors);
            setLoading(false);
          }, 500);
        } else if (type === 'partner') {
          // Fetch partners data
          // In a real app, you might fetch from an API:
          // const response = await fetch('/api/partners');
          // const data = await response.json();
          // setPartners(data);
          
          // For now, using default values with a delay to simulate API call
          setTimeout(() => {
            setPartners(defaultPartners);
            setLoading(false);
          }, 500);
        }
        
      } catch (error) {
        console.error(`Error fetching ${type}s:`, error);
        setError(`Failed to load ${type}s`);
        
        // Fallback to default data
        if (type === 'sponsor') {
          setSponsors(defaultSponsors);
        } else {
          setPartners(defaultPartners);
        }
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const sectionTitle = (type === 'sponsor' ? 'Sponsorship' : 'Partnership');

  if (loading) {
    return (
      <section className="py-4">
        <div className="text-center py-4">
            <h1 className="text-2xl font-medium text-secondary">{sectionTitle}</h1>
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
        <h1 className="text-2xl font-medium text-secondary">{sectionTitle}</h1>
      </div>
      <div>
        <ul className="gap-10 flex-center flex-wrap p-5">
          {type === 'sponsor' ? (
            sponsors.map((sponsor) => (
              <li key={sponsor.id} className="text-center flex flex-col">
                <h1 className="font-bold capitalize text-3xl">{sponsor.name}</h1>
                <p className="capitalize text-md text-secondary opacity-80">{sponsor.category}</p>
              </li>
            ))
          ) : (
            partners.map((partner) => (
              <li key={partner.id} className="text-center flex flex-col">
                <h1 className="font-bold capitalize text-3xl">{partner.name}</h1>
                <p className="capitalize text-md text-secondary opacity-80">{partner.category}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </section>
  );
};

export default SponsorshipSection;