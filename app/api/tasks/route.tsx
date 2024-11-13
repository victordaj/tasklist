import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/types/tasks";

const tasksFilePath = path.join(process.cwd(), "data", "tasks.json");

const readTasks = () => JSON.parse(fs.readFileSync(tasksFilePath, "utf8"));
const writeTasks = (data: Task[]) =>
  fs.writeFileSync(tasksFilePath, JSON.stringify(data, null, 2));

export async function GET() {
  const tasks = readTasks();
  return NextResponse.json(tasks);
}

export async function POST(request: NextRequest) {
  const tasks = readTasks();
  const newTask = (await request.json()) as Task;

  newTask.id = tasks.length + 1;
  tasks.push(newTask);
  writeTasks(tasks);

  return NextResponse.json(newTask, { status: 201 });
}
