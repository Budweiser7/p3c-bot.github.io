var cropAbi = web3.eth.contract(contracts.crop.abi)
var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var p3cContract = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);

var myCropAddress;
var myCropTokens;
var myCropDividends;

function myCrop() {
    farmContract.myCrop.call(function (err, result) {
        if (!err) {
            myCropAddress = result;
            alert(myCropAddress)
            $("#my-crop-address").replaceWith("<b>" + myCropAddress + "</b>")
        }
    });
}


function myCropDividends() {
    farmContract.myCrop.call(function (err, result) {
        cropAbi.at(result).cropDividends.call(
            true,
            function (err, dividends) {
                cropDividends = web3.fromWei(dividends).toFixed()
                $("#my-crop-dividends").replaceWith("<b>" + cropDividends + "</b>")
            });
    });

}

function myCropTokens() {
    farmContract.myCrop.call(function (err, result) {
        cropAbi.at(result).cropTokens.call(function (err, tokens) {
            cropTokens = web3.fromWei(tokens).toFixed(2)
            alert(cropTokens)
            $("#myTokens").replaceWith("<b>" + cropTokens + "</b>")
        });
    });
}

function getCropInfo() {
    myCrop()
    myCropTokens()
    myCropDividends()
}

function deployCrop() {
    cropAbi.new({
        from: web3.eth.accounts[0],
        data: contracts.crop.data,
    }, function (result) { //get callback from function which is your transaction key
        if (result) {
            console.log(result)
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
                // TODO MAKE THIS THE ACTUAL AMOUNT
                1500000000000000000, {
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
                value: amount,
                gas: 654321
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

function transferFromCrop(amountToTransfer) {
    amount = web3.toWei(amountToTransfer)
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).transfer.sendTransaction(
            web3.eth.accounts[0],
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