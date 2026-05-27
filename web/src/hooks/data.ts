export interface Skill {
  id: string;
  name: string;
  description: string;
  category: string;
  url: string;
  tags: string[];
  date: string;
}

export const sampleSkills: Skill[] = [
  {
    id: '1',
    name: 'bun-quickstart',
    description: 'Complete guide to install and use Bun, the fast all-in-one JavaScript runtime.',
    category: 'Runtime',
    url: 'https://bun.sh/docs/quickstart',
    tags: ['bun', 'runtime', 'javascript'],
    date: '2025-05-20',
  },
  {
    id: '2',
    name: 'git-basics',
    description: 'Essential Git commands for version control: init, commit, push, pull, branch, merge.',
    category: 'DevOps',
    url: 'https://git-scm.com/book/en/v2',
    tags: ['git', 'version-control', 'cli'],
    date: '2025-05-18',
  },
  {
    id: '3',
    name: 'react-hooks',
    description: 'Master useState, useEffect, useCallback, useMemo, and custom hooks patterns.',
    category: 'Frontend',
    url: 'https://react.dev/reference/react',
    tags: ['react', 'hooks', 'frontend'],
    date: '2025-05-15',
  },
  {
    id: '4',
    name: 'typescript-generics',
    description: 'Deep dive into TypeScript generics — from basics to advanced patterns.',
    category: 'Language',
    url: 'https://www.typescriptlang.org/docs/handbook/2/generics.html',
    tags: ['typescript', 'generics', 'types'],
    date: '2025-05-12',
  },
  {
    id: '5',
    name: 'docker-containers',
    description: 'Build, run, and orchestrate Docker containers. Dockerfiles, docker-compose, and networks.',
    category: 'DevOps',
    url: 'https://docs.docker.com/get-started/',
    tags: ['docker', 'containers', 'devops'],
    date: '2025-05-10',
  },
  {
    id: '6',
    name: 'elysia-endpoints',
    description: 'Build fast REST APIs with Elysia.js — routing, schemas, middleware, and plugins.',
    category: 'Backend',
    url: 'https://elysiajs.com/',
    tags: ['elysia', 'api', 'bun', 'backend'],
    date: '2025-05-08',
  },
  {
    id: '7',
    name: 'mysql-queries',
    description: 'Master SQL queries: SELECT, JOIN, GROUP BY, subqueries, and performance tips.',
    category: 'Database',
    url: 'https://dev.mysql.com/doc/refman/8.0/en/select.html',
    tags: ['mysql', 'sql', 'database'],
    date: '2025-05-05',
  },
  {
    id: '8',
    name: 'vite-config',
    description: 'Configure Vite for React, Vue, Svelte or vanilla JS. Plugins, aliases, and optimization.',
    category: 'Frontend',
    url: 'https://vite.dev/config/',
    tags: ['vite', 'build-tool', 'frontend'],
    date: '2025-05-03',
  },
  {
    id: '9',
    name: 'gitignore-generator',
    description: 'Quick reference for .gitignore patterns for Node, Python, Rust, Go, and more.',
    category: 'DevOps',
    url: 'https://git-scm.com/docs/gitignore',
    tags: ['git', 'gitignore', 'devops'],
    date: '2025-04-28',
  },
  {
    id: '10',
    name: 'pnpm-commands',
    description: 'Fast, disk-space efficient package manager. Commands, workspace setup, and npm comparison.',
    category: 'Package Managers',
    url: 'https://pnpm.io/',
    tags: ['pnpm', 'npm', 'package-manager'],
    date: '2025-04-25',
  },
  {
    id: '11',
    name: 'openai-api-chat',
    description: 'Send chat completions with OpenAI API. Models, tokens, streaming, and error handling.',
    category: 'AI',
    url: 'https://platform.openai.com/docs/api-reference/',
    tags: ['openai', 'ai', 'api', 'gpt'],
    date: '2025-04-22',
  },
  {
    id: '12',
    name: 'insforge-sdk',
    description: 'Database CRUD, auth, storage, backend functions, and Stripe integrations with InsForge SDK.',
    category: 'Backend',
    url: 'https://docs.insforge.com',
    tags: ['insforge', 'backend', 'database'],
    date: '2025-04-18',
  },
];

export const categories = [
  'All',
  'Frontend',
  'Backend',
  'DevOps',
  'Database',
  'Language',
  'Runtime',
  'Package Managers',
  'AI',
];
