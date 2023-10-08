import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function LoginPage() {
    const { setUserInfo } = useContext(UserContext);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const setCookie = (name: string, data: string, expireDay: number) => {
        // Calculate the expiration date
        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() + expireDay);

        // Format the expiration date in GMT format
        const expires = expirationDate.toUTCString();

        // Set the cookie with the calculated expiration
        document.cookie = `${name}=${data}; expires=${expires}; path=/`;
    };

    async function login(e: React.FormEvent) {
        e.preventDefault();

        const response = await fetch(import.meta.env.VITE_API_URL + "/login", {
            method: "POST",
            body: JSON.stringify({ username, password }),
            headers: { "Content-Type": "application/json" },
            credentials: "include", // chia se thông tin cookie với server
        });

        if (response.ok) {
            setRedirect(true);
            response.json().then((userInfo) => {
                setCookie("token", userInfo.token, 1);
                setUserInfo(userInfo);
            });
        } else {
            alert("wrong credentials");
        }
    }

    if (redirect) {
        return <Navigate to="/" />;
    }

    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input
                type="text"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />
            <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <button>Login</button>
        </form>
    );
}
