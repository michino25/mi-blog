import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function LoginPage() {
  const { setUserInfo } = useContext(UserContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);

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
        cookies.set("token", userInfo.token, { path: "/" });
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
    <>
      <div className="flex flex-col items-center justify-center md:px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
        <a
          href="/"
          className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
        >
          <img src="/miBlog-128.png" className="mr-4 h-11" />
          <span>miBlog</span>
        </a>
        <div className="w-full max-w-lg p-6 space-y-8 sm:p-8 bg-white rounded-xl shadow dark:bg-gray-800">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Đăng nhập
          </h2>
          <form className="mt-8 space-y-6" onSubmit={login}>
            <div>
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tên đăng nhập
              </label>
              <input
                type="text"
                name="username"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Mật khẩu
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Đăng nhập
            </button>
            <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Chưa có tài khoản?
              <Link
                to="/register"
                className="ml-1 text-blue-700 hover:underline dark:text-blue-500"
              >
                Đăng ký ngay
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
