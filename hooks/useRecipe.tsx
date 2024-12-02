import { useState } from "react";

type RecipeType = {
  _id: string;
  name: string;
  ingredients: string;
  instructions: string;
  category: string;
  prepTime: number;
  cookingTime: number;
  servings: number;
  imageUrl: string;
  createdAt: string;
};

type ResponseDataType = {
  limit: number;
  page: number;
  recipes: Array<RecipeType>;
  totalRecipes: number;
};

type RecipeResponse = Array<RecipeType> | RecipeType | any;

const useFetch = () => {
  const [state, setData] = useState<Array<RecipeType>>([]);

  const apiUrl = "http://localhost:5000/recipes";

  const getFetch = async (
    link: string = apiUrl,
    options: RequestInit,
    id?: string
  ) => {
    try {
      const res = await fetch(link, options);
      const data: RecipeResponse | ResponseDataType = await res.json();

      if (options.method === "DELETE") {
        setData((prevState) => prevState.filter((item) => item._id !== id));
      } else if (options.method === "PUT") {
        setData((prevState) =>
          prevState.map((item) =>
            item._id === id ? (data as RecipeType) : item
          )
        );
      } else if (options.method === "POST") {
        setData((prevState) => [...prevState, data as RecipeType]);
      } else {
        setData((data as ResponseDataType).recipes || []);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return [state, getFetch] as const;
};

export default useFetch;
