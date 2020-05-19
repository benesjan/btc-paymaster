pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import '@opengsn/gsn/contracts/BasePaymaster.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';

// target contract interface - Tornado
abstract contract Target {
    uint256 public denomination;
}

contract BtcPaymaster is BasePaymaster {
    uint256 private _fee;
    IERC20 private _token;
    // Contracts for which the paymaster is willing to pay for and their denominations
    mapping(address => Target) _targets;

    constructor(uint256 fee, address tokenAddress) public Ownable() {
        _fee = fee;
        _token = IERC20(tokenAddress);
    }

    function setFee(uint256 fee) public onlyOwner {
        _fee = fee;
    }

    function addTarget(address newTarget) public onlyOwner {
        _targets[newTarget] = Target(newTarget);
    }

    function removeTarget(address target) public onlyOwner {
        delete _targets[target];
    }

    function withdraw(address withdrawAddress) public onlyOwner {
        _token.transferFrom(address(this), withdrawAddress, _token.balanceOf(address(this)));
    }

    function acceptRelayedCall(
        GSNTypes.RelayRequest calldata relayRequest,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    ) external override view returns (bytes memory) {
        uint256 denomination = _targets[relayRequest.target].denomination();
        require(denomination != 0, 'Address not in targets.');
        address sender = relayRequest.relayData.senderAddress;
        require(_token.balanceOf(sender) >= (denomination + _fee), "Sender's balance is too low");
        require(
            _token.allowance(sender, relayRequest.target) >= denomination,
            "Sender's allowance for tornado is lower than the tornado denomination"
        );
        require(
            _token.allowance(sender, address(this)) >= _fee,
            "Sender's allowance for paymaster is lower than the paymaster's fee"
        );
        return abi.encode(sender);
    }

    function preRelayedCall(bytes calldata context) external override relayHubOnly returns (bytes32) {
        address sender = abi.decode(context, (address));
        if (_fee!=0) {
            _token.transferFrom(sender, address(this), _fee);
        }
        return bytes32(0);
    }

    function postRelayedCall(
        bytes calldata context,
        bool success,
        bytes32 preRetVal,
        uint256 gasUseWithoutPost,
        GSNTypes.GasData calldata gasData
    ) external override {
        return;
    }
}
