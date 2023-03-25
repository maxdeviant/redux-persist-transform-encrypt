export default {
  files: ['src/**/*.test.ts'],
  extensions: { ts: 'module' },
  nodeArguments: ['--loader=ts-node/esm'],
};
