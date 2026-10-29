export const GET = async (request, { params }) => {
  const { slug } = await params;
  const url = "https://addis-eats-backend.onrender.com/menu/";
  try {
    const res = await fetch(url);
    if (!res.ok) {
      return Response.json(
        { error: "Failed to fetch from external api" },
        { status: 503 },
      );
    }
    const { data } = await res.json();
    const dish = data.find((dish) => dish.slug === slug);
    if (!dish) {
      return Response.json({ error: "Dish not found" }, { status: 404 });
    }
    return Response.json(dish);
  } catch (e) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
