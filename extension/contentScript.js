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
      //console.log($(this));
      let product = $(this)[0].childNodes[0].childNodes[1].childNodes[1].childNodes[0].innerText;
      let attrCount = $(this)[0].childNodes[0].childNodes[1].childNodes[1].childNodes[3].childElementCount;
      let productAttr = null;

      if (attrCount > 0) {
        productAttr = $(this)[0].childNodes[0].childNodes[1].childNodes[1].childNodes[3].childNodes[0].childNodes[0].childNodes[7].innerText;
      }

      console.log(product, productAttr);

      if (product.includes("7 Chakra, 12 Constellation")) {
        if (productAttr == "Full Color Bracelet") {
          $("<a href='https://www.aliexpress.com/item/AMIU-12-Constellation-Lucky-Natural-Stone-Simple-Bracelet-Beads-Adjustable-Bracelet-Hollywood-Crystal-Beaded-Bohemia-Bracelets/32870248948.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
        } else {
          $("<a href='https://www.aliexpress.com/item/AMIU-7-Colors-Lucky-Chakra-Natural-Stone-Simple-Bracelet-Beads-Adjustable-Bracelet-Natural-Crystal-Bohemia-Prayer/32882245473.html?spm=a2g0s.9042311.0.0.ac394c4drN8ZjI' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product.includes("108 Natural Sandalwood Prayer Beads Bracelet")) {
        $("<a href='https://www.aliexpress.com/item/pulseras-108-beads-8mm-Natural-Sandalwood-Buddhist-Buddha-Wood-Prayer-Bead-Mala-Unisex-Men-bracelets-bangles/32523747420.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product == "100% Pashmina Cashmere Scarf Shawl, Blue Pink Paisley Scarf Shawl, Festival Pashmina, Winter Scarf Shawl, New Women Men Scarf Shawl") {
        $("<a href='https://www.aliexpress.com/item/Women-s-Winter-Warm-Pashmina-Shawl-Wrap-Scarf-Vintage-Jacquard-Ethnic-Paisley-Cashew-Pattern-Scarf-Shawl/32823394003.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Rainbow Elephant Pattern")) {
        $("<a href='https://www.aliexpress.com/item/Hot-Ethnic-Style-Scarf-For-Lady-Women-Double-Sided-Elephant-National-Wind-Scarf-Wraps-Shawl-Bufandas/32895261681.html?spm=a2g0s.9042311.0.0.ac394c4drN8ZjI' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Chakra Bracelets, Reiki Bracelets, Yoga Bracelets")) {
        if (productAttr == "Black") {
          $("<a href='https://www.aliexpress.com/item/AMIU-3mm-Natural-Stone-Beads-Tibetan-Stone-Beads-Stretch-Bracelet-For-Men-Women-Yoga-Chakra-Crystal/32909151203.html?spm=a2g0s.8937460.0.0.1da22e0eWDpQLL' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == "Red") {
          $("<a href='https://www.aliexpress.com/item/Natural-Stone-Handmade-Strand-Bracelet-3mm-Red-Rope-Small-Onyx-Beads-Thin-Bracelets-For-Women-925/32870861604.html?spm=a2g0s.8937460.0.0.1da22e0eWDpQLL' target='_blank'>Order Now</a>").appendTo($(this));
        } else {
          $("<a href='https://www.aliexpress.com/item/Handmade-3mm-Natural-Lapis-lazuli-Stone-Red-Tiger-Eye-Beads-Bracelets-For-Men-Women-YOGA-Reiki/32872175234.html?spm=a2g0s.8937460.0.0.1da22e0eWDpQLL' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product.includes('Tibetan Buddhist Ball Prayer Bead Bracelet')) {
        $("<a href='https://www.aliexpress.com/store/product/AMIU-Tibetan-Buddhist-Ball-Prayer-Bead-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots/1675041_32850472242.html?spm=a2g1y.12024536.productList_2428021.subject_2' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Buddha Amulet Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Woven-Amulet-Tibetan-Cord-Bracelets-Bangles-For-Women-Men-Handmade-Rope-Buddha/32939715293.html?spm=a2g0s.8937460.0.0.72c02e0e99R7LZ' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Multi Color Braided Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Men-Handmade-Knots-Nylon-Thread-Red-Rope/32853244746.html?spm=2114.10010108.1000013.9.1c154c5f1cpDlA&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=350ffe2b-63c9-44ca-8182-423f85fb111b' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Black Coconut Shell Braided Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/Tibetan-buddhist-Braided-Cotton-thread-Lucky-Knots-Silver-Charm-bracelet-Natural-Coconut-shell-beads-Carved-OM/32894510488.html?spm=a2g0s.8937460.0.0.1d982e0eOBBnHY' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product == 'Tibetan Lucky Rope Knots Bracelet, Braided Bracelet, Yoga Bracelet, Meditation Bracelet, Prayer Bracelet, Mens Bracelet, Womens Bracelet') {
        if (productAttr == 'Black') {
          $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Handmade-Buddhist-Lucky-Bracelets-Bangles-For-Women-Men-Black-Rope-Knots-Amulet-Gift-Tibetan/32836615669.html?spm=a2g0s.8937460.0.0.46d92e0euFJBXc' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Blue') {
          $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Deongare-Rope-Christmas/32839043603.html?spm=a2g0s.8937460.0.0.46d92e0euFJBXc' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Green') {
          $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Green-Rope-Christmas/32834588878.html?spm=2114.10010108.1000013.15.189e231aRdEFIE&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=21c47b6f-5ed7-4226-aeb6-ab8b20a989fb' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Yellow') {
          $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Golden-Rope-Christmas/32837148680.html?spm=2114.10010108.1000013.19.3971527fzekXJh&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=2d2a8d89-4ff2-40fa-8ba4-407c5bfcfec8' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Brown') {
          $("<a href='https://www.aliexpress.com/item/Tibetan-Buddhist-Handmade-Lucky-Rope-Bracelet-Men-Tibetan-Buddhist-Knots-Size-Adjustable-Bracelet-For-Women/32868578644.html?spm=a2g0s.8937460.0.0.46d92e0euFJBXc' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product == 'Tibetan Lucky Rope Knots Braided Bracelet | Colorful Braided Bracelet | Yoga Bracelet Meditation Bracelet Bracelet for Women Gift for Her') {
        if (productAttr == 'Green') {
          $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Green-Rope-Amulet/32879660616.html?spm=a2g0s.8937460.0.0.5ac42e0ehk9CsL' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Yellow') {
          $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Tibetan-Lucky-Braided-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Green-Rope-Amulet/32957200339.html?spm=a2g0s.8937460.0.0.5a192e0ew98OMX' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product.includes('Rainbow Bracelet')) {
        if (product.includes('7 Chakra Om Tree of Life Reiki Bracelet')) {
          $("<a href='https://www.aliexpress.com/item/Handmade-Tibetan-Silver-Bracelet-Life-Tree-7-Chakra-Beads-Reiki-Buddha-Prayer-Natural-Stone-Yoga-Bracelet/32833028481.html?spm=a2g0s.8937460.0.0.53e62e0ewKIqkK' target='_blank'>Order Now</a>").appendTo($(this));
        } else {
          $("<a href='https://www.aliexpress.com/item/Tibetan-Buddhist-Handbraided-Knots-Lucky-Rope-Bracelet-Monks-Blessed-Handmade-Yoga-Meditation-Healing-Bangle-7-Chakra/32919203294.html?spm=a2g0s.8937460.0.0.6d4c2e0eKYDQu4' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product.includes('Meditating Astronaut Necklace')) {
        if (productAttr == 'Silver') {
          $("<a href='https://www.aliexpress.com/item/Astronaut-Pendant-Necklace-Galaxy-Universe-Spaceman-Meditation-Trinket-Retro-Stainless-Steel-Chain-Men-Necklace/32847446862.html?spm=a2g0s.8937460.0.0.34892e0eQSvGJu' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Black') {
          $("<a href='https://www.aliexpress.com/item/Black-Color-Astronaut-Necklace-Universe-Spaceman-Pendant-Stainless-Steel-Chain-Men-Rock-Party-Novelty-Space-Jewelry/32853858506.html?spm=a2g0s.8937460.0.0.34892e0eQSvGJu' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == 'Gold') {
          $("<a href='https://www.aliexpress.com/item/Gold-Color-Astronaut-Pendant-Necklace-Universe-Spaceman-Stainless-Steel-Chain-Necklace-for-Unisex-Couple-Outer-Space/32854959741.html?spm=2114.10010108.1000013.11.17dc155cjvwv1l&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=8678ad3d-c40a-489f-a1aa-2ef9e4c3439c' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product.includes('Chakra Meditation 7 Colors 3d Night Light Lamp')) {
        $("<a href='https://www.aliexpress.com/item/Acrylic-7-Color-Changing-3D-LED-nightlight-meditation-of-acrylic-bedroom-lamp-living-room-lights-Decoration/32755293418.html?spm=a2g0s.8937460.0.0.35392e0eMdpWvf' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Meditating Astronaut Key Chain')) {
        $("<a href='https://www.aliexpress.com/item/Astronaut-Keychain-Galaxy-Universe-Meditation-Spaceman-Key-Chains-Stainless-Steel-Rings-Chains-Personalised-Creative-Car-Keyring/32847580314.html?spm=a2g0s.8937460.0.0.3e2b2e0eOCNcGf' target='_blank'>Order Now</a>").appendTo($(this));
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