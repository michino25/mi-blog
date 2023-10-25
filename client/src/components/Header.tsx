import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function Header() {
  const { userInfo, setUserInfo } = useContext(UserContext);
  const [darkmode, setDarkmode] = useState(false);
  const [noti, setNoti] = useState(false);
  const [profile, setProfile] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setUserInfo(cookies.get("user"));
  }, []);

  const buttonRef = useRef(null);

  function logout() {
    setProfile(false);
    cookies.set("user", "", { path: "/" });
    setUserInfo({});
  }

  const blurHandle = () => {
    setTimeout(() => {
      if (document.activeElement !== buttonRef.current) {
        setProfile(false);
      }
    }, 0); // Use a minimal delay
  };

  return (
    <>
      <nav className="fixed z-30 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="md:px-12 lg:px-24 px-5 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start flex-1">
              {/* mobile menu */}
              <button className="p-2 text-gray-600 rounded cursor-pointer lg:hidden hover:text-gray-900 hover:bg-gray-100 focus:bg-gray-100 dark:focus:bg-gray-700 focus:ring-2 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <svg
                  className="hidden w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </button>

              {/* logo */}
              <Link to="/" className="flex ml-2 lg:mr-24">
                <img src="/miBlog-128.png" className="h-8 mr-2" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  miBlog
                </span>
              </Link>

              {/* search */}
              <form
                action={"/search/" + search}
                method="GET"
                className="hidden lg:flex flex-1 lg:pr-8"
              >
                <div className="relative mt-1 w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-gray-500 dark:text-gray-400"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-full focus:ring-primary-500 focus:border-primary-500 block w-full pl-12 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                    placeholder="Tìm kiếm"
                  />
                </div>
              </form>
            </div>

            {/* button group */}
            <div className="flex items-center gap-2">
              {/* dark mode */}
              <button
                onClick={() => setDarkmode(!darkmode)}
                type="button"
                className="hidden sm:flex text-gray-500 dark:text-gray-400 hover:bg-gray-100 hover:text-gray-900 border border-transparent hover:border-gray-300 dark:hover:bg-gray-700 focus:outline-none focus:ring-0 rounded-full text-sm p-2.5"
              >
                {darkmode ? (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      fillRule="evenodd"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                )}
              </button>

              {userInfo?.username ? (
                <>
                  {/* notification */}
                  <button
                    onClick={() => setNoti(!noti)}
                    onBlur={() => setNoti(false)}
                    type="button"
                    className="hidden sm:flex relative p-2 text-gray-500 rounded-full hover:text-gray-900 hover:bg-gray-100 border border-transparent hover:border-gray-300 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z"></path>
                    </svg>

                    {noti && (
                      <div className="absolute top-12 -right-36 max-w-sm my-4 overflow-hidden text-base list-none bg-white divide-y divide-gray-100 rounded-xl shadow-xl dark:divide-gray-600 dark:bg-gray-700">
                        <div className="block px-4 py-2 text-base font-medium text-center text-gray-700 bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                          Thông báo
                        </div>
                        <div>
                          <div className="max-w-sm py-20 px-16 flex flex-col items-center">
                            <div className="flex items-center space-x-3 mb-12 px-6 py-3 border border-gray-100 rounded-lg shadow-lg">
                              <div className="w-8 h-8 rounded-full bg-orange-100"></div>
                              <div className="flex justify-between flex-col">
                                <div className="h-2.5 w-32 bg-gray-200 rounded-full my-1"></div>
                                <div className="h-2 w-20 bg-gray-100 rounded-full my-1"></div>
                              </div>
                            </div>

                            <h5 className="my-2 text-base font-bold text-gray-500">
                              Chưa có thông báo nào
                            </h5>
                            <p className="mb-3 font-normal text-sm text-gray-400 text-center">
                              Ngay khi có thông báo nào, bạn có thể tìm thấy ở
                              đây
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </button>

                  {/* Write */}
                  <Link
                    to="/create"
                    type="button"
                    className="py-2 px-2 md:pl-3 md:pr-4 rounded-full flex items-center text-gray-500 hover:text-gray-900 border border-gray-300 hover:border-gray-300 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
                  >
                    <svg
                      className="w-5 h-5 md:mr-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22ZM12.75 9C12.75 8.58579 12.4142 8.25 12 8.25C11.5858 8.25 11.25 8.58579 11.25 9L11.25 11.25H9C8.58579 11.25 8.25 11.5858 8.25 12C8.25 12.4142 8.58579 12.75 9 12.75H11.25V15C11.25 15.4142 11.5858 15.75 12 15.75C12.4142 15.75 12.75 15.4142 12.75 15L12.75 12.75H15C15.4142 12.75 15.75 12.4142 15.75 12C15.75 11.5858 15.4142 11.25 15 11.25H12.75V9Z"
                        fill="currentColor"
                      ></path>
                    </svg>
                    <span className="hidden md:flex ml-1">Viết bài</span>
                  </Link>

                  {/* avt */}
                  <div className="relative flex items-center mx-3">
                    <button
                      type="button"
                      className="flex text-sm bg-gray-800 overflow-hidden border-1 border-gray-100 rounded-full focus:ring-0"
                      onClick={() => setProfile(!profile)}
                      onBlur={blurHandle}
                    >
                      <img
                        className="w-8 h-8"
                        src={userInfo.profilePic}
                        alt="user photo"
                      />
                    </button>
                    <div
                      className={
                        (!profile && "hidden") +
                        " absolute top-12 right-0 z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-xl shadow-xl dark:bg-gray-700 dark:divide-gray-600"
                      }
                    >
                      <div className="px-4 py-3">
                        <p className="text-sm text-gray-900 dark:text-white">
                          {userInfo.username}
                        </p>
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
                          {userInfo.email}
                        </p>
                      </div>
                      <ul className="py-1">
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Trang cá nhân
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Bài viết đã lưu
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Cài đặt
                          </a>
                        </li>

                        <hr className="my-1 border-gray-200 mx-auto dark:border-gray-700" />

                        <li>
                          <button
                            ref={buttonRef}
                            onClick={logout}
                            className="block w-full cursor-pointer text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Đăng xuất
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                </>
              ) : (
                <div className="hidden sm:flex gap-1">
                  <Link
                    to="/register"
                    className="rounded-full text-sm font-medium flex items-center px-5 py-2.5 mx-1 my-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  >
                    Đăng ký
                  </Link>
                  <Link
                    to="/login"
                    className="py-2 px-4 mx-1 my-1 rounded-full text-sm flex items-center font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-0 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    Đăng nhập
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-[4.5rem] w-full"></div>
    </>
  );
}
