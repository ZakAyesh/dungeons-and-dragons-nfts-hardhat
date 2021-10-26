task("generate-character", "Generate a provably random Chainlink D&D Character")
    .addParam("contract", "The address of the contract that you want to call")
    .addParam("name", "The name of your character")
    .setAction(async taskArgs => {

        const contractAddr = taskArgs.contract
        const networkId = network.name
        console.log("Generating a provably random Chainlink D&D Character ", contractAddr, " on network ", networkId)
        const DungeonsDragons = await ethers.getContractFactory("DungeonsAndDragonsCharacter")

        //Get signer information
        const accounts = await hre.ethers.getSigners()
        const signer = accounts[0]

        //Create random character
        const dungeonsDragonsContract = new ethers.Contract(contractAddr, DungeonsDragons.interface, signer)
        var result = await dungeonsDragonsContract.requestNewRandomCharacter(taskArgs.name)
        console.log('Contract ', contractAddr, ' random character generated. Transaction Hash: ', result.hash)
        console.log("Run the following to generate the metadata for created characters:")
        console.log("npx hardhat create-metadata --contract " + contractAddr + " --network " + network.name)
    })

module.exports = {}
