#!/usr/bin/env node

import { Command } from "commander";
import inquirer from "inquirer";
import chalk from "chalk";
import { TaskManager, Task } from "./TaskManager.js";
import { formatTaskStatus } from "./utils.js";
import Table from "cli-table3";

import CheckboxPlusPrompt from "inquirer-checkbox-plus-prompt";
inquirer.registerPrompt("checkbox-plus", CheckboxPlusPrompt as any);

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

async function listTasks(options: { status?: Task["status"] }): Promise<void> {
  try {
    let tasks: Task[];
    if (options.status) {
      tasks = await taskManager.listTasksByStatus(options.status);
    } else {
      tasks = await taskManager.listAllTasks();
    }

    if (tasks.length === 0) {
      console.log(chalk.yellow("No tasks found."));
      return;
    }

    const table = new Table({
      head: ["ID", "Status", "Title", "Created at", "Updated At"],
      colWidths: [7, 10, 30, 15, 15],
    });

    tasks.forEach((task) => {
      table.push([
        chalk.redBright(task.id),
        formatTaskStatus(task.status),
        task.title,
        chalk.green(
          new Date(task.createdAt.toString()).toLocaleDateString("en-us")
        ),
        chalk.bgGreenBright(
          new Date(task.updatedAt.toString()).toLocaleDateString("en-us")
        ),
      ]);
    });
    console.log(table.toString());
  } catch (error) {
    console.error(chalk.red("Error listing tasks:"), error);
  }
}

async function markTasks(): Promise<void> {
  const tasks = await taskManager.listAllTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No tasks available to mark."));
    return;
  }

  let currentIndex = 0;
  let exit = false;

  while (!exit) {
    const choices = tasks.map((task, index) => ({
      name: `${task.id}: ${task.title} (${formatTaskStatus(task.status)})${
        index === currentIndex ? " <" : ""
      }`,
      value: index,
      short: `Task ${task.id}`,
    }));

    choices.push({ name: "Exit", value: choices.length, short: "Exit" });

    const { action } = await inquirer.prompt([
      {
        type: "list",
        name: "action",
        message:
          "Select a task to mark (use arrow keys, press Enter to toggle status, or select Exit):",
        choices: choices,
        default: currentIndex,
      },
    ]);
    if (action == choices.length - 1) {
      exit = true;
    } else {
      currentIndex = action;
      const task = tasks[currentIndex];
      const updatedTask = await taskManager.updateTaskStatus(task.id);
      tasks[currentIndex] = updatedTask;
      console.log(
        chalk.green(
          `Task ${updatedTask.id} marked as ${formatTaskStatus(
            updatedTask.status
          )}`
        )
      );
    }
  }

  console.log(chalk.green("Task marking completed."));
}

async function updateTaskTitle(): Promise<void> {
  const tasks = await taskManager.listAllTasks();
  if (tasks.length === 0) {
    console.log(chalk.yellow("No tasks available to update."));
    return;
  }

  const { taskId } = await inquirer.prompt([
    {
      type: "list",
      name: "taskId",
      message: "Select a task to update:",
      choices: tasks.map((task) => ({
        name: `${task.id}: ${task.title} (${formatTaskStatus(task.status)})`,
        value: task.id,
      })),
    },
  ]);

  const { newTitle } = await inquirer.prompt([
    {
      type: "input",
      name: "newTitle",
      message: "Enter the new title for the task:",
      validate: (input: string) =>
        input.trim().length > 0 || "Title cannot be empty",
    },
  ]);

  try {
    const updatedTask = await taskManager.updateTaskTitle(
      taskId,
      newTitle.trim()
    );
    console.log(
      chalk.green(`Task updated successfully. New title: ${updatedTask.title}`)
    );
  } catch (error) {
    console.error(chalk.red("Error updating task:"), error);
  }
}

const program = new Command();

program
  .version("1.0.1")
  .description("Doer - A simple task management CLI tool");

program.command("add").description("Add a new task").action(addTask);

program.command("delete").description("Delete a task").action(deleteTask);

program
  .command("list")
  .description("List all tasks")
  .option(
    "-s, --status <status>",
    "Filter tasks by status (todo, pending, done)"
  )
  .action(async (options) => {
    if (
      options.status &&
      !["todo", "pending", "done"].includes(options.status)
    ) {
      console.error(chalk.red("Invalid status. Use todo, pending, or done."));
      return;
    }
    await listTasks(options);
  });

program
  .command("mark")
  .description("Mark tasks (toggle status)")
  .action(markTasks);

program.command("update").description("Update a task").action(updateTaskTitle);
program.parse(process.argv);
