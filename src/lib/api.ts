export async function getProducts() {
  const res = await fetch(`${process.env.BASE_URL}/products`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data;
}

export async function getBrands() {
  const res = await fetch(`${process.env.BASE_URL}/brands`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data;
}


export async function getCategories() {
  const res = await fetch(`${process.env.BASE_URL}/categories`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data;
}

