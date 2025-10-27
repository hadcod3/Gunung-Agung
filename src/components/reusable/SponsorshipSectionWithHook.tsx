// components/SponsorshipSectionWithHook.tsx
import { useSponsors } from '@/hooks/useSponsor';
import { div } from 'framer-motion/client';
import React from 'react';

const SponsorshipSectionWithHook: React.FC = () => {
  const { sponsors, loading, error } = useSponsors();

  // Skeleton loading component
  const SponsorshipSkeleton = () => (
    <section className="py-10">
      <div className="text-center mb-4">
        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse mx-auto mb-2"></div>
        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
      </div>
      <div>
        <ul className="gap-10 flex-center flex-wrap p-5">
          {[...Array(7)].map((_, index) => (
            <li key={index} className="text-center flex flex-col">
              {/* Sponsor name skeleton */}
              <div className="h-8 w-32 bg-gray-200 rounded-lg animate-pulse mb-2 mx-auto"></div>
              {/* Sponsor category skeleton */}
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mx-auto"></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  if (loading) {
    return (
        <div>
            <SponsorshipSkeleton />
            <SponsorshipSkeleton />
            <SponsorshipSkeleton />
            <SponsorshipSkeleton />
        </div>
    )
  }

  if (error) {
    return (
      <section className="py-10">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-medium text-secondary">Sponsorship</h1>
        </div>
        <div className="flex justify-center">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10">
      <div className="text-center mb-4">
        <h1 className="text-2xl font-medium text-secondary">Sponsorship</h1>
      </div>
      <div>
        <ul className="gap-10 flex-center flex-wrap p-5">
          {sponsors.map((sponsor) => (
            <li key={sponsor.id} className="text-center flex flex-col">
              <h1 className="font-bold capitalize text-3xl">{sponsor.name}</h1>
              <p className="capitalize text-lg opacity-70">{sponsor.category}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default SponsorshipSectionWithHook;