adAbi = [
	{
		"constant": true,
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "purchaseTime",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "globalAd",
		"outputs": [
			{
				"name": "image",
				"type": "string"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "go_text",
				"type": "string"
			},
			{
				"name": "go_link",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "calculatePrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "purchasePrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "defaultPrice",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "image",
				"type": "string"
			},
			{
				"name": "text",
				"type": "string"
			},
			{
				"name": "go_text",
				"type": "string"
			},
			{
				"name": "go_link",
				"type": "string"
			}
		],
		"name": "purchaseAd",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]

var ad = web3.eth.contract(adAbi).at('0xe1a01a822bc14c7109d0655e964e73509203872f');
var price;
ad.calculatePrice.call(function (err, result) {
	price = parseFloat(web3.fromWei(result.toNumber()))
	$("#price").html(price + 'ETC');
});


ad.globalAd.call(function (err, result) {
	$("#currentImg").html(result[0]);
	$("#currentText").html(result[1]);
	$("#currentLinkText").html(result[2]);
	$("#currentLink").html(result[3]);
	$( "#current" ).html('<img src="' + result[0] + '" height="30" width="30"> ' + result[1] + ' <a target="_blank" href="' + result[3] + '" rel="nofollow" title="Links to an External Advertiser site" target="_blank"> <b>' + result[2] + '</b></a><div id="beacon_2a55ce0186" style="position: absolute; left: 0px; top: 0px; visibility: hidden;"><img src="https://gen.etherscan.io/www/d/lg.php?ebannerid=5&amp;campaignid=5&amp;zoneid=2&amp;loc=https%3A%2F%2Fetherscan.io%2F&amp;cb=2a55ce0186" width="0" height="0" alt="" style="width: 0px; height: 0px;"></div>');
    // $("#rainMakerDividends").html(divs.toFixed(3));
});

ad.owner.call(function (err, result) {
	$("#owner").html(result);
});

ad.purchasePrice.call(function (err, result) {
	$("#purchasePrice").html(result);
    // $("#rainMakerDividends").html(divs.toFixed(3));
});

ad.purchaseTime.call(function (err, result) {
	$("#time").html(result);
    // $("#rainMakerDividends").html(divs.toFixed(3));
});




$("#purchase").click(function () {
	var imgLink= $("#imgLink").val();
	var text= $("#text").val();
	var hyperlinkText= $("#hyperlinkText").val();
	var hyperlink= $("#hyperlink").val();

	ad.calculatePrice.call(function (err, result) {
		ad.purchaseAd.sendTransaction(
		imgLink,
		text,
		hyperlinkText,
		hyperlink,
		{
			from: web3.eth.accounts[0],
			value: result
		}, function (error, result) { //get callback from function which is your transaction key
			if (!error) {
				console.log(result);
			} else {
				console.log(error);
			}
		})
	});
})

$('.selector').qtip({
    style: { classes: 'qtip' }
});

$('#makeItRain').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'Cause the RainMaker to use its dividends to purchase tokens and distribute gains to all players!'
    }
})

$('#rainMaker').qtip({ // Grab some elements to apply the tooltip to
    content: {
        text: 'The amount of dividends the RainMaker contract currently holds. It can only ever reinvest them!'
    }
})