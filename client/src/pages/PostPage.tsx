import { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Post from "../components/Post";

export default function PostPage() {
    const [postInfo, setPostInfo] = useState<Post>();
    const [like, setLike] = useState(35);
    const [liked, setLiked] = useState(false);
    const { userInfo } = useContext(UserContext);
    const { id } = useParams();

    useEffect(() => {
        try {
            fetch(import.meta.env.VITE_API_URL + "/post/" + id)
                .then((response) => response.json())
                .then((postInfo) => {
                    setPostInfo(postInfo);
                });
        } catch (e) {
            console.log(e);
        }
    }, [id]);

    const likeHandle = () => {
        if (liked) {
            setLiked(false);
            setLike(like - 1);
        } else {
            setLiked(true);
            setLike(like + 1);
        }
    };

    if (!postInfo) return null;

    return (
        <div className="post-page flex justify-center">
            <div className="max-w-4xl flex flex-col items-center justify-center">
                <div className="px-24 my-8 w-full">
                    <time className="font-normal text-sm text-gray-600">
                        {format(new Date(postInfo.createdAt), "d MMM yyyy")}
                    </time>
                    <div className="uppercase text-sm font-medium my-2 text-blue-700">
                        Du lịch - trải nghiệm
                    </div>
                    <h1 className="text-4xl font-bold my-4">
                        {postInfo.title}
                    </h1>
                    <p className="summary">{postInfo.summary}</p>

                    <div className="flex justify-between">
                        <Link
                            className="flex items-center"
                            to="/vn/thong-tin-ca-nhan/rachel-vo"
                        >
                            <img
                                className="rounded-full mr-2"
                                src="https://img.vietcetera.com/uploads/avatar-images/18-sep-2023/user-1695023589471-160x160.jpg"
                                width="36"
                                height="36"
                            />
                            <p className="text-base font-semibold text-zinc-700">
                                @{postInfo.author.username}
                            </p>
                        </Link>
                        <div className="flex">
                            <div className="flex gap-3 text-gray-500 p-2">
                                {/* upvote */}
                                <button
                                    onClick={likeHandle}
                                    className="cursor-pointer py-2 pl-4 pr-4 rounded-full flex items-center text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                >
                                    {/* https://www.svgrepo.com/svg/448188/triangle?edit=true */}
                                    <svg
                                        viewBox="-1.6 -1.6 19.20 19.20"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className={
                                            "w-4 h-4 mr-1 " +
                                            (liked && "text-blue-600")
                                        }
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M8 1.25a2.101 2.101 0 00-1.785.996l.64.392-.642-.388-5.675 9.373-.006.01a2.065 2.065 0 00.751 2.832c.314.183.67.281 1.034.285h11.366a2.101 2.101 0 001.791-1.045 2.064 2.064 0 00-.006-2.072L9.788 2.25l-.003-.004A2.084 2.084 0 008 1.25z"
                                        ></path>
                                    </svg>
                                    <span className="upVote text-gray-600 text-sm">
                                        {like}
                                    </span>
                                </button>

                                {/* comment */}
                                <div className="cursor-pointer py-2 pl-4 pr-4 rounded-full flex items-center text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700">
                                    <svg
                                        viewBox="0 0 24 24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        className="w-4 h-4 mr-1"
                                    >
                                        <path
                                            fill="currentColor"
                                            fill-rule="evenodd"
                                            d="M2 6a3 3 0 0 1 3-3h14a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3H7.667a1 1 0 0 0-.6.2L3.6 21.8A1 1 0 0 1 2 21V6zm5 0a1 1 0 0 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h10a1 1 0 1 0 0-2H7zm0 4a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H7z"
                                            clip-rule="evenodd"
                                        ></path>
                                    </svg>
                                    <span className="comment text-gray-600 text-sm">
                                        24
                                    </span>
                                </div>

                                {/* edit */}
                                {userInfo.id === postInfo.author._id && (
                                    <Link
                                        to={`/edit/${postInfo._id}`}
                                        className="cursor-pointer py-2 pl-3 pr-4 rounded-full flex items-center text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <svg
                                            viewBox="0 0 24 24"
                                            className="w-4 h-4 mr-1"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M12 21C12 20.4477 12.4477 20 13 20H21C21.5523 20 22 20.4477 22 21C22 21.5523 21.5523 22 21 22H13C12.4477 22 12 21.5523 12 21Z"
                                                fill="currentColor"
                                            ></path>
                                            <path
                                                fill-rule="evenodd"
                                                clip-rule="evenodd"
                                                d="M20.7736 8.09994C22.3834 6.48381 22.315 4.36152 21.113 3.06183C20.5268 2.4281 19.6926 2.0233 18.7477 2.00098C17.7993 1.97858 16.8167 2.34127 15.91 3.09985C15.8868 3.11925 15.8645 3.13969 15.8432 3.16111L2.87446 16.1816C2.31443 16.7438 2 17.5051 2 18.2987V19.9922C2 21.0937 2.89197 22 4.00383 22H5.68265C6.48037 22 7.24524 21.6823 7.80819 21.1171L20.7736 8.09994ZM17.2071 5.79295C16.8166 5.40243 16.1834 5.40243 15.7929 5.79295C15.4024 6.18348 15.4024 6.81664 15.7929 7.20717L16.7929 8.20717C17.1834 8.59769 17.8166 8.59769 18.2071 8.20717C18.5976 7.81664 18.5976 7.18348 18.2071 6.79295L17.2071 5.79295Z"
                                                fill="currentColor"
                                            ></path>
                                        </svg>
                                        <span className="text-gray-600 text-sm">
                                            Chỉnh sửa
                                        </span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="relative w-[950px] overflow-hidden pb-[40%] my-4">
                    <img
                        src={postInfo.cover}
                        className="absolute top-0 left-0 w-full h-full object-cover object-center rounded-2xl"
                    />
                </div>

                <div className="px-40 my-2 w-full">
                    <div
                        className="post-content"
                        dangerouslySetInnerHTML={{ __html: postInfo.content }}
                    />
                </div>
            </div>
        </div>
    );
}
