import React from "react";
import {
  IoIosArrowBack as Back,
  IoIosArrowForward as Forward,
} from "react-icons/io";

type PaginationProps = {
  currentPage: number;
  onChangePage: (dir: "back" | "forward") => void;
  totalPages: number;
};

export function Pagination({
  currentPage,
  onChangePage,
  totalPages,
}: PaginationProps) {
  const iconClasses =
    "text-lg cursor-pointer text-gray-700 hover:text-gray-900";

  return (
    <div className="flex justify-center items-center">
      {currentPage !== 1 && (
        <button>
          <Back className={iconClasses} onClick={() => onChangePage("back")} />
        </button>
      )}
      <span className="text-xl mx-2">{currentPage}</span>
      {totalPages !== currentPage && (
        <button>
          <Forward
            className={iconClasses}
            onClick={() => onChangePage("forward")}
          />
        </button>
      )}
    </div>
  );
}
