#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface Task {
  id: number;
  title: string;
  status: "todo" | "in_progress" | "done";
}

const TASKS_FILE = path.join(__dirname, "../tasks.json");

async function readTasks(): Promise<Task[]> {
  try {
    const data = await fs.readFile(TASKS_FILE, "utf-8");
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

async function writeTasks(tasks: Task[]): Promise<void> {
  try {
    await fs.writeFile(TASKS_FILE, JSON.stringify(tasks, null, 2));
  } catch (error) {
    console.error(chalk.red("Error saving tasks:"), error);
    process.exit(1);
  }
}

async function addTask(): Promise<void> {
  const { title } = await inquirer.prompt([
    {
      type: "input",
      name: "title",
      message: "Enter the task title:",
      validate: (input: string) =>
        input.trim().length > 0 || "Title cannot be empty",
    },
  ]);

  const tasks = await readTasks();
  const newTask: Task = {
    id: tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1,
    title: title.trim(),
    status: "todo",
  };

  tasks.push(newTask);
  await writeTasks(tasks);

  console.log(chalk.green("Task added successfully!"));
}

const program = new Command();

program
  .version("1.0.0")
  .description("Doer - A simple task management CLI tool");

program.command("add").description("Add a new task").action(addTask);

program.parse(process.argv);
