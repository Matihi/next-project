"use client";
import Dish from "@/components/dishes/Dish";
import { useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { useDebounce } from "use-debounce";
import CategoryBar from "./CategoryBar";

const DishesForClient = ({ category, initial, categories }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debounced] = useDebounce(searchTerm.trim(), 300);
  const [pageIndex, setPageIndex] = useState(0);

  useEffect(() => {
    setPageIndex(0);
  }, [category, debounced]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const defaultCat = category ? category : "All Dishes";

  const key =
    `/api/dishes?category=${encodeURIComponent(defaultCat)}` +
    `&q=${encodeURIComponent(debounced)}` +
    `&page=${encodeURIComponent(pageIndex)}`;

  const handlePrev = () => {
    setPageIndex((prev) => {
      return prev < 1 ? 0 : prev - 1;
    });
  };

  const handleNext = () => {
    setPageIndex((prev) => prev + 1);
  };

  const { data, error, isLoading } = useSWR(
    debounced || defaultCat ? key : null,
    fetcher,
    {
      fallbackData: initial,
    },
  );

  const noDishes = data.length === 0;

  const prevPageNumber = pageIndex;
  const nextPageNumber = pageIndex + 2;

  const pageButtonStyle =
    "flex justify-center items-center py-1 px-2 bg-amber-500 disabled:bg-gray-300 rounded-md active:bg-amber-600 h-fit";

  return (
    <div className="p-1">
      <search className="p-1 pb-3">
        <input
          type="text"
          placeholder="Search dishes"
          className="p-2  border"
          value={searchTerm}
          onChange={handleChange}
        />
      </search>
      <CategoryBar categories={categories} />
      {isLoading ? (
        <p>Loading dishes...</p>
      ) : error ? (
        <p>Could not load dishes.</p>
      ) : noDishes ? (
        <p>{`Sorry, dishes are not available.`}</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 my-3">
          {data.map((dish) => (
            <Dish
              key={dish.id}
              id={dish.id}
              slug={dish.slug}
              nameEn={dish.nameEn}
              nameAm={dish.nameAm}
              price={dish.priceETB}
              image={`/images/${dish.slug}.png`}
            />
          ))}
        </div>
      )}
      <div className="flex justify-evenly p-4">
        <button
          className={pageButtonStyle}
          onClick={handlePrev}
          disabled={prevPageNumber < 1}
        >{`${prevPageNumber < 1 ? "" : prevPageNumber} < Prev `}</button>
        <button
          className={pageButtonStyle}
          onClick={handleNext}
          disabled={noDishes}
        >{`Next > ${nextPageNumber}`}</button>
      </div>
    </div>
  );
};

export default DishesForClient;
