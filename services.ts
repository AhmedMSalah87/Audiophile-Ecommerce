import supabase from "./supabase";

// fetch products according to category appeared in url parameter e.g. headphones or speakers or earphones
export const fetchProducts = async (params: Promise<{ category: string }>) => {
  const { category } = await params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("category", category); // selective for category

  if (error) {
    console.log("Error fetching products:", error);
  }
  return data;
};

// fetch a product according to slug name ppeared in url parameter e.g. zx7-speaker
export const fetchProduct = async (params: Promise<{ product: string }>) => {
  const { product } = await params;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", product) // filter for product by slug name
    .single(); // to extract one product object

  if (error) {
    console.log("Error fetching products:", error);
  }

  return data;
};

export const getUser = async (email: string) => {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();
  // you must allow read policy als in supabase to read users
  if (error) {
    console.error("Error fetching user:", error);
    return null; // Return null if there's an error
  }

  return data;
};

export const createUser = async (newUser: { name: string; email: string }) => {
  const { data, error } = await supabase.from("users").insert([newUser]);
  // you must allow write policy als in supabase to create users
  if (error) {
    console.log("Error creating user:", error);
  }

  return data;
};

export const ProductDescription = (description: string | undefined) => {
  // Split by sentence-ending punctuation
  if (!description) return { firstParagraph: "", secondParagraph: "" };

  const sentences = description.match(/[^.!?]+[.!?]+[\])'"`’”]*|.+$/g) || [];
  const mid = Math.floor(sentences.length / 2);
  const firstParagraph = sentences.slice(0, mid).join(" ").trim();
  const secondParagraph = sentences.slice(mid).join(" ").trim();

  return { firstParagraph, secondParagraph };
};
