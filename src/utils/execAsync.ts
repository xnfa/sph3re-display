import { exec } from 'child_process';

export async function execAsync(command: string) {
  return await new Promise((resolve, reject) => {
    exec(`"${command}"`, (err, stdout, stderr) => {
      if (err) {
        console.log(stdout || stderr);
        return reject(err);
      }
      resolve(stdout || stderr);
    });
  });
}
