$("#deployCrop").click(function () {
    alert("WTF")
    // amountToBuy = $("#buyInput").val()
    // deployCrop(amountToBuy)
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
