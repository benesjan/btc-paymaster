pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import '@opengsn/gsn/contracts/BasePaymaster.sol';


contract BtcPaymaster is BasePaymaster {
    uint256 private _fee;
    address private _tokenAddress;
    // Contracts for which the paymaster is willing to pay for
    mapping(address => bool) _targets;

    constructor(uint256 fee, address tokenAddress) public Ownable() {
        _fee = fee;
        _tokenAddress = tokenAddress;
    }

    function setFee(uint256 fee) public onlyOwner {
        _fee = fee;
    }

    function addTarget(address newTarget) public onlyOwner {
        _targets[newTarget] = true;
    }

    function removeTarget(address target) public onlyOwner {
        _targets[target] = false;
    }

    function acceptRelayedCall(
        GSNTypes.RelayRequest calldata relayRequest,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    ) external override view returns (bytes memory) {
        require(_targets[relayRequest.target], 'Address not in targets.');
        return '';
    }

    function preRelayedCall(bytes calldata context) external override returns (bytes32) {
        return '';
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
