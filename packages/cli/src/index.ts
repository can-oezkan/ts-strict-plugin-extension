import { getLeaderboard } from '@ts-strict-plugin-extension/api';

export interface PrintLeaderboardOptions {
  output: 'json' | 'formatted';
}

/**
 * Prints the leaderboard to the console.
 * @param options Options for printing the leaderboard.
 */
export async function printLeaderboard(options?: PrintLeaderboardOptions) {
  switch (options?.output) {
    case 'json':
      await printLeaderboardJSON();
      break;
    case 'formatted':
      await printLeaderboardFormatted();
      break;
    default:
      await printLeaderboardFormatted();
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
