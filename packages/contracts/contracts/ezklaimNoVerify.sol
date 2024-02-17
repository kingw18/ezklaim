// SPDX-License-Identifier: MIT
pragma solidity >=0.8.4;

contract eZKlaimNoVerify {

    mapping(bytes32 => uint256) public balances;

    function deposit(bytes32 hash) public payable returns (bytes32) {
        require(msg.value > 0, "Deposit value must be greater than 0");
        balances[hash] += msg.value;
        return hash;
    }
    event Claim(bytes32 hash, address dest);

    function claim(
        bytes32 hash,
        address destination 
    ) public {
        emit Claim(hash, destination);
        uint256 balance = balances[hash];
        require(balance > 0, "No balance available to claim");
        balances[hash] = 0;
        (bool sent, ) = destination.call{value: balance}("");
        require(sent, "Failed to send Ether");
    }
}
