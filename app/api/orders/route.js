import supabase from "@/supabase";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    //extract properties of order object
    const { userId, items, grandPrice } = await request.json();
    //save order in orders table in database
    const { data, error } = await supabase
      .from("orders")
      .insert([{ userID: userId, totalPrice: grandPrice }])
      .select("id") // to get order id to be used in orderItems table
      .single();

    if (error) {
      console.log(error.message);
    } else {
      //save items purchased to orderItems table
      const orderID = data.id;
      const orderItems = items.map((item) => {
        return { orderID, ...item };
      });

      await supabase.from("orderItems").insert(orderItems);
    }

    return NextResponse.json({ message: "Data received!" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 500 }
    );
  }
}
