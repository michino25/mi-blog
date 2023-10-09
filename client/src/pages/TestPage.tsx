import { useEffect, useState } from "react";
import imgurUpload from "../utils/imgurAPI";

export default function TestPage() {
    const [message, setMessage] = useState("");
    const [file, setFile] = useState<File>({} as File);

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/test")
            .then((response) => response.json())
            .then((message) => {
                setMessage(message);
            });
    }, []);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Updating the state
        const files = e.target.files;
        if (files) {
            setFile(files[0]);
        }
    };

    const onFileUpload = async () => {
        // console.log(await imgurUpload(file));

        imgurUpload(file).then((response) => {
            console.log(response);
            setMessage(response);
            alert("Image was uploaded successfully");
        });
    };

    return (
        <>
            <p>{message}</p>
            <input
                name="file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
            />
            <button onClick={onFileUpload}>Upload</button>
        </>
    );
}
