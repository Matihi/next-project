import Dish from "./Dish";
import getDishes from "@/services/dishes";

const DishList = async ({ url, category }) => {
  const dishes = await getDishes(url);

  const shown =
    !category || category === "All Dishes"
      ? dishes
      : dishes.filter((dish) => dish.category === category);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 my-1">
      {shown.map((dish) => (
        <Dish
          key={dish.id}
          id={dish.id}
          slug={dish.slug}
          nameEn={dish.nameEn}
          nameAm={dish.nameAm}
          price={dish.priceETB}
          image={`/images/${dish.slug}.png`}
          description={dish.description}
          spiceLevel={dish.spiceLevel
            .replace(/^choice:\s*/i, "")
            .replace(/\s*\(\d(?:-\d)?\/3\)\s*$/, "")
            .trim()}
          isFasting={dish.isFasting}
          isSpecial={dish.isSpecial}
        />
      ))}
    </div>
  );
};

export default DishList;
