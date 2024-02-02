import { readFileSync } from 'node:fs';

export function loadScript(path: string) {
  const script = readFileSync(path).toString();
  const self = { ds: null };
  eval(`${script};self.ds=ds`);
  return self.ds;
}
