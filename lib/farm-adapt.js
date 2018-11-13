farmContract.myCrop.call(function (err, result) {
    cropAbi.at(result).cropTokens.call(function (err, tokens) {
        cropTokens = web3.fromWei(tokens).toFixed(2)
        // alert(cropTokens)
        $("#my-crop-tokens").replaceWith("<b>" + cropTokens + "</b>")
    });
});

farmContract.myCrop.call(function (err, result) {
    cropAbi.at(result).cropDividends.call(
        true,
        function (err, dividends) {
            cropDividends = web3.fromWei(dividends).toFixed()
            $("#my-crop-dividends").replaceWith("<b>" + cropDividends + "</b>")
    });
});

$("#buy-from-crop").click(function () {
    amountToBuy = $("#buyInput").val()
    buyFromCrop(amountToBuy)
})

$("#sell-from-crop").click(function () {
    amountToSell = $("#sellInput").val()
    sellFromCrop(amountToSell)
})

$("#reinvest").click(function () {
    reinvestFromCrop()
})

$("#withdraw").click(function () {
    withdrawFromCrop()
})

$("#transfer-p3c").click(function () {
    transferAddress = $("#transferAddress").val()
    transferTokenCount = $("#transferTokenCount").val()
    buyFromCrop(amountToBuy)
})
