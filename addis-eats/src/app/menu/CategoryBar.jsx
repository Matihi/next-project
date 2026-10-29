"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const CategoryBar = ({ categories }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { push } = useRouter();

  const pathPattern = /^\/menu\/?$/;
  if (!pathPattern.test(pathname)) {
    return null;
  }

  const activeCategory = searchParams.get("category");
  const handleClick = (category) => {
    const params = new URLSearchParams(searchParams);
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }

    push(`${pathname}?${params.toString()}`);
  };
  const categoryButtons = categories.map((category) => {
    const isActive = activeCategory === category.category;
    return (
      <button
        className={`${isActive ? `bg-[#7a1401] text-white` : `bg-[#fceae4] `} rounded-sm p-1 text-xs md:text-sm hover:bg-[#7a1401] hover:text-white shrink-0 my-1
    `}
        key={category.id}
        onClick={() => handleClick(category.category)}
      >
        {category.category}
      </button>
    );
  });

  return (
    <div className="category-bar flex space-x-3 overflow-x-auto">
      {categoryButtons}
    </div>
  );
};

export default CategoryBar;
