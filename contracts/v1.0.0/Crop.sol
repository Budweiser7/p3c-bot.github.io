pragma solidity ^0.4.20;

/***
 *     ,-----.                         
 *    '  .--./ ,--.--.  ,---.   ,---.  
 *    |  |     |  .--' | .-. | | .-. | 
 *    '  '--'\ |  |    ' '-' ' | '-' ' 
 *     `-----' `--'     `---'  |  |-'  
 *                             `--'    
 *  "Good things come to those who wait."
 *  Fork of contract at ETH (0x0D6C969d0004B431189f834203CE0f5530e06259)
 *  What?
 *  -> A crop contract auto reinvests P3C on behalf of users.
 *  -> When someone reinvests your crops, they withdraw the divs, and then the divs are used to buy P3C with them as the referrer.
 *  -> Creating a crop is NOT necessary for using P3C, only a convenience. Use this while you keep P3C in storage.
 *  -> This needs to de deployed the farm contract, so it can be referenced. Make sure to change hourglass address.
 */
 
interface P3C {
  function() payable external;
  function buy(address _playerAddress) payable external returns(uint256);
  function sell(uint256 _amountOfTokens) external;
  function reinvest() external;
  function withdraw() external;
  function exit() external;
  function dividendsOf(address _playerAddress) external view returns(uint256);
  function balanceOf(address _playerAddress) external view returns(uint256);
  function transfer(address _toAddress, uint256 _amountOfTokens) external returns(bool);
  function stakingRequirement() external view returns(uint256);
  function myDividends(bool _includeReferralBonus) external view returns(uint256);
}

contract Crop {
  address public owner;
  bool public disabled;

  address public p3cAddress = 0x80DAfcF47A0199b71C187C84BA68Cfb999f2A1ef;

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  function() public payable {}
  
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
    P3C p3c = P3C(p3cAddress);

    // withdraw dividends
    p3c.withdraw();

    // reinvest with a referral fee for sender
    p3c.buy.value(address(this).balance)(msg.sender);
  }

  /**
   * @dev Buy P3C tokens
   * @param _playerAddress referral address.
   */
  function buy(address _playerAddress) external payable onlyOwner() {
    P3C(p3cAddress).buy.value(msg.value)(_playerAddress);
  }

  /**
   * @dev Sell P3C tokens and send balance to owner
   * @param _amountOfTokens amount of tokens to sell.
   */
  function sell(uint256 _amountOfTokens) external onlyOwner() {
    // sell tokens
    P3C(p3cAddress).sell(_amountOfTokens);

    // transfer to owner
    owner.transfer(address(this).balance);
  }

  /**
   * @dev Withdraw P3C dividends and send balance to owner
   */
  function withdraw() external onlyOwner() {
    // withdraw dividends
    P3C(p3cAddress).withdraw();

    // transfer to owner
    owner.transfer(address(this).balance);
  }

  /**
   * @dev Sell P3C tokens, withdraw dividends, and send balance to owner
   */
  function exit() external onlyOwner() {
    // sell all tokens and withdraw
    P3C(p3cAddress).exit();

    // transfer to owner
    owner.transfer(address(this).balance);
  }
  
  /**
   * @dev Transfer P3C tokens
   * @param _toAddress address to send tokens to.
   * @param _amountOfTokens amount of tokens to send.
   */
  function transfer(address _toAddress, uint256 _amountOfTokens) external onlyOwner() returns (bool) {
    return P3C(p3cAddress).transfer(_toAddress, _amountOfTokens);
  }

  /**
   * @dev Get dividends for this contract
   * @param _includeReferralBonus for including referrals in dividends.
   */
  function dividends(bool _includeReferralBonus) external view returns (uint256) {
    return P3C(p3cAddress).myDividends(_includeReferralBonus);
  }
}