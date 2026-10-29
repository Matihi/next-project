import CategoryBar from "./CategoryBar";
import { Suspense } from "react";
const SideBar = () => {
  const categories = [
    { id: 0, category: "All Dishes" },
    { id: 1, category: "Traditional Stews & Wat" },
    { id: 2, category: "Tibs & Grills" },
    { id: 3, category: "Raw & Cured Delicacies / Kitfo" },
    { id: 4, category: "Fasting & Vegan / Tsom" },
    { id: 5, category: "Beverages & Tej" },
  ];

  return (
    <aside className="border-r-2 border-black flex flex-col justify-center p-1 pt-3 ">
      <Suspense fallback={<p>Loading...</p>}>
        <CategoryBar categories={categories} />
      </Suspense>
    </aside>
  );
};

export default SideBar;
