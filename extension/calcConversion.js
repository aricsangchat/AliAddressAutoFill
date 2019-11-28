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

        if ($("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(3) > span").hasClass("conversionData")) {
          $(".conversionData").prev().remove();
          $(".conversionData").remove();
        }

        impressions = parseFloat($("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(2) > span").text().replace(/,/g, ''));
        clicks = parseFloat($("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(3) > span").text().replace(/,/g, ''));
        orders = parseFloat($("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(4) > span").text().replace(/,/g, ''));
        adCost = parseFloat($("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(6) > span").text().replace(/\$/g, ''));
        //estimatedProfit = ( 6 ) * orders;
        totalAdCost = parseFloat($("#stats-view-footer > p > span > strong").text().replace(/\$/g, ''));
        totalSales = parseFloat($("#stats-table > div:nth-child(3) > div.wt-pb-xs-2.wt-pb-lg-0.wt-pt-lg-2.wt-order-lg-2 > p").text());;
        averageCostPerSale = totalAdCost/totalSales;
        
        console.log(
          "index:", arrIndex,
          "impressions:", impressions,
          "clicks:", clicks, 
          "orders:", orders, 
          "adCost:", adCost
        );

        clickPercent = clicks/impressions*100;

        if (orders === 0) {
          costPerSale = 0;
          orderPercent = 0;
        } else {
          costPerSale = adCost/orders;
          orderPercent = orders/clicks*100;
        }
        
        console.log(clickPercent.toFixed(2), orderPercent.toFixed(2), costPerSale.toFixed(2));

        $("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(3) > span").after("<br /><span class='conversionData'>"+ clickPercent.toFixed(2) +"%</span>");
        $("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(4) > span").after("<br /><span class='conversionData'>"+ orderPercent.toFixed(2) +"%</span>");
        $("#listing-stats > div:nth-child(4) > table > tbody > tr:nth-child("+arrIndex+") > td:nth-child(6) > span").after("<br /><span class='conversionData'>$"+ costPerSale.toFixed(2) +"</span>");
        $("#header-message").text(headerText + " with an average cost per sale of $" + averageCostPerSale.toFixed(2));
              
      }
    });
  console.log("totalAdCost:", totalAdCost, "CPA:", averageCostPerSale.toFixed(2));
  }

insertConversions();
