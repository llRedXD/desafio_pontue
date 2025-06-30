import React from "react";
import type { PostData } from "../../hooks/Posts/useGetPosts";

const Post: React.FC<PostData> = ({ id, title, description }) => {
  return (
    <a href={`/posts/${id}`} className=" text-black">
      <div
        key={id}
        className="bg-white shadow-md rounded-lg p-6 mb-2 transition-transform duration-300 hover:shadow-xl hover:-translate-y-1 hover:bg-gray-50"
      >
        <h2 className="text-xl font-bold mb-2 transition-colors duration-300 ">
          {title}
        </h2>
        <p className="text-gray-700 mb-4">{description}</p>
      </div>
    </a>
  );
};

export default Post;
