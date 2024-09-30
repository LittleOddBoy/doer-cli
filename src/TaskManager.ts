import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Task {
  id: number;
  title: string;
  status: "todo" | "in_progress" | "done";
}

export class TaskManager {
  private tasksFile: string;

  constructor() {
    this.tasksFile = path.join(__dirname, "../tasks.json");
  }

  async readTasks(): Promise<Task[]> {
    try {
      const data = await fs.readFile(this.tasksFile, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      return [];
    }
  }

  async writeTasks(tasks: Task[]): Promise<void> {
    try {
      await fs.writeFile(this.tasksFile, JSON.stringify(tasks, null, 2));
    } catch (error) {
      throw new Error("Error saving tasks");
    }
  }

  async addTask(title: string): Promise<void> {
    const tasks = await this.readTasks();
    const newTask: Task = {
      id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
      title: title.trim(),
      status: "todo",
    };
    tasks.push(newTask);
    await this.writeTasks(tasks);
  }

  async deleteTask(id: number): Promise<void> {
    const tasks = await this.readTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    await this.writeTasks(tasks);
  }

  async listTasks(): Promise<Task[]> {
    return this.readTasks();
  }
}
