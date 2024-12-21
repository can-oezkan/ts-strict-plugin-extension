import { getInitialStrictIgnoreCommit, runGitCommand } from './git.js';

export type TSStrictLeaderboard = { name: string; score: number }[];

export async function getLeaderboard(directory: string): Promise<TSStrictLeaderboard> {
  const initialCommit = await getInitialStrictIgnoreCommit(directory);
  const log = await runGitCommand(
    ['log', `${initialCommit}..`, '-p', '-S', '// @ts-strict-ignore', '--diff-filter=ACDMRT'],
    { directory: directory },
  );

  const scores: Record<string, number> = {};
  let currentCommitter: string | undefined = undefined;
  let inRelevantSection = false;

  log
    .trim()
    .split('\n')
    .forEach((line) => {
      if (line.startsWith('Author:')) {
        // Extract the committer's name
        const match = line.match(/Author:\s(.+)\s<.+>/);
        currentCommitter = match ? match[1] : undefined;
        if (currentCommitter && !(currentCommitter in scores)) {
          scores[currentCommitter] = 0;
        }
      } else if (line.startsWith('@@')) {
        // Check if we're in the first few lines of the file
        inRelevantSection = isTopOfFile(line);
      } else if (currentCommitter && inRelevantSection) {
        // Check for additions or removals in relevant sections
        if (line.startsWith('+') && line.includes('// @ts-strict-ignore')) {
          scores[currentCommitter]! -= 1;
        } else if (line.startsWith('-') && line.includes('// @ts-strict-ignore')) {
          scores[currentCommitter]! += 1;
        }
      }
    });

  return Object.entries(scores)
    .map(([name, score]) => ({ name, score }))
    .toSorted((a, b) => b.score - a.score || new Intl.Collator().compare(a.name, b.name));
}

/**
 * Determines if the given diff section corresponds to the first few lines of a file.
 * This checks Git diff headers for line numbers starting with 1 (e.g., @@ -1,3 +1,4 @@).
 * @param header - The diff header line.
 * @returns True if the section is at the top of the file, false otherwise.
 */
function isTopOfFile(header: string): boolean {
  const diffHeaderRegex = /@@ -1,\d+ \+1,\d+ @@/;
  return diffHeaderRegex.test(header);
}
