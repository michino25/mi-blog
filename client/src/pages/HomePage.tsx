import { useEffect, useState } from "react";
import Post from "../components/Post";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch("http://localhost:4000/post")
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
