import React from 'react';
import Ping from './Ping';
import { client } from '@/sanity/lib/client';
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/query';
import { incrementViews } from '@/lib/actions';

const View = async ({ id }: { id: string }) => {
  const result = await client.withConfig({ useCdn: false }).fetch(STARTUP_VIEWS_QUERY, { id });
  const totalViews = result?.views ?? 0;

  incrementViews(id, totalViews);

  return (
    <div className="view-container">
      <div className="absolute -top-2 -right-2">
        <Ping />
      </div>
      <p className="view-text">
        <span className="font-black">{totalViews} view{totalViews === 1 ? '' : 's'}</span>
      </p>
    </div>
  );
};

export default View;
