//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.8.0;

contract ContractA {

    function name(string memory _name) public pure returns (string memory) {
        return _name;
    }
}
