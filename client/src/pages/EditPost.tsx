import React, { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import imgurUpload from "../utils/imgurAPI";
import Cookies from "universal-cookie";
import ImageInput from "../components/ImageInput";
import SelectCategory from "../components/SelectCategory";
import { api, useFetch } from "../utils/fetch";
import { Category } from "../utils/model";
const cookies = new Cookies();

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [fileLink, setFileLink] = useState("");
  const [file, setFile] = useState<File>({} as File);
  const [redirect, setRedirect] = useState(false);

  const [category, setCategory] = useState<Category>();
  const [categories, setCategories] = useState<Category[]>([]);

  useFetch(async () => {
    const post = await api.get("/posts/" + id);

    setTitle(post.data.title);
    setContent(post.data.content);
    setSummary(post.data.summary);
    setCategory(post.data.category);
    setFileLink(post.data.photo);

    const category = await api.get("/categories");
    setCategories(category.data);
  });

  const editPostFetch = async (fileLink: string) => {
    try {
      const user = cookies.get("user");
      const res = await api.put("/posts/" + id, {
        title,
        summary,
        photo: fileLink,
        content,
        author: user._id,
        category: category?._id,
      });

      if (res.data) {
        setRedirect(true);
      }
    } catch (err) {
      alert("An error has occurred when post");
    }
  };

  async function updatePost(e: React.FormEvent) {
    e.preventDefault();

    // nếu có tải lên file thì upload xong mới edit post
    if (file?.name) {
      imgurUpload(file)
        .then(async (fileLink) => await editPostFetch(fileLink))
        .catch(() => {
          alert("Unable to upload image to Imgur");
        });
    } else await editPostFetch(fileLink);
  }

  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  return (
    <form
      className="my-10 mx-0 sm:mx-12 lg:mx-24 xl:mx-48"
      onSubmit={updatePost}
    >
      <h2 className="py-3 text-2xl font-bold text-gray-900 dark:text-white">
        Chỉnh sửa bài viết
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
        <ImageInput
          file={file}
          setFile={setFile}
          title={title}
          fileLink={fileLink}
        />
      </div>

      <div>
        <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
          Chủ đề
        </label>

        <SelectCategory
          choose={category}
          setChoose={setCategory}
          list={categories}
        />
      </div>

      <div>
        <label className="block mb-2 mt-4 text-sm font-medium text-gray-900 dark:text-white">
          Bài viết
        </label>

        <div className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600">
          <Editor value={content} onChange={setContent} />
        </div>
      </div>

      <button className="mt-4 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        Cập nhật
      </button>
    </form>
  );
}
