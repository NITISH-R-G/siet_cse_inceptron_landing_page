/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs-extra');
const path = require('path');
const OpenAI = require('openai');

async function runDocAgent() {
  console.log('Running AI Documentation Agent...');

  if (!process.env.OPENAI_API_KEY) {
    console.warn('OPENAI_API_KEY is not set. Skipping AI documentation generation.');
    return;
  }

  const openai = new OpenAI();
  const rootDir = path.resolve(__dirname, '..');

  // Load repository context from analyzer
  const contextPath = path.join(rootDir, '.repo-metadata', 'repo-context.json');
  let contextData = {};
  if (await fs.pathExists(contextPath)) {
    contextData = await fs.readJson(contextPath);
  }

  // Current README
  const readmePath = path.join(rootDir, 'README.md');
  let currentReadme = '';
  if (await fs.pathExists(readmePath)) {
    currentReadme = await fs.readFile(readmePath, 'utf-8');
  }

  const prompt = `
You are an expert AI Documentation Agent and Technical Writer maintaining a self-updating repository.
Your task is to generate an updated README.md based on the repository context below.

Repository Context:
${JSON.stringify(contextData, null, 2)}

Requirements for the README:
- Project overview
- Key features
- Technology stack (from frameworks and libraries)
- System architecture
- Repository structure
- Setup instructions (npm install, npm run dev)
- Deployment instructions
- API documentation (if any)
- Environment variables (if any)
- Contribution guide
- Architecture diagrams (include these markdown links if they exist: ![Dependency Graph](./docs/architecture/dependency-graph.svg) and ![Component Graph](./docs/architecture/madge-graph.svg))
- Dependency maps
- Status badges (CI/CD etc.)
- Changelog summaries (link to CHANGELOG.md)

Current README content for reference:
${currentReadme}

Generate the full markdown for the updated README.md. Only output markdown, nothing else.
  `;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o', // or whichever appropriate model
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.2,
    });

    let newReadme = response.choices[0].message.content;

    // Remove markdown code blocks if the response wrapped the entire output
    if (newReadme.startsWith('\`\`\`markdown')) {
      newReadme = newReadme.replace(/^\`\`\`markdown\n/, '').replace(/\n\`\`\`$/, '');
    }

    await fs.writeFile(readmePath, newReadme);
    console.log('README.md updated successfully via AI.');
  } catch (error) {
    console.error('Error running AI Doc Agent:', error);
  }
}

runDocAgent().catch(console.error);
