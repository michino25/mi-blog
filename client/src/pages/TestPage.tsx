import { useEffect, useState } from "react";

export default function HomePage() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        fetch(import.meta.env.VITE_API_URL + "/test")
            .then((response) => response.json())
            .then((message) => {
                setMessage(message);
            });
    }, []);

    return <p>{message}</p>;
}
