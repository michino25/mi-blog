import { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";

export default function CreatePost() {
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<FileList>({} as FileList);

    const [redirect, setRedirect] = useState(false);

    async function createNewPost(e: React.FormEvent) {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        data.set("file", files[0]);

        const response = await fetch("http://localhost:4000/post", {
            method: "POST",
            body: data,
            credentials: "include",
        });

        if (response.ok) {
            setRedirect(true);
        }
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFiles(files);
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
