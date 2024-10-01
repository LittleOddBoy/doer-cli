# Doer - Command Line Task Manager

Doer is a simple, yet powerful command-line task manager built with Node.js and TypeScript. It allows you to manage your tasks efficiently right from your terminal.

## Features

- Add new tasks
- List all tasks
- Update task titles
- Mark tasks as completed (or toggle status)
- Delete tasks
- Filter tasks by status
- Search tasks

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/doer.git
cd doer
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm run build
```

4. If you want to, you can add it to your path (recommended):

```bash
npm install -g
```

and use `doer` instead of `npm start` in all over the instructions in [Usage](#usage)

## Usage

Run the application using:

```
npm start -- [command]
```

Replace `[command]` with one of the following:

- `add`: Add a new task
- `list`: List all tasks
- `update`: Update a task's title
- `mark`: Mark tasks as completed or change their status
- `delete`: Delete a task
- `filter`: Filter tasks by status
- `search`: Search for tasks

### Examples

1. Add a new task:

   ```
   npm start -- add
   ```

2. List all tasks:

   ```
   npm start -- list
   ```

3. Update a task:

   ```
   npm start -- update
   ```

4. Mark tasks:

   ```
   npm start -- mark
   ```

5. Delete a task:

   ```
   npm start -- delete
   ```

6. Filter tasks:

   ```
   npm start -- filter
   ```

7. Search tasks:
   ```
   npm start -- search
   ```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
There's nothing very special about this project, just note that this project is in plain TypeScript (wired word nah?) and I even appreciate pull requests that changes the whole way to implement things, so feel free to whatever you want ="). There's also some issues (I hope) in the issues section, so you can start there!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
