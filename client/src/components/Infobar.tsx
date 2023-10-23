import { useState } from "react";
import { Link } from "react-router-dom";

export default function Infobar() {
  const [topics] = useState([
    "Quan điểm - Tranh luận",
    "Lịch sử",
    "Thinking Out Loud",
    "Tâm lý học",
    "Giáo dục",
    "Tâm sự",
    "Cuộc sống",
    "Du lịch - trải nghiệm",
    "Tình yêu",
    "Triết học",
    "Sách",
    "Công nghệ mới",
    "Blockchain",
  ]);

  const [users] = useState([
    [
      "https://images.spiderum.com/sp-xs-avatar/dc5284506efd11edaa12915a4c0043eb.jpeg",
      "Huskywannafly",
      "When there's a will, there's a...",
    ],
    [
      "https://images.spiderum.com/sp-xs-avatar/b54a6e406f3311e9b89da1d556449df3.jpg",
      "Andy Luong",
      "Until I feared I would lose, I never...",
    ],
    [
      "https://images.spiderum.com/sp-xs-avatar/0a1679902b7011edb689a17f7b0ba31e.png",
      "Tú Anh",
      "Non nobis solum.",
    ],
  ]);

  return (
    <div className="lg:ml-4 flex flex-col">
      <div className="p-5 mb-4 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="flex items-center title uppercase text-green-700 font-bold text-xl py-4">
          <svg
            className="w-6 h-6"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 100 100"
          >
            <path d="M78.2,34.3h-7.9l3.4-13c0-0.1,0-0.2,0-0.3c0-0.5-0.4-1-1-1h-6.3c-0.5,0-0.9,0.4-1,0.8L62,34.3H46.2l3.4-13 c0-0.1,0-0.2,0-0.3c0-0.5-0.4-1-1-1h-6.3c-0.5,0-0.9,0.4-1,0.8l-3.5,13.4h-8.8c-0.5,0-0.8,0.3-1,0.7l-1.6,6c0,0.1,0,0.2,0,0.2 c0,0.5,0.4,1,1,1h8.3l-3.9,15.2h-8.5c-0.5,0-0.8,0.3-1,0.7l-1.6,6c0,0.1,0,0.2,0,0.2c0,0.5,0.4,1,1,1h8l-3.4,13.2c0,0.1,0,0.2,0,0.2 c0,0.5,0.4,1,1,1h6.3c0.5,0,0.9-0.3,1-0.8l3.5-13.7h15.7l-3.4,13.2c0,0.1,0,0.2,0,0.2c0,0.5,0.4,1,1,1h6.3c0.5,0,0.9-0.3,1-0.8 l3.5-13.7h8.7c0.5,0,0.9-0.3,1-0.8l1.6-6c0-0.1,0-0.2,0-0.2c0-0.5-0.4-1-1-1h-8.2l3.9-15.2h8.4c0.5,0,0.9-0.3,1-0.8l1.6-6 c0-0.1,0-0.2,0-0.2C79.2,34.7,78.7,34.3,78.2,34.3z M56,57.5H40.2l3.9-15.2h15.7L56,57.5z"></path>
          </svg>
          <span>Chủ đề</span>
        </div>
        <div className="flex flex-wrap">
          {topics.length > 0 &&
            topics.map((topic, index) => (
              <button
                key={index}
                type="button"
                className="text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
              >
                {topic}
              </button>
            ))}
        </div>
      </div>

      <div className="p-5 mb-4 bg-white border border-gray-200 rounded-xl shadow-lg">
        <div className="flex items-center title uppercase text-green-700 font-bold text-xl py-4">
          <svg
            className="w-6 h-6 mr-1"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.2773 16.5148C10.282 16.405 10.4639 16.3613 10.5179 16.4571C10.7712 16.9068 11.2034 17.5682 11.6937 17.8689C12.1841 18.1696 12.9695 18.2549 13.4851 18.2768C13.595 18.2815 13.6386 18.4634 13.5428 18.5174C13.0931 18.7707 12.4318 19.2029 12.1311 19.6932C11.8304 20.1836 11.745 20.969 11.7232 21.4847C11.7185 21.5945 11.5365 21.6381 11.4825 21.5423C11.2292 21.0926 10.7971 20.4313 10.3067 20.1306C9.81637 19.8299 9.03097 19.7446 8.51529 19.7227C8.40544 19.718 8.36182 19.536 8.45761 19.4821C8.90731 19.2287 9.56866 18.7966 9.86938 18.3062C10.1701 17.8159 10.2554 17.0305 10.2773 16.5148Z"
              fill="currentColor"
            ></path>
            <path
              d="M18.4924 15.5147C18.4839 15.4051 18.292 15.3591 18.2348 15.453C18.0625 15.7355 17.814 16.0764 17.5379 16.2458C17.2617 16.4152 16.8451 16.482 16.5152 16.5075C16.4056 16.516 16.3596 16.7078 16.4535 16.7651C16.736 16.9374 17.0769 17.1858 17.2463 17.462C17.4157 17.7382 17.4825 18.1548 17.508 18.4847C17.5165 18.5943 17.7083 18.6403 17.7656 18.5464C17.9379 18.2639 18.1863 17.923 18.4625 17.7536C18.7387 17.5842 19.1552 17.5174 19.4852 17.4919C19.5948 17.4834 19.6408 17.2916 19.5469 17.2343C19.2644 17.062 18.9234 16.8135 18.7541 16.5374C18.5847 16.2612 18.5178 15.8446 18.4924 15.5147Z"
              fill="currentColor"
            ></path>
            <path
              d="M14.7039 4.00181L14.4616 3.69574C13.5249 2.51266 13.0566 1.92112 12.5118 2.00845C11.9669 2.09577 11.7064 2.80412 11.1854 4.22083L11.0506 4.58735C10.9025 4.98993 10.8285 5.19122 10.6865 5.33897C10.5445 5.48671 10.3506 5.56417 9.96291 5.71911L9.60991 5.86016L9.36205 5.95933C8.16253 6.4406 7.5581 6.71331 7.48093 7.24324C7.39861 7.80849 7.97072 8.29205 9.11492 9.25915L9.41094 9.50935C9.73609 9.78417 9.89866 9.92158 9.99186 10.1089C10.0851 10.2962 10.0983 10.5121 10.1249 10.9441L10.149 11.3373C10.2424 12.8574 10.2891 13.6174 10.783 13.8794C11.277 14.1414 11.8911 13.7319 13.1193 12.9129L13.1193 12.9129L13.4371 12.701C13.7861 12.4683 13.9606 12.3519 14.1602 12.32C14.3598 12.288 14.5618 12.344 14.966 12.456L15.3339 12.558C16.756 12.9522 17.4671 13.1493 17.8547 12.746C18.2423 12.3427 18.0498 11.6061 17.6646 10.1328L17.565 9.75163C17.4555 9.33297 17.4008 9.12364 17.431 8.91657C17.4611 8.70951 17.5727 8.52816 17.796 8.16546L17.796 8.16544L17.9992 7.83522C18.7848 6.55883 19.1776 5.92063 18.9231 5.40935C18.6687 4.89806 17.9356 4.85229 16.4694 4.76076L16.09 4.73708C15.6734 4.71107 15.4651 4.69807 15.2841 4.60208C15.1032 4.5061 14.9701 4.338 14.7039 4.00181L14.7039 4.00181Z"
              fill="currentColor"
            ></path>
            <path
              d="M8.835 13.326C6.69772 14.3702 4.91931 16.024 4.24844 18.0002C3.49589 13.2926 4.53976 10.2526 6.21308 8.36328C6.35728 8.658 6.54466 8.902 6.71297 9.09269C7.06286 9.48911 7.56518 9.91347 8.07523 10.3444L8.44225 10.6545C8.51184 10.7134 8.56597 10.7592 8.61197 10.7989C8.61665 10.8632 8.62129 10.9383 8.62727 11.0357L8.65708 11.5212C8.69717 12.1761 8.7363 12.8155 8.835 13.326Z"
              fill="currentColor"
            ></path>
          </svg>
          <span>Cây bút nổi bật</span>
        </div>
        <div className="flex flex-col gap-4">
          {users.length > 0 &&
            users.map((user, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex">
                  <Link
                    className="mr-2 mt-1 flex-shrink-0"
                    to="/vn/thong-tin-ca-nhan/rachel-vo"
                  >
                    <img className="rounded-full w-8 h-8" src={user[0]} />
                  </Link>
                  <div className="pl-1">
                    <Link to="/vn/thong-tin-ca-nhan/rachel-vo" target="_blank">
                      <p className="text-base font-semibold text-zinc-600">
                        {user[1]}
                      </p>
                    </Link>
                    <p className="text-sm text-zinc-500">{user[2]}</p>
                  </div>
                </div>
                <button
                  type="button"
                  className="whitespace-nowrap text-gray-700 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-0 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
                >
                  Theo dõi
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
