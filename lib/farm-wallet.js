// onboard
hasFarm = localStorage.getItem("hasFarm")
getCropInfo(hasFarm)

$("#buy").click(function () {
    amountToBuy = $("#buyInput").val()
    // if we don't have a mn, null is my own crop address
    masternode = localStorage.getItem("masternode")
    buyFromCrop(amountToBuy, masternode)
})

$("#sell").click(function () {
    amountToSell = $("#sellInput").val()
    sellFromCrop(amountToSell)
})

$("#reinvest").click(function () {
    reinvestFromCrop()
})

$("#withdraw").click(function () {
    withdrawFromCrop()
})

$("#transfer").click(function () {
    destination = $("#transferAddress").val()
    amountToTransfer = $("#transferTokenCount").val()
    transferFromCrop(destination, amountToTransfer)
})
