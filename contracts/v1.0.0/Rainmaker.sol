pragma solidity ^0.4.21;
/***
 *     _______             __            __       __            __                           
 *    |       \           |  \          |  \     /  \          |  \                          
 *    | $$$$$$$\  ______   \$$ _______  | $$\   /  $$  ______  | $$   __   ______    ______  
 *    | $$__| $$ |      \ |  \|       \ | $$$\ /  $$$ |      \ | $$  /  \ /      \  /      \ 
 *    | $$    $$  \$$$$$$\| $$| $$$$$$$\| $$$$\  $$$$  \$$$$$$\| $$_/  $$|  $$$$$$\|  $$$$$$\
 *    | $$$$$$$\ /      $$| $$| $$  | $$| $$\$$ $$ $$ /      $$| $$   $$ | $$    $$| $$   \$$
 *    | $$  | $$|  $$$$$$$| $$| $$  | $$| $$ \$$$| $$|  $$$$$$$| $$$$$$\ | $$$$$$$$| $$      
 *    | $$  | $$ \$$    $$| $$| $$  | $$| $$  \$ | $$ \$$    $$| $$  \$$\ \$$     \| $$      
 *     \$$   \$$  \$$$$$$$ \$$ \$$   \$$ \$$      \$$  \$$$$$$$ \$$   \$$  \$$$$$$$ \$$      
 *   v 1.0.0            
 *  "Nobody gets left behind"    
 * 
 *  What?
 *  -> Holds onto P3Cv1.0.0 tokens, and can ONLY reinvest in the P3Cv1.0.0 contract and accumulate more tokens.
 *  -> Calculates ratio of old to new contract balances and makes sure to split divs from new contract to old.
 *  -> This contract CANNOT sell, give, or transfer any tokens it owns.
 */
 
contract Hourglass {
    function reinvest() public {}
    function withdraw() public returns(address) {}
    function myTokens() public view returns(uint256) {}
    function myDividends(bool) public view returns(uint256) {}
    function buy(address) public payable returns(uint256) {}
}

contract Divies {
    function deposit() external payable {}
}


contract RainMaker {
    Hourglass currentP3C;
    Divies oldDivies;

    address public oldDiviesAddress = 0x073340cC5D03B221EEc5D72Fb2fB9DFCeA6F72ae;
    address public oldP3CAddress = 0xDF9AaC76b722B08511A4C561607A9bf3AfA62E49;
    address public currentP3CAddress = 0x80dafcf47a0199b71c187c84ba68cfb999f2a1ef;
   
    uint256 public contractRatio = 10000;
    uint256 public oldBalance;
    uint256 public newBalance;

    function RainMaker() public {
        currentP3C = Hourglass(currentP3CAddress);
        oldDivies = Divies(oldDiviesAddress);
    }
    
    function() external payable {}
    
    function calculateOldContractPercentage()
        internal
        returns(uint256)
    {
        oldBalance = oldP3CAddress.balance;
        newBalance = currentP3CAddress.balance;
        uint256 _aggregate = SafeMath.add(oldBalance, newBalance);
        // calculate what percentage (4 precision points should go to old)
        contractRatio = SafeMath.div(SafeMath.mul(oldBalance,10000), _aggregate);
    }
    

    // code in the prior one. 
    function makeItRain() public returns (address) {
        calculateOldContractPercentage();
        // in case Current contract is 10000x bigger
        if (contractRatio == 0){
            currentP3C.reinvest();
        } else {
            currentP3C.withdraw();
            uint256 bal = address(this).balance;
            uint256 oldContractCut = SafeMath.div(SafeMath.mul(bal, contractRatio), 10000 );
            uint256 newContractCut = SafeMath.sub(bal, oldContractCut);
            oldDivies.deposit.value(oldContractCut)();
            currentP3C.buy.value(newContractCut)(address(0));
        }
    }

    function myTokens() public view returns(uint256) {
        return currentP3C.myTokens();
    }
    
    function myDividends() public view returns(uint256) {
        return currentP3C.myDividends(true);
    }
}

/**
 * @title SafeMath
 * @dev Math operations with safety checks that throw on error
 */
library SafeMath {

    /**
    * @dev Multiplies two numbers, throws on overflow.
    */
    function mul(uint256 a, uint256 b) internal pure returns (uint256) {
        if (a == 0) {
            return 0;
        }
        uint256 c = a * b;
        assert(c / a == b);
        return c;
    }

    /**
    * @dev Integer division of two numbers, truncating the quotient.
    */
    function div(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b > 0); // Solidity automatically throws when dividing by 0
        uint256 c = a / b;
        assert(a == b * c + a % b); // There is no case in which this doesn't hold
        return c;
    }

    /**
    * @dev Substracts two numbers, throws on overflow (i.e. if subtrahend is greater than minuend).
    */
    function sub(uint256 a, uint256 b) internal pure returns (uint256) {
        assert(b <= a);
        return a - b;
    }

    /**
    * @dev Adds two numbers, throws on overflow.
    */
    function add(uint256 a, uint256 b) internal pure returns (uint256) {
        uint256 c = a + b;
        assert(c >= a);
        return c;
    }
}