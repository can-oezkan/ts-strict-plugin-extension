import * as testUtils from '@ts-strict-plugin-extension/test-utils';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, test } from 'vitest';
import { getLeaderboard } from '../src/leaderboard.js';

describe('getLeaderboard', async () => {
  test('returns empty array', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    testUtils.init(directory);
    testUtils.setupStrictPlugin(directory);

    const leaderboard = await getLeaderboard(directory);

    expect(leaderboard).toHaveLength(0);
  });
  test('returns leaderboard after one strict fix', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    testUtils.init(directory);
    testUtils.setupStrictPlugin(directory);
    testUtils.strictSum(directory);

    const leaderboard = await getLeaderboard(directory);

    expect(leaderboard).toStrictEqual([{ name: 'Contributor 1', score: 1 }]);
  });
  test('returns leaderboard after all strict fixes', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    testUtils.init(directory);
    testUtils.setupStrictPlugin(directory);
    testUtils.strictSum(directory);
    testUtils.strictStringSuffix(directory);
    testUtils.strictStringPrefix(directory);
    testUtils.strictPoint(directory);
    testUtils.strictMultiply(directory);

    const leaderboard = await getLeaderboard(directory);

    expect(leaderboard).toStrictEqual([
      { name: 'Contributor 1', score: 2 },
      { name: 'Contributor 2', score: 1 },
      { name: 'Contributor 3', score: 1 },
      { name: 'Contributor 4', score: 1 },
    ]);
  });
});
