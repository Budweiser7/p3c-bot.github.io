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
  function reinvest() public {}
  function withdraw() public returns(address) {}
  function exit() external;
  function dividendsOf(address) public returns(uint256);
  function balanceOf(address) public returns(uint256);
  function transfer(address , uint256) public returns(bool);
  function stakingRequirement() public returns(uint256);
  function myTokens() public view returns(uint256);
  function myDividends(bool) public view returns(uint256);
}

contract Crop {
  function myTokens() public view returns(uint256) {}
}


contract Farm {
  Hourglass p3c;
  address public p3cAddress = 0x80DAfcF47A0199b71C187C84BA68Cfb999f2A1ef;

  function Farm() public {
    p3c = Hourglass(p3cAddress);
  }

  // address mapping for owner => crop
  mapping (address => address) public crops;

  // event for creating a new crop
  event CreateCrop(address indexed owner, address indexed crop, uint256 version);

  /**
   * @dev Link a crop to an owner address 
   */
  function link(address owner, address cropAddress, uint256 version) public {
    // sender must not own a crop
    require(crops[owner] == address(0));
    
    // Possibly include this check?
    // require(p3c.balanceOf(msg.sender) > 0);

    // create a new crop
    crops[owner] = cropAddress;

    // fire event
    emit CreateCrop(owner, cropAddress, version);
  }
  
  function myCrop() public view returns (address) {
    return crops[msg.sender];
  }
}