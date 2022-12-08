// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./crowdsale/CrowdSale.sol";
import "./Whitelist.sol";
import "./Cap.sol";
import "./TimedCrowdsale.sol";

contract Sale is Crowdsale, Whitelist, Cap, TimedCrowdsale {
    using SafeMath for uint256;
    IERC20 D_OneToken;

    mapping(address => uint256) private _balances;
    Safe private safe;

    constructor (
        uint256 rate_, 
        address payable wallet_, 
        IERC20 token_, 
        uint256 _hardCap,
        uint256 _openingTime, 
        uint256 _closingTime,
        address _deployer
    ) 
        Crowdsale(rate_, wallet_, token_, _deployer) 
        Cap(_hardCap) 
        TimedCrowdsale(_openingTime, _closingTime)
    {
        D_OneToken = token_;
        safe = new Safe(address(this));
    }

    function _preValidatePurchase(
        address _beneficiary, 
        uint256 _weiAmount
    ) 
        internal 
        override 
        view 
        isMyWhitelisted(_beneficiary) 
        onlyWhileOpen 
    {       
        super._preValidatePurchase(_beneficiary, _weiAmount);
        require(weiRaised().add(_weiAmount) <= getCap(), "CappedCrowdsale: cap exceeded");
    }

    function _postValidatePurchase2(
        address beneficiary
    ) 
        internal 
        virtual 
        override
    {
        _removeMyWhitelist(beneficiary);
    }

    function _processPurchase(address beneficiary, uint256 tokenAmount) internal override {
        _balances[beneficiary] = _balances[beneficiary].add(tokenAmount);
        _deliverTokens(address(safe), tokenAmount);
    }

    function claim(address beneficiary) public {
        require(hasClosed(), "PostDeliveryCrowdsale: not closed");
        uint256 amount = _balances[beneficiary];
        require(amount > 0, "PostDeliveryCrowdsale: beneficiary is not due any tokens");

        _balances[beneficiary] = 0;
        safe.transfer(token(), beneficiary, amount);
    }

    // Whitelist.sol이 Ownable을 상속받아서 OnlyOwner 사용가능
    // function withDraw() external onlyOwner() {
    //     // Sale Smart Contract에 남은 잔여 ether를 모두 sender에게 재전송한다.
    //     D_OneToken.transfer(msg.sender, D_OneToken.balanceOf(address(this)));
    // }
}

contract Safe {
    address deployer;

    constructor(address _deployer) {
        deployer = _deployer;
    }

    function transfer(IERC20 token, address to, uint256 amount) public {
        require(msg.sender == deployer, "Only Sale smart contract can call this function");
        token.transfer(to, amount);
    }
}