// Apply configuration
require('@openzeppelin/test-helpers/configure')({})

const {
    BN,           // Big Number support
    constants,    // Common constants, like the zero address and largest integers
    expectEvent,  // Assertions for emitted events
    expectRevert, // Assertions for transactions that should fail
} = require('@openzeppelin/test-helpers')

const _contract = artifacts.require("SimpleListUsingArray")

describe("SimpleListUsingArray.newBook", () => {

    beforeEach(async () => {
        accounts = await web3.eth.getAccounts()

        Contract = await _contract.new()
    })

    it("should create a book", async () => {
        const resp = await Contract.newBook("To Kill a Mockingbird", "Harper Lee", {from: accounts[0]})

        expectEvent(resp, 'NewBook', {
            user: accounts[0],
            index: new BN(0),
            title: "To Kill a Mockingbird",
            author: "Harper Lee",
        })
    })
})

describe("SimpleListUsingArray.commonOperations", () => {
    beforeEach(async () => {
        accounts = await web3.eth.getAccounts()

        Contract = await _contract.new()
    })

    it("demo: request details for all books", async () => {
        await Contract.newBook("To Kill a Mockingbird", "Harper Lee", {from: accounts[0]})
        await Contract.newBook("The Count of Monte Cristo", "Alexandre Dumas", {from: accounts[0]})

        const bookCount = await Contract.getBookCount()

        const books = []
        for (let i = 0; i < bookCount; i ++) {
            books.push(await Contract.books(i))
        }

        assert.equals("To Kill a Mockingbird", books[0].title)
        assert.equals("The Count of Monte Cristo", books[1].title)
    })
})
