import fs from 'fs';
import os from 'os';
import path from 'path';
import { expect, test } from 'vitest';
import { runGitCommand } from '../src/git.js';

test('runGitCommand', async () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));

  await runGitCommand(['init'], { cwd: directory });
  const output = await runGitCommand(['branch', '--show-current'], { cwd: directory });

  expect(output).toEqual('main\n');
});
