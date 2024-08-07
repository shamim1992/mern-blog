import { Link } from 'react-router-dom';
import CallToAction from '../components/CallToAction';
import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';
import Hero from '../components/hero/Hero';
import TopArticles from '../components/article/TopArticle';

export default function Home() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const res = await fetch('/api/post/getPosts');
            const data = await res.json();
            setPosts(data.posts);
        };
        fetchPosts();
    }, []);
    return (
        <div>
            <Hero />


            <div className='p-3 bg-amber-100 dark:bg-slate-700'>
                <CallToAction />
            </div>
            <TopArticles post={posts} />

            <div className='lg:flex-row center mx-auto p-3 flex flex-col gap-4 py-7'>
                {posts && posts.length > 0 && (
                    <div className='flex flex-col gap-6'>
                        <h2 className='text-2xl font-semibold text-center'>Recent Posts</h2>
                        <div className='flex flex-wrap gap-2 mx-auto justify-center'>
                            {posts.map((post) => (
                                <PostCard key={post._id} post={post} />
                            ))}
                        </div>
                        <Link
                            to={'/search'}
                            className='text-lg text-teal-500 hover:underline text-center'
                        >
                            View all posts
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}