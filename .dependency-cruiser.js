/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [],
  options: {
    doNotFollow: {
      path: 'node_modules',
      dependencyTypes: [
        'npm',
        'npm-dev',
        'npm-optional',
        'npm-peer',
        'npm-bundled',
        'npm-no-pkg',
      ],
    },
    includeOnly: '^(app|components|lib|src|pages)',
    tsPreCompilationDeps: true,
    tsConfig: {
      fileName: 'tsconfig.json',
    },
    reporterOptions: {
      dot: {
        collapsePattern: 'node_modules/[^/]+',
        theme: {
          graph: {
            // Interactive aspects: URL links back to the source file
            splines: 'ortho',
            rankdir: 'TB',
            bgcolor: 'transparent',
          },
          node: {
            shape: 'box',
            style: 'rounded, filled',
            fillcolor: '#ffffff',
            color: '#000000',
            fontname: 'Helvetica',
            fontsize: 10,
          },
          edge: {
            color: '#777777',
            arrowhead: 'normal',
            fontname: 'Helvetica',
            fontsize: 8,
          },
        },
      },
    },
  },
};
