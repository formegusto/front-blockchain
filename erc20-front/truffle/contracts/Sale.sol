// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "./crowdsale/CrowdSale.sol";

contract Sale is Crowdsale {
    constructor (uint256 rate_, address payable wallet_, IERC20 token_) Crowdsale(rate_, wallet_, token_) {
    }
}