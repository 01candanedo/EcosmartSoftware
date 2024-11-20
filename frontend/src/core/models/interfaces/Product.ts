interface Product{
  name: string,
  description: string,
  category: number,
  image: string,
}

interface ProductResponse{
  message: string,
  ok: boolean,
}

export {Product, ProductResponse};
