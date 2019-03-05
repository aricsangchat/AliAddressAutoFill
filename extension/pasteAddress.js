chrome.storage.sync.get('address', function(result) {
    console.log(result.address);
    pasteAddress(result.address);
});

function pasteAddress(address) {
    document.getElementsByClassName("sa-contact-name")[0].value = address.name;
    //setCountry(address.country)
    $("input[name='address']").val(address.firstLine);
    $("input[name='address2']").val(address.secondLine);
    $("input[name='city']").val(address.city);
    $("input[name='province']").val(address.state);
    $("input[name='zip']").val(address.zip);

}

function setCountry(country) {
    $('.sa-country > option').each(function() {
        //console.log($(this).text() + ' ' + $(this).val());
        if ($(this).text().indexOf(country) >= 0) {
            $(".sa-country").val($(this).val());
        }
    });
}
 