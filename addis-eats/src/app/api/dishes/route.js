export const GET = async (request) => {
  const { searchParams } = new URL(request.url);

  const category = searchParams.get("category") ?? "All Dishes";
  const term = searchParams.get("q") ?? "";
  const page = Number(searchParams.get("page")) ?? 0;

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
    const filteredDishes = data.filter((dish) => {
      const matchesCategory =
        category === "All Dishes" || dish.category === category;

      const normalizedTerm = term.trim().toLowerCase();

      const matchesSearch =
        dish.nameEn.toLowerCase().includes(normalizedTerm) ||
        dish.nameAm.toLowerCase().includes(normalizedTerm);

      return matchesCategory && matchesSearch;
    });

    const itemsPerPage = 4;
    const startIndex = page * itemsPerPage;
    const endIndex = (page + 1) * itemsPerPage;

    const pagedDishes = filteredDishes.slice(startIndex, endIndex);

    return Response.json(pagedDishes, { status: 200 });
  } catch (error) {
    return Response.json({ error: "Internal server error" }, { status: 500 });
  }
};
