import getDishes from "@/services/dishes";

const url = "https://addis-eats-backend.onrender.com/menu/";

export default async function sitemap() {
  const dishes = await getDishes(url);
  return [
    { url: "https://next-project-59ed.vercel.app/", priority: 1 },
    { url: "https://next-project-59ed.vercel.app/menu", priority: 0.8 },
    ...dishes.map((dish) => ({
      url: `https://next-project-59ed.vercel.app/menu/${dish.slug}`,
    })),
  ];
}
