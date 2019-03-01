function onActivationClick(checkbox) {
  // Reference:
  // https://stackoverflow.com/questions/40645538/communicate-data-from-popup-to-content-script-injected-by-popup-with-executescri/40666096




//   chrome.extension.sendMessage({message: 'Hi'}, function(){});

  // browser.runtime.onMessage.addListener((message, sender, sendResponse) => {
  //   console.log('CLICKED');
  // });
  // console.log("onchange");
  // chrome.tabs.query({currentWindow: true, active: true}, function (tabs){
  //   chrome.tabs.sendMessage(tabs[0].id, {"message": "g"}, function (response){
  //     console.log(response);
  //   });
  // });
  // var port = chrome.runtime.connect();
  // port.postMessage("123");
  // console.log("Clicked");
  // chrome.runtime.sendMessage({"message": "g"});
}
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // chrome.tabs.sendMessage(tabs[0].id, {"message": "g"});
    var port = chrome.tabs.connect(tabs[0].id, {"message": "message"});
    port.postMessage({url: tabs[0].url});
  });