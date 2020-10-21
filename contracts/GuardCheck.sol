// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract GuardCheck {

    ERC20 public daiToken;

    constructor(address _mockDaiAddress) public
    {
        daiToken = ERC20(_mockDaiAddress);
    }

    // @dev donate() is an example of how you can use require(), revert(), and assert()
    // -- require() and revert() halt execution,
    // return unused gas, and rollback / prevent any
    // changes persisting to the blockchain
    // -- assert() is used at the end of a function to
    // validate outcomes, state, etc. and if FALSE,
    // also prevents any changes from being persisted
    // to the blockchain
    function donate(address to, uint amount) payable public
    {

        // require(); is appropriate for simple
        // checks that if FALSE should prevent
        // any more of the function from executing,
        // refunding any remaining gas to the caller.

        // Make sure the user didn't neglect to specify
        // a receiver for the donation.
        require(to != address(0));
        require(amount != 0);

        uint balanceBeforeTransfer = daiToken.balanceOf(msg.sender);

        require(balanceBeforeTransfer >= amount, "You do not have enough to transfer.");

        uint transferAmount;

        if (daiToken.balanceOf(to) == 0) {
            transferAmount = amount;
        } else if (daiToken.balanceOf(to) < balanceBeforeTransfer) {
            transferAmount = amount / 2;
        } else {
            // revert(); is appropriate for more complex
            // checks / logic, and likewise prevents the
            // function from continuing and refunds any
            // gas unused.
            revert("The receiver has enough money already.");
        }

        daiToken.transferFrom(msg.sender, to, transferAmount);

        // assert(); is appropriate for checks at the END of a
        // function, that if FALSE will result in any changes being
        // reverted. No gas is returned / refunded.
        assert(daiToken.balanceOf(msg.sender) == balanceBeforeTransfer - transferAmount);
    }
}
