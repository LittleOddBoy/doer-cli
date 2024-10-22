import chalk from "chalk";
import { Task } from "./TaskManager";

export function formatTaskStatus(status: Task["status"]): string {
  switch (status) {
    case "todo":
      return chalk.yellow("To Do");
    case "in_progress":
      return chalk.blue("In Progress");
    case "done":
      return chalk.green("Done");
  }
}
