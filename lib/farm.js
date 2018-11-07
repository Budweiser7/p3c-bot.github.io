$('.callback.example #auto')
    .checkbox()
    .first().checkbox({
        onChecked: function () {
            alert('onChecked called<br>');
        },
        onUnchecked: function () {
            alert('onUnchecked called<br>');
        },
        onChange: function () {
            alert('onChange called<br>');
        }
    });
// bind events to buttons
$('.callback.example .button')
    .on('click', function () {
        $('.callback .checkbox').checkbox($(this).data('method'));
    });

var cropAbi = web3.eth.contract(contracts.crop.abi)
var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var p3cContract = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);

var cropAddress;
var myCropTokens;
var myCropDividends;

function deployCrop() {
    cropAbi.new({
        from: web3.eth.accounts[0],
        data: contracts.crop.data,
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log(result);
        } else {
            console.log(error);
        }
    })
}

function myCrop() {
    farmContract.myCrop.call(function (err, result) {
        alert(result)
        cropAddress = result;
    });
}

function linkCrop(cropAddress) {
    cropAbi.at(cropAddress).linkCrop.sendTransaction({
            from: web3.eth.accounts[0],
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

// This buys P3C from the crop, but with you as the referrer
function buyFromCrop() {
    cropAbi.at(cropAddress).buy.sendTransaction(
        // you are the referer
        web3.eth.accounts[0], {
            from: web3.eth.accounts[0],
            value: 100000000000000
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        })
}

// This buys P3C from the crop, but with you as the referrer
function sellFromCrop() {
    cropAbi.at(cropAddress).sell.sendTransaction(
        // you are the referer
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
}

function reinvestFromCrop() {
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
}

function withdrawFromCrop() {
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
}

function transferFromCrop() {
    cropAbi.at(cropAddress).transfer.sendTransaction(
        web3.eth.accounts[0],
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
}

function myCropDividends() {
    farmContract.myCrop.call(function (err, result) {
        cropAbi.at(result).cropDividends.call(function (err, dividends) {
            alert(web3.fromWei(dividends))
            cropDividends = web3.fromWei(dividends)
        });
    });

}

function myCropTokens() {
    farmContract.myCrop.call(function (err, result) {
        cropAbi.at(result).cropTokens.call(function (err, tokens) {
            alert(web3.fromWei(tokens))
            cropTokens = web3.fromWei(tokens)
        });
    });
}

function initialize(){
    myCrop()
    myCropTokens()
    myCropDividends()
}