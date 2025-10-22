// TODO: For some reason the manager.ts file isn't being picked up automatically.
module.exports = {
  managerEntries: (entry = []) => [...entry, require.resolve('./manager.ts')],
};
