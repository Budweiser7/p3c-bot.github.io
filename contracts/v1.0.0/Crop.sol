pragma solidity ^0.4.21;

/***
 *     ,-----.                         
 *    '  .--./ ,--.--.  ,---.   ,---.  
 *    |  |     |  .--' | .-. | | .-. | 
 *    '  '--'\ |  |    ' '-' ' | '-' ' 
 *     `-----' `--'     `---'  |  |-'  
 *                             `--'    
 *  "Good things come to those who wait."
 *  What?
 *  -> A crop contract auto reinvests P3C on behalf of users.
 *  -> When someone reinvests your crops, they withdraw the divs, and then the divs are used to buy P3C with them as the referrer.
 *  -> Creating a crop is NOT necessary for using P3C, only a convenience. Use this while you keep P3C in storage.
 *  -> This needs to de deployed  AFTER the farm contract, so it can be referenced.
 */

contract Hourglass {
  function() payable public;
  function buy(address) public payable returns(uint256) {}
  function sell(uint256) public;
  function reinvest() public;
  function withdraw() public returns(address);
  function exit() public;
  function dividendsOf(address) public returns(uint256);
  function balanceOf(address) public returns(uint256);
  function transfer(address , uint256) public returns(bool);
  function stakingRequirement() public returns(uint256);
  function myTokens() public view returns(uint256);
  function myDividends(bool) public view returns(uint256);
 
}

contract Farm {
  function link(address, address) public;
}

contract Crop {
  Farm farm;
  Hourglass p3c;
  address public owner;
  bool public disabled = false;
  
  // ETC P3C
  address public p3cAddress = 0x80DAfcF47A0199b71C187C84BA68Cfb999f2A1ef;
  address public farmAddress = 0x2884cd8dcab5fd5f8644b9b20de07c4459b47e02;
  uint256 public version = 1;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
  function Crop() public {
    owner = msg.sender;
    p3c = Hourglass(p3cAddress);
  }
  
  /**
  * @dev Default function if ETC sent to contract. Do nothing.
  */
  function() public payable {}
  
   /**
   * @dev Link the crop to the farm.
   */
  function linkCrop(){
    farm = Farm(farmAddress);
    farm.link(owner, address(this));
  }
  
  /**
   * @dev Turn reinvest on / off
   * @param _disabled bool to determine state of reinvest.
   */
  function disable(bool _disabled) public onlyOwner() {
    // toggle disabled
    disabled = _disabled;
  }

  /**
   * @dev Enables anyone with a masternode to earn referral fees on P3C reinvestments.
   */
  function reinvest() public {
    // reinvest must be enabled
    require(disabled == false);

    // withdraw dividends
    p3c.withdraw();
    
    uint256 bal = address(this).balance;
    // buy p3c with the message sender as the referral
    p3c.buy.value(bal)(msg.sender);
  }

  /**
   * @dev Buy P3C tokens
   * @param _playerAddress referral address.
   */
  function buy(address _playerAddress) public payable onlyOwner() {
    p3c.buy.value(msg.value)(_playerAddress);
  }

  /**
   * @dev Sell P3C tokens and send balance to owner
   * @param _amountOfTokens amount of tokens to sell.
   */
  function sell(uint256 _amountOfTokens) public onlyOwner() {
    // sell tokens
   p3c.sell(_amountOfTokens);

    // transfer to owner
    owner.transfer(address(this).balance);
  }

  /**
   * @dev Withdraw P3C dividends and send balance to owner
   */
  function withdraw() public onlyOwner() {
    // withdraw dividends
    p3c.withdraw();

    // transfer to owner
    owner.transfer(address(this).balance);
  }

  /**
   * @dev Sell P3C tokens, withdraw dividends, and send balance to owner
   */
  function exit() public onlyOwner() {
    // sell all tokens and withdraw
    p3c.exit();

    // transfer to owner
    owner.transfer(address(this).balance);
  }
  
  /**
   * @dev Transfer P3C tokens
   * @param _toAddress address to send tokens to.
   * @param _amountOfTokens amount of tokens to send.
   */
  function transfer(address _toAddress, uint256 _amountOfTokens) public onlyOwner() returns (bool) {
    return p3c.transfer(_toAddress, _amountOfTokens);
  }

  /**
   * @dev Get dividends for this crop.
   */
  function cropDividends() public view returns (uint256) {
    return p3c.myDividends(true);
  }
  
   /**
   * @dev Get dividends of the owner - includes referral bonus - and does not include crop dividends
   */
  function ownerDividends() public view returns (uint256) {
    return p3c.dividendsOf(owner);
  }
  
   /**
   * @dev Get amount of tokens owned by the crop. 
   */
  function cropTokens() public view returns (uint256) {
    return p3c.myTokens();
  }
  
   /**
   * @dev Get amount of tokens owned by the owner. Does not include crop tokens.
   */
  function ownerTokens() public view returns (uint256) {
    return p3c.balanceOf(owner);
  }
}