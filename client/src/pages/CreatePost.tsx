import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import imgurUpload from "../utils/imgurAPI";
import Cookies from "universal-cookie";
const cookies = new Cookies();

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File>({} as File);

  const [redirect, setRedirect] = useState(false);

  async function createNewPost(e: React.FormEvent) {
    e.preventDefault();

    const createPostFetch = async (fileLink: string) => {
      const response = await fetch(import.meta.env.VITE_API_URL + "/post", {
        method: "POST",
        body: JSON.stringify({
          title,
          summary,
          content,
          fileLink,
          token: cookies.get("token"),
        }),
        headers: { "Content-Type": "application/json" },
      });

      // multer
      // const data = new FormData();
      // data.set("title", title);
      // data.set("summary", summary);
      // data.set("content", content);
      // data.set("file", files[0]);

      // const response = await fetch(
      //     import.meta.env.VITE_API_URL + "/post",
      //     {
      //         method: "POST",
      //         body: data,
      //         credentials: "include",
      //     }
      // );

      if (response.ok) {
        setRedirect(true);
      } else {
        alert("An error has occurred when post");
      }
    };

    imgurUpload(file)
      .then(async (fileLink) => await createPostFetch(fileLink))
      .catch(() => {
        alert("Unable to upload image to Imgur");
      });
  }

  const [preview, setPreview] = useState("");
  const [previewShow, setPreviewShow] = useState(false);
  useEffect(() => {
    if (file.name) setPreview(URL.createObjectURL(file));
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <form
      className="my-10 mx-0 sm:mx-12 lg:mx-24 xl:mx-48"
      onSubmit={createNewPost}
    >
      <h2 className="py-3 text-2xl font-bold text-gray-900 dark:text-white">
        Thêm bài viết
      </h2>

      <div>
        <label
          htmlFor="title"
          className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tiêu đề
        </label>
        <input
          type="text"
          id="title"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          htmlFor="summary"
          className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
        >
          Tóm tắt
        </label>
        <input
          type="text"
          id="summary"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder=""
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
      </div>

      <div>
        <label
          className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white"
          htmlFor="file_input"
        >
          Ảnh bìa
        </label>

        <input
          className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />

        <div className="relative w-full py-4 pl-24 pr-10 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
          <label
            className="text-white cursor-pointer absolute left-2 bottom-[50%] translate-y-[50%] bg-blue-700 hover:bg-blue-800 focus:ring-0 focus:outline-none font-medium rounded-md text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            htmlFor="file_input"
          >
            Tải ảnh
          </label>

          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M23 4C23 2.34315 21.6569 1 20 1H4C2.34315 1 1 2.34315 1 4V20C1 21.6569 2.34315 23 4 23H20C21.6569 23 23 21.6569 23 20V4ZM21 4C21 3.44772 20.5523 3 20 3H4C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21H20C20.5523 21 21 20.5523 21 20V4Z"
                fill="currentColor"
              ></path>
              <path
                d="M4.80665 17.5211L9.1221 9.60947C9.50112 8.91461 10.4989 8.91461 10.8779 9.60947L14.0465 15.4186L15.1318 13.5194C15.5157 12.8476 16.4843 12.8476 16.8682 13.5194L19.1451 17.5039C19.526 18.1705 19.0446 19 18.2768 19H5.68454C4.92548 19 4.44317 18.1875 4.80665 17.5211Z"
                fill="currentColor"
              ></path>
              <path
                d="M18 8C18 9.10457 17.1046 10 16 10C14.8954 10 14 9.10457 14 8C14 6.89543 14.8954 6 16 6C17.1046 6 18 6.89543 18 8Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>

          <span className="inline-block text-sm text-gray-900 dark:text-white">
            {file.name ? file.name : "Chưa có ảnh"}
          </span>

          {file.name && (
            <button
              type="button"
              className="hidden sm:flex relative font-normal rounded-full text-sm ml-3 px-4 py-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
              onMouseOver={() => setPreviewShow(true)}
              onMouseLeave={() => setPreviewShow(false)}
            >
              Xem trước
              {previewShow && (
                <div className="absolute z-10 my-1 top-8 left-[50%] -translate-x-[50%] inline-block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl">
                  <img className="max-w-sm max-h-80" src={preview} />
                </div>
              )}
            </button>
          )}
        </div>

        <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
          SVG, PNG, JPG hoặc GIF (Tối đa 10MB).
        </p>
      </div>

      <div>
        <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
          Bài viết
        </label>

        <div className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600">
          <Editor value={content} onChange={setContent} />
        </div>
      </div>

      <button
        // type="button"
        className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Đăng tải
      </button>
    </form>
  );
}
