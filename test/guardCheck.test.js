// Apply configuration
require('@openzeppelin/test-helpers/configure')({})

const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers')

const _dai = artifacts.require("MockDaiToken")
const _contract = artifacts.require("GuardCheck")

function tokens(n) {
    return web3.utils.toWei(n, 'ether')
}

describe("GuardCheck.donate", () => {

    let MockDai, Contract

    beforeEach(async () => {
        [owner, user1, user2] = await web3.eth.getAccounts()

        MockDai = await _dai.new(tokens("1000"), {from: owner})
        Contract = await _contract.new(MockDai.address, {from: owner})
    })

    it('user2 should be able to donate to user1', async () => {
        await MockDai.transfer(user2, tokens("10"))
        const user2Balance = await MockDai.balanceOf(user2)
        assert.equal(user2Balance.toString(), tokens("10"))

        await MockDai.approve(Contract.address, tokens('1'), {from: user2})
        await Contract.donate(user1, tokens("1"), {from: user2})
    })


    it("user 2 cannot donate more than he has", async () => {

        await MockDai.transfer(user1, tokens("10"))
        const user1Balance = await MockDai.balanceOf(user1)
        assert.equal(user1Balance.toString(), tokens("10"))

        await MockDai.transfer(user2, tokens("9"))
        const user2Balance = await MockDai.balanceOf(user2)
        assert.equal(user2Balance.toString(), tokens("9"))

        await MockDai.approve(Contract.address, tokens('10'), {from: user2})

        await expectRevert(
            Contract.donate(user1, tokens("10"), {from: user2}),
            "You do not have enough to transfer."
        )
    })

    it("user2 can't donate to user1 if user1 has more $$ than user2", async () => {

        await MockDai.transfer(user1, tokens("10"))
        const user1Balance = await MockDai.balanceOf(user1)
        assert.equal(user1Balance.toString(), tokens("10"))

        await MockDai.transfer(user2, tokens("9"))
        const user2Balance = await MockDai.balanceOf(user2)
        assert.equal(user2Balance.toString(), tokens("9"))

        await MockDai.approve(Contract.address, tokens('1'), {from: user2})

        await expectRevert(
            Contract.donate(user1, tokens("1"), {from: user2}),
            'The receiver has enough money already.'
        )
    })
})
