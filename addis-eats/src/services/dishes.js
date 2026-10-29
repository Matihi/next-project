const getDishes = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP:${res.status}. Failed to fetch dishes.`);
  }
  const data = await res.json();
  const dishes = data.data;
  return dishes;
};

export default getDishes;
