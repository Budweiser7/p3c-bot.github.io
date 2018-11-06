var cropContract = web3.eth.contract(contracts.crop.abi)
var farmContract = web3.eth.contract(contracts.farm.abi).at(contracts.farm.address);
var p3cContract = web3.eth.contract(contracts.p3c.abi).at(contracts.p3c.address);

function deployCrop() {
    var crop = cropContract.new({
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
function linkCropToFarm(cropAddress) {
    farmContract.link.sendTransaction(
        web3.eth.accounts[0],
        cropAddress, 
        {
            from: web3.eth.accounts[0],
            gas: 100000
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
        alert(cropAddress)
        p3cContract.myTokens.call(function (err, myTokens) {
            tokens = myTokens.toNumber()
            alert(tokens)
            p3cContract.transfer.sendTransaction(
                cropAddress, 
                1000000000000000000,
                {
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