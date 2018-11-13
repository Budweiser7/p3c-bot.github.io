var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var oldP3C = web3.eth.contract(contracts.oldP3C.abi).at(contracts.oldP3C.address);
var p3c = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);


oldP3C.myTokens.call(function (err, myTokens) {
    tokens = myTokens.toNumber()
    // if I don't have any old tokens.
    if (tokens === 0) {
        // $('#transition-old').hide()
    } else {
        // If I have old toknes.
        // $('#new-crop').hide()
        // If I have current tokens too, I want to be able to transfer them.
        p3c.myTokens.call(function (err, myTokens) {
            tokens = myTokens.toNumber()
            if (tokens !== 0) {
                $('#transfer-p3c').hide()
            }
        });
    }
});

getCropInfo()

$("#deploy-crop").click(function () {
    console.log('Deploy')
    deployCrop();
})

$("#link-crop").click(function () {
    address = $("#linkAddressInput").val()
    linkCrop(address)
})

$("#buy-from-crop").click(function () {
    amountToBuy = $("#amount-to-buy").val()
    buyFromCrop(amountToBuy)
})

$("#transfer-p3c").click(function () {
    transferAddress = $("#transferAddress").val()
    transferTokenCount = $("#transferTokenCount").val()
    buyFromCrop(amountToBuy)
})

$("#liquidate-old").click(function () {
    oldP3C.exit.sendTransaction({
            from: web3.eth.accounts[0],
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        })
})


oldP3C.myTokens.call(function (err, oldTokens) {
    tokens = web3.fromWei(oldTokens)
    console.log(tokens)
    if (tokens == 0){
        console.log(tokens)
        $("#get-rid-of-old-tokens").hide()
        $("#fresh-p3c-title").replaceWith("<span>" + "Step 3" + "</span>")
        // 
    }
});