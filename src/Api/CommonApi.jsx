import axios from "axios"
const API_URL ="https://fakestoreapi.in/api/products"
export const fetchProducts =()=> axios.get(API_URL);
export const singleProduct =(id)=> axios.get(`${API_URL}/${id}`);;
export const createProduct = (product)=> axios.post(API_URL,product);