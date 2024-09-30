#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { TaskManager } from "./TaskManager.js";

const taskManager = new TaskManager();

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

  try {
    await taskManager.addTask(title);
    console.log(chalk.green("Task added successfully!"));
  } catch (error) {
    console.error(chalk.red("Error adding task:"), error);
  }
}

async function deleteTask(): Promise<void> {
  const tasks = await taskManager.listTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No tasks to delete."));
    return;
  }

  const { taskId } = await inquirer.prompt([
    {
      type: "list",
      name: "taskId",
      message: "Select a task to delete:",
      choices: tasks.map((task) => ({
        name: `${task.id}: ${task.title}`,
        value: task.id,
      })),
    },
  ]);

  try {
    await taskManager.deleteTask(taskId);
    console.log(chalk.green("Task deleted successfully!"));
  } catch (error) {
    console.error(chalk.red("Error deleting task:"), error);
  }
}

const program = new Command();

program
  .version("1.0.0")
  .description("Doer - A simple task management CLI tool");

program.command("add").description("Add a new task").action(addTask);

program.command("delete").description("Delete a task").action(deleteTask);

program.parse(process.argv);
