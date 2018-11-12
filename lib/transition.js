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
if (myCropAddress !== ""){
    $("#my-crop-address").replaceWith(myCropAddress)
}

$("#deploy-crop").click(function () {
    console.log('Deploy')
    deployCrop();
})

$("#link-crop").click(function () {
    linkCrop(myCropAddress)
})

$("#buy-from-crop").click(function (){
    buyFromCrop()
})