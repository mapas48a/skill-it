# bun-runtime

## Overview
This skill provides a comprehensive guide to using Bun’s JavaScript/TypeScript runtime. It covers installation, script execution, the built‑in REPL, testing, bundling, development server, and the native APIs that make Bun faster than traditional runtimes. Use this skill whenever you need to run, test, or bundle code with Bun, or when you want to integrate Bun’s runtime features into an automated workflow.

## Quick Start
1. **Install Bun** (macOS/Linux, Windows via WSL):
   ```bash
   curl -fsSL https://bun.sh/install | bash
   # Add to PATH if the installer didn't
   export PATH="$HOME/.bun/bin:$PATH"
   ```
2. **Verify installation**:
   ```bash
   bun --version
   # Example output: 1.1.13
   ```
3. **Run a simple script**:
   ```bash
   echo 'console.log("Hello from Bun!");' > hello.js
   bun run hello.js
   ```
4. **Run TypeScript without a build step**:
   ```bash
   echo 'export const greet = (name: string) => `Hi ${name}`;' > greet.ts
   bun run greet.ts
   ```
5. **Start the REPL**:
   ```bash
   bun repl
   # > console.log("Bun REPL")
   ```
6. **Create and run tests**:
   ```bash
   mkdir tests && cat > tests/example.test.ts <<'EOF'
   import { expect } from "bun:test";

   test("addition works", () => {
     expect(1 + 1).toBe(2);
   });
   EOF

   bun test
   ```
7. **Bundle for production**:
   ```bash
   bun build ./src/index.ts --outfile ./dist/app.js --minify
   ```

## Core Concepts
| Concept | Description |
|---------|-------------|
| **Bun Runtime** | A fast JavaScript/TypeScript runtime that implements the Web API, Node APIs, and a custom set of utilities (`Bun.*`). |
| **Zero‑Config TypeScript** | Bun transpiles TypeScript on‑the‑fly; no `tsconfig.json` required unless you need custom compiler options. |
| **Native APIs** | `Bun.file`, `Bun.read`, `Bun.write`, `Bun.fetch`, `Bun.spawn`, etc., provide high‑performance alternatives to Node’s equivalents. |
| **Module Resolution** | Supports ES modules (`import … from "./foo.js"`), CommonJS (`require`), and automatically resolves `.js`, `.cjs`, `.mjs`, `.ts`, `.tsx`. |
| **Bundler (`bun build`)** | A built‑in, highly optimized bundler that produces a single executable JavaScript file. |
| **Development Server (`bun dev`)** | Watches files, hot‑reloads, and serves HTTP routes directly from source. |
| **Testing (`bun test`)** | Integrated test runner with a Jest‑compatible API (`test`, `expect`, `describe`). |
| **Package Manager (`bun install`, `bun add`)** | Fast dependency installer that stores modules in a global cache; not part of the runtime docs but often used together. |

## Commands / API
### Runtime Execution
| Command | Synopsis | Example |
|--------|----------|---------|
| `bun run <file>` | Execute a JavaScript/TypeScript file. | `bun run server.ts` |
| `bun repl` | Launch an interactive REPL with full Bun APIs. | `bun repl` |
| `bun test [<pattern>]` | Run test files matching the pattern (defaults to `**/*.test.{js,ts}`). | `bun test tests/**/*.test.ts` |
| `bun build <entry> [options]` | Bundle source into a single file. | `bun build src/main.ts --outfile dist/app.js --minify` |
| `bun dev <entry>` | Start a hot‑reloading development server. | `bun dev src/server.ts` |
| `bun install` | Install dependencies defined in `package.json`. | `bun install` |
| `bun add <pkg>` | Add a package to `package.json` and install it. | `bun add lodash` |

### Native APIs (selected)
```ts
// Read a file as a string (sync)
const source = Bun.file("./src/index.ts").text();

// Fetch with built‑in fetch (compatible with browser fetch)
const res = await Bun.fetch("https://api.example.com/data");

// Spawn a subprocess (fast)
const proc = Bun.spawn(["ls", "-la"], { cwd: "/tmp" });
proc.stdout.pipe(process.stdout);
await proc.exited;
```

