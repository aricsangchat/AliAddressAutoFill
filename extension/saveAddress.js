

function getAddress() {
    let address = {
        name: document.getElementsByClassName("name").length >= 1 ? document.getElementsByClassName("name")[0].innerHTML : '',
        firstLine: document.getElementsByClassName("first-line").length >= 1 ? document.getElementsByClassName("first-line")[0].innerHTML : '',
        secondLine: document.getElementsByClassName("second-line").length >= 1 ? document.getElementsByClassName("second-line")[0].innerHTML : '',
        city: document.getElementsByClassName("city").length >= 1 ? document.getElementsByClassName("city")[0].innerHTML : '',
        state: document.getElementsByClassName("state").length >= 1 ? document.getElementsByClassName("state")[0].innerHTML : document.getElementsByClassName("country-name")[0].innerHTML,
        zip: document.getElementsByClassName("zip").length >= 1 ? document.getElementsByClassName("zip")[0].innerHTML : '',
        country: document.getElementsByClassName("country-name").length >= 1 ? document.getElementsByClassName("country-name")[0].innerHTML : ''
    };

    chrome.storage.sync.set({address}, function() {
        //console.log('Value is set to ' + address);
    });
}

getAddress();
