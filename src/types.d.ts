export interface ITypes {
  type: string;
  name: string;
}

export interface ICategory {
  id: string;
  type: string;
  name: string;
}

export interface ICategories  {
  [id: string]: ICategory;
}