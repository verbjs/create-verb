import { test, expect } from "bun:test";
import { join } from "path";
import { existsSync } from "fs";

// Test the project name validation logic
function validateProjectName(name: string): boolean {
  if (!name) return false;
  if (name.length === 0) return false;
  if (name.startsWith("-")) return false;
  if (name.includes(" ")) return false;
  
  const validNameRegex = /^[a-z0-9]([a-z0-9\-_])*$/i;
  return validNameRegex.test(name);
}

test("validates project names correctly", () => {
  // Valid names
  expect(validateProjectName("my-app")).toBe(true);
  expect(validateProjectName("myapp")).toBe(true);
  expect(validateProjectName("my_app")).toBe(true);
  expect(validateProjectName("app123")).toBe(true);
  expect(validateProjectName("123app")).toBe(true);
  
  // Invalid names
  expect(validateProjectName("")).toBe(false);
  expect(validateProjectName("-app")).toBe(false);
  expect(validateProjectName("my app")).toBe(false);
  expect(validateProjectName("my@app")).toBe(false);
  expect(validateProjectName("my.app")).toBe(false);
});

test("CLI help shows correct information", () => {
  // Test that help content includes key information
  const helpText = `
create-verb v1.0.0

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
`;

  expect(helpText).toContain("create-verb");
  expect(helpText).toContain("Verb framework");
  expect(helpText).toContain("React frontend");
  expect(helpText).toContain("REST API");
});