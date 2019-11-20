/* eslint-disable @typescript-eslint/no-explicit-any */
import { RuleStorage, Rule } from './localStorage';

class MockLocalStorage {
  constructor(public data: { [key: string]: string }) {}
  getItem(key: string): string | null {
    return this.data[key] || null;
  }
  setItem(key: string, value: string): void {
    this.data[key] = value;
  }
}
describe('RuleStorage', () => {
  const tmpRule: Rule = {
    host: 'hoge.com',
    path: '/bar',
    type: 'staticJson',
    outputType: 'json',
    data: { key1: 'val1', key2: 'val2' }
  };

  describe('getRules', () => {
    it('値がセットされていなけらば空の配列が返ってくる', () => {
      const ls: any = new MockLocalStorage({});
      const ruleStorage = new RuleStorage(ls);

      expect(ruleStorage.getRules()).toEqual([]);
    });
  });

  it('正常な値がセットされていれば、値が入った配列が返ってくる', () => {
    const ls: any = new MockLocalStorage({
      rules: JSON.stringify([tmpRule])
    });
    const ruleStorage = new RuleStorage(ls);

    expect(ruleStorage.getRules()).toEqual([tmpRule]);
  });

  it('デタラメな値がセットされていれば、空の配列が返ってくる', () => {
    const ls: any = new MockLocalStorage({
      rules: 'not_json_string'
    });
    const ruleStorage = new RuleStorage(ls);
    expect(ruleStorage.getRules()).toEqual([]);
  });

  describe('setRules', () => {
    it('設定が保存されるべき', () => {
      const ls: any = new MockLocalStorage({});
      const ruleStorage = new RuleStorage(ls);

      ruleStorage.setRules([tmpRule]);
      expect(ls.getItem('rules')).toEqual(JSON.stringify([tmpRule]));
    });
  });

  describe('addRule', () => {
    it('設定が追加保存されるべき', () => {
      const ls: any = new MockLocalStorage({});
      const ruleStorage = new RuleStorage(ls);

      ruleStorage.addRule(tmpRule);
      ruleStorage.addRule(tmpRule);

      expect(ls.getItem('rules')).toEqual(JSON.stringify([tmpRule, tmpRule]));
    });
  });
});
