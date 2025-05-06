import { createUser, getUser } from "@/services";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json(); //extract data from request
    const hashedPassword = await bcrypt.hash(password, 10); // Hash the password before storing
    const existingUser = await getUser(email); // check existening user
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    } else {
      const user = await createUser({ name, email, password: hashedPassword }); // store user in database
      return NextResponse.json(
        { id: user?.id, name: user?.name, email: user?.email },
        { status: 201 }
      ); //send response to return user data to use for session
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Registration failed" }, { status: 500 });
  }
}
