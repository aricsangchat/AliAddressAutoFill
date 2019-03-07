// function callNodeServer(action) {
//   var request = new XMLHttpRequest();
//   request.open('POST', 'http://localhost:3000/action', true);
//   request.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
//   request.send(JSON.stringify({action: action}));
// }
let saveAddress;

var $newdiv1 = $( "<div class='autoFillContainer' style='position: fixed;top: 0;right: 0;'><div id='address'><p id='name'></p><p id='firstLine'></p><p id='secondLine'></p><p id='city'></p><p id='state'></p><p id='zip'></p><p id='country'></p></div><button id='pasteAddress'>Paste Address</button><button id='pasteMessage'>Paste Drop Ship Message</button></div>" );

setButtons();

if (window.location.host == "shoppingcart.aliexpress.com") {
  $( $newdiv1 ).appendTo("body");

  chrome.storage.sync.get('address', function(result) {
    //console.log(result.address);
    injectAddressInPopup(result.address);
    let pasteAddressBtn = document.getElementById('pasteAddress');
    let pasteMessage = document.getElementById('pasteMessage');

    pasteAddressBtn.onclick = function(element) {
      pasteAddress(result.address);
    };

    pasteMessage.onclick = function(element) {
      $(".message-text").val("Hi this is a drop shipping order. Please no invoice, no receipt, no billing info and no coupons. Thank you!");
    };
  });
}

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
      console.log('Value is set to ' + address);
  });
}

function pasteAddress(address) {
  document.getElementsByClassName("sa-contact-name")[0].value = address.name;
  //setCountry(address.country)
  $("input[name='address']").val(address.firstLine);
  $("input[name='address2']").val(address.secondLine);
  $("input[name='city']").val(address.city);
  $("input[name='province']").val(address.state);
  $("input[name='zip']").val(address.zip);

}

function generateProductLink() {
  $('#order-detail-container > div.pt-xs-2.pb-xs-4 > div > div > div > table > tbody > tr').each(function( index ) {
    if (index > 0) {
      let product = $(this)[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].innerText;
      console.log(product);
      if (product == "7 Chakra, 12 Constellation, Zodiac, Natural Agate Stone, Rainbow, 2019, Yoga, Meditation, For Men, For Women, Bead Bracelet") {
        $("<a href='https://www.aliexpress.com/item/AMIU-12-Constellation-Lucky-Natural-Stone-Simple-Bracelet-Beads-Adjustable-Bracelet-Hollywood-Crystal-Beaded-Bohemia-Bracelets/32870248948.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product == "108 Natural Sandalwood Prayer Beads Bracelet, Wooden Mala Bracelet, Tibetan Prayer Beads Buddhist Meditation Bracelet, Tibet Buddha Bracelet") {
        $("<a href='https://www.aliexpress.com/item/pulseras-108-beads-8mm-Natural-Sandalwood-Buddhist-Buddha-Wood-Prayer-Bead-Mala-Unisex-Men-bracelets-bangles/32523747420.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product == "100% Pashmina Cashmere Scarf Shawl, Blue Pink Paisley Scarf Shawl, Festival Pashmina, Winter Scarf Shawl, New Women Men Scarf Shawl") {
        $("<a href='https://www.aliexpress.com/item/Women-s-Winter-Warm-Pashmina-Shawl-Wrap-Scarf-Vintage-Jacquard-Ethnic-Paisley-Cashew-Pattern-Scarf-Shawl/32823394003.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
      }
    }
  });
}

function setButtons() {
  setTimeout(function(){ 
    $( ".panel-body-row" ).each(function( index ) {
      // console.log(this);
    
      $(this).click(function() {
        //console.log("click");
        setTimeout(function(){
          updateStatusClick();
          generateProductLink();
          $( "<button id='saveAddress'>Save Address</button>" ).appendTo("div.address");
          saveAddress = document.getElementById('saveAddress');
          saveAddress.onclick = function(element) {
            getAddress();
          };
        }, 1000);
      });
    });
  }, 5000);
}

function updateStatusClick() {
  $('#order-detail-container > div.col-group.mt-xs-4.mb-xs-2 > div:nth-child(2) > div > div.col-md-4.pr-md-0 > div > div > div > div > ul > li:nth-child(2) > span').click(function() {
    setButtons();
  });
}