import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface Post {
    _id: string;
    summary: string;
    cover: string;
    createdAt: string;
    author: { username: string; _id: string };
    title: string;
    content: string;
}

const Post = ({ _id, title, summary, cover, createdAt, author }: Post) => {
    const [topics] = useState([
        "Quan điểm - Tranh luận",
        "Lịch sử",
        "Thinking Out Loud",
        "Tâm lý học",
        "Giáo dục",
        "Tâm sự",
        "Cuộc sống",
        "Du lịch - trải nghiệm",
        "Tình yêu",
        "Triết học",
        "Sách",
        "Công nghệ mới",
        "Blockchain",
    ]);

    // const [colors] = useState(["green", "cyan", "indigo", "red"]);
    const [colors] = useState([
        "gray",
        "red",
        "yellow",
        "lime",
        "green",
        "teal",
        "cyan",
        "indigo",
        "purple",
        "pink",
    ]);

    const [randomTopic, setRandomTopic] = useState("");
    const [randomColor, setRandomColor] = useState("");

    useEffect(() => {
        const randTopicIndex = Math.floor(Math.random() * topics.length);
        const randColorIndex = Math.floor(Math.random() * colors.length);

        setRandomTopic(topics[randTopicIndex]);
        setRandomColor(
            `text-${colors[randColorIndex]}-700 bg-${colors[randColorIndex]}-100 border-${colors[randColorIndex]}-500 hover:bg-${colors[randColorIndex]}-200`
        );
    }, [topics, colors]);

    return (
        <>
            <div className="flex flex-col w-full h-full bg-white border border-gray-200 rounded-xl shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <Link to={`/post/${_id}`}>
                    <div className="relative w-full overflow-hidden pb-[76%]">
                        <img
                            className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-xl"
                            src={cover}
                        />
                    </div>
                </Link>

                <div className="px-6 mt-5">
                    <button
                        type="button"
                        className={
                            randomColor +
                            " uppercase border focus:outline-none focus:ring-0 font-semibold rounded-full text-xs px-3 py-1"
                        }
                    >
                        {randomTopic}
                    </button>
                </div>

                <div className="px-6 pt-3">
                    <Link to={`/post/${_id}`}>
                        <h5 className="line-clamp-3 mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {title}
                        </h5>
                    </Link>
                    <p className="line-clamp-3 mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {summary}
                    </p>
                </div>

                <div className="flex justify-between items-center pb-8 px-6 mt-auto">
                    <div className="flex">
                        <Link
                            className="mr-2"
                            to="/vn/thong-tin-ca-nhan/rachel-vo"
                        >
                            <img
                                className="rounded-full"
                                src="https://img.vietcetera.com/uploads/avatar-images/18-sep-2023/user-1695023589471-160x160.jpg"
                                width="44"
                                height="44"
                            />
                        </Link>
                        <div className="pl-1">
                            <Link
                                to="/vn/thong-tin-ca-nhan/rachel-vo"
                                target="_blank"
                            >
                                <p className="text-base font-semibold text-zinc-600">
                                    @{author.username}
                                </p>
                            </Link>
                            <p className="text-xs text-zinc-500">
                                {/* d MMM yyyy HH:mm */}
                                {format(new Date(createdAt), "d MMM yyyy")}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-3 text-gray-500 p-2">
                        <div className="flex items-center">
                            {/* https://www.svgrepo.com/svg/448188/triangle?edit=true */}
                            <svg
                                viewBox="-1.6 -1.6 19.20 19.20"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="w-4 h-4 mr-1"
                            >
                                <path
                                    fill="currentColor"
                                    d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
                                ></path>
                            </svg>
                            <span className="upVote text-gray-600 text-sm">
                                35
                            </span>
                        </div>
                        <div className="flex items-center">
                            <svg
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="w-4 h-4 mr-1"
                            >
                                <path
                                    fill="currentColor"
                                    fillRule="evenodd"
                                    d="M2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.667a1 1 0 0 0-.6.2L3.6 21.8A1 1 0 0 1 2 21V6zm5 0a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H7z"
                                    clipRule="evenodd"
                                ></path>
                            </svg>
                            <span className="comment text-gray-600 text-sm">
                                24
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Post;
