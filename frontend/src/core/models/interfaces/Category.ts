interface Category {
  category_id: number;
  name: string;
}

interface CategoryResponseData {
  categories: Category[];
  ok: boolean;
}


export {Category, CategoryResponseData};
