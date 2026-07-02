import { apiFetch } from "./api";

/** Obtiene todos los productos (memorias RAM) */
export function getProducts() {
  return apiFetch("/products");
}

/** Obtiene un único producto por id */
export function getProductById(id) {
  return apiFetch(`/products/${id}`);
}

/** Obtiene solo los productos destacados, usados en la página de Inicio */
export async function getFeaturedProducts() {
  const products = await apiFetch("/products");
  return products.filter((product) => product.featured);
}

/** Obtiene la lista de marcas registradas, usada en los filtros del catálogo */
export function getBrands() {
  return apiFetch("/brands");
}
