#!/usr/bin/env node

import { existsSync } from "fs";
import { join } from "path";

const BOILERPLATE_REPO = "https://github.com/verbjs/boilerplate";
const VERSION = "1.0.0";

function showHelp() {
  console.log(`
create-verb v${VERSION}

Create a new Verb fullstack application with one command.

Usage:
  create-verb <project-name>
  create-verb my-app

Options:
  -h, --help     Show this help message
  -v, --version  Show version number

Examples:
  create-verb my-app
  create-verb fullstack-project
  bunx create-verb my-new-app
  npm create verb my-app

What you get:
  • Verb framework with Bun's native routing
  • React frontend with TypeScript
  • REST API with CRUD examples
  • Hot module reloading
  • Zero configuration setup
`);
}

function showVersion() {
  console.log(`create-verb v${VERSION}`);
}

async function createProject(projectName: string) {
  const targetDir = join(process.cwd(), projectName);

  // Check if directory already exists
  if (existsSync(targetDir)) {
    console.error(`❌ Directory "${projectName}" already exists`);
    console.error("   Choose a different name or remove the existing directory");
    process.exit(1);
  }

  console.log(`🚀 Creating Verb application "${projectName}"...\n`);

  try {
    // Clone the boilerplate repository
    console.log("📦 Downloading boilerplate...");
    const cloneResult = await Bun.$`git clone ${BOILERPLATE_REPO} ${targetDir}`.quiet();
    
    if (cloneResult.exitCode !== 0) {
      throw new Error("Failed to clone boilerplate repository");
    }

    // Remove .git directory to start fresh
    console.log("🧹 Cleaning up...");
    await Bun.$`rm -rf ${targetDir}/.git`.quiet();

    // Update package.json with project name
    const packageJsonPath = join(targetDir, "package.json");
    if (existsSync(packageJsonPath)) {
      const packageJson = await Bun.file(packageJsonPath).json();
      packageJson.name = projectName;
      await Bun.write(packageJsonPath, JSON.stringify(packageJson, null, 2));
    }

    // Install dependencies
    console.log("📚 Installing dependencies...");
    const installResult = await Bun.$`cd ${targetDir} && bun install`.quiet();
    
    if (installResult.exitCode !== 0) {
      throw new Error("Failed to install dependencies");
    }

    // Success message
    console.log(`
✅ Successfully created "${projectName}"!

Next steps:
  cd ${projectName}
  bun run dev

Your app will be running at:
  🌐 Frontend: http://localhost:3001
  🔧 API Demo: http://localhost:3001/api-demo

Commands:
  bun run dev    Start development server
  bun run build  Build for production
  bun run start  Start production server

Documentation:
  📖 README.md in your project
  🌟 GitHub: https://github.com/verbjs/verb

Happy coding! 🎉
`);

  } catch (error) {
    console.error(`❌ Failed to create project: ${error.message}`);
    
    // Clean up on failure
    if (existsSync(targetDir)) {
      console.log("🧹 Cleaning up...");
      await Bun.$`rm -rf ${targetDir}`.quiet();
    }
    
    process.exit(1);
  }
}

function validateProjectName(name: string): boolean {
  // Basic validation for project names
  if (!name) return false;
  if (name.length === 0) return false;
  if (name.startsWith("-")) return false;
  if (name.includes(" ")) return false;
  
  // Check for invalid characters (basic npm package name rules)
  const validNameRegex = /^[a-z0-9]([a-z0-9\-_])*$/i;
  return validNameRegex.test(name);
}

async function main() {
  const args = process.argv.slice(2);
  
  // Handle help and version flags
  if (args.includes("-h") || args.includes("--help")) {
    showHelp();
    process.exit(0);
  }
  
  if (args.includes("-v") || args.includes("--version")) {
    showVersion();
    process.exit(0);
  }
  
  // Check for project name
  const projectName = args[0];
  
  if (!projectName) {
    console.error("❌ Please provide a project name");
    console.error("\nUsage: create-verb <project-name>");
    console.error("Example: create-verb my-app");
    console.error("\nFor more help: create-verb --help");
    process.exit(1);
  }
  
  // Validate project name
  if (!validateProjectName(projectName)) {
    console.error(`❌ Invalid project name: "${projectName}"`);
    console.error("Project name must:");
    console.error("  • Start with a letter or number");
    console.error("  • Contain only letters, numbers, hyphens, and underscores");
    console.error("  • Not contain spaces");
    console.error("  • Not start with a hyphen");
    process.exit(1);
  }
  
  // Check if git is available
  try {
    await Bun.$`git --version`.quiet();
  } catch {
    console.error("❌ Git is required but not found");
    console.error("Please install Git: https://git-scm.com/");
    process.exit(1);
  }
  
  // Create the project
  await createProject(projectName);
}

// Run the CLI
main().catch((error) => {
  console.error("❌ Unexpected error:", error.message);
  process.exit(1);
});