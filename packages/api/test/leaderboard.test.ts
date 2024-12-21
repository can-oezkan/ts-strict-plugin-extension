import * as testUtils from '@ts-strict-plugin-extension/test-utils';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { describe, expect, test } from 'vitest';
import { getInitialStrictIgnoreCommit, runGitCommand } from '../src/git.js';
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
  test('returns leaderboard with configured initialCommit as correct initialCommit', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    testUtils.init(directory);
    testUtils.setupStrictPlugin(directory);
    testUtils.strictSum(directory);
    testUtils.strictStringSuffix(directory);
    testUtils.strictStringPrefix(directory);
    testUtils.strictPoint(directory);
    testUtils.strictMultiply(directory);

    const initialCommit = await getInitialStrictIgnoreCommit(directory);

    const leaderboard = await getLeaderboard(directory, {
      initialCommit: initialCommit,
    });

    expect(leaderboard).toStrictEqual([
      { name: 'Contributor 1', score: 2 },
      { name: 'Contributor 2', score: 1 },
      { name: 'Contributor 3', score: 1 },
      { name: 'Contributor 4', score: 1 },
    ]);
  });
  test('returns negative scores on leaderboard with configured initialCommit as first commit', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    testUtils.init(directory);
    testUtils.setupStrictPlugin(directory);
    testUtils.strictSum(directory);
    testUtils.strictStringSuffix(directory);
    testUtils.strictStringPrefix(directory);
    testUtils.strictPoint(directory);
    testUtils.strictMultiply(directory);

    const initialCommit = await runGitCommand(['log', '--reverse', '--format=%H'], {
      directory: directory,
    }).then((log) => log.split('\n')[0]);

    const leaderboard = await getLeaderboard(directory, {
      initialCommit: initialCommit,
    });

    expect(leaderboard).toStrictEqual([
      { name: 'Contributor 1', score: 2 },
      { name: 'Contributor 2', score: 1 },
      { name: 'Contributor 3', score: 1 },
      { name: 'Contributor 4', score: 1 },
      { name: 'Contributor 0', score: -5 },
    ]);
  });
  test('returns empty leaderboard with configured initialCommit as last commit', async () => {
    const directory = fs.mkdtempSync(path.join(os.tmpdir(), 'api-test-'));
    testUtils.init(directory);
    testUtils.setupStrictPlugin(directory);
    testUtils.strictSum(directory);
    testUtils.strictStringSuffix(directory);
    testUtils.strictStringPrefix(directory);
    testUtils.strictPoint(directory);
    testUtils.strictMultiply(directory);

    const initialCommit = await runGitCommand(['log', '-1', '--format=%H'], {
      directory: directory,
    }).then((log) => log.trim());

    const leaderboard = await getLeaderboard(directory, {
      initialCommit: initialCommit,
    });

    expect(leaderboard).toStrictEqual([]);
  });
});
