// chrome.browserAction.onClicked.addListener(function () {
//     chrome.tabs.create({ url: chrome.runtime.getURL("index.html") });
// });

chrome.contextMenus.removeAll();
chrome.contextMenus.create({
      title: "Show Code",
      contexts: ["all"],
      onclick: function() {
        alert('Show Code');
      }
});


// chrome.runtime.onMessage.addListener (
//   function (request, sender, sendResponse) {
//     console.log("Reached Background.js");
//     console.log(request);
//     // chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     //     chrome.tabs.sendMessage(tabs[0].id, {fileData: response}, function(response) {
//     //         console.log(response);
//     //     });
//     // });
//   }
// );

// chrome.tabs.query({active: true, currentWindow: true}, function([tab]) {
//     tab && chrome.tabs.sendMessage(tab.id, {message: 'message'}, function(response) {
//         console.log(response);
//     });
// });