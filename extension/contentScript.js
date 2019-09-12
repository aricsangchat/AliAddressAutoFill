let saveAddress;

var $newdiv1 = $( "<style>#address p {margin: 0;}</style><div class='autoFillContainer' style='z-index: 99;background: #fff;padding: 20px;width: 222px;position: fixed;top: 0;right: 407px;'><div id='address'><p id='name'></p><p id='firstLine'></p><p id='secondLine'></p><p id='city'></p><p id='state'></p><p id='zip'></p><p id='country'></p></div><button id='pasteAddress'>Paste Address</button><button id='pasteMessage'>Paste Drop Ship Message</button></div>" );

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
      //$("textarea").val("Hi this is a drop shipping order. Please no invoice, no receipt, no billing info and no coupons. Thank you!");
      console.log($( "textarea" ));
      $( "textarea" ).each(function (index) {
        // if ($( "textarea" ).length > 2) {
        //   changeValue($( "textarea" ).get( 0 ),"Hi this is a drop shipping order. Please no invoice, no receipt, no billing info and no coupons. Thank you!");

        // } else {
          changeValue($( "textarea" ).get( index ),"Hi this is a drop shipping order. Please no invoice, no receipt, no billing info and no coupons. Thank you!");
        //}
      });

    };
  });
} else if (window.location.pathname == "/your/shops/me/advertising") {
  setTimeout(function(){ 
    insertConversions();
  }, 5000);
} else if (window.location.host == "www.etsy.com") {
  setButtons();
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

function changeValue(element, value) {
  const event = new Event('input', { bubbles: true })
  element.value = value
  element.dispatchEvent(event)
}

function pasteAddress(address) {
  //document.getElementsByClassName("sa-contact-name")[0].value = address.name;
  //setCountry(address.country)
  console.log(address.country);
  changeValue($( "input[name='contactPerson']" ).get( 0 ),address.name);
  changeValue($( "input[name='address']" ).get( 0 ),address.firstLine);
  changeValue($( "input[id='address2']" ).get( 0 ),address.secondLine);
  changeValue($( "input[name='zip']" ).get( 0 ),address.zip);

  if ( address.country !== 'UNITED STATES') {
    changeValue($( "input[id='city']" ).get( 0 ),address.city);
    changeValue($( "input[placeholder='State/Province/Region']" ).get( 0 ),address.state);
  }
  

  // $("input[name='contactPerson']").val(address.name);
  // $("input[name='address']").val(address.firstLine);
  // $("input[name='address2']").val(address.secondLine);
  // $("input[id='city']").val(address.city);
  // $("input[name='province']").val(address.state);
  // $("input[name='zip']").val(address.zip);

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
        if (productAttr == "12 Constellation") {
          $("<a href='https://www.aliexpress.com/item/AMIU-12-Constellation-Lucky-Natural-Stone-Simple-Bracelet-Beads-Adjustable-Bracelet-Hollywood-Crystal-Beaded-Bohemia-Bracelets/32870248948.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
        } else {
          $("<a href='https://www.aliexpress.com/item/AMIU-7-Colors-Lucky-Chakra-Natural-Stone-Simple-Bracelet-Beads-Adjustable-Bracelet-Natural-Crystal-Bohemia-Prayer/32882245473.html?spm=a2g0s.9042311.0.0.ac394c4drN8ZjI' target='_blank'>Order Now</a>").appendTo($(this));
        }
      } else if (product.includes("108 Natural Sandalwood Prayer Beads Bracelet")) {
        $("<a href='https://www.aliexpress.com/item/32846433152.html?spm=a2g0s.9042311.0.0.27424c4dXS02jI' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Sacred Geometry Festival Shorts")) {
        $("<a href='https://www.aliexpress.com/item/32785884762.html?spm=a2g0s.9042311.0.0.27424c4de77voq' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Tibetan Lucky Buddhist Sandalwood Bracelet")) {
        $("<a href='https://www.aliexpress.com/item/32822348739.html?spm=a2g0o.detail.0.0.14661c94DvusaD&gps-id=pcDetailCartBuyAlsoBuy&scm=1007.12908.131037.0&scm_id=1007.12908.131037.0&scm-url=1007.12908.131037.0&pvid=71cdb6e9-d309-47e8-95b0-da50ace8ce0f' target='_blank'>Order Now</a>").appendTo($(this));
      }
       else if (product.includes("Om Pendant Necklace")) {
        $("<a href='https://www.aliexpress.com/item/32892673861.html?spm=a2g0s.8937460.0.0.46022e0eDOC0NC' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Phases of the Moon Ring")) {
        $("<a href='https://www.aliexpress.com/item/32894248723.html?spm=a2g0s.8937460.0.0.7d072e0eiJN28U' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Wide Leg")) {
        $("<a href='https://www.aliexpress.com/item/32877941625.html?spm=a2g0o.productlist.0.0.1d7c5178ARcW4a&algo_pvid=c4334309-a41e-4e7d-910a-6c614d4cec41&algo_expid=c4334309-a41e-4e7d-910a-6c614d4cec41-0&btsid=91d6daaf-bf6a-497d-bf5e-78d6fedcbf0a&ws_ab_test=searchweb0_0,searchweb201602_9,searchweb201603_53' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Heart Sutra")) {
        $("<a href='https://www.aliexpress.com/item/32824673383.html?spm=a2g0o.productlist.0.0.44d944a0FDfAjT&algo_pvid=2c67be49-fafe-4018-8f38-0c80aacc26b5&algo_expid=2c67be49-fafe-4018-8f38-0c80aacc26b5-0&btsid=c9a8dd32-0e3e-47f8-b4eb-d6a053e63f02&ws_ab_test=searchweb0_0,searchweb201602_9,searchweb201603_53' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Tibetan Moon Star Bodhi Seed Bracelet")) {
        $("<a href='https://www.aliexpress.com/item/Eastisan-2017-Tibetan-Buddhist-Handmade-Xingyue-Bodhi-Seed-Mala-Beads-Bracelet-OM-Mani-Padme-Hum-Charm/32820317628.html?spm=2114.search0104.3.70.3c037e23TGogHd&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_53,ppcSwitch_0&algo_expid=ae4f1e97-d8eb-4792-ad9b-3bb195861844-9&algo_pvid=ae4f1e97-d8eb-4792-ad9b-3bb195861844' target='_blank'>Order Now</a>").appendTo($(this));
      }  else if (product.includes("Traditional Tibetan Buddhism Bracelet, Om Mani Padme Hum Engraving, Meditation Bracelet, Mens Bracelet, Vajrayana Bracelet, Double Dorje")) {
        $("<a href='https://www.aliexpress.com/item/Eastisan-Traditional-Tibetan-Buddhism-Brass-Bracelet-Men-Six-Words-Mantra-OM-MANI-PADME-HUM-Antiqued-Metal/32836172562.html?spm=2114.search0104.3.2.f2e37e23kffEq7&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_53,ppcSwitch_0&algo_expid=263c95df-9d08-4b36-9b93-af107bcdcc63-0&algo_pvid=263c95df-9d08-4b36-9b93-af107bcdcc63' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Infinite Flow Blue Tigers Eye Bracelet, Infinity Charm Bracelet, Energy Bracelet, Cosmic Bracelet, Universe Bracelet, Chakra Bracelet")) {
        $("<a href='https://www.aliexpress.com/store/product/6mm-Faced-Blue-Tiger-Eye-Stone-Beads-With-Silver-infinite-Charm-Bracelet-For-Man-Woman-Nimbus/1940393_32956853036.html?spm=2114.12010612.8148356.3.5ce84816JVAsCt' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product == "Pashmina Scarf Shawl, Blue Pink Paisley Scarf Shawl, Festival Pashmina, Winter Scarf Shawl, New Women Men Scarf Shawl") {
        $("<a href='https://www.aliexpress.com/item/Women-s-Winter-Warm-Pashmina-Shawl-Wrap-Scarf-Vintage-Jacquard-Ethnic-Paisley-Cashew-Pattern-Scarf-Shawl/32823394003.html?spm=a2g0s.9042311.0.0.23cb4c4dzqUQP0' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Rainbow Elephant Pattern")) {
        $("<a href='https://www.aliexpress.com/item/32774533100.html?spm=a2g0s.9042311.0.0.4bf94c4dUznog3' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Chakra Bracelets, Reiki Bracelets, Yoga Bracelets")) {
        if (productAttr == "Black Agate") {
          $("<a href='https://www.aliexpress.com/item/AMIU-3mm-Natural-Stone-Beads-Tibetan-Stone-Beads-Stretch-Bracelet-For-Men-Women-Yoga-Chakra-Crystal/32909151203.html?spm=a2g0s.8937460.0.0.1da22e0eWDpQLL' target='_blank'>Order Now</a>").appendTo($(this));
        } else if (productAttr == "Blue Lapis") {
          $("<a href='https://www.aliexpress.com/item/AMIU-3mm-Natural-Lapis-Stone-Beads-Tibetan-Stone-Beads-Stretch-Bracelet-For-Men-Women-Yoga-Chakra/32906197145.html?spm=2114.10010108.1000013.2.79f510b7zBI88e&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=bfe7bb3c-3d42-475a-a48e-502b3915133e' target='_blank'>Order Now</a>").appendTo($(this));
        } else {
          
        }
      } else if (product.includes("Long Silver Choker Stack Geometric Triangle Necklace, Multi Layered Necklace, Womens Necklace, Gift for Women, Gift for Her")) {
        $("<a href='https://www.aliexpress.com/item/New-Arrival-Hollow-Out-Triangle-Geometric-Multilayered-Pendant-Necklace-Long-Silver-Choker-Necklaces-for-Women/32930331299.html?spm=a2g0s.8937460.0.0.24dc2e0eH2O4gs' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Long Triangle Necklace, Womens Necklace, Long Necklace, Triangle Pendant Necklace, Geometric Womens Necklace, Gift for Women, Gift for Her")) {
        $("<a href='https://www.aliexpress.com/item/2019-NEW-pendant-Necklace-triangle-Long-Chain-Women-choker-Necklace-Chocker-collana-Bijoux-Collier-Femme-Joyas/32978837623.html?spm=2114.search0104.3.2.10f96549mpHfbD&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_53,ppcSwitch_0&algo_expid=2f1eddca-537e-4281-96b3-1def2742be7c-0&algo_pvid=2f1eddca-537e-4281-96b3-1def2742be7c' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Reiki Prayer Stones Bracelet, Lapis Lazuli, Red Tigers Eye, Obsidian, Chakra Bracelets, Yoga Bracelets, Meditation Bracelet, Energy Bracelet")) {
        $("<a href='https://www.aliexpress.com/item/Eastisan-3mm-Natural-Lapis-lazuli-Stone-Red-Tiger-Eye-Bracelets-For-Men-Women-Reiki-Prayer-Stones/32827579322.html?spm=2114.search0104.3.231.164d7e23Yap6aW&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_53,ppcSwitch_0&algo_expid=d9bf7109-e1ef-4048-9a22-6999747d4f1d-30&algo_pvid=d9bf7109-e1ef-4048-9a22-6999747d4f1d' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Tibetan Buddhist Ball Prayer Bead Bracelet')) {
        $("<a href='https://www.aliexpress.com/store/product/AMIU-Tibetan-Buddhist-Ball-Prayer-Bead-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots/1675041_32850472242.html?spm=a2g1y.12024536.productList_2428021.subject_2' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Buddha Amulet Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Woven-Amulet-Tibetan-Cord-Bracelets-Bangles-For-Women-Men-Handmade-Rope-Buddha/32939715293.html?spm=a2g0s.8937460.0.0.72c02e0e99R7LZ' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('ibetan Lucky Rope Knots Braided Bracelet | Multi Color Braided Bracelet | Yoga Bracelet Meditation Bracelet Bracelet for Women Gift for Her')) {
        $("<a href='https://www.aliexpress.com/item/32853244746.html?spm=a2g0o.detail.1000060.1.75ae4d22xsQ8Oo&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=3641ca98-8c12-4ec7-b0a7-481b54088bf5' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Multi Color Braided Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Black-Rope-Christmas/32859116164.html?spm=2114.10010108.1000010.5.57422e38sKEIZZ&gps-id=pcDetailLeftTrendProduct&scm=1007.13438.130792.0&scm_id=1007.13438.130792.0&scm-url=1007.13438.130792.0&pvid=fc42e51a-45eb-491f-a213-5ca98fcde673' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Multi Color Tibetan Buddhist Handmade Lucky Rope Knots')) {
        $("<a href='https://www.aliexpress.com/store/product/Eastisan-2017-Multi-Color-Tibetan-Buddhist-Lama-Braided-Knots-Lucky-Rope-Bracelet-For-Man-Women-Size/1940393_32822654691.html?spm=2114.12010612.8148356.13.45d81a7fW4sfbu' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Black Coconut Shell Braided Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/Tibetan-buddhist-Braided-Cotton-thread-Lucky-Knots-Silver-Charm-bracelet-Natural-Coconut-shell-beads-Carved-OM/32894510488.html?spm=a2g0s.8937460.0.0.1d982e0eOBBnHY' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product == 'Tibetan Lucky Rope Knots Bracelet, Braided Bracelet, Yoga Bracelet, Meditation Bracelet, Prayer Bracelet, Mens Bracelet, Womens Bracelet' || product.includes('Original Tibetan Buddhist Handmade')) {
        if (productAttr == 'Brown') {
          $("<a href='https://www.aliexpress.com/item/Tibetan-Buddhist-Handmade-Lucky-Rope-Bracelet-Men-Tibetan-Buddhist-Knots-Size-Adjustable-Bracelet-For-Women/32868578644.html?spm=a2g0s.8937460.0.0.46d92e0euFJBXc' target='_blank'>Order Now</a>").appendTo($(this));
        } else {
          $("<a href='https://www.aliexpress.com/item/2017-AMIU-Handmade-Friendship-Bracelet-Hippy-Colorful-Love-Vintage-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women/32826062352.html?spm=a2g0s.9042311.0.0.41904c4dWHBVcD' target='_blank'>Order Now</a>").appendTo($(this));
        } 
      } else if (product.includes('Happiness Tibetan')) {
        $("<a href='https://www.aliexpress.com/item/Eastisan-Tibetan-Buddhist-Handmade-Knots-Lucky-Rope-Bracelets-For-Women-Men-Buddhism-braided-Jewelry-Multi-Colors/32824972197.html?spm=2114.search0104.3.209.1fbf7e2357Ch3M&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_52,ppcSwitch_0&algo_expid=104449a6-8c6e-49f9-be90-bb97ee606e81-27&algo_pvid=104449a6-8c6e-49f9-be90-bb97ee606e81' target='_blank'>Order Now</a>").appendTo($(this));
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
      } else if (product.includes('Meditating Astronaut 9')) {
        $("<a href='https://www.aliexpress.com/item/Astronaut-Pendant-9-Planets-Solar-System-Necklace-Stars-Rock-Lava-Stones-Galaxy-Women-Novelty-Outer-Spaceman/32854515246.html?spm=a2g0s.8937460.0.0.653b2e0ePobzrF' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Spaceman Astronaut Key Chain')) {
        $("<a href='https://www.aliexpress.com/item/new-arrival-high-quality-asimo-3D-key-chain-spaceman-keychain-robot-key-ring-key-holder-drop/32702161349.html?spm=a2g0s.8937460.0.0.329d2e0eJa4Bah' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('The Heart of Prajna Paramita Sutra Bangle')) {
        $("<a href='https://www.aliexpress.com/item/Eastisan-handmade-White-Copper-Carved-THE-HEART-OF-PRAJNA-PARAMITA-SUTRA-Bracelets-For-Men-Women-om/32824673383.html?spm=2114.search0104.3.298.18657e23ACIMCp&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_53,ppcSwitch_0&algo_expid=15c7d2c6-fb36-4481-bd82-97a68efe6eb7-39&algo_pvid=15c7d2c6-fb36-4481-bd82-97a68efe6eb7' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Buddhas Eye Agate Bracelet')) {
        $("<a href='https://www.aliexpress.com/item/Eastisan-Natural-Red-Sander-Wooden-Beads-Bracelets-Tibetan-Buddhist-Handmade-Meditation-Prayer-Bracelet-Men-Women-OM/32821464677.html?spm=2114.search0104.3.87.7b537e23w9A2iy&ws_ab_test=searchweb0_0,searchweb201602_9_10065_10068_10890_319_10546_10059_10884_317_10548_10887_10696_321_322_10084_453_10083_454_10103_10618_10307_537_536,searchweb201603_53,ppcSwitch_0&algo_expid=383f3f31-707d-4906-89b1-aadd244fd20b-11&algo_pvid=383f3f31-707d-4906-89b1-aadd244fd20b' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Chakra Meditation 7 Colors 3d Night Light Lamp')) {
        $("<a href='https://www.aliexpress.com/item/3D-7-Color-Changing-Yoga-LED-Meditation-of-Acrylic-Night-Light-Bedroom-Illusion-Lamp-livingroom-Bedside/32840799118.html?spm=a2g0s.9042311.0.0.b5464c4dZnhXGz' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Gold Paisley")) {
        $("<a href='https://www.aliexpress.com/item/RUNMEIFA-Women-Polyester-Pashmina-Elegant-Fashion-Print-Floral-Paisley-Shawl-Wrap-Scarf-2018-New-Style-Free/32674410197.html?spm=a2g0s.9042311.0.0.27424c4dcEbF3N' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Tibetan Lucky Rope Knot Bracelet, Braided Bracelet, Yoga Bracelet, Meditation Bracelet, Prayer Bracelet, Mens & Womens Bracelet")) {
        $("<a href='https://www.aliexpress.com/store/product/AMIU-Handmade-Tibetan-Copper-Bead-Lucky-Rope-Bracelet-Bangles-For-Women-Men-Wax-Thread-Bracelets/1675041_32917757543.html?gps-id=6791677&scm=1007.14677.110221.0&scm_id=1007.14677.110221.0&scm-url=1007.14677.110221.0&pvid=833bd170-8625-4c9e-8d53-6027c8e88b9d&spm=a2g1y.promotion-20181111.promoteWysiwyg_134459388.0' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes("Kumihimo Braided Yoga Bracelet")) {
        $("<a href='https://www.aliexpress.com/item/AMIU-Tibetan-Buddhist-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots-Deongare-Rope-Wish/32892555120.html?spm=a2g0s.8937460.0.0.41b62e0egh8WWh' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Buddha Meditation 7 Colors 3d Night Light Lamp')) {
        $("<a href='https://www.aliexpress.com/item/Buddha-7-Color-Changing-Night-Light-3D-LED-Atmosphere-Bulbing-Lamp-Heart-visual-illusion-for-Kids/32839459325.html?spm=a2g0s.8937460.0.0.4bf82e0eU18vlv' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Meditating Astronaut Key Chain')) {
        $("<a href='https://www.aliexpress.com/item/Astronaut-Keychain-Galaxy-Universe-Meditation-Spaceman-Key-Chains-Stainless-Steel-Rings-Chains-Personalised-Creative-Car-Keyring/32847580314.html?spm=a2g0s.8937460.0.0.3e2b2e0eOCNcGf' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Tibetan Buddhist Charm Bracelet, Lucky Rope Knot Bracelet, Yoga Bracelet, Meditation Bracelet, Prayer Bracelet')) {
        $("<a href='https://www.aliexpress.com/store/product/AMIU-Tibetan-Buddhist-Ball-Prayer-Bead-Lucky-Charm-Tibetan-Bracelets-Bangles-For-Women-Men-Handmade-Knots/1675041_32850472242.html?spm=a2g1y.12024536.productList_2428021.pic_2' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Buckminsterfullerene Molecule')) {
        $("<a href='https://www.aliexpress.com/item/Buckminsterfullerene-Molecule-Ball-Necklace-Formula-C60-Special-Novelty-Male-Female-Pendant-Necklace/32861893408.html?spm=a2g0s.8937460.0.0.6cfb2e0e3qqfGl' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Pashmina Scarf Shawl, Dark Paisley Scarf Shawl, Festival Pashmina, Winter Scarf Shawl, New Women Men Scarf Shawl')) {
        $("<a href='https://www.aliexpress.com/item/Scarf-Luxury-Brand-Hot-Sale-Women-200-70cm-Oversize-Cotton-Scarf-Smooth-Touch-Scarves-Chic-Plant/32719142379.html?spm=a2g0s.8937460.0.0.78662e0e8STDhm' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Dark Paisley Scarf Shawl')) {
        $("<a href='https://www.aliexpress.com/item/Scarf-Luxury-Brand-Hot-Sale-Women-200-70cm-Oversize-Cotton-Scarf-Smooth-Touch-Scarves-Chic-Plant/32719142379.html?spm=2114.10010108.1000013.30.7f6b4fbcVaRqT7&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=c10d9095-158f-4891-b5e5-f03738282111' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Atom Symbol Cosmic')) {
        $("<a href='https://www.aliexpress.com/item/Scarf-Luxury-Brand-Hot-Sale-Women-200-70cm-Oversize-Cotton-Scarf-Smooth-Touch-Scarves-Chic-Plant/32719142379.html?spm=2114.10010108.1000013.30.7f6b4fbcVaRqT7&gps-id=pcDetailBottomMoreThisSeller&scm=1007.13339.128551.0&scm_id=1007.13339.128551.0&scm-url=1007.13339.128551.0&pvid=c10d9095-158f-4891-b5e5-f03738282111' target='_blank'>Order Now</a>").appendTo($(this));
      } else if (product.includes('Violet Purple Paisley')) {
        $("<a href='https://www.aliexpress.com/item/DANKEYISI-Ethnic-Winter-Women-Scarf-Jacquard-Scarves-Floral-Print-Shawls-Ladies-Long-Pashminas-Fashion-Stole-Indian/32840324322.html?spm=a2g0s.9042311.0.0.27424c4dvrgnhV' target='_blank'>Order Now</a>").appendTo($(this));
      } else {
        
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
  }, 10000);
}

function updateStatusClick() {
  $('#order-detail-container > div.col-group.mt-xs-4.mb-xs-2 > div:nth-child(2) > div > div.col-md-4.pr-md-0 > div > div > div > div > ul > li:nth-child(2) > span').click(function() {
    setButtons();
  });
}

function insertConversions() {
  let impressions;
  let clicks;
  let orders;
  let clickPercent;
  let orderPercent;
  let adCost;
  let costPerSale;
  let totalAdCost;
  let totalSales;
  let averageCostPerSale;
  let arrIndex = 0;
  let headerText = $("#header-message").text();
  

  $( ".wt-table__row" ).each(function( index ) {
    if (index < 40 ) {
      arrIndex++;
      console.log(arrIndex);
      impressions = parseFloat($("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(2) > span").text().replace(/,/g, ''));
      clicks = parseFloat($("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(3) > span").text().replace(/,/g, ''));
      orders = parseFloat($("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(4) > span").text().replace(/,/g, ''));
      adCost = parseFloat($("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(6) > span").text().replace(/\$/g, ''));
      estimatedProfit = ( 6 ) * orders;
      totalAdCost = parseFloat($("#stats-view-footer > p > span > strong").text().replace(/\$/g, ''));
      totalSales = parseFloat($("#stats-table > div:nth-child(3) > div.wt-pb-xs-2.wt-pb-lg-0.wt-pt-lg-2.wt-order-lg-2 > p").text());;
      averageCostPerSale = totalAdCost/totalSales;
      console.log(clicks, impressions, orders, adCost, totalAdCost, averageCostPerSale.toFixed(2));
      clickPercent = clicks/impressions*100;
      orderPercent = orders/clicks*100;
      costPerSale = adCost/orders;
      console.log(clickPercent, orderPercent);
      
      $("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(3) > span").after("<br /><span>"+ clickPercent.toFixed(2) +"%</span>");
      $("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(4) > span").after("<br /><span>"+ orderPercent.toFixed(2) +"%</span>");
      $("#listing-stats > div:nth-child(3) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(6) > span").after("<br /><span>$"+ costPerSale.toFixed(2) +"</span>");
      $("#header-message").text(headerText + " with an average cost per sale of $" + averageCostPerSale.toFixed(2));    
    }
  });
}
