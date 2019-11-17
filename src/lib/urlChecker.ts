import * as Url from 'url';
import PathParser from 'path-parser';

export declare interface ParseResult {
  match: boolean;
  parameter: object;
}
const unMatchedResult: ParseResult = { match: false, parameter: {} };
export function pathParse(path: string, pattern: string): ParseResult {
  const parsedPath = PathParser.createPath(pattern);
  const parameter = parsedPath.test(path);
  if (parameter === null) {
    return unMatchedResult;
  }

  return {
    match: true,
    parameter: parameter
  };
}

export function isTargetHost(host: string | null, pattern: string): boolean {
  if (host === null) {
    return false;
  }
  return host.includes(pattern);
}

export function check(
  url: string,
  hostPattern: string,
  pathPattern: string
): ParseResult {
  const parsedUrl = Url.parse(url);
  if (parsedUrl.path === null) {
    return unMatchedResult;
  }

  if (!isTargetHost(parsedUrl.host, hostPattern)) {
    return unMatchedResult;
  }

  return pathParse(parsedUrl.path, pathPattern);
}