## Configuration
| Config File | Purpose | Typical Content |
|-------------|---------|-----------------|
| `bunfig.toml` | Bundler & dev‑server options. | ```toml<br># bunfig.toml<br>target = "node"<br>entry = "src/index.ts"<br>outdir = "dist"<br>``` |
| `.env` | Environment variables for runtime (available via `process.env`). | `PORT=3000` |
| `package.json` | Declares dependencies, scripts, and optional `"bun"` field for custom commands. | ```json<br>{ "name": "my-app", "scripts": { "start": "bun run src/index.ts" } }<br>``` |
| `tsconfig.json` *(optional)* | Custom TypeScript compiler options if you need non‑default behavior. | ```json<br>{ "compilerOptions": { "strict": true, "target": "ES2022" } }<br>``` |

### Runtime Flags
| Flag | Effect |
|------|--------|
| `--watch` | Re-run the script on file changes (works with `bun run`). |
| `--quiet` | Suppress Bun’s startup banner. |
| `--no-emit` | When bundling, generate metadata only (useful for analysis). |
| `--define <key>=<value>` | Replace compile‑time constants (similar to `DefinePlugin`). |

## Common Patterns
1. **Simple HTTP server**  
   ```ts
   // src/server.ts
   import { serve } from "bun";

   serve({
     port: Number(process.env.PORT ?? 3000),
     fetch(req) {
       return new Response("Hello from Bun!", { status: 200 });
     },
   });
   ```
   ```bash
   bun run src/server.ts   # start server
   ```

2. **CLI tool with native file APIs**  
   ```ts
   // src/cli.ts
   const args = process.argv.slice(2);
   if (args.length === 0) {
     console.error("Usage: bun run src/cli.ts <file>");
     process.exit(1);
   }

   const file = Bun.file(args[0]);
   if (!file.exists()) {
     console.error("File not found");
     process.exit(2);
   }

   console.log(await file.text());
   ```
   ```bash
   bun run src/cli.ts README.md
   ```

3. **Hot‑reloading development server**  
   ```bash
   bun dev src/server.ts   # watches .ts/.js files and restarts automatically
   ```

4. **Full‑stack build** (bundle front‑end and back‑end):
   ```bash
   bun build src/client.ts --outfile dist/client.js --minify
   bun build src/server.ts --outfile dist/server.js
   ```

5. **Testing with snapshots**  
   ```ts
   // tests/snapshot.test.ts
   import { expect, test } from "bun:test";

   test("snapshot", () => {
     const html = `<div>Hello</div>`;
     expect(html).toMatchSnapshot();
   });
   ```
   ```bash
   bun test
   ```

## Edge Cases / Pitfalls
| Issue | Description | Mitigation |
|-------|-------------|------------|
| **Windows support** | Full runtime works only under WSL or Linux/macOS; native Windows binaries have limited API coverage. | Use WSL2 or a Linux container for production builds. |
| **Node compatibility** | Some Node APIs (e.g., `fs.promises.opendir`, certain `crypto` functions) are not yet implemented. | Prefer Bun’s native equivalents (`Bun.file`, `Bun.crypto`) or fallback to polyfills. |
| **Dynamic `require`** | `require` works only for CommonJS modules; dynamic expressions are not supported. | Use static `import` statements where possible, or pre‑bundle with `bun build`. |
| **Package resolution** | Bun prefers the “exports” field; packages that rely on legacy `main` can fail. | Pin to the latest package versions or add an explicit `"exports"` map in a temporary shim. |
| **Environment variables** | Changes to `.env` are not auto‑reloaded when using `bun run`. | Restart the process or use `--watch` flag during development. |
| **Large monorepos** | Bundling many entry points can exhaust memory; `bun build` currently lacks incremental builds. | Split the monorepo into smaller packages or use separate `bun build` invocations per entry. |
| **Experimental APIs** | Features like `Bun.spawnSync` or `Bun.process` may change semantics between releases. | Lock the Bun version in `package.json` (`"engines": { "bun": "1.x" }`) and test after upgrades. |
| **CJS vs ESM interop** | Importing a CommonJS module from an ES module may expose a default export that wraps the entire module. | Access the `.default` property (`import pkg from "cjs-mod"`; `pkg.default.someFn()`). |

---