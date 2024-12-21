import * as testUtils from '@ts-strict-plugin-extension/test-utils';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { expect, test } from 'vitest';
import { getInitialStrictIgnoreCommit, runGitCommand } from '../src/git.js';

test('runGitCommand', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));

  await runGitCommand(['init'], { directory: directory });
  const output = await runGitCommand(['branch', '--show-current'], { directory: directory });

  expect(output).toEqual('main\n');
});

test('getInitialStrictIgnoreCommit', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
  testUtils.init(directory);
  testUtils.setupStrictPlugin(directory);
  testUtils.strictSum(directory);
  testUtils.strictStringSuffix(directory);

  const commit = await getInitialStrictIgnoreCommit(directory);

  const commitMessage = await runGitCommand(['show', '-s', '--format=%s', commit], {
    directory: directory,
  });
  expect(commitMessage).toBe('init ts strict plugin\n');
});
