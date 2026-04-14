export async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/products`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data;
}

