import { format } from "date-fns";
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
    return (
        <div className="post">
            <div className="image">
                <Link to={`/post/${_id}`}>
                    <img src={"http://localhost:4000/" + cover} alt="" />
                </Link>
            </div>
            <div className="texts">
                <Link to={`/post/${_id}`}>
                    <h2>{title}</h2>
                </Link>
                <p className="info">
                    <a className="author">@{author.username}</a>
                    <time>
                        {format(new Date(createdAt), "d MMM yyyy HH:mm")}
                    </time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
};

export default Post;
