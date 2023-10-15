import { useState } from "react";
import { Link, Navigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    async function register(e: React.FormEvent) {
        e.preventDefault();
        if (repassword === password) {
            const response = await fetch(
                import.meta.env.VITE_API_URL + "/register",
                {
                    method: "POST",
                    body: JSON.stringify({ username, password }),
                    headers: { "Content-Type": "application/json" },
                }
            );

            if (response.status === 200) {
                alert("Đăng ký tài khoản thành công");
                setRedirect(true);
            } else {
                alert("Tài khoản đã tồn tại");
            }
        } else alert("Mật khẩu không trùng khớp");
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    return (
        <>
            <div className="flex flex-col items-center justify-center px-6 pt-8 mx-auto md:h-screen pt:mt-0 dark:bg-gray-900">
                <a
                    href="/"
                    className="flex items-center justify-center mb-8 text-2xl font-semibold lg:mb-10 dark:text-white"
                >
                    <img src="/miBlog-128.png" className="mr-4 h-11" />
                    <span>miBlog</span>
                </a>
                <div className="w-full max-w-lg p-6 space-y-8 sm:p-8 bg-white rounded-xl shadow dark:bg-gray-800">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Tạo tài khoản
                    </h2>
                    <form className="mt-8 space-y-6" onSubmit={register}>
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
                        <div>
                            <label
                                htmlFor="confirm-password"
                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type="password"
                                name="confirm-password"
                                placeholder="••••••••"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={repassword}
                                onChange={(ev) =>
                                    setRePassword(ev.target.value)
                                }
                                required
                            />
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="remember"
                                    name="remember"
                                    type="checkbox"
                                    className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="remember"
                                    className="font-medium text-gray-900 dark:text-white"
                                >
                                    Tôi đồng ý với
                                    <span className="ml-1 text-blue-700 hover:underline dark:text-blue-500">
                                        Điều kiện và Điều khoản
                                    </span>
                                </label>
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full px-5 py-3 text-base font-medium text-center text-white bg-blue-700 rounded-xl hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                        >
                            Đăng ký
                        </button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            Đã có tài khoản?
                            <Link
                                to="/login"
                                className="ml-1 text-blue-700 hover:underline dark:text-blue-500"
                            >
                                Đăng nhập ngay
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}
