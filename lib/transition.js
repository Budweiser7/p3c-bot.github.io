var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var oldP3C = web3.eth.contract(contracts.oldP3C.abi).at(contracts.oldP3C.address);
var p3c = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);

getCropInfo()

$("#deployCrop").click(function () {
    amountToBuy = $("#buyInput").val()
    deployCrop(amountToBuy)
})

$("#transfer").click(function () {
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
        $("#fresh-p3c-title").replaceWith("<span>" + "Step 1" + "</span>")
    }
});