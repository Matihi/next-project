import getDishes from "@/services/dishes";
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";

export const size = { width: 1200, height: 630 };
const url = "https://addis-eats-backend.onrender.com/menu/";

export default async function Image({ params }) {
  const { slug } = await params;
  const dishes = await getDishes(url);

  const dish = dishes.find((dish) => dish.slug === slug);
  if (!dish) {
    notFound();
  }

  return new ImageResponse(
    <div style={{ fontSize: 72, background: "#0A1F3D" }}>
      {dish.nameEn} — {dish.priceETB}
    </div>,
  );
}
