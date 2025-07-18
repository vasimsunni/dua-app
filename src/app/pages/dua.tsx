'use client';

import { useEffect, useState } from 'react';
import Hadees from '../pages/hadees';

type HadeesItem = {
  id: number;
  title: string;
  type: string;
  content: string;
  imageData: string;
};

export default function Dua() {
  const [duas, setDuas] = useState<HadeesItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDuas = async () => {
      const res = await fetch('/api/dua', { cache: 'no-store' });
      const data = await res.json();
      setDuas(data);
      setLoading(false);
    };

    fetchDuas();
  }, []);

  if (loading) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      <Hadees items={duas} />
    </div>
  );
}
