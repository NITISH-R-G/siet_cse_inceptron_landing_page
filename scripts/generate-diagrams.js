/* eslint-disable @typescript-eslint/no-require-imports, @typescript-eslint/no-unused-vars */
const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');
const madge = require('madge');

async function generateDiagrams() {
  console.log('Starting diagram generation...');
  const rootDir = path.resolve(__dirname, '..');
  const docsDir = path.join(rootDir, 'docs', 'architecture');

  await fs.ensureDir(docsDir);

  try {
    // 1. Generate dependency-cruiser interactive SVG
    // Requires dependency-cruiser and graphviz (dot) installed in CI environment
    // We'll configure this to output interactive SVG with links to files
    console.log('Generating Dependency Graph using dependency-cruiser...');
    execSync(`npx depcruise app components --include-only "^(app|components)" --output-type dot | dot -T svg > ${path.join(docsDir, 'dependency-graph.svg')}`, {
      cwd: rootDir,
      stdio: 'inherit',
      // The pipe to `dot` might fail locally if graphviz is not installed,
      // but we will catch it. In CI, graphviz should be installed.
    });
    console.log('Dependency graph generated.');
  } catch (err) {
    console.warn('Warning: dependency-cruiser failed (possibly missing graphviz/dot). Run `sudo apt-get install graphviz` in CI.');
  }

  try {
    // 2. Generate component/module relationships with madge (image)
    // Madge also needs graphviz for image output, but we can generate JSON or DOT as a fallback.
    console.log('Generating Madge component relationships...');
    const res = await madge(['app', 'components'], {
      includeOnly: '\\.(ts|tsx|js|jsx)$',
      excludeRegExp: ['^\\.', '^node_modules']
    });

    // Create dot file
    const dotOutput = await res.dot();
    await fs.writeFile(path.join(docsDir, 'madge-graph.dot'), dotOutput);

    try {
      await res.image(path.join(docsDir, 'madge-graph.svg'));
      console.log('Madge graph generated.');
    } catch(imgErr) {
      console.warn('Warning: Madge image output failed (possibly missing graphviz). DOT file generated instead.');
    }
  } catch (err) {
    console.error('Error generating Madge diagrams:', err);
  }

  console.log(`Diagram generation complete. Check ${docsDir}`);
}

generateDiagrams().catch(console.error);
