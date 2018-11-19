pragma solidity ^0.4.21;

/***
 *    ,------.                             
 *    |  .---'  ,--,--. ,--.--. ,--,--,--. 
 *    |  `--,  ' ,-.  | |  .--' |        | 
 *    |  |`    \ '-'  | |  |    |  |  |  | 
 *    `--'      `--`--' `--'    `--`--`--' 
 *   
 *  "With help, wealth grows..."
 *  What?
 *  -> Maintains crops, so that farmers can reinvest on user behaf.
 *  -> A crop contract auto reinvests P3C on behalf of users.
 */       

contract Hourglass {
  function() payable public;
  function buy(address) public payable returns(uint256) {}
  function sell(uint256) public;
  function withdraw() public returns(address);
  function dividendsOf(address) public returns(uint256);
  function balanceOf(address) public returns(uint256);
  function transfer(address , uint256) public returns(bool);
  function myTokens() public view returns(uint256);
  function myDividends(bool) public view returns(uint256);
}

contract Crop {
  address public owner;
  bool public disabled = false;

  // KOVAN P3C
  // address public p3cAddress = 0x656756ebbcfae61db907ee34d2227cffaa7b7600;
  
  // ETC P3C
  address private p3cAddress = 0x80DAfcF47A0199b71C187C84BA68Cfb999f2A1ef;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }
  
  function Crop(address newOwner) public {
      owner = newOwner;
  }
  
  /**
   * @dev Turn reinvest on / off
   * @param _disabled bool to determine state of reinvest.
   */
  function disable(bool _disabled) external onlyOwner() {
    // toggle disabled
    disabled = _disabled;
  }

  /**
   * @dev Enables anyone with a masternode to earn referral fees on P3C reinvestments.
   */
  function reinvest() external {
    // reinvest must be enabled
    require(disabled == false);
    
    // setup p3c
    Hourglass p3c = Hourglass(p3cAddress);

    // withdraw dividends
    p3c.withdraw();

    uint256 bal = address(this).balance;
    // reinvest with a referral fee for sender
    p3c.buy.value(bal)(msg.sender);
  }
  
  /**
   * @dev Default function if ETC sent to contract. Does nothing.
   */
  function() public payable {}

  /**
   * @dev Buy P3C tokens
   * @param _playerAddress referral address.
   */
  function buy(address _playerAddress) external payable {
    Hourglass(p3cAddress).buy.value(msg.value)(_playerAddress);
  }

  /**
   * @dev Sell P3C tokens and send balance to owner
   * @param _amountOfTokens amount of tokens to sell.
   */
  function sell(uint256 _amountOfTokens) external onlyOwner() {
    // sell tokens
    Hourglass(p3cAddress).sell(_amountOfTokens);
  }

  /**
   * @dev Withdraw P3C dividends and send balance to owner
   */
  function withdraw() external onlyOwner() {
    // withdraw dividends
    Hourglass(p3cAddress).withdraw();

    // transfer to owner
    owner.transfer(address(this).balance);
  }
  
  /**
   * @dev Transfer P3C tokens
   * @param _toAddress address to send tokens to.
   * @param _amountOfTokens amount of tokens to send.
   */
  function transfer(address _toAddress, uint256 _amountOfTokens) external onlyOwner() returns (bool) {
    return Hourglass(p3cAddress).transfer(_toAddress, _amountOfTokens);
  }

  /**
   * @dev Get dividends for this crop.
   * @param _includeReferralBonus for including referrals in dividends.
   */
  function cropDividends(bool _includeReferralBonus) external view returns (uint256) {
    return Hourglass(p3cAddress).myDividends(_includeReferralBonus);
  }
}

contract Farm {
  
  address public p3cAddress = 0x80DAfcF47A0199b71C187C84BA68Cfb999f2A1ef;
  
  // Mapping of owners to their crops.
  mapping (address => address) public crops;
  
  // event for creating a new crop
  event CropCreated(address indexed owner, address crop);

  function createCrop(address referrer) public payable returns (address) {
      // we can't already have a crop
      require(crops[msg.sender] == address(0));
      
      address cropAddress = new Crop(msg.sender);
      crops[msg.sender] = cropAddress;
      emit CropCreated(msg.sender, cropAddress);

      if (msg.value != 0){
        Crop(cropAddress).buy.value(msg.value)(referrer);
      }
      
      return cropAddress;
  }
  
  /**
   * @dev Returns my current crop.
   */
  function myCrop() public view returns (address) {
    return crops[msg.sender];
  }
  
  /**
   * @dev Get dividends of my crop.
   */
  function myCropDividends() external view returns (uint256) {
    return Hourglass(p3cAddress).dividendsOf(crops[msg.sender]);
  }
  
  /**
   * @dev Get amount of tokens owned by my crop.
   */
  function myCropTokens() external view returns (uint256) {
    return Hourglass(p3cAddress).balanceOf(crops[msg.sender]);
  }
}