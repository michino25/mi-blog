import { useState } from "react";
import { useParams } from "react-router-dom";
import PostBlock from "../components/PostBlock";
import { api, useFetch } from "../utils/fetch";
import { Post } from "../utils/model";

interface Prop {
  type: string;
}

export default function SearchPage({ type }: Prop) {
  const { id } = useParams();
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState("");

  useFetch(async () => {
    const res = await api.get(`/posts?${type}=${id}`);
    if (res.data) setPosts(res.data);

    switch (type) {
      case "user": {
        setTitle("Người dùng @" + id);
        break;
      }
      case "category": {
        const cat = await api.get(`/categories/${id}`);
        if (cat?.data) setTitle("Chủ đề " + cat?.data[0]?.name);
        else setTitle("Chủ đề " + id);
        break;
      }
      case "search": {
        setTitle("Từ khóa '" + id + "'");
        break;
      }
    }
  });

  return (
    <div className="flex flex-col my-5">
      <div className="flex items-center title uppercase text-blue-800 font-bold text-xl py-4">
        <svg
          className="w-5 h-5 mr-1"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
            stroke="currentColor"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
        <span>{title}</span>
      </div>
      <div className="flex flex-wrap items-stretch justify-start -m-2">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className="lg:w-1/2 xl:w-1/3 w-full p-2">
              <PostBlock {...post} />
            </div>
          ))
        ) : (
          <div className="text-gray-600 pt-5 pb-20 px-2">
            <span>Không tìm thấy kết quả</span>
          </div>
        )}
      </div>
    </div>
  );
}
