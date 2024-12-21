#!/usr/bin/env node

import { getLeaderboard } from '@ts-strict-plugin-extension/api';

export interface PrintLeaderboardOptions {
  output: 'json' | 'formatted';
}

/**
 * Prints the leaderboard to the console.
 * @param options Options for printing the leaderboard.
 */
export function printLeaderboard(options?: PrintLeaderboardOptions) {
  switch (options?.output) {
    case 'json':
      printLeaderboardJSON();
      break;
    case 'formatted':
      printLeaderboardFormatted();
      break;
    default:
      printLeaderboardFormatted();
  }
}

async function printLeaderboardFormatted() {
  const leaderboard = await getLeaderboard(process.cwd());

  console.log('TypeScript Strict Leaderboard:');
  for (const entry of leaderboard) {
    console.log(`${entry.name}: ${entry.score}`);
  }
}

async function printLeaderboardJSON() {
  console.log(await getLeaderboard(process.cwd()));
}
