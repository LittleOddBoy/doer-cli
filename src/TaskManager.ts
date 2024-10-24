import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface Task {
  id: string;
  title: string;
  status: "todo" | "pending" | "done";
  createdAt: Date;
  updatedAt: Date;
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
      id: crypto.randomUUID(),
      title: title.trim(),
      status: "todo",
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(newTask);
    await this.writeTasks(tasks);
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.readTasks();
    const index = tasks.findIndex((task) => task.id == id);
    if (index === -1) {
      throw new Error("Task not found");
    }
    tasks.splice(index, 1);
    await this.writeTasks(tasks);
  }

  async listTasks(): Promise<Task[]> {
    return this.readTasks();
  }

  async listAllTasks(): Promise<Task[]> {
    return this.readTasks();
  }

  async listTasksByStatus(status: Task["status"]): Promise<Task[]> {
    const tasks = await this.readTasks();
    return tasks.filter((task) => task.status === status);
  }

  async updateTaskStatus(id: string): Promise<Task> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);
    if (taskIndex === -1) {
      throw new Error("Task not found");
    }

    const statusOrder: Task["status"][] = ["todo", "pending", "done"];
    const currentStatusIndex = statusOrder.indexOf(tasks[taskIndex].status);
    const newStatusIndex = (currentStatusIndex + 1) % statusOrder.length;
    tasks[taskIndex].status = statusOrder[newStatusIndex];
    tasks[taskIndex].updatedAt = new Date();

    await this.writeTasks(tasks);
    return tasks[taskIndex];
  }

  public async updateTaskTitle(id: string, newTitle: string): Promise<Task> {
    const tasks = await this.readTasks();
    const taskIndex = tasks.findIndex((task) => task.id === id);

    if (taskIndex === -1) {
      throw new Error(`Task with id ${id} not found`);
    }

    tasks[taskIndex].title = newTitle;
    tasks[taskIndex].updatedAt = new Date();
    await this.writeTasks(tasks);
    return tasks[taskIndex];
  }
}
