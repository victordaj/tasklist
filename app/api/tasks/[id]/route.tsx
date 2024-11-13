import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import { Task } from "@/types/tasks";

const tasksFilePath = path.join(process.cwd(), "data", "tasks.json");

const readTasks = () => JSON.parse(fs.readFileSync(tasksFilePath, "utf8"));
const writeTasks = (data: Task[]) =>
  fs.writeFileSync(tasksFilePath, JSON.stringify(data, null, 2));

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tasks: Task[] = readTasks();
  const task: Task | undefined = tasks.find(
    (task: Task) => task.id === params.id
  );
  return task
    ? NextResponse.json(task)
    : NextResponse.json({ error: "Task not found" }, { status: 404 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tasks: Task[] = readTasks();
  const taskIndex = tasks.findIndex((task: Task) => task.id === params.id);
  if (taskIndex === -1)
    return NextResponse.json({ error: "Task not found" }, { status: 404 });

  const updatedTask: Task = await request.json();
  tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
  writeTasks(tasks);
  return NextResponse.json(tasks[taskIndex]);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const tasks: Task[] = readTasks();
  const filteredTasks = tasks.filter((task: Task) => task.id !== params.id);
  writeTasks(filteredTasks);
  return NextResponse.json({ message: "Task deleted" });
}
