// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Simple4 {
    uint256 public num;

    receive() external payable {}

    event FromWho(address indexed from, uint256 value);

    function Setnum(uint256 _num) public {
        num = _num;
    }

    function Setnum2(uint256 _num) public payable {
        require(1 ether == msg.value, "Must Be 1 ether");
        num = _num;
        emit FromWho(msg.sender, msg.value);
    }
}
