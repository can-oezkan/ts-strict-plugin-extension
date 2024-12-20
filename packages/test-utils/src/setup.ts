import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Initializes a git repository in the given directory and applies the initial patch `0001-init.patch`.
 * The initial patch configures a typescript workspace with 5 ts files that are not strict:
 * - sum.ts
 * - string_suffix.ts
 * - string_prefix.ts
 * - point.ts
 * - multiply.ts
 *
 * The commit author is set to `Contributor 0` and the email is set to `contributor0@example.com`.
 *
 * @param directory The directory to initialize the git repository in.
 */
export function init(directory: string) {
  fs.rmdirSync(directory);
  fs.mkdirSync(directory);

  execSync('git init', { cwd: directory });

  const patchFile = path.join(import.meta.dirname, '..', 'assets', 'patches', '0001-init.patch');

  execSync(`git am ${patchFile}`, { cwd: directory });
}

/**
 * Adds the strict plugin to the given directory and applies the patch `0002-init-ts-strict-plugin.patch`.
 *
 * The commit author is set to `Contributor 0` and the email is set to `contributor0@example.com`.
 *
 * @param directory The directory to add the strict plugin to.
 */
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

/**
 * Applies the patch `0003-strict-sum.ts.patch` to the given directory that makes the file `sum.ts` strict.
 * The commit author is set to `Contributor 1` and the email is set to `contributor1@example.com`
 *
 * @param directory The directory to apply the patch to.
 */
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

/**
 * Applies the patch `0004-strict-string_suffix.ts.patch` to the given directory that makes the file `string_suffix.ts` strict.
 *
 * The commit author is set to `Contributor 1` and the email is set to `contributor1@example.com`.
 *
 * @param directory The directory to apply the patch to.
 */
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

/**
 * Applies the patch `0005-strict-string_prefix.ts.patch` to the given directory that makes the file `string_prefix.ts` strict.
 *
 * The commit author is set to `Contributor 2` and the email is set to `contributor2@example.com`.
 *
 * @param directory The directory to apply the patch to.
 */
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

/**
 * Applies the patch `0006-strict-point.ts.patch` to the given directory that makes the file `point.ts` strict.
 *
 * The commit author is set to `Contributor 3` and the email is set to `contributor3@example.com`.
 *
 * @param directory The directory to apply the patch to.
 */
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

/**
 * Applies the patch `0007-strict-multiply.ts.patch` to the given directory that makes the file `multiply.ts` strict.
 *
 * The commit author is set to `Contributor 4` and the email is set to `contributor4@example.com`.
 *
 * @param directory The directory to apply the patch to.
 */
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
