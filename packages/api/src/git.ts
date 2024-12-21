import { spawn } from 'node:child_process';

/**
 * Run a git command and return the output.
 * @param args The arguments to pass to the git command.
 * @param options The options to pass to the git command.
 * @returns The output of the git command.
 */
export async function runGitCommand(
  args: string[],
  options?: { directory?: string },
): Promise<string> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('git', args, { cwd: options?.directory });

    const stdoutBuffers: Buffer[] = [];
    const stderrBuffers: Buffer[] = [];

    childProcess.stdout.on('data', (data: Buffer) => {
      stdoutBuffers.push(data);
    });

    childProcess.stderr.on('data', (data: Buffer) => {
      stderrBuffers.push(data);
    });

    childProcess.on('close', (code) => {
      if (code === 0) {
        resolve(Buffer.concat(stdoutBuffers).toString());
      } else {
        reject(new Error(Buffer.concat(stderrBuffers).toString()));
      }
    });
  });
}

/**
 * Get the commit hash of the first commit that added a `// @ts-strict-ignore` comment.
 *
 * @param directory The directory of the git repository.
 * @returns The commit hash of the first commit that added a `// @ts-strict-ignore` comment.
 */
export async function getInitialStrictIgnoreCommit(directory: string): Promise<string> {
  const log = await runGitCommand(
    ['log', '--reverse', '--format=%H', '-S', '// @ts-strict-ignore'],
    {
      directory: directory,
    },
  );

  return log.split('\n')[0];
}
