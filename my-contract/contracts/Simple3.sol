// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

contract Simple3 {
    event OnlyTrue(bool resultTrue);
    uint256 public num;
    uint256 public deployedTime;

    constructor(uint256 _num) {
        num = _num;
        // block은 smart contract에 대한 여러 정보를 담고 있다.
        deployedTime = block.timestamp;
    }

    function noFalse(bool trueOrFalse) public {
        require(trueOrFalse, "No false!");
        emit OnlyTrue(trueOrFalse);
    }

    function return5() public pure returns (uint256) {
        return 5;
    }

    function return5In10mins() public view returns (uint256) {
        require(
            block.timestamp >= deployedTime + 10 minutes,
            "10 mins is not passed yet!"
        );
        return 5;
    }
}
