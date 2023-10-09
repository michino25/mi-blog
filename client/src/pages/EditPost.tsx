import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import imgurUpload from "../utils/imgurAPI";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function EditPost() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [summary, setSummary] = useState("");
    const [content, setContent] = useState("");
    const [fileLink, setFileLink] = useState("");
    const [file, setFile] = useState<File>({} as File);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/post/" + id).then((response) => {
            response.json().then((postInfo) => {
                setTitle(postInfo.title);
                setContent(postInfo.content);
                setSummary(postInfo.summary);
                setFileLink(postInfo.cover);
            });
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function updatePost(e: React.FormEvent) {
        e.preventDefault();

        const editPostHandler = async (fileLink: string) => {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/post",
                {
                    method: "PUT",
                    body: JSON.stringify({
                        title,
                        summary,
                        content,
                        fileLink,
                        id,
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
        };

        // nếu có tải lên file thì upload xong mới edit post
        if (file?.name) {
            imgurUpload(file)
                .then(async (fileLink) => await editPostHandler(fileLink))
                .catch(() => {
                    alert("Unable to upload image to Imgur");
                });
        } else await editPostHandler(fileLink);
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
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
