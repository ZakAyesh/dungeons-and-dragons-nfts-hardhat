const { networkConfig, autoFundCheck, developmentChains } = require('../../helper-hardhat-config')
const skipIf = require('mocha-skip-if')
const chai = require('chai')
const { expect } = require('chai')
const BN = require('bn.js')
const { getChainId, deployments, ethers, run } = require('hardhat')
chai.use(require('chai-bn')(BN))

skip.if(!developmentChains.includes(network.name)).
    describe('DungeonsAndDragons Unit Tests', async function () {
    
    let dungeonsAndDragonsContract
    let DungeonsAndDragons
    const randomNumber = 777
    
    beforeEach(async() => {
        const chainId = getChainId()
        await deployments.fixture(['mocks', 'D&D'])
        DungeonsAndDragons = await deployments.get('DungeonsAndDragonsCharacter')
        dungeonsAndDragonsContract = await ethers.getContractAt('DungeonsAndDragonsCharacter', DungeonsAndDragons.address)
        const LinkToken = await deployments.get('LinkToken')
        accounts = await ethers.getSigners()
        player = accounts[0]
        oracle = accounts[1]
        await run("fund-link", { contract: DungeonsAndDragons.address, linkaddress: LinkToken.address })
    })

    it('Should retrieve name of ERC721 contract', async () => {
        const name = await dungeonsAndDragonsContract.name()
        expect(name).equals('DungeonsAndDragonsCharacter')
    })

    it('Should request a provably random character', async () => {
        const name = "Zak"
        const transactionResponse = await dungeonsAndDragonsContract.requestNewRandomCharacter(name)
        const transactionReceipt = await transactionResponse.wait()
        const requestId = transactionReceipt.events[3].topics[1]
        //Check to see if name in requestToCharacterName is equal to name passed by transaction
        expect(await dungeonsAndDragonsContract.requestToCharacterName(requestId)).equals(name);
    })

        it('Should generate a provably random character', async () => {
            const name = "Zak"
            const requestResponse = await dungeonsAndDragonsContract.requestNewRandomCharacter(name)
            const requestReceipt = await requestResponse.wait()
            const requestId = requestReceipt.events[3].topics[1]
            const VRFCoordinatorMock = await deployments.get('VRFCoordinatorMock')
            const vrfCoordinatorMock = await ethers.getContractAt('VRFCoordinatorMock', VRFCoordinatorMock.address)
            const fulfillResponse = await vrfCoordinatorMock.callBackWithRandomness(requestId, randomNumber, DungeonsAndDragons.address)
            const fulfillReceipt = await fulfillResponse.wait()
            const characters = await dungeonsAndDragonsContract.characters(0)
            const characterName = characters[7]
            expect(characterName).equals(name)
     })
})

