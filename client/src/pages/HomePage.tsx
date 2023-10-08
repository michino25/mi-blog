import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/post")
            .then((response) => response.json())
            .then((posts) => {
                setPosts(posts);
            });
    }, []);

    return (
        <>
            {posts.length > 0 &&
                posts.map((post) => <Post key={post._id} {...post} />)}
        </>
    );
}
