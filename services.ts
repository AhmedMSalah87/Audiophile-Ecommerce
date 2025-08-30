import { ProductProps } from "./app/[category]/[product]/page";
import { OrderProps } from "./components/OrderCard";
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
export const fetchProduct = async (
  params: Promise<{ product: ProductProps }>
) => {
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

export const createUser = async (newUser: {
  name: string;
  email: string;
  password?: string;
}) => {
  const { data, error } = await supabase
    .from("users")
    .insert([newUser])
    .select("id, name, email"); // to extract id,name,email of new user after created

  // you must allow write policy als in supabase to create users
  if (error) {
    console.log("Error creating user:", error);
  }

  return data?.[0]; // Return the first (and only) inserted user as data is array of objects
};

export const getOrdersByUserId = async (
  userId: string | number
): Promise<OrderProps[] | null> => {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `id, created_at, totalPrice, orderItems(product:products(name, image))`
    )
    .eq("userID", userId); // Optional filter by current user

  if (error) {
    console.log("Error getting order details:", error);
  }

  return (
    // convert product array to object
    data?.map((order) => ({
      ...order,
      orderItems: order.orderItems.map((item) => ({
        product: Array.isArray(item.product) ? item.product[0] : item.product,
      })),
    })) ?? null
  );
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

export const getCategories = async () => {
  const { data } = await supabase.from("products").select("category");
  return data?.map((item) => item.category);
};
