export const revalidate = 3600;
import getDishes from "@/services/dishes";

export default async function Home() {
  const url = "https://addis-eats-backend.onrender.com/menu/specials";
  const dishes = await getDishes(url);
  console.log(dishes);

  return (
    <div>
      <main>
        <h1>Home</h1>
        <ul>
          {dishes.map((dish) => (
            <li key={dish.id}>
              <p>{dish.nameEn}</p>
              <p>{dish.nameAm}</p>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
