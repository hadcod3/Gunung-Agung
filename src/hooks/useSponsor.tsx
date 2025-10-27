// hooks/useSponsors.ts
import { defaultSponsors } from '@/data/defaultSponsor';
import { Sponsor } from '@/types';
import { useState, useEffect } from 'react';

export const useSponsors = () => {
  const [sponsors, setSponsors] = useState<Sponsor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSponsors = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // In real implementation:
        // const response = await fetch('/api/sponsors');
        // if (!response.ok) throw new Error('Failed to fetch sponsors');
        // const data = await response.json();
        // setSponsors(data);
        
        setSponsors(defaultSponsors);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        setSponsors(defaultSponsors); // Fallback to defaults
      } finally {
        setLoading(false);
      }
    };

    fetchSponsors();
  }, []);

  return { sponsors, loading, error };
};