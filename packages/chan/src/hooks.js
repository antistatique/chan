const fs = require('fs');
const path = require('path');
const { spawnSync } = require('child_process');

const hooksDir = path.join('.', '.chan');

export function executeHook(hookName, args) {
  const hookPath = path.join(hooksDir, hookName);

  if (!fs.existsSync(hookPath)) {
    // hook does not exists, return early.
    return;
  }

  const result = spawnSync(hookPath, args, { stdio: 'inherit' });
  if (result.status !== 0) {
    console.error(`Hook '${hookName}' exited with status code ${result.status}`);
  }
}