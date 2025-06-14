import { cn, formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Author, Startup } from '@/sanity.types';
import { Skeleton } from './ui/skeleton';

export type StartupTypeCard = Omit<Startup, "author"> & {author?:Author};

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author,
    title,
    category,
    _id,
    image,
    description,
  } = post;

  const authorID = author?._id || 'unknown';
  const authorName = author?.name || 'Anonymous';
  


  return (
    <li className="startup-card group relative p-4 bg-white shadow-md rounded-md">
      {/* Eye icon and views in top-right */}
      <div className="absolute top-4 right-4 flex items-center gap-1 overflow-hidden">
        <EyeIcon className="size-5 text-primary" />
        <span className="text-sm font-medium">{views}</span>
      </div>

      <p className="startup_card_date text-xs text-gray-500">
        {formatDate(_createdAt)}
      </p>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${author?._id}`}>
            <p className="text-16-medium line-clamp-1">{author?.name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${authorID}`}>
          <Image
            src={author?.image}
            alt={author?.name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startups/${_id}`}>
        <p className="startup-card-desc overflow-hidden">{description}</p>
        <img src={image} alt="placeholder" className="startup-card_img" />
      </Link>

      <div className="flex-between gap-3 mt-5">
        <Link href={`/?query=${category?.toLowerCase?.() || 'general'}`}>
          <p className="text-16-medium">{category}</p>
        </Link>
        <Button className="startup-card_btn" asChild>
          <Link href={`/startup/${_id}`}>Details</Link>
        </Button>
      </div>
    </li>
  );
};

export const StartupCardSkeleton = () => (
    <>
        {[0, 1, 2, 3, 4].map((index: number) => (
  <li key={index}>
    <Skeleton className='startup-card-skeleton' />
  </li>
))}

    </>
)


export default StartupCard;
