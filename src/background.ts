import { createJsonDataSchemeUrl } from './lib/util';
import { getRules, initData } from './lib/localStrage';

initData();
const rules = getRules();
console.log(rules);
chrome.webRequest.onBeforeRequest.addListener(
  detail => {
    if (detail.url.includes('yahoo.co.jp')) {
      const dummyData = { a: 'b', c: 'd' };
      return {
        redirectUrl: createJsonDataSchemeUrl(dummyData)
      };
    }
  },
  {
    urls: ['*://*/*'],
    types: ['main_frame', 'sub_frame', 'xmlhttprequest']
  },
  ['blocking']
);
