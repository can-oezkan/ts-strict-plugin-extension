import { spawn } from 'node:child_process';

export async function getInitialStrictIgnoreCommit(directory: string): Promise<string> {
  const log = await runGitCommand(['log', '--oneline'], { cwd: directory });
  const lines = log.split('\n');
  const commit = lines[lines.length - 1].split(' ')[0];
  return commit;
}

export async function runGitCommand(args: string[], options?: { cwd?: string }): Promise<string> {
  return new Promise((resolve, reject) => {
    const childProcess = spawn('git', args, { cwd: options?.cwd });

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
