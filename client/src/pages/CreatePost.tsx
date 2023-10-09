import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import imgurUpload from "../utils/imgurAPI";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [file, setFile] = useState<File>({} as File);

    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e: React.FormEvent) {
        e.preventDefault();

        imgurUpload(file)
            .then(async (fileLink) => {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/post",
                    {
                        method: "POST",
                        body: JSON.stringify({
                            title,
                            summary,
                            content,
                            fileLink,
                            token: cookies.get("token"),
                        }),
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (response.ok) {
                    setRedirect(true);
                } else {
                    alert("An error has occurred when post");
                }
            })
            .catch(() => {
                alert("Unable to upload image to Imgur");
            });

        // multer
        // const data = new FormData();
        // data.set("title", title);
        // data.set("summary", summary);
        // data.set("content", content);
        // data.set("file", files[0]);

        // const response = await fetch(
        //     import.meta.env.VITE_API_URL + "/post",
        //     {
        //         method: "POST",
        //         body: data,
        //         credentials: "include",
        //     }
        // );
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form onSubmit={createNewPost}>
            <input
                type="title"
                placeholder={"Title"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="summary"
                placeholder={"Summary"}
                value={summary}
                onChange={(e) => setSummary(e.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Editor value={content} onChange={setContent} />
            <button style={{ marginTop: "5px" }}>Create post</button>
        </form>
    );
}
