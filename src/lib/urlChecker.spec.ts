import { check, isTargetHost, pathParse, ParseResult } from './urlChecker';

describe('parseChecker', (): void => {
  describe('parse', () => {
    it('パラメータなしを正常に判定できるべき', (): void => {
      const actual: ParseResult = pathParse('/path1/path2', '/path1/path2');
      const expected: ParseResult = {
        match: true,
        parameter: {}
      };
      expect(actual).toEqual(expected);
    });

    it('パラメータ付きも正常に判定できるべき', () => {
      const actual: ParseResult = pathParse('/user/123', '/user/:userId');
      const expected: ParseResult = {
        match: true,
        parameter: {
          userId: '123'
        }
      };
      expect(actual).toEqual(expected);
    });
    it('マッチしないものを判定できるべき', () => {
      const actual: ParseResult = pathParse('/aaa/bbb', '/foo/bar');
      const expected: ParseResult = {
        match: false,
        parameter: {}
      };
      expect(actual).toEqual(expected);
    });
  });

  describe('isTargetHost', () => {
    it('hostに含まれる文字は正常と判断されるべき', () => {
      expect(isTargetHost('yahoo.co.jp', 'yahoo.co.jp')).toBeTruthy();
      expect(isTargetHost('yahoo.co.jp', '.co.jp')).toBeTruthy();
      expect(isTargetHost('yahoo.co.jp:8000', 'yahoo.co.jp')).toBeTruthy();
    });
    it('nullの場合は異常と判断されるべき', () => {
      expect(isTargetHost(null, '')).toBeFalsy();
    });
  });

  describe('check', () => {
    const unmatchedResult: ParseResult = {
      match: false,
      parameter: {}
    };
    it('正常なURLなので判定できるべき', () => {
      const checkResult = check(
        'http://hoge.com/user/123',
        'hoge.com',
        '/user/:userId'
      );
      const expected: ParseResult = {
        match: true,
        parameter: {
          userId: '123'
        }
      };

      expect(checkResult).toEqual(expected);
    });
  });
});
