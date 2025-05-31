import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import { STARTUP_BY_ID_QUERY } from '@/sanity/lib/query';
import { notFound } from 'next/navigation';
import React, { Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import markdownit from 'markdown-it'
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
const md=markdownit();

type PageProps = {
  params: { id: string };
};

const StartupPage = async ({ params }: PageProps) => {
  const { id } = params;

  const post = await client.fetch(STARTUP_BY_ID_QUERY, { id });

  if (!post) return notFound();

  const parsedContent = md.render(post?.pitch || "")

  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post?._createdAt)}</p>
        <h1 className="heading">{post.title}</h1>
        <p className="sub-heading !max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <Image
          src={post.image}
          alt="thumbnail"
          width={800}
          height={450}
          className="w-full h-auto rounded-xl"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link href={`/user/${post.author?._id}`} className="flex gap-2 items-center mb-3">
              <Image
                src={post.author.image}
                alt="avatar"
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg aspect-square"
              />
              <div>
                <p className="font-semibold">{post.author.name}</p>
                <p className="text-sm text-gray-500">{post.author.username}</p>
              </div>
            </Link>
            <p className='category-tag'>{post.category}</p>
          </div>

          <h3 className='text-30-bold'>Pitch Details</h3>
          {parsedContent?(
               <article
               className='prose max-w-4xl font-work-sans break-all'
               dangerouslySetInnerHTML={{__html: parsedContent}}
               />
          ):(
               <p className='no-result'>No details provided</p>
          )}
        </div>
        <hr  className='divider'/>
      </section>

     <Suspense fallback={<Skeleton className='view_skeleton'/>}>
          
          <View id={id}/>
     </Suspense>



    </>
  );
};

export default StartupPage;
