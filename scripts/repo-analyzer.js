/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs-extra');
const path = require('path');
const { glob } = require('glob');

async function analyzeRepo() {
  console.log('Starting repository analysis...');
  const rootDir = path.resolve(__dirname, '..');

  const context = {
    repository: {},
    frameworks: [],
    libraries: [],
    structure: [],
    envVariables: [],
    architecture: {
      services: [],
      apis: [],
      databases: []
    }
  };

  // 1. Analyze package.json
  const pkgPath = path.join(rootDir, 'package.json');
  if (await fs.pathExists(pkgPath)) {
    const pkg = await fs.readJson(pkgPath);
    context.repository.name = pkg.name;
    context.repository.version = pkg.version;
    context.repository.scripts = pkg.scripts;

    const allDeps = { ...pkg.dependencies, ...pkg.devDependencies };
    context.libraries = Object.keys(allDeps);

    if (allDeps.next) context.frameworks.push('Next.js');
    if (allDeps.react) context.frameworks.push('React');
    if (allDeps.tailwindcss) context.frameworks.push('Tailwind CSS');
    if (allDeps.typescript) context.frameworks.push('TypeScript');
  }

  // 2. Analyze Structure
  const ignorePatterns = ['node_modules/**', '.git/**', 'dist/**', '.next/**', 'coverage/**'];
  const files = await glob('**/*', {
    cwd: rootDir,
    ignore: ignorePatterns,
    nodir: true
  });

  context.structure = files;

  // 3. Environment Variables (.env files)
  const envFiles = await glob('.env*', { cwd: rootDir });
  for (const file of envFiles) {
    const content = await fs.readFile(path.join(rootDir, file), 'utf-8');
    const matches = content.match(/^[A-Z0-9_]+=/gm);
    if (matches) {
      matches.forEach(match => {
        const key = match.replace('=', '');
        if (!context.envVariables.includes(key)) {
          context.envVariables.push(key);
        }
      });
    }
  }

  // Generate output
  const outDir = path.join(rootDir, '.repo-metadata');
  await fs.ensureDir(outDir);
  await fs.writeJson(path.join(outDir, 'repo-context.json'), context, { spaces: 2 });

  console.log(`Analysis complete. Context saved to ${outDir}/repo-context.json`);
}

analyzeRepo().catch(console.error);
