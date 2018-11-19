var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var p3cContract = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);
var cropAbi = web3.eth.contract(contracts.crop.abi)

var myCropAddress;
var myCropTokens;
var myCropDividends;
var myCropDisabled;

function getMyCrop() {
    farmContract.myCrop.call(function (err, result) {
        if (!err) {
            myCropAddress = result;
            $("#myCropAddress").replaceWith("<b>" + myCropAddress + "</b>")
        }
    });
}


function getMyCropDividends() {
    farmContract.myCropDividends.call(function (err, result) {
        if (!err) {
            myCropDividends = result;
            $("#myCropDividends").replaceWith("<b>" + web3.fromWei(myCropDividends).toFixed() + "</b>")
        }
    });
}

function getMyCropTokens() {
    farmContract.myCropTokens.call(function (err, result) {
        if (!err) {
            myCropTokens = result;
            $("#myCropTokens").replaceWith("<b>" + web3.fromWei(myCropTokens).toFixed(2) + "</b>")
        }
    });
}

function getMyCropDisabled() {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).disabled.call(function (error, result) {
            if (!error) {
                myCropDisabled = result;
                $('#autoReinvest').checkbox('toggle');
            }
        })
    })
}

function getCropInfo() {
    getMyCrop()
    getMyCropTokens()
    getMyCropDividends()
    getMyCropDisabled()
}

function deployCrop(amountToBuy) {
    amount = web3.toWei(amountToBuy)
    farmContract.createCrop.sendTransaction(
        // you are the referer
        web3.eth.accounts[0], {
            from: web3.eth.accounts[0],
            value: amount
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        })
}

function linkCrop(cropAddress) {
    cropAbi.at(cropAddress).linkCrop.sendTransaction({
            from: web3.eth.accounts[0],
            gas: 98765
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        })
}

function transferAllP3CToCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        alert('This is my crop ' + cropAddress)
        p3cContract.myTokens.call(function (err, myTokens) {
            tokens = myTokens.toNumber()
            alert('Move this many tokens' + web3.fromWei(tokens))
            p3cContract.transfer.sendTransaction(
                cropAddress,
                tokens, 
                {
                    from: web3.eth.accounts[0],
                },
                function (error, result) { //get callback from function which is your transaction key
                    if (!error) {
                        console.log(result);
                    } else {
                        console.log(error);
                    }
                })
        });
    })
}

// what to do if 
function autoReinvestToggle(state) {
    farmContract.myCrop.call(function (err, cropAddress) {
        alert('This is my crop ' + cropAddress)
        cropAbi.at(cropAddress).disable.sendTransaction(
            // you are the referer
            state, {
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
}

// This buys P3C from the crop, but with you as the referrer
function buyFromCrop(amountToBuy) {
    farmContract.myCrop.call(function (err, cropAddress) {
        amount = web3.toWei(amountToBuy)
        cropAbi.at(cropAddress).buy.sendTransaction(
            // you are the referer
            web3.eth.accounts[0], {
                from: web3.eth.accounts[0],
                value: amount
            },
            function (error, result) { //get callback from function which is your transaction key
                if (!error) {
                    console.log(result);
                } else {
                    console.log(error);
                }
            })
    })
}

// This buys P3C from the crop, but with you as the referrer
function sellFromCrop(amountToSell) {
    farmContract.myCrop.call(function (err, cropAddress) {
        amount = web3.toWei(amountToSell)
        cropAbi.at(cropAddress).sell.sendTransaction(
            // you are the referer
            amount, {
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
}

function reinvestFromCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).reinvest.sendTransaction({
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
}

function withdrawFromCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).withdraw.sendTransaction({
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
}

function transferFromCrop(destination, amountToTransfer) {
    amount = web3.toWei(amountToTransfer)
    alert(destination)
    alert(amountToTransfer)
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).transfer.sendTransaction(
            destination,
            amount, 
            {
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

}