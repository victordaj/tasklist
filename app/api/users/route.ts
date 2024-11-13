import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { User } from "@/types/users";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

const readUsers = (): User[] =>
  JSON.parse(fs.readFileSync(usersFilePath, "utf8"));
const writeUsers = (data: User[]) =>
  fs.writeFileSync(usersFilePath, JSON.stringify(data, null, 2));

export async function GET() {
  const users = readUsers();
  return NextResponse.json(users);
}

// POST - Create a new user
export async function POST(request: NextRequest) {
  const users = readUsers();
  const newUser: User = await request.json();
  newUser.id = (users.length + 1).toString();
  users.push(newUser);
  writeUsers(users);
  return NextResponse.json(newUser, { status: 201 });
}
