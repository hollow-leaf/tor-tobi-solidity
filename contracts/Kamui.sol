// SPDX-License-Identifier: LGPL-3.0
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Kamui is ERC20 {

    constructor() ERC20("WrappedEther", "WETH") {
        _mint(msg.sender, 1000000 ether);
    }

    function deposit(uint amount) public {
      transfer(address(this), amount);
    }

    function withdraw(uint amount) public {
        require(amount <= this.balanceOf(address(this)), "Balance not enough");
        
        this.transfer(msg.sender, amount);
    }
}
