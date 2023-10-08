import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Header() {
    const { userInfo, setUserInfo } = useContext(UserContext);

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const response = await fetch(
                    import.meta.env.VITE_API_URL + "/profile",
                    {
                        method: "POST",
                        body: JSON.stringify({ token: cookies.get("token") }),
                        headers: { "Content-Type": "application/json" },
                    }
                );

                if (response.ok) {
                    const userInfo = await response.json();
                    setUserInfo(userInfo);
                }
            } catch (e) {
                console.log(e);
            }
        }

        if (!userInfo || Object.keys(userInfo).length === 0) {
            fetchUserInfo();
        }

        // Suppress the ESLint warning: Disable the ESLint Rule for the next Line
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    function logout() {
        cookies.set("token", "", { path: "/" });
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
