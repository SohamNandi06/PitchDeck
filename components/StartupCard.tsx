import { formatDate } from '@/lib/utils';
import { EyeIcon } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';

const StartupCard = ({ post }: { post: StartupTypeCard }) => {
  const {
    _createdAt,
    views,
    author: { _id: authorID, name },
    title,
    category,
    _id,
    image,
    description,
  } = post;

  return (
    <li className="startup-card group relative p-4 bg-white shadow-md rounded-md">
      {/* Eye icon and views in top-right */}
      <div className="absolute top-4 right-4 flex items-center gap-1">
        <EyeIcon className="size-5 text-primary" />
        <span className="text-sm font-medium">{views}</span>
      </div>

      <p className="startup_card_date text-xs text-gray-500">
        {formatDate(post._createdAt)}
      </p>

      <div className="flex-between mt-5 gap-5">
        <div className="flex-1">
          <Link href={`/user/${authorID}`}>
            <p className="text-16-medium line-clamp-1">{name}</p>
          </Link>
          <Link href={`/startup/${_id}`}>
            <h3 className="text-26-semibold line-clamp-1">{title}</h3>
          </Link>
        </div>

        <Link href={`/user/${authorID}`}>
          <Image
            src="https://placehold.co/48x48"
            alt="placeholder"
            width={48}
            height={48}
            className="rounded-full"
          />
        </Link>
      </div>

      <Link href={`/startups/${_id}`}>
      <p className='startup-card-desc'>
        {description}

      </p>
      <img src={image} alt="placeholder" className='startup-card_img'/>

      </Link>

      <div className='flex-between gap-3 mt-5'>
        <Link href={`/?query=${category.toLowerCase()}`}>
        <p className='text-16-medium'>
            {category}
        </p>
        </Link>
        <Button className='startup-card_btn' asChild>
            <Link href={`/startup/${_id}`}>
            Details
            </Link>

        </Button>

      </div>
    </li>
  );
};

export default StartupCard;
