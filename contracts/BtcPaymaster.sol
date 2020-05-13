pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import "@opengsn/gsn/contracts/BasePaymaster.sol";

contract BtcPaymaster is BasePaymaster {
    uint256 private _fee;
    address private _tokenAddress;

    constructor(uint256 fee, address tokenAddress) Ownable() public {
        _fee = fee;
        _tokenAddress = tokenAddress;
    }

    function setFee(uint256 fee) onlyOwner public {
        _fee = fee;
    }

    function acceptRelayedCall(
        GSNTypes.RelayRequest calldata relayRequest,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    ) external view override returns (bytes memory) {
        return "";
    }

    function preRelayedCall(bytes calldata context) external override returns (bytes32) {
        return "";
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