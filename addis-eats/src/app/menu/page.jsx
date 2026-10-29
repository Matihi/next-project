import DishesForClient from "./DishesForClient";
import getDishes from "@/services/dishes";

const Menu = async ({ searchParams }) => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const { category } = await searchParams;
  const categories = [
    { id: 0, category: "All Dishes" },
    { id: 1, category: "Traditional Stews & Wat" },
    { id: 2, category: "Tibs & Grills" },
    { id: 3, category: "Raw & Cured Delicacies / Kitfo" },
    { id: 4, category: "Fasting & Vegan / Tsom" },
    { id: 5, category: "Beverages & Tej" },
  ];

  const dishes = await getDishes(url);

  const shown =
    !category || category === "All Dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <section className="p-1">
      <h1>Menu</h1>
      <DishesForClient
        categories={categories}
        category={category}
        initial={shown}
      />
    </section>
  );
};

export default Menu;
