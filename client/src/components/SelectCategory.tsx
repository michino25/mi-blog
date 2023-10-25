import { useRef, useState } from "react";
import { Category } from "../utils/model";

interface Prop {
  choose: Category | undefined;
  setChoose: (cate: Category) => void;
  list: Category[];
}

export default function SelectCategory({ choose, setChoose, list }: Prop) {
  const buttonRef = useRef(null);
  const [open, setOpen] = useState(false);

  const chooseHandle = (cate: Category) => {
    setChoose(cate);
    setOpen(false);
  };

  return (
    <div ref={buttonRef} className="relative w-full cursor-default">
      <button
        onClick={() => setOpen(!open)}
        className="relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:ring-1 focus:border-blue-500 focus:outline-none px-4 py-2.5 text-center inline-flex items-center w-full"
        type="button"
      >
        <span className={choose?.name ? "" : "text-gray-400"}>
          {choose?.name || "Chọn chủ đề"}
        </span>
        <svg
          className="absolute w-2.5 h-2.5 right-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {open && (
        <div className="absolute top-12 z-10 p-3 flex bg-white rounded-lg shadow-lg w-full">
          <ul className="grid w-full gap-3 sm:grid-cols-2 md:grid-cols-3">
            {list.map((item) => {
              return (
                <li key={item._id}>
                  <button
                    onClick={() => chooseHandle(item)}
                    className={
                      "w-full border bg-white rounded-lg cursor-pointer hover:bg-gray-100 " +
                      (choose?.code === item.code
                        ? "border-blue-600 text-blue-600 font-medium"
                        : "border-gray-200 text-gray-500")
                    }
                  >
                    <p className="inline-flex items-center justify-between w-full text-sm p-3">
                      {item.name}
                    </p>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
