import { useEffect, useState } from "react";
import Infobar from "../components/Infobar";
import Post from "../components/Post";

export default function HomePage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [highlightPosts, setHighlightPosts] = useState<Post[]>([]);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/post")
            .then((response) => response.json())
            .then((posts) => {
                // Shuffle the posts array
                const shuffledPosts = [...posts].sort(
                    () => 0.5 - Math.random()
                );

                setPosts(shuffledPosts);

                const positionRand = Math.floor(
                    Math.random() * (posts.length - 3)
                );
                // Get the first 3 posts from the shuffled array
                setHighlightPosts(
                    shuffledPosts.slice(positionRand, positionRand + 3)
                );
            });
    }, []);

    return (
        <>
            <div className="flex flex-col px-5">
                <div className="my-6">
                    <div className="flex flex-col justify-center px-12 rounded-2xl shadow-xl h-72 w-full bg-center bg-cover bg-[url('/banner.png')]">
                        <span className="font-bold text-4xl max-w-xl bg-gradient-to-r from-blue-600 to-blue-950 text-transparent bg-clip-text">
                            Góc nhìn đa chiều của thế hệ trẻ Việt Nam
                        </span>
                        <span className="font-light text-lg pt-5">
                            Viết - Chia sẻ - Kết nối - Chiêm nghiệm
                        </span>
                    </div>
                </div>

                <div className="flex flex-col my-5">
                    <div className="flex items-center title uppercase text-blue-800 font-bold text-xl py-4">
                        <svg
                            className="w-5 h-5 mr-1"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M20.684 4.042A1.029 1.029 0 0 1 22 5.03l-.001 5.712a1.03 1.03 0 0 1-1.647.823L18.71 10.33l-4.18 5.568a1.647 1.647 0 0 1-2.155.428l-.15-.1-3.337-2.507-4.418 5.885c-.42.56-1.185.707-1.777.368l-.144-.095a1.372 1.372 0 0 1-.368-1.776l.095-.144 5.077-6.762a1.646 1.646 0 0 1 2.156-.428l.149.1 3.336 2.506 3.522-4.69-1.647-1.237a1.03 1.03 0 0 1 .194-1.76l.137-.05 5.485-1.595-.001.001z"
                                fill="currentColor"
                            ></path>
                        </svg>
                        <span>Nổi bật</span>
                    </div>
                    <div className="flex gap-4 justify-center">
                        {highlightPosts.length > 0 &&
                            highlightPosts.map((post) => (
                                <div key={post._id} className="w-1/3">
                                    <Post {...post} />
                                </div>
                            ))}
                    </div>
                </div>

                <div className="flex my-5">
                    <div className="w-2/3">
                        <div className="flex items-center title uppercase text-blue-800 font-bold text-xl py-4">
                            <svg
                                className="w-5 h-5 mr-1"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                ></path>
                            </svg>
                            <span>Dành cho bạn</span>
                        </div>
                        <div className="flex flex-wrap justify-start -m-2">
                            {posts.length > 0 &&
                                posts.map((post) => (
                                    <div key={post._id} className="w-1/2 p-2">
                                        <Post {...post} />
                                    </div>
                                ))}
                        </div>
                    </div>
                    <div className="w-1/3">
                        <Infobar />
                    </div>
                </div>
            </div>
        </>
    );
}
