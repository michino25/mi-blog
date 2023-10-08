import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const response = await fetch("http://localhost:4000/profile", {
                    credentials: "include",
                });

                if (response.ok) {
                    const userInfo = await response.json();
                    setUserInfo(userInfo);
                }
            } catch (e) {
                console.log(e);
            }
        }

        fetchUserInfo();

        // Suppress the ESLint warning: Disable the ESLint Rule for the next Line
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function logout() {
        fetch("http://localhost:4000/logout", {
            credentials: "include",
            method: "POST",
        });

        setUserInfo({});
    }

    return (
        <header>
            <Link to="/" className="logo">
                MyBlog
            </Link>
            <nav>
                {userInfo?.username ? (
                    <>
                        <Link to="/create">Create new post</Link>
                        <a onClick={logout}>Logout</a>
                        <strong>@{userInfo.username}</strong>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}
