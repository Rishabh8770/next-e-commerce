"use server";

import fs from "fs";
import path from "path";
import { cookies } from "next/headers";

const filePath = path.join(process.cwd(), "src/data", "users.json");
const cookieStore = cookies();

export async function LoginUser(email: string, password: string) {
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const user = users.find((user: { email: string; password: string }) => {
    return user.email === email && user.password === password;
  });
  
  if (user) {
    cookies().set({
      name: "userId",
      value: user.id.toString(),
      httpOnly: false,
      maxAge: 3 * 60 * 60,
      path: "/",
    });

    return { success: true, userId: user.id };
  } else {
    return { success: false, message: "Invalid email or password" };
  }
}

export async function SignupUser(
  name: string,
  email: string,
  password: string
) {
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));

  const existingUser = users.find(
    (user: { name: string; email: string }) =>
      user.email === email || user.name === name
  );

  if (existingUser) {
    return { success: false, message: "Username or Email already exists" };
  } else {
    const newUser = {
      id: users.length + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));

    cookieStore.set({
      name: "userId",
      value: newUser.id.toString(),
      httpOnly: true,
      maxAge: 3 * 60 * 60,
      path: "/",
    });

    return { success: true, userId: newUser.id };
  }
}

export const Logout = async () => {
  cookies().set({
    name: "userId",
    value: "",
    httpOnly: true,
    maxAge: -1,
    path: "/",
  });
};

export async function ValidateUser() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;
  return userId;
}
