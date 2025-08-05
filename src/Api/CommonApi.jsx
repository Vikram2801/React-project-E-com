import axios from "axios";
const API_URL = "https://fakestoreapi.in/api/products";
export const fetchProducts = async(page, perPage, category = "all", sort = "",search='') => {
  try{
      let url = `https://fakestoreapi.in/api/products?page=${page}&limit=${perPage}`;

  if (category !== "all") {
    url = `https://fakestoreapi.in/api/products/category?type=${category}&page=${page}&limit=${perPage}`;
    if (sort) url += `&sort=${sort}`;
  }else if(sort){
    url+=`$sort=${sort}`
  }
  if (search) {
      url += `&search=${encodeURIComponent(search)}`;
    }

   const response = await axios.get(url);
    return response;

  }catch (error) {
    throw new Error(error.response?.data?.message || "Failed to fetch products");
  }

  
};
export const fetchCategories = async () => {
  try {
    const response = await axios.get("https://fakestoreapi.in/api/products/category");
    return response;
  } catch (error) {
    throw new Error("Failed to fetch categories");
  }
};
export const singleProduct = (id) => axios.get(`${API_URL}/${id}`);
export const createProduct = (product) => axios.post(API_URL, product);
