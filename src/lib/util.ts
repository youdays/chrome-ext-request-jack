export function createJsonDataSchemeUrl(jsonData: object): string {
  return `data:application/json;charset=utf8;,${JSON.stringify(jsonData)}`;
}
