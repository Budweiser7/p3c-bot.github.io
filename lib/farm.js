var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var p3cContract = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);
var cropAbi = web3.eth.contract(contracts.crop.abi)

var myCropAddress;
var myCropTokens;
var myCropDividends;
var myCropDisabled;

function getMyCrop(onboard) {
    farmContract.myCrop.call(function (err, result) {
        // if onboard is true and we don't have a crop address already.
        if (onboard && (err || (result == '0x0000000000000000000000000000000000000000'))){
            alertify.prompt("Welcome to P3C", ".001",
            function(evt, value ){
              deployCrop(.001, '0x0000000000000000000000000000000000000000')
              alertify.success('Ok: ' + value);
            },
            function(){
              alertify.error('Cancel');
            })
            ;        
        }
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
            $("#myCropDividends").replaceWith("<b id='myCropDividends'>" + web3.fromWei(myCropDividends).toFixed(5) + "</b>")
        }
    });
}

function getMyCropTokens() {
    farmContract.myCropTokens.call(function (err, result) {
        if (!err) {
            myCropTokens = result;
            $("#myCropTokens").replaceWith("<b>" + web3.fromWei(myCropTokens).toFixed(2) + "</b>")
            p3cContract.sellPrice(function (e, r) {
                let sellPrice = web3.fromWei(r)
                $('#myETCValue').text((sellPrice * web3.fromWei(myCropTokens)).toFixed(4))
                // $('.sell-usd').text('$' + Number((sellPrice * usdPrice).toFixed(2)).toLocaleString() + ' ' + currency + '')
            })
        }
    });
}

function getMyCropDisabled() {
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).disabled.call(function (error, result) {
            if (!error) {
                myCropDisabled = result;
                if (myCropDisabled == false) {
                    $('#autoReinvest').checkbox('set checked');
                } else {
                    $('#autoReinvest').checkbox('set unchecked');
                }
            }
        })
    })
}

function getCropInfo(onboard) {
    getMyCrop(onboard)
    getMyCropTokens()
    getMyCropDividends()
    getMyCropDisabled()
}

function deployCrop(amountToBuy, referrer) {
    amount = web3.toWei(amountToBuy)
    farmContract.createCrop.sendTransaction(
        // you are the referer
        referrer, {
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

function transferAllP3CToCrop() {
    farmContract.myCrop.call(function (err, cropAddress) {
        alert('This is my crop ' + cropAddress)
        p3cContract.myTokens.call(function (err, myTokens) {
            tokens = myTokens.toNumber()
            alert('Move this many tokens' + web3.fromWei(tokens))
            p3cContract.transfer.sendTransaction(
                cropAddress,
                tokens, {
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

function autoReinvestDisableToggle(state) {
    farmContract.myCrop.call(function (err, cropAddress) {
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
$('#autoReinvest').checkbox({
    onChecked: function () {
        autoReinvestDisableToggle(false)
    },
    onUnchecked: function () {
        autoReinvestDisableToggle(true)
    }
})

// This buys P3C from the crop, but with you as the referrer
function buyFromCrop(amountToBuy) {
    farmContract.myCrop.call(function (err, cropAddress) {
        amount = web3.toWei(amountToBuy)
        cropAbi.at(cropAddress).buy.sendTransaction(
            // your crop is the referrer
            cropAddress, {
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
    farmContract.myCrop.call(function (err, cropAddress) {
        cropAbi.at(cropAddress).transfer.sendTransaction(
            destination,
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