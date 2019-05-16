

function getAddress() {
    let address = {
        name: document.getElementsByClassName("name").length >= 1 ? document.getElementsByClassName("name")[0].innerHTML.toUpperCase() : '',
        firstLine: document.getElementsByClassName("first-line").length >= 1 ? document.getElementsByClassName("first-line")[0].innerHTML.toUpperCase() : '',
        secondLine: document.getElementsByClassName("second-line").length >= 1 ? document.getElementsByClassName("second-line")[0].innerHTML.toUpperCase() : '',
        city: document.getElementsByClassName("city").length >= 1 ? document.getElementsByClassName("city")[0].innerHTML.toUpperCase() : '',
        state: document.getElementsByClassName("state").length >= 1 ? document.getElementsByClassName("state")[0].innerHTML.toUpperCase() : document.getElementsByClassName("country-name")[0].innerHTML.toUpperCase(),
        zip: document.getElementsByClassName("zip").length >= 1 ? document.getElementsByClassName("zip")[0].innerHTML.toUpperCase() : '',
        country: document.getElementsByClassName("country-name").length >= 1 ? document.getElementsByClassName("country-name")[0].innerHTML.toUpperCase() : ''
    };

    chrome.storage.sync.set({address}, function() {
        console.log('Value is set to ' + address);
    });
}

getAddress();
