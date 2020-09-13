// Apply configuration
require('@openzeppelin/test-helpers/configure')({})

const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers')

const _CA = artifacts.require("ContractA")
const _CB = artifacts.require("ContractB")


describe("ContractB.doSomething", () => {

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts()

        CA = await _CA.new()
        CB = await _CB.new(CA.address)
    })


    it("should return a string", async () => {
        const name = await CB.doSomething("Homer")

        assert.equal(name, "Homer")
    })
})
