pragma solidity ^0.6.2;
pragma experimental ABIEncoderV2;

import '@opengsn/gsn/contracts/BasePaymaster.sol';
import '@opengsn/gsn/contracts/utils/GsnUtils.sol';
import 'openzeppelin-solidity/contracts/token/ERC20/IERC20.sol';


// target contract interface - Tornado
abstract contract Target {
    uint256 public denomination;

    function deposit(bytes32 _commitment) external virtual payable;
}


contract BtcPaymaster is BasePaymaster {
    uint256 public fee;
    IERC20 private _token;
    // Contracts for which the paymaster is willing to pay for
    mapping(address => Target) _targets;

    constructor(uint256 _fee, address tokenAddress) public Ownable() {
        fee = _fee;
        _token = IERC20(tokenAddress);
    }

    function setFee(uint256 _fee) public onlyOwner {
        fee = _fee;
    }

    function addTarget(address newTarget) public onlyOwner {
        _targets[newTarget] = Target(newTarget);
    }

    function removeTarget(address target) public onlyOwner {
        delete _targets[target];
    }

    function withdraw(address withdrawAddress) public onlyOwner {
        _token.transfer(withdrawAddress, _token.balanceOf(address(this)));
    }

    function acceptRelayedCall(
        GSNTypes.RelayRequest calldata relayRequest,
        bytes calldata approvalData,
        uint256 maxPossibleGas
    ) external override view returns (bytes memory) {
        Target target = _targets[relayRequest.target];
        uint256 denomination = target.denomination();
        require(denomination != 0, 'Address not in targets.');
        address sender = relayRequest.relayData.senderAddress;
        require(_token.balanceOf(sender) >= (denomination + fee), "Sender's balance is too low");
        require(
            _token.allowance(sender, relayRequest.target) >= denomination,
            "Sender's allowance for tornado is lower than the tornado denomination"
        );
        require(
            _token.allowance(sender, address(this)) >= fee,
            "Sender's allowance for paymaster is lower than the paymaster's fee"
        );
        bytes4 sig = GsnUtils.getMethodSig(relayRequest.encodedFunction);
        require(sig == target.deposit.selector, 'Only deposit function can be invoked through the relay');
        return abi.encode(sender);
    }

    function preRelayedCall(bytes calldata context) external override relayHubOnly returns (bytes32) {
        address sender = abi.decode(context, (address));
        if (fee != 0) {
            _token.transferFrom(sender, address(this), fee);
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
