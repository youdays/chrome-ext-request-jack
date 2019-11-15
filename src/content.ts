const links: HTMLCollectionOf<HTMLAnchorElement> = document.getElementsByTagName(
  'a'
);

// popup.jsからメッセージを受け取って、ページ内で取得したデータを送り返す
chrome.runtime.onMessage.addListener(() => {
  chrome.runtime.sendMessage({
    // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
    // @ts-ignore
    urlList: [...links].map((a: HTMLAnchorElement) => a.href)
  });
});
