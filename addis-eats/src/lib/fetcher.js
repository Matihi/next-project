const fetcher = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP:${res.status}. Failed to fetch data.`);
  }
  const data = await res.json();
  return data;
};

export default fetcher;
