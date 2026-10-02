export const revalidate = 3600;
import getDishes from "@/services/dishes";
import Link from "next/link";
const Menu = async () => {
  const url = "https://addis-eats-backend.onrender.com/menu/";
  const dishes = await getDishes(url);
  return (
    <main>
      <h1>Menu</h1>
      <div className="grid grid-cols-4 gap-2.5">
        {dishes.map((dish) => (
          <Link
            href={`/menu/${dish.slug}`}
            className="border-2 border-black"
            key={dish.id}
          >
            <p>{dish.nameEn}</p>
            <p>{dish.nameAm}</p>
          </Link>
        ))}
      </div>
    </main>
  );
};

export default Menu;
