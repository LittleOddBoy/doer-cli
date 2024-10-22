# Doer - Command Line Task Manager

Doer is a simple, yet powerful command-line task manager built with Node.js and TypeScript. It allows you to manage your tasks efficiently right from your terminal. This project is one of the projects related to [Node.js roadmap on the roadmap.sh](https://roadmap.sh/nodejs). All the information related to the project can be found in [the official project page on roadmap.sh](https://roadmap.sh/projects/task-tracker). If you liked my project, I'd be happy if you give me a star and [upvote me here](https://roadmap.sh/projects/task-tracker/solutions?u=6572c5645145316d25d3c0ae).

## Why do this project uses external libs?

I read the rules. Nevertheless, I saw nothing against me to break the rules, and also, I believe all the developers are here to build cool stuff. It doesn't mean that projects with simpler command-line-user-interface are boring, they're cool, too! It's just me decided to be different. Any project out there that didn't use external libs and kept things simple, is appreciated the same.

## Features

- Add new tasks
- List all tasks even by their status
- Update task titles
- Mark tasks as completed (or toggle status)
- Delete tasks

## Installation

1. Clone the repository:

```bash
git clone https://github.com/LittleOddBoy/doer-cli.git
cd doer-cli
```

2. Install dependencies:

```bash
npm install
```

3. Build the project:

```bash
npm start
```

4. If you want to, you can add it to your path (recommended):

```bash
npm install -g
```

and use `doer` instead of `npm start` in all over the instructions in [Usage](#usage)

## Usage

Run the application using:

```bash
npm start [command]
```

Replace `[command]` with one of the following:

- `add`: Add a new task
- `list`: List all tasks
- `update`: Update a task's title
- `mark`: Mark tasks as completed or change their status
- `delete`: Delete a task

### Examples

1. Add a new task:

```bash
   doer add
```

2. List all tasks:

```bash
   doer list
```

and if you want to filter the list of tasks so you can see tasks filtered by their status, use:

```bash
npm start list --status todo
# or
npm start list --status pending
# or
npm start list --status done
```

3. Update a task:

```bash
npm start update
```

4. Mark tasks:

```bash
npm start mark
```

5. Delete a task:

```bash
npm start delete
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
There's nothing very special about this project, just note that this project is in plain TypeScript (wired word nah?) and I even appreciate pull requests that changes the whole way to implement things, so feel free to whatever you want. There's also some issues (I hope) in the issues section, so you can start there!

## License

Doer-cli is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
