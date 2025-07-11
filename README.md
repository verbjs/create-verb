# create-verb

> Create Verb fullstack applications with one command

[![npm version](https://badge.fury.io/js/create-verb.svg)](https://www.npmjs.com/package/create-verb)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Quick Start

```bash
# npm
npm create verb my-app

# bun
bunx create-verb my-app

# yarn
yarn create verb my-app

# pnpm
pnpm create verb my-app
```

Then:

```bash
cd my-app
bun run dev
```

Visit http://localhost:3001 🚀

## What You Get

- **Verb Framework** - High-performance multi-protocol server
- **Bun Native Routes** - HTML imports with automatic bundling
- **React + TypeScript** - Modern frontend with full type safety
- **REST API** - Complete CRUD examples (users, products)
- **Hot Module Reloading** - Instant feedback during development
- **Zero Configuration** - Everything works out of the box

## Usage

```bash
create-verb <project-name>
```

### Options

```bash
-h, --help     Show help message
-v, --version  Show version number
```

### Examples

```bash
# Create a new project
create-verb my-fullstack-app

# Navigate and start development
cd my-fullstack-app
bun run dev
```

## Requirements

- **Bun v1.0.0+** - [Install Bun](https://bun.sh)
- **Git** - For downloading the boilerplate

## What Happens When You Run It

1. **Downloads** the latest boilerplate from [verbjs/boilerplate](https://github.com/verbjs/boilerplate)
2. **Installs** dependencies with `bun install`
3. **Customizes** package.json with your project name
4. **Cleans up** git history for a fresh start

## Project Structure

The generated project includes:

```
my-app/
├── src/
│   ├── main.ts              # Server with withRoutes pattern
│   ├── frontend/            # React components
│   │   ├── index.html       # Main page
│   │   ├── index.tsx        # User management app
│   │   ├── api.html         # API explorer
│   │   └── api.tsx          # Interactive docs
│   └── types.d.ts           # TypeScript declarations
├── package.json
├── tsconfig.json
├── biome.json
└── README.md                # Getting started tutorial
```

## Available Scripts

In your generated project:

| Command | Description |
|---------|-------------|
| `bun run dev` | Start development server with HMR |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun test` | Run tests |
| `bun run lint` | Lint with Biome |
| `bun run format` | Format with Biome |

## Features Included

### Frontend
- React 18+ with TypeScript
- Automatic bundling (no webpack/vite needed)
- CSS bundling and hot reloading
- Interactive user management interface
- API explorer and documentation

### Backend
- Verb framework with Bun's native routing
- REST API with CRUD operations
- Parameter extraction and validation
- Error handling patterns
- Health check endpoints

### Development
- Hot Module Reloading (HMR)
- TypeScript support out of the box
- Zero configuration required
- Enhanced console logging
- Route display on startup

## Example: Using the Generated App

After running `create-verb my-app`:

```bash
cd my-app
bun run dev
```

Visit:
- **http://localhost:3001** - Main React app
- **http://localhost:3001/api-demo** - Interactive API explorer

Test the API:
```bash
# List users
curl http://localhost:3001/api/users

# Create a user
curl -X POST http://localhost:3001/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

## Troubleshooting

### "Command not found: create-verb"

Make sure you're using the correct command for your package manager:

```bash
# ✅ Correct
npm create verb my-app
bunx create-verb my-app

# ❌ Incorrect  
npm install -g create-verb
```

### "Directory already exists"

Choose a different project name or remove the existing directory:

```bash
rm -rf my-app
create-verb my-app
```

### "Git is required but not found"

Install Git from [git-scm.com](https://git-scm.com/)

## Development

To work on create-verb itself:

```bash
git clone https://github.com/verbjs/create-verb
cd create-verb
bun install

# Test locally
bun run dev my-test-app

# Run tests
bun test

# Build for publishing
bun run build
```

## Related Projects

- **[Verb Framework](https://github.com/verbjs/verb)** - The framework itself
- **[Verb Boilerplate](https://github.com/verbjs/boilerplate)** - The template this tool uses
- **[Bun](https://bun.sh)** - The runtime that powers everything

## License

MIT - see [LICENSE](LICENSE) file for details.

---

**Happy coding!** 🎉

For more help, visit the [Verb documentation](https://github.com/verbjs/verb) or [open an issue](https://github.com/verbjs/create-verb/issues).