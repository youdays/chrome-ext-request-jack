/* eslint-disable @typescript-eslint/no-use-before-define */

export interface Rule {
  host: string;
  path: string;
  type: string;
  outputType: string;
  data: object;
}

export class RuleStorage {
  static readonly RULES_KEYNAME = 'rules';
  constructor(private localStorage: Storage) {}

  getRules(): Rule[] | [] {
    let rules: Rule[] | [] = [];
    const item = this.localStorage.getItem(RuleStorage.RULES_KEYNAME);
    if (item === null) {
      return rules;
    }
    try {
      rules = JSON.parse(item);
    } catch (e) {
      // do nothing
    } finally {
      // do nothing
    }
    return rules;
  }

  setRules(rules: Rule[] | []): void {
    this.localStorage.setItem(RuleStorage.RULES_KEYNAME, JSON.stringify(rules));
  }

  addRule(rule: Rule): void {
    const currentRules = this.getRules();
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    currentRules.push(rule);
    this.setRules(currentRules);
  }
  clearRules(): void {
    this.setRules([]);
  }
}
