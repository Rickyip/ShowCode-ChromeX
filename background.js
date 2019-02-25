// chrome.browserAction.onClicked.addListener(function () {
//     chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
// });

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "first",
      contexts: ["all"],
      onclick: function() {
        alert('first');
      }
})