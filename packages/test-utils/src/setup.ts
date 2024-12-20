import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

export function init(directory: string) {
  fs.rmdirSync(directory);
  fs.mkdirSync(directory);

  execSync('git init', { cwd: directory });

  const patchFile = path.join(import.meta.dirname, '..', 'assets', 'patches', '0001-init.patch');

  execSync(`git am ${patchFile}`, { cwd: directory });
}

export function setupStrictPlugin(directory: string) {
  const patchFile = path.join(
    import.meta.dirname,
    '..',
    'assets',
    'patches',
    '0002-init-ts-strict-plugin.patch',
  );
  execSync(`git am ${patchFile}`, { cwd: directory });
}

export function strictSum(directory: string) {
  const patchFile = path.join(
    import.meta.dirname,
    '..',
    'assets',
    'patches',
    '0003-strict-sum.ts.patch',
  );
  execSync(`git am ${patchFile}`, { cwd: directory });
}

export function strictStringSuffix(directory: string) {
  const patchFile = path.join(
    import.meta.dirname,
    '..',
    'assets',
    'patches',
    '0004-strict-string_suffix.ts.patch',
  );
  execSync(`git am ${patchFile}`, { cwd: directory });
}

export function strictStringPrefix(directory: string) {
  const patchFile = path.join(
    import.meta.dirname,
    '..',
    'assets',
    'patches',
    '0005-strict-string_prefix.ts.patch',
  );
  execSync(`git am ${patchFile}`, { cwd: directory });
}

export function strictPoint(directory: string) {
  const patchFile = path.join(
    import.meta.dirname,
    '..',
    'assets',
    'patches',
    '0006-strict-point.ts.patch',
  );
  execSync(`git am ${patchFile}`, { cwd: directory });
}

export function strictMultiply(directory: string) {
  const patchFile = path.join(
    import.meta.dirname,
    '..',
    'assets',
    'patches',
    '0007-strict-multiply.ts.patch',
  );
  execSync(`git am ${patchFile}`, { cwd: directory });
}
