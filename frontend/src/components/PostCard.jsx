import { Card } from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function PostCard({ post }) {
  return (
    // <div className='group relative w-full border border-teal-500 hover:border-2  overflow-hidden rounded-lg sm:w-[32%] transition-all'>
    //   <Link to={`/${post.slug}`}>
    //     <img
    //       src={post.image}
    //       alt='post cover'
    //       className='h-[260px] w-full  object-cover group-hover:h-[200px] transition-all duration-300 z-20'
    //     />
    //   </Link>
    //   <div className='p-3 flex flex-col gap-2'>
    //     <p className='text-lg font-semibold line-clamp-2'>{post.title}</p>
    //     <span className='italic text-sm'>{post.category}</span>
    //     <Link
    //       to={`/${post.slug}`}
    //       className='z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2'
    //     >
    //       Read article
    //     </Link>
    //   </div>
    // </div>

    <Card
      className="max-w-sm"
      imgAlt="Meaningful alt text for an image that is not purely decorative"
      imgSrc={post.image}
    >
      <Link to={`/${post.slug}`}><h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        {post.title}
      </h5></Link>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {/* Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order. */}
        {/* <Link
          to={`/${post.slug}`}
          className=' '
        >
          Read article
        </Link> */}
      </p>
    </Card>
  );
}
