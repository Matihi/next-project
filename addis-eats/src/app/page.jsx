import DishList from "@/components/dishes/DishList";
export default function Home() {
  const url = "https://addis-eats-backend.onrender.com/menu/specials";
  return (
    <div className="p-2">
      <h1>Special Menu</h1>
      <DishList url={url} />
    </div>
  );
}
