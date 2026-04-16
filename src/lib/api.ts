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

export async function getSingleCategories(catID : string) {
  const res = await fetch(`${process.env.BASE_URL}/categories/${catID}`, {
    cache: "force-cache",
  });
  const data = await res.json();
  console.log(data , "api response")
  return data.data;
}

export async function getAllSubCategories() {
  const res = await fetch(`${process.env.BASE_URL}/subcategories`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data;
}

export async function getAllSubCategoriesInCategory(catId : string) {
  const res = await fetch(`${process.env.BASE_URL}/categories/${catId}/subcategories`, {
    cache: "force-cache",
  });
  const data = await res.json();
  return data.data;
}

