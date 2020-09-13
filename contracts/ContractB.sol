//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.8.0;

import "@nomiclabs/buidler/console.sol";
import "./ContractA.sol";

contract ContractB {
    ContractA internal contractA;

    constructor(address contractAAddress) {
        // here I'm casting the address to the ContractA type
        // so I get access to the Contract's storage and type information
        // which would include methods.
        contractA = ContractA(contractAAddress);
    }

    function doSomething(string memory _name) public view returns (string memory) {
        return contractA.name(_name);
    }
}
