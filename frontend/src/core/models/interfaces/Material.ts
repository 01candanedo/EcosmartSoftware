export interface Material {
  category_name: string;
  description: string;
  image: string;
  material_id: number;
  name: string;
}

export interface MaterialResponse {
  materials: Material[];
  ok: boolean;
}
