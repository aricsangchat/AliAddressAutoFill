let saveAddress = document.getElementById('saveAddress');
let pasteAddress = document.getElementById('pasteAddress');
let pasteMessage = document.getElementById('pasteMessage');

let savedAddress = null;

chrome.storage.sync.get('address', function(result) {
  savedAddress = result.address;
  //console.log(result.address);
  if (savedAddress != null) {
    injectAddressInPopup(savedAddress);
  }
});

saveAddress.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'saveAddress.js'
      }
    );
  });
};

pasteAddress.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'pasteAddress.js'
      }
    );
  });
};

pasteMessage.onclick = function(element) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.executeScript(
      tabs[0].id,
      {
        file: 'pasteMessage.js'
      }
    );
  });
};


function injectAddressInPopup(addressObject) {
  for (var key in addressObject) {
    if (addressObject.hasOwnProperty(key)) {
      //console.log(key + " -> " + addressObject[key]);
      var btn = document.createElement("P");
      var t = document.createTextNode(addressObject[key]);
      btn.appendChild(t);
      document.getElementById(key).appendChild(btn);
    }
  }
}

  