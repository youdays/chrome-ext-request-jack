/* eslint-disable @typescript-eslint/no-use-before-define */

const rulesKeyName = 'rules';

interface Rule {
  path: string;
  type: string;
  data: object;
}

function read(key: string): string | null {
  return localStorage.getItem(key);
}
function write(key: string, val: string): void {
  localStorage.setItem(key, val);
}

export function initData(): void {
  const tmpYahooRule: Rule = {
    type: 'static-json',
    path: 'yahoo.co.jp',
    data: {
      key1: 'val1',
      key2: 'val2'
    }
  };
  setRules([tmpYahooRule]);
}
export function getRules(): Rule[] | [] {
  let rules: Rule[] | [] = [];
  const item = read(rulesKeyName);
  if (item === null) {
    return rules;
  }
  try {
    rules = JSON.parse(item);
  } finally {
    // do nothing
  }
  return rules;
}

export function setRules(rules: Rule[] | []): void {
  write(rulesKeyName, JSON.stringify(rules));
}

export function addRule(rule: Rule): void {
  const currentRules = getRules();
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  currentRules.push(rule);
  setRules(currentRules);
}
