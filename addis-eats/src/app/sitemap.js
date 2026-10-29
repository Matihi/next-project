import getDishes from "@/services/dishes";

const url = "https://addis-eats-backend.onrender.com/menu/";

export default async function sitemap() {
  const dishes = await getDishes(url);
  return [
    { url: "http://localhost:3000/", priority: 1 },
    { url: "http://localhost:3000/menu", priority: 0.8 },
    ...dishes.map((dish) => ({
      url: `http://localhost:3000/menu/${dish.slug}`,
    })),
  ];
}
