import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [files, setFiles] = useState<FileList>({} as FileList);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/post/" + id).then((response) => {
            response.json().then((postInfo) => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function updatePost(e: React.FormEvent) {
        e.preventDefault();

        const data = new FormData();
        data.set("title", title);
        data.set("summary", summary);
        data.set("content", content);
        if (id) data.set("id", id);
        if (files?.[0]) data.set("file", files?.[0]);

        const response = await fetch(import.meta.env.VITE_API_URL + "/post", {
            method: "PUT",
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
        return <Navigate to={"/post/" + id} />;
    }

    return (
        <form onSubmit={updatePost}>
            <input
                type="title"
                placeholder={"Title"}
                value={title}
                onChange={(ev) => setTitle(ev.target.value)}
            />
            <input
                type="summary"
                placeholder={"Summary"}
                value={summary}
                onChange={(ev) => setSummary(ev.target.value)}
            />
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <Editor onChange={setContent} value={content} />
            <button style={{ marginTop: "5px" }}>Update post</button>
        </form>
    );
}
