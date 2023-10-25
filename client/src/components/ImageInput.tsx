import { useEffect, useState } from "react";

interface Prop {
  file: File;
  setFile: (file: File) => void;
  title?: string;
  fileLink?: string;
}

export default function ImageInput({ file, setFile, title, fileLink }: Prop) {
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

  function getImageName(originalString: string) {
    // Xóa các dấu và chuyển đổi thành ký tự không dấu
    const unaccentedString = originalString
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-zA-Z0-9 ]/g, ""); // Loại bỏ dấu câu

    // Chuyển thành chữ thường và thay thế khoảng trắng bằng dấu gạch ngang
    const transformedString = unaccentedString
      .toLowerCase()
      .replace(/\s+/g, "-");

    const truncatedString = transformedString.substring(0, 40);

    return truncatedString + ".jpg";
  }

  return (
    <div className="">
      <input
        className="hidden w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
        id="file_input"
        type="file"
        accept="image/*"
        onChange={handleFileChange}
      />

      <div className="relative w-full flex items-center py-3 pl-24 pr-10 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
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

        <span className="inline-block text-sm py-1 text-gray-900 dark:text-white">
          {file.name ? file.name : title ? getImageName(title) : "Chưa có ảnh"}
        </span>

        {(file.name || title) && (
          <button
            type="button"
            className="hidden sm:flex relative font-normal rounded-full text-sm ml-3 px-4 py-1 text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600"
            onMouseOver={() => setPreviewShow(true)}
            onMouseLeave={() => setPreviewShow(false)}
          >
            Xem trước
            {previewShow && (
              <div className="absolute z-10 my-1 top-8 left-[50%] -translate-x-[50%] inline-block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xl">
                <img
                  className="max-w-sm max-h-80"
                  src={file.name ? preview : fileLink}
                />
              </div>
            )}
          </button>
        )}
      </div>

      <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
        SVG, PNG, JPG hoặc GIF (Tối đa 10MB).
      </p>
    </div>
  );
}
