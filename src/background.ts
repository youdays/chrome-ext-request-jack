import { createJsonDataSchemeUrl } from './lib/util';
import { getRules, initData } from './lib/localStorage';
import WebRequestBodyDetails = chrome.webRequest.WebRequestBodyDetails;
import BlockingResponse = chrome.webRequest.BlockingResponse;

initData();
const rules = getRules();
console.log(rules);

export function main(
  localStorageObj: Storage
): (details: WebRequestBodyDetails) => void | BlockingResponse {
  return (details: WebRequestBodyDetails): void | BlockingResponse => {
    if (details.url.includes('yahoo.co.jp')) {
      const dummyData = { a: 'bbb', c: 'ddd' };
      return {
        redirectUrl: createJsonDataSchemeUrl(dummyData)
      };
    }
    return {};
  };
}

chrome.webRequest.onBeforeRequest.addListener(
  main(localStorage),
  {
    urls: ['*://*/*'],
    types: ['main_frame', 'sub_frame', 'xmlhttprequest']
  },
  ['blocking']
);
