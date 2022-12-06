// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

interface IERC20 {
    function return5() external pure returns (uint256);
}

contract ERC20 is IERC20 {
    function return5() external pure override returns (uint256) {
        return 5;
    }
}

contract Test {
    function doReturn5(address _addr) external pure returns (uint256) {
        return IERC20(_addr).return5();
    }
}