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

function deployCrop() {
    cropAbi.new({
        from: web3.eth.accounts[0],
        data: contracts.crop.data,
        gas: 1000000
    }, function (error, result) { //get callback from function which is your transaction key
        if (!error) {
            console.log(result);
        } else {
            console.log(error);
        }
    })
}

// TODO NOT WORKING - make sure the params for link are working
function linkCrop(cropAddress) {
    cropAbi.at(cropAddress).linkCrop.sendTransaction({
            from: web3.eth.accounts[0],
            gas: 1000000
        },
        function (error, result) { //get callback from function which is your transaction key
            if (!error) {
                console.log(result);
            } else {
                console.log(error);
            }
        })
}

function myCrop() {
    farmContract.myCrop.call(function (err, result) {
        console.log(result)
        alert(result)
    });
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
                7000000000000000000, {
                    from: web3.eth.accounts[0],
                    gas: 152580
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

function initiateCrop(){
    deployCrop()
    linkCrop()
    transferAllP3CToCrop()
}