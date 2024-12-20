import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { expect, test } from 'vitest';
import * as setup from '../src/setup.js';

test('setup', () => {
  const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'test-utils-'));

  setup.init(directory);
  setup.setupStrictPlugin(directory);
  setup.strictSum(directory);
  setup.strictStringSuffix(directory);
  setup.strictStringPrefix(directory);
  setup.strictPoint(directory);
  setup.strictMultiply(directory);

  expect(true).toBe(true);
});
