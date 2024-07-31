import React from "react";
import "./Article.css";
import { Link } from "react-router-dom";

function TopArticles(props) {
    console.log(props)
    return (
        <div className="mb-8">
            <h3 className="font-bold text-2xl text-center py-8">Top Articles</h3>
            <div className="flex justify-center gap-2 flex-wrap mt-5">
                {props.post.map((post, index) => (

                    <div className="card max-w-sm  shadow-md" key={index}>
                        <figure>
                            <Link to={`/${post.slug}`}><img
                                className=" w-full rounded-xl"
                                src={post.image}
                                alt="Movie"
                            /></Link>
                        </figure>
                        <div className="card-body">
                            <div className="flex justify-between text-gray-500 text-xs">
                                <span> {post && new Date(post.createdAt).toLocaleDateString()}</span>
                                <span>Category: {post.category}</span>
                            </div>
                            <h2 className="font-bold"><Link to={`/${post.slug}`}>{post.title}</Link></h2>
                            <Link to={`/${post.slug}`} className="self-center"><button className="btn btn-sm border-2 border-blue-500 bg-transparent">Read More</button></Link>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}

export default TopArticles;
